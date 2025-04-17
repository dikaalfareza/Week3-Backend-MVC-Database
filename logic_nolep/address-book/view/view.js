const chalk = require("chalk");

class View {
  static showSuccess(message) {
    console.log(chalk.green.bold(message));
  }

  static showError(message) {
    console.log(chalk.red.bold(message));
  }

  static showTable(data) {
    if (data && data.length > 0) {
      console.table(data);
    } else {
      console.log(chalk.yellow("Tidak ada data untuk ditampilkan."));
    }
  }
}

module.exports = View;
