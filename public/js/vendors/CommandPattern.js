var FileOperation = function(h) {
    var http = h;

    var Save = {
        HISTORY: [],
        TRASH: []
    };

    function Command() {}
    Command.prototype.execute = function () {};

    function Undo(op) {this.op = op;}
    function Redo(op) {this.op = op;}
    function Init(op) {this.op = op;}
    Undo.prototype = Object.create(Command.prototype);
    Redo.prototype = Object.create(Command.prototype);
    Init.prototype = Object.create(Command.prototype);

    Undo.prototype.execute = function () {this.op.undo();};
    Redo.prototype.execute = function () {this.op.redo();};
    Init.prototype.execute = function () {this.op.init();};

    function Operation() {}

    Operation.prototype.undo = function () {};
    Operation.prototype.redo = function () {};
    Operation.prototype.init = function () {};

    function Implementation() {}

    Implementation.prototype = Object.create(Operation.prototype);

    Implementation.prototype.undo = function () {
        var cmd = Save.HISTORY.pop();
        if (Save.HISTORY.length !== 0) {
            Save.TRASH.push(cmd);
            http.post("/changeSave", {save: Save});
        }
    };
    Implementation.prototype.redo = function () {
        var cmd = Save.TRASH.pop();
        if (cmd) {
            Save.HISTORY.push(cmd);
            http.post("/changeSave", {save: Save});
        }
    };
    Implementation.prototype.init = function () {
        $.ajax({async: false, type: "POST", url: "/getSave"}).done(function(data){
            Save = data;
        });
    };

    var doOperation = function (commmand) {
        commmand.execute();
    };

    this.undo = function () {
        doOperation(new Undo(new Implementation()));
    };
    this.redo = function () {
        doOperation(new Redo(new Implementation()));
    };
    this.init = function () {
        doOperation(new Init(new Implementation()));
    };

};