import { html, TemplateResult } from "lit"
import { customElement } from "lit/decorators.js"
import { BulmaElement } from "../internals/bulma_element"

@customElement("b-box")
export default class Box extends BulmaElement {
  protected override connected(): void {
    this.applyHostClass({ box: true })
  }

  protected get template(): TemplateResult<1> {
    return html`${this.slots.def}`
  }
}
