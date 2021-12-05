var Typer = function (element, targets, delta) {
    this.element = element;
    this.index = 0;
    this.targets = targets;
    this.delta = parseInt(delta, 10);
    this.current = '';
    this.typing = true;
    this.tick();
}

Typer.prototype.tick = function () {
    let realDelta = this.delta;

    this.current = this.targets[this.index].substring(0, this.typing ? this.current.length + 1 : this.current.length - 1);
    this.element.innerText = this.current;

    // If phrase is complete wait for a sec for it to be readable
    if (this.typing && this.current === this.targets[this.index]) {
        this.typing = false;
        realDelta = 1200;
    } else if (!this.typing && this.current === "") {
        this.typing = true;
        this.index++;
        if (this.index === this.targets.length) {
            this.index = 0;
        }
    }

    // Don't wait for next character if last one is a space
    if (this.current[this.current.length - 1] === " ") {
        realDelta = 0;
    }

    setTimeout(() => {
        this.tick();
    }, realDelta);
}


async function changeRoleText() {
    let roleElement = document.getElementById("role-text");
    const roles = [
        "Frontend Developer",
        "Data Migration Consultant",
        "ABAP Developer",
    ];

    roleElement.innerText = "";
    new Typer(roleElement, roles, 120);
}

window.onload = () => {
    changeRoleText();
};