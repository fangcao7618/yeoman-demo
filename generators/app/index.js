// 作为 generator 的 核心入口
// 需要导入一个继承自 Yeoman Generator 的一些生命周期方法
// Yeoman Generator 在工作的时候回自动调用 再次类型中定义的 一些生命周期方法

const Generator = require("yeoman-generator");

module.exports = class extends (
  Generator
) {
  // Yeoman 自动在生成文件阶段调用这个方法
  writing() {
    // 父类的 fs 模块
    this.fs.write(
      // 文件目录
      this.destinationPath("temp.txt"),
      // 文件内容
      Math.random().toString()
    );
  }
};

module.exports = class extends (
  Generator
) {
  promiting() {
    return this.prompt([
      {
        type: "input", // 用户输入的方式
        name: "title",
        message: "your project title", // 提示
        default: this.appname, // appname 为 为项目生成目录的名称，作为 这个问题的默认值
      },
    ]).then((answers) => {
      this.answers = answers;
    });
  }
  // Yeoman 自动在生成文件阶段调用这个方法
  writing() {
    // 通过模板方法 协议文件到目标目录
    // 这里可以定义一个 数组，然后 通过遍历的方式，一次性生成一大堆文件
    const tmpl = this.templatePath("index.html");
    const output = this.destinationPath("index.html");
    const conext = { title: this.answers.title, success: true };
    this.fs.copyTpl(tmpl, output, conext);
  }
};
