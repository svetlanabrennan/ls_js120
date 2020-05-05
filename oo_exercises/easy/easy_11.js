// class Banner {
//   constructor(message) {
//     this.message = message;
//     this.length = message.length;
//   }

//   displayBanner() {
//     console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
//   }

//   horizontalRule() {
//     return `+${"-".repeat(this.length + 2)}+`;
//   }

//   emptyLine() {
//     return `| ${" ".repeat(this.length)} |`;
//   }

//   messageLine() {
//     return `| ${this.message} |`;
//   }
// }

// let banner1 = new Banner('To boldly go where no one has gone before.');
// banner1.displayBanner();
// /*
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+
// */

// let banner2 = new Banner('');
// banner2.displayBanner();
// /*
// +--+
// |  |
// |  |
// |  |
// +--+
// */

// further explorations

class Banner {
  constructor(message, width = message.length) {
    this.message = message;
    this.width = width;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+${"-".repeat(this.width + 2)}+`;
  }

  emptyLine() {
    return `| ${" ".repeat(this.width)} |`;
  }

  messageLine() {
    if (this.message.length < this.width) {
      let padding = (this.width - this.message.length - 2) / 2;
      let left = Math.floor(padding) + 2;
      let right = Math.ceil(padding) + 2;
      return `|${" ".repeat(left)}${this.message}${" ".repeat(right)}|`;
    } else {
      return `| ${this.message} |`;
    }

  }
}

let banner1 = new Banner('To boldly go where no one has gone before. This is a test', 100);
banner1.displayBanner();
/*
+--------------------------------------------+
|                                            |
| To boldly go where no one has gone before. |
|                                            |
+--------------------------------------------+
*/

let banner2 = new Banner('');
banner2.displayBanner();
/*
+--+
|  |
|  |
|  |
+--+
*/