'use strict'
const Config = use('Config')
const util = use('util')
const u = use('underscore')
const crypto = use('crypto')

var H = require('./headers');
var strings = require('./strings');

class KeywordService {
    constructor() {
        this.ak = Config.get('bce.ak')
        this.sk = Config.get('bce.sk')
    }

    generateAuthorization(url, method, utc_time_str, headers, headersToSign) {

        // 1. Generate SigningKey   
        const rawSessionKey = util.format('bce-auth-v1/%s/%s/%d',
            this.ak, utc_time_str, expirationInSeconds || 1800)
        const signingKey = this.hash(rawSessionKey, this.sk)

        // 2.1 Genrate CanonicalURI
        var canonicalUri = this.uriCanonicalization(url);
        var canonicalQueryString = this.queryStringCanonicalization(params || {});
        
        // 2.2 
        var rv = this.headersCanonicalization(headers || {}, headersToSign);
        var canonicalHeaders = rv[0];
        var signedHeaders = rv[1];

        // 2.3 CanonicalReques
        const canonicalRequest = util.format('%s\n%s\n%s\n%s',
            method, canonicalUri, canonicalQueryString, canonicalHeaders)
        
        // 3. singnature    
        const signature = this.hash(canonicalRequest, signingKey)

        // 4. auth
        if (signedHeaders.length) {
            return util.format('%s/%s/%s', rawSessionKey, signedHeaders.join(';'), signature);
        }

        return util.format('%s//%s', rawSessionKey, signature);
    };

    headersCanonicalization(headers, headersToSign) {
        if (!headersToSign || !headersToSign.length) {
            headersToSign = [H.HOST, H.CONTENT_MD5, H.CONTENT_LENGTH, H.CONTENT_TYPE];
        }

        var headersMap = {};
        headersToSign.forEach(function (item) {
            headersMap[item.toLowerCase()] = true;
        });

        var canonicalHeaders = [];
        Object.keys(headers).forEach(function (key) {
            var value = headers[key];
            value = u.isString(value) ? strings.trim(value) : value;
            if (value == null || value === '') {
                return;
            }
            key = key.toLowerCase();
            if (/^x\-bce\-/.test(key) || headersMap[key] === true) {
                canonicalHeaders.push(util.format('%s:%s',
                    // encodeURIComponent(key), encodeURIComponent(value)));
                    strings.normalize(key), strings.normalize(value)));
            }
        });

        canonicalHeaders.sort();

        var signedHeaders = [];
        canonicalHeaders.forEach(function (item) {
            signedHeaders.push(item.split(':')[0]);
        });

        return [canonicalHeaders.join('\n'), signedHeaders];
    };

    uriCanonicalization(uri) {
        return uri;
    };

    queryStringCanonicalization(params) {
        var canonicalQueryString = [];
        Object.keys(params).forEach(function (key) {
            if (key.toLowerCase() === H.AUTHORIZATION.toLowerCase()) {
                return;
            }

            var value = params[key] == null ? '' : params[key];
            canonicalQueryString.push(key + '=' + strings.normalize(value));
        });

        canonicalQueryString.sort();

        return canonicalQueryString.join('&');
    };

    hash(data, key) {
        let sha256Hmac = crypto.createHmac('sha256', key);
        sha256Hmac.update(data);
        return sha256Hmac.digest('hex');
    };



}

module.exports = new KeywordService()
