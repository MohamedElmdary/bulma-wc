import { LitElement } from "lit"

export type HostClassMap = { [key: string]: boolean }
export type HostSlots<T extends string> = { [K in T]: Element[] }

export abstract class BulmaElement<
  T extends string = "default"
> extends LitElement {
  private readonly __slots: string[]

  private get __defaultSlot(): [children: Element[], defaultSlot: Element[]] {
    const children = Array.from(this.children)
    return [children, children.filter((child) => !child.hasAttribute("slot"))]
  }

  public get slots(): HostSlots<T> {
    const [children, defaultSlot] = this.__defaultSlot

    return this.__slots.reduce(
      (slots: any, name) => {
        slots[name] = children.filter(
          (child) => child.getAttribute("slot") === name
        )
        return slots
      },
      { default: defaultSlot } as HostSlots<T>
    )
  }

  constructor(slots: string[]) {
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
}
