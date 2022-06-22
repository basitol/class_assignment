class User {
  #users = [];
  currentUser = {};

  register(email, password) {
    const id = this.#users.length + 1;

    return this.#users.push({ id, email, password, balance: 0 });
  }

  login(_email, _password) {
    // from the users table look for
    // where the email col is equal to the email parameter
    // and
    // where the password col is equal to the password parameter
    const user = this.#users.filter(
      (col) => col.email == _email && col.password == _password
    )[0];

    if (!user) return new Error("Unauthorized access");

    this.currentUser = user;

    return user;
  }

  getAllUsers() {
    console.table(this.#users);
  }
}

class Bank extends User {
  bankName = null;

  constructor(bankName) {
    super();
    this.bankName = bankName;
  }

  deposit(amount) {
    this.currentUser.balance += amount;

    return this.currentUser;
  }

  withdraw(amount) {
    const currentBalance = this.currentUser.balance;

    this.currentUser.balance -= amount;

    if (this.currentUser.balance < 0) {
      this.currentUser.balance = currentBalance;

      return new Error("You cant withdraw more than ....");
    }

    return this.currentUser;
  }
}

const access = new Bank("access");
const gtb = new Bank("gtb");

access.register("jerry_access", "pwd");
access.register("jerry_access_1", "pwd");
access.register("jerry_access_2", "pwd");
access.register("jerry_access_3", "pwd");
access.register("jerry_access_4", "pwd");
access.register("jerry_access_5", "pwd");

gtb.register("jerry_gtb_1", "pwd");
gtb.register("jerry_gtb_2", "pwd");
gtb.register("jerry_gtb_3", "pwd");
gtb.register("jerry_gtb_4", "pwd");
gtb.register("jerry_gtb_5", "pwd");

console.log(access.getAllUsers());
console.log(gtb.getAllUsers());
