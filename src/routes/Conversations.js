class Conversations {
  constructor() {
    this.profile = {};
    this.conversations = {};
  }

  sendMessage(friend, msg) {
    if (this.conversations[friend.id] == undefined) {
      this.conversations[friend.id].messages = [];
      this.conversations[friend.id].messages.push({
        sender: this.profile.screen_name,
        message: msg,
        new: false
      });
      this.conversations[friend.id].live = false;
      return true;
    } else {
      let last = this.conversations[friend.id].messages.length - 1;
      if (this.conversations[friend.id].messages[last].sender != this.profile.screen_name) {
        this.conversations[friend.id].messages.push({
          sender: this.profile.screen_name,
          message: msg,
          new: false
        });
        this.conversations[friend.id].live = false;
        return true;
      } else {
        return false;
      }
    }
  }

  receiveMessage(friend, msg) {
    if (this.conversations[friend.id] == undefined) {
      this.conversations[friend.id].messages = [];
      this.conversations[friend.id].messages.push({
        sender: friend.screen_name,
        message: msg,
        new: true
      });
      this.conversations[friend.id].live = true;
    } else {
      this.conversations[friend.id].messages.push({
        sender: friend.screen_name,
        message: msg,
        new: true
      });
      this.conversations[friend.id].live = true;
    }
  }

  eraseConvo(friend) {
    delete this.conversations[friend.id];
  }

  setProfile(user) {
    this.profile = user;
  }

}

export default Conversations;
