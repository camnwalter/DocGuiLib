import { CenterConstraint, UIRoundedRectangle, UIText } from "../../Elementa"
import ElementUtils from "../core/Element"
import BaseElement from "./Base"
import TextInputElement from "./TextInput"

export default class ColorPickerElement extends BaseElement {
    constructor(string = "Placeholder", x, y, width, height) {
        super(x, y, width, height)

        this.string = string
        this.currentRGB = null
        this.currentHex = null
    }

    /**
     * - Gets the current RGB value in text input and returns it
     * @returns {[Number, Number, Numer] | null}
     */
    getRGB() {
        return this.currentRGB
    }

    // This element will be taking the same approach as [https://github.com/Debuggingss/ClickGui/blob/master/src/main/kotlin/dev/debuggings/clickgui/elements/ColorPickerElement.kt]
    // since it's way easier than making a gradient and picking from there
    _create() {
        this.blockColor = new UIRoundedRectangle(4)

        this.textInput = new TextInputElement(this.string)
            ._setPosition(this.x, this.y)
            ._setSize(this.width, this.height)
            .addOnKeyTypeEvent((text) => {
                let colors = ElementUtils.hexToRgb(text)

                if (!text) colors = [ 255, 255, 255 ]

                if (!colors) return this.currentRGB = null
    
                this.currentHex = text
                this.currentRGB = colors

                const [ r, g, b ] = colors
    
                this.blockColor.setColor(
                    new ElementUtils.JavaColor(r / 255, g / 255, b / 255, 1)
                )
            })
            ._create()

        this.hashTagText = new UIText("#")
            .setX((this.x.value - 6.5).pixels())
            .setY(new CenterConstraint())
            .setChildOf(this.textInput)

        this.blockColor
            .setX((this.x.value + this.width.value - 8).percent())
            .setY(new CenterConstraint())
            .setWidth((12).pixels())
            .setHeight((12).pixels())
            .setChildOf(this.textInput)

        return this.textInput
    }
}