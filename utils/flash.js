/*
* flash structure
* [
*   {
*     title: String,
*     type: "alert-success" | "alert-danger" | "alert-warning"
*     messages: Array<string>
*   },
*   ...
* ]
* */

class Flash {
  constructor() {
    this.flashs = []
  }
  
  addMessage(title, type, message) {
    const index = this.flashs.findIndex(flash => flash.title === title)
    if (index !== -1) {
      this.flashs[index].messages.push(message)
    }
    else {
      this.flashs.push({title, type, messages: [message]})
    }
  }
  
  getMessages() {
    const flashs = this.flashs
    this.flashs = []
    return flashs
  }
}

export default Flash