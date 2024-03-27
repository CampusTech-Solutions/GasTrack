"use strict";
class SettingCard {
    constructor(subject, title, label, iconClass) {
        this.container_id = "cards-container";
        this.subject = subject;
        this.title = title;
        this.label = label;
        this.iconClass = iconClass;
        this._id = "info-" + SettingCard.counter;
        SettingCard.counter++;
    }
    render() {
        var html = `<div class="col-sm-3 grid-margin" id=${this._id} onclick="onClick('${this._id}', '${this.title}')">
        <div class="card">
          <div class="card-body">
            <h5>${this.subject}</h5>
            <div class="row">
              <div class="col-16 col-sm-12 col-xl-8 my-auto">
                <div class="d-flex d-sm-block d-md-flex align-items-center">
                  <h2 class="mb-0">${this.title}</h2>
                </div>
                <h6 class="text-muted font-weight-normal">${this.label}</h6>
              </div>
              <div class="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                <i class="${this.iconClass}"></i>
              </div>
            </div>
          </div>
        </div>
        </div>`;
        var container = document.getElementById(`${this.container_id}`);
        if (container !== null) {
            container.innerHTML += html;
        }
    }
}
SettingCard.counter = 1;
