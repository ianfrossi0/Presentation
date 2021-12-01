var Typer = function (element, targets, delta) {
    this.element = element;
    this.currentElement = 0;
    this.targets = targets;
    this.delta = parseInt(delta, 10);
    this.current = '';
    this.typing = true;
    this.tick();
}

Typer.prototype.tick = function () {
    let realDelta = this.delta;

    if (this.typing) {
        this.current = this.targets[this.currentElement].substring(0, this.current.length + 1);
    } else {
        this.current = this.targets[this.currentElement].substring(0, this.current.length - 1);
    }

    this.element.innerText = this.current;

    if (this.typing && this.current === this.targets[this.currentElement]) {
        this.typing = false;
        realDelta = 1200;
    } else if (!this.typing && this.current === "") {
        this.typing = true;
        this.currentElement++;
        if (this.currentElement === this.targets.length) {
            this.currentElement = 0;
        }
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