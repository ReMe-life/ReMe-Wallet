import Noty from 'noty'
import '../../../node_modules/noty/lib/noty.css'
import '../../../node_modules/noty/lib/themes/mint.css'

export class ErrorPopUp {
    static show (message: string): void {
        Noty.overrideDefaults({
            callbacks: {
                onTemplate: function () {
                    this.barDom.innerHTML = `<div class="noty_body"><p class="noty_text">${this.options.text}</p></div>`
                }
            }
        })
        new Noty({
            layout: 'topRight',
            timeout: 10000,
            progressBar: false,
            text: message
        }).show();
    }
}