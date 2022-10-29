import { LitElement, TemplateResult } from "lit"

export type HostClassMap = { [key: string]: boolean }
export type HostSlots<T extends string> = { [K in T]: Element[] }

export abstract class BulmaElement<
  T extends string = "def"
> extends LitElement {
  private readonly __slots: string[]

  private get __defaultSlot(): [children: Element[], defaultSlot: Element[]] {
    const children = Array.from(this.children)
    return [children, children.filter((child) => !child.hasAttribute("slot"))]
  }

  public get slots(): HostSlots<"def" | T> {
    const [children, defaultSlot] = this.__defaultSlot

    return this.__slots.reduce(
      (slots: any, name) => {
        slots[name] = children.filter(
          (child) => child.getAttribute("slot") === name
        )
        return slots
      },
      { def: defaultSlot } as HostSlots<T>
    )
  }

  protected abstract get template(): TemplateResult<1>

  constructor(slots: string[] = []) {
    super()
    this.__slots = slots
  }

  protected override createRenderRoot(): Element | ShadowRoot {
    return this
  }

  protected applyHostClass(map: HostClassMap): void {
    for (const hostClass in map) {
      const contains = this.classList.contains(hostClass)

      if (!contains && map[hostClass]) {
        this.classList.add(hostClass)
        continue
      }

      if (contains && !map[hostClass]) {
        this.classList.remove(hostClass)
      }
    }
  }

  protected override render(): TemplateResult<1> {
    return this.template
  }

  public override connectedCallback(): void {
    super.connectedCallback()
    this.connected()
  }

  protected connected(): void {}
}
