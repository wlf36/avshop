"use strict";
const Tag = use("App/Models/Tag");
class TagController {
  async getAllTag({ response }) {
    const tag = await Tag.all();
    return response.send({
      code: 200,
      data: tag
    });
  }

  async index({ request, response }) {
    const perpage = 10;
    const page = request.input("page");
    const tags = await Tag.query()
      .orderBy("id", "desc")
      .paginate(page, perpage);
    return response.send({
      code: 200,
      data: tags
    });
  }

  async destroy({ params, response }) {
    const tag = await Tag.find(params.id);
    await tag.delete();
    return response.send({
      code: 200,
      message: "delete success"
    });
  }
}

module.exports = TagController;
