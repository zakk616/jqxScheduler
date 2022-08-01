/*
jQWidgets v14.0.0 (2022-May)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function (a) {
  a.jqx.jqxWidget("jqxNumberInput", "", {});
  a.extend(a.jqx._jqxNumberInput.prototype, {
    defineInstance: function () {
      var b = {
        value: 0,
        decimal: 0,
        min: -99999999,
        max: 99999999,
        width: 200,
        validationMessage: "Invalid value",
        height: 25,
        textAlign: "right",
        readOnly: false,
        promptChar: "_",
        decimalDigits: 2,
        decimalSeparator: ".",
        groupSeparator: ",",
        groupSize: 3,
        symbol: "",
        symbolPosition: "left",
        digits: 8,
        negative: false,
        negativeSymbol: "-",
        disabled: false,
        inputMode: "advanced",
        spinButtons: false,
        spinButtonsWidth: 18,
        spinButtonsStep: 1,
        autoValidate: true,
        spinMode: "advanced",
        enableMouseWheel: true,
        touchMode: "auto",
        allowNull: true,
        placeHolder: "",
        changeType: null,
        template: "",
        rtl: false,
        hint: true,
        events: [
          "valueChanged",
          "textchanged",
          "mousedown",
          "mouseup",
          "keydown",
          "keyup",
          "keypress",
          "change",
        ],
        aria: {
          "aria-valuenow": { name: "decimal", type: "number" },
          "aria-valuemin": { name: "min", type: "number" },
          "aria-valuemax": { name: "max", type: "number" },
          "aria-disabled": { name: "disabled", type: "boolean" },
        },
        invalidArgumentExceptions: ["invalid argument exception"],
      };
      if (this === a.jqx._jqxNumberInput.prototype) {
        return b;
      }
      a.extend(true, this, b);
      return b;
    },
    createInstance: function (b) {
      if (this.promptChar === "") {
        this.promptChar = " ";
      }
      var d = this.host.attr("value");
      if (d != undefined) {
        this.decimal = d;
      }
      if (this.decimal === 0) {
        if (this.value != null) {
          this.decimal = this.value;
        } else {
          if (this.value === null && this.decimal !== 0) {
            this.value = this.decimal;
          }
        }
      }
      var c = this;
      c._createFromInput("jqxNumberInput");
      this.render();
    },
    _updateHint: function () {
      var b = this;
      if (!b.hint) {
        return;
      }
      if (b.isMaterialized()) {
        setTimeout(function () {
          if (b.numberInput[0].value.length === 0) {
            b.element.removeAttribute("hint");
            if (b.label && b.label[0]) {
              b.label[0].innerHTML = b.placeHolder;
            }
          } else {
            b.element.setAttribute("hint", true);
          }
        });
      }
    },
    _createFromInput: function (c) {
      var h = this;
      if (h.element.nodeName.toLowerCase() == "input") {
        h.field = h.element;
        if (h.field.className) {
          h._className = h.field.className;
        }
        var i = { title: h.field.title };
        if (h.field.value) {
          h.decimal = parseFloat(h.field.value);
        }
        if (h.field.getAttribute("min")) {
          var f = h.field.getAttribute("min");
          h.min = parseFloat(f);
        }
        if (h.field.getAttribute("step")) {
          var e = h.field.getAttribute("step");
          h.spinButtonsStep = parseFloat(e);
        }
        if (h.field.getAttribute("max")) {
          var j = h.field.getAttribute("max");
          h.max = parseFloat(j);
        }
        if (h.field.id.length) {
          i.id = h.field.id.replace(/[^\w]/g, "_") + "_" + c;
        } else {
          i.id = a.jqx.utilities.createId() + "_" + c;
        }
        var b = a("<div></div>", i);
        b[0].style.cssText = h.field.style.cssText;
        if (!h.width) {
          h.width = a(h.field).width();
        }
        if (!h.height) {
          h.height = a(h.field).outerHeight();
        }
        a(h.field).hide().after(b);
        var g = h.host.data();
        h.host = b;
        h.host.data(g);
        h.element = b[0];
        h.element.id = h.field.id;
        h.field.id = i.id;
        if (h._className) {
          h.host.addClass(h._className);
          a(h.field).removeClass(h._className);
        }
        if (h.field.tabIndex) {
          var d = h.field.tabIndex;
          h.field.tabIndex = -1;
          h.element.tabIndex = d;
        }
      }
    },
    _doTouchHandling: function () {
      var e = this;
      var g = e.savedValue;
      if (!e.parsing) {
        e.parsing = true;
      }
      if (e.parsing) {
        if (e.numberInput.val() && e.numberInput.val().indexOf("-") == 0) {
          e.setvalue("negative", true);
        } else {
          e.setvalue("negative", false);
        }
        var f = e.numberInput.val();
        for (var c = 0; c < f.length - 1; c++) {
          var d = f.substring(c, c + 1);
          if (
            isNaN(parseFloat(d)) &&
            e.symbol.toString().indexOf(d) === -1 &&
            d != "%" &&
            d != "$" &&
            d != "." &&
            d != "," &&
            d != "-"
          ) {
            e.numberInput[0].value = g;
            e.parsing = false;
            return;
          }
        }
        e.ValueString = e.GetValueString(
          e.numberInput.val(),
          e.decimalSeparator,
          e.decimalSeparator != ""
        );
        e._parseDecimalInSimpleMode();
        e.decimal = e.ValueString;
        var b = e.getvalue("negative");
        if (b) {
          e.decimal = "-" + e.ValueString;
        }
        e.parsing = false;
      }
    },
    render: function () {
      this.host.attr({ role: "spinbutton" });
      this.host.attr("data-role", "input");
      a.jqx.aria(this);
      a.jqx.aria(this, "aria-multiline", false);
      var f = this;
      if (
        this.officeMode ||
        (this.theme && this.theme.indexOf("office") != -1)
      ) {
        if (this.spinButtonsWidth == 18) {
          this.spinButtonsWidth = 15;
        }
      }
      if (a.jqx.mobile.isTouchDevice() || this.touchMode === true) {
        this.inputMode = "textbox";
        this.spinMode = "simple";
      }
      if (this.decimalSeparator == "") {
        this.decimalSeparator = " ";
      }
      this.host.addClass(this.toThemeProperty("jqx-input"));
      this.host.addClass(this.toThemeProperty("jqx-rc-all"));
      this.host.addClass(this.toThemeProperty("jqx-widget"));
      this.host.addClass(this.toThemeProperty("jqx-widget-content"));
      this.host.addClass(this.toThemeProperty("jqx-numberinput"));
      if (this.spinButtons) {
        this._spinButtons();
      } else {
        this.numberInput = a(
          "<input style='border:none;' autocomplete='off' type='textarea'/>"
        ).appendTo(this.host);
        this.numberInput.addClass(this.toThemeProperty("jqx-input-content"));
        this.numberInput.addClass(this.toThemeProperty("jqx-widget-content"));
      }
      if (a.jqx.mobile.isTouchDevice() || this.touchMode === true) {
        this.numberInput.attr("inputmode", "numeric");
      }
      if (!this.isMaterialized()) {
        this.numberInput.attr("placeholder", this.placeHolder);
      }
      var d = this.host.attr("name");
      if (d) {
        this.numberInput.attr("name", d);
      }
      if (this.host.attr("tabindex")) {
        this.numberInput.attr("tabindex", this.host.attr("tabindex"));
        this.host.removeAttr("tabindex");
      }
      if (
        a.jqx.mobile.isTouchDevice() ||
        this.touchMode === true ||
        this.inputMode == "textbox"
      ) {
        var f = this;
        f.savedValue = "";
        this.addHandler(this.numberInput, "focus", function () {
          f.savedValue = f.numberInput[0].value;
        });
        this.addHandler(this.numberInput, "change", function () {
          f._doTouchHandling();
        });
      }
      var h = a.data(this.host[0], "jqxNumberInput");
      h.jqxNumberInput = this;
      var f = this;
      if (this.host.parents("form").length > 0) {
        this.addHandler(this.host.parents("form"), "reset", function () {
          setTimeout(function () {
            f.setDecimal(0);
          }, 10);
        });
      }
      this.propertyChangeMap.disabled = function (j, l, k, m) {
        if (m) {
          j.numberInput.addClass(c.toThemeProperty("jqx-input-disabled"));
          j.numberInput.attr("disabled", true);
        } else {
          j.host.removeClass(c.toThemeProperty("jqx-input-disabled"));
          j.numberInput.attr("disabled", false);
        }
        if (j.spinButtons && j.host.jqxRepeatButton) {
          j.upbutton.jqxRepeatButton({ disabled: m });
          j.downbutton.jqxRepeatButton({ disabled: m });
        }
      };
      if (this.disabled) {
        this.numberInput.addClass(this.toThemeProperty("jqx-input-disabled"));
        this.numberInput.attr("disabled", true);
        this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
      }
      this.selectedText = "";
      this.decimalSeparatorPosition = -1;
      var i = this.element.id;
      var e = this.element;
      var c = this;
      this.oldValue = this._value();
      this.items = new Array();
      var g = this.value;
      var b = this.decimal;
      this._initializeLiterals();
      this._render();
      this.setDecimal(g !== null ? b : null);
      var f = this;
      setTimeout(function () {}, 100);
      this._addHandlers();
      a.jqx.utilities.resize(this.host, function () {
        f._render();
      });
    },
    refresh: function (b) {
      if (!b) {
        this._render();
      }
    },
    wheel: function (d, c) {
      if (!c.enableMouseWheel) {
        return;
      }
      c.changeType = "mouse";
      var e = 0;
      if (!d) {
        d = window.event;
      }
      if (d.originalEvent && d.originalEvent.wheelDelta) {
        d.wheelDelta = d.originalEvent.wheelDelta;
      }
      if (d.wheelDelta) {
        e = d.wheelDelta / 120;
      } else {
        if (d.detail) {
          e = -d.detail / 3;
        }
      }
      if (e) {
        var b = c._handleDelta(e);
        if (d.preventDefault) {
          d.preventDefault();
        }
        if (d.originalEvent != null) {
          d.originalEvent.mouseHandled = true;
        }
        if (d.stopPropagation != undefined) {
          d.stopPropagation();
        }
        if (b) {
          b = false;
          d.returnValue = b;
          return b;
        } else {
          return false;
        }
      }
      if (d.preventDefault) {
        d.preventDefault();
      }
      d.returnValue = false;
    },
    _handleDelta: function (b) {
      if (b < 0) {
        this.spinDown();
      } else {
        this.spinUp();
      }
      return true;
    },
    _addHandlers: function () {
      var b = this;
      this.addHandler(this.numberInput, "paste", function (g) {
        var d = b._selection();
        g.preventDefault();
        if (g.originalEvent.clipboardData) {
          var f = (g.originalEvent || g).clipboardData.getData("text/plain");
        } else {
          if (window.clipboardData) {
            var f = window.clipboardData.getData("Text");
          }
        }
        this.selectedText = f;
        a.data(document.body, "jqxSelection", this.selectedText);
        if (b.inputMode != "simple") {
          b._pasteSelectedText();
        } else {
          b.val(f);
        }
        setTimeout(function () {
          b._setSelectionStart(d.start);
        });
      });
      this.addHandler(this.numberInput, "mousedown", function (d) {
        return b._raiseEvent(2, d);
      });
      this._mousewheelfunc =
        this._mousewheelfunc ||
        function (d) {
          if (!b.editcell) {
            b.wheel(d, b);
            return false;
          }
        };
      this.removeHandler(this.host, "mousewheel", this._mousewheelfunc);
      this.addHandler(this.host, "mousewheel", this._mousewheelfunc);
      var c = "";
      this.addHandler(this.numberInput, "focus", function (d) {
        a.data(b.numberInput, "selectionstart", b._selection().start);
        b.host.addClass(b.toThemeProperty("jqx-fill-state-focus"));
        if (b.spincontainer) {
          b.spincontainer.addClass(b.toThemeProperty("jqx-numberinput-focus"));
        }
        c = b.numberInput.val();
        b._savedValue = b.decimal;
      });
      this.addHandler(this.numberInput, "blur", function (e) {
        if (b.inputMode == "simple") {
          b._exitSimpleInputMode(e, b, false, c);
        }
        if (b.autoValidate) {
          var f = parseFloat(b.decimal);
          var d = b.getvalue("negative");
          if (d && b.decimal > 0) {
            f = -parseFloat(b.decimal);
          }
          if (f > b.max) {
            b._disableSetSelection = true;
            b.setDecimal(b.max);
            b._disableSetSelection = false;
          }
          if (f < b.min) {
            b._disableSetSelection = true;
            b.setDecimal(b.min);
            b._disableSetSelection = false;
          }
        }
        b.host.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
        if (b.spincontainer) {
          b.spincontainer.removeClass(
            b.toThemeProperty("jqx-numberinput-focus")
          );
        }
        if (b.numberInput.val() != c) {
          b._raiseEvent(7, e);
          a.jqx.aria(b, "aria-valuenow", b.decimal);
          b.element.value = b.decimal;
        }
        return true;
      });
      this.addHandler(this.numberInput, "mouseup", function (d) {
        return b._raiseEvent(3, d);
      });
      this.addHandler(this.numberInput, "keydown", function (d) {
        b.changeType = "keyboard";
        return b._raiseEvent(4, d);
      });
      this.addHandler(this.numberInput, "keyup", function (d) {
        return b._raiseEvent(5, d);
      });
      this.addHandler(this.numberInput, "keypress", function (d) {
        return b._raiseEvent(6, d);
      });
    },
    focus: function () {
      try {
        this.numberInput.focus();
      } catch (b) {}
    },
    _removeHandlers: function () {
      var b = this;
      this.removeHandler(this.numberInput, "mousedown");
      var c = a.jqx.mobile.isOperaMiniMobileBrowser();
      if (c) {
        this.removeHandler(
          a(document),
          "click." + this.element.id,
          b._exitSimpleInputMode,
          b
        );
      }
      this.removeHandler(this.numberInput, "paste");
      this.removeHandler(this.numberInput, "focus");
      this.removeHandler(this.numberInput, "blur");
      this.removeHandler(this.numberInput, "mouseup");
      this.removeHandler(this.numberInput, "keydown");
      this.removeHandler(this.numberInput, "keyup");
      this.removeHandler(this.numberInput, "keypress");
    },
    _spinButtons: function () {
      if (this.host.jqxRepeatButton) {
        if (!this.numberInput) {
          this.numberInput = a(
            "<input autocomplete='off' style='border: none; position: relative; float: left;' type='textarea'/>"
          );
          this.numberInput.appendTo(this.host);
          this.numberInput.addClass(this.toThemeProperty("jqx-input-content"));
          this.numberInput.addClass(this.toThemeProperty("jqx-widget-content"));
        } else {
          this.numberInput.css("float", "left");
        }
        if (this.spincontainer) {
          if (this.upbutton) {
            this.upbutton.jqxRepeatButton("destroy");
          }
          if (this.downbutton) {
            this.downbutton.jqxRepeatButton("destroy");
          }
          this.spincontainer.remove();
        }
        this.spincontainer = a(
          '<div style="float: right; height: 100%; overflow: hidden; position: relative;"></div>'
        );
        if (this.rtl) {
          this.spincontainer.css("float", "right");
          this.numberInput.css("float", "right");
          this.spincontainer.css("left", "-1px");
        }
        this.host.append(this.spincontainer);
        this.upbutton = a(
          '<div style="overflow: hidden; padding: 0px; margin-left: -1px; position: relative;"><div></div></div>'
        );
        this.spincontainer.append(this.upbutton);
        this.upbutton.jqxRepeatButton({
          overrideTheme: true,
          disabled: this.disabled,
          roundedCorners: "top-right",
        });
        this.downbutton = a(
          '<div style="overflow: hidden; padding: 0px; margin-left: -1px; position: relative;"><div></div></div>'
        );
        this.spincontainer.append(this.downbutton);
        this.downbutton.jqxRepeatButton({
          overrideTheme: true,
          disabled: this.disabled,
          roundedCorners: "bottom-right",
        });
        if (this.template) {
          this.upbutton.addClass(this.toThemeProperty("jqx-" + this.template));
          this.downbutton.addClass(
            this.toThemeProperty("jqx-" + this.template)
          );
        }
        var d = this;
        this.downbutton.addClass(
          this.toThemeProperty("jqx-fill-state-normal jqx-action-button")
        );
        this.upbutton.addClass(
          this.toThemeProperty("jqx-fill-state-normal jqx-action-button")
        );
        this.upbutton.addClass(this.toThemeProperty("jqx-rc-tr"));
        this.downbutton.addClass(this.toThemeProperty("jqx-rc-br"));
        this.addHandler(this.downbutton, "mouseup", function (e) {
          if (!d.disabled) {
            d.downbutton.removeClass(
              d.toThemeProperty("jqx-fill-state-pressed")
            );
            d._downArrow.removeClass(
              d.toThemeProperty("jqx-icon-arrow-down-selected")
            );
          }
        });
        this.addHandler(this.upbutton, "mouseup", function (e) {
          if (!d.disabled) {
            d.upbutton.removeClass(d.toThemeProperty("jqx-fill-state-pressed"));
            d._upArrow.removeClass(
              d.toThemeProperty("jqx-icon-arrow-up-selected")
            );
          }
        });
        this.removeHandler(a(document), "mouseup." + this.element.id);
        this.addHandler(
          a(document),
          "mouseup." + this.element.id,
          function (e) {
            d.upbutton.removeClass(d.toThemeProperty("jqx-fill-state-pressed"));
            d._upArrow.removeClass(
              d.toThemeProperty("jqx-icon-arrow-up-selected")
            );
            d.downbutton.removeClass(
              d.toThemeProperty("jqx-fill-state-pressed")
            );
            d._downArrow.removeClass(
              d.toThemeProperty("jqx-icon-arrow-down-selected")
            );
          }
        );
        this.addHandler(this.downbutton, "mousedown", function (e) {
          if (!d.disabled) {
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
              d._inputSelection = d._selection();
            }
            d.downbutton.addClass(d.toThemeProperty("jqx-fill-state-pressed"));
            d._downArrow.addClass(
              d.toThemeProperty("jqx-icon-arrow-down-selected")
            );
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
        this.addHandler(this.upbutton, "mousedown", function (e) {
          if (!d.disabled) {
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
              d._inputSelection = d._selection();
            }
            d.upbutton.addClass(d.toThemeProperty("jqx-fill-state-pressed"));
            d._upArrow.addClass(
              d.toThemeProperty("jqx-icon-arrow-up-selected")
            );
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        });
        this.addHandler(this.upbutton, "mouseenter", function (e) {
          d.upbutton.addClass(d.toThemeProperty("jqx-fill-state-hover"));
          d._upArrow.addClass(d.toThemeProperty("jqx-icon-arrow-up-hover"));
        });
        this.addHandler(this.upbutton, "mouseleave", function (e) {
          d.upbutton.removeClass(d.toThemeProperty("jqx-fill-state-hover"));
          d._upArrow.removeClass(d.toThemeProperty("jqx-icon-arrow-up-hover"));
        });
        this.addHandler(this.downbutton, "mouseenter", function (e) {
          d.downbutton.addClass(d.toThemeProperty("jqx-fill-state-hover"));
          d._downArrow.addClass(d.toThemeProperty("jqx-icon-arrow-down-hover"));
        });
        this.addHandler(this.downbutton, "mouseleave", function (e) {
          d.downbutton.removeClass(d.toThemeProperty("jqx-fill-state-hover"));
          d._downArrow.removeClass(
            d.toThemeProperty("jqx-icon-arrow-down-hover")
          );
        });
        this.upbutton.css("border-width", "0px");
        this.downbutton.css("border-width", "0px");
        if (this.disabled) {
          this.upbutton[0].disabled = true;
          this.downbutton[0].disabled = true;
        } else {
          this.upbutton[0].disabled = false;
          this.downbutton[0].disabled = false;
        }
        this.spincontainer.addClass(this.toThemeProperty("jqx-input"));
        this.spincontainer.addClass(this.toThemeProperty("jqx-rc-r"));
        this.spincontainer.css("border-width", "0px");
        if (!this.rtl) {
          this.spincontainer.css("border-left-width", "1px");
        } else {
          this.spincontainer.css("border-right-width", "1px");
        }
        this._upArrow = this.upbutton.find("div");
        this._downArrow = this.downbutton.find("div");
        this._upArrow.addClass(this.toThemeProperty("jqx-icon-arrow-up"));
        this._downArrow.addClass(this.toThemeProperty("jqx-icon-arrow-down"));
        this._upArrow.addClass(this.toThemeProperty("jqx-input-icon"));
        this._downArrow.addClass(this.toThemeProperty("jqx-input-icon"));
        var d = this;
        this._upArrow.hover(
          function () {
            if (!d.disabled) {
              d._upArrow.addClass(d.toThemeProperty("jqx-icon-arrow-up-hover"));
            }
          },
          function () {
            d._upArrow.removeClass(
              d.toThemeProperty("jqx-icon-arrow-up-hover")
            );
          }
        );
        this._downArrow.hover(
          function () {
            if (!d.disabled) {
              d._downArrow.addClass(
                d.toThemeProperty("jqx-icon-arrow-down-hover")
              );
            }
          },
          function () {
            d._downArrow.removeClass(
              d.toThemeProperty("jqx-icon-arrow-down-hover")
            );
          }
        );
        var b = a.jqx.mobile.isTouchDevice();
        var c = "click";
        if (b) {
          c = a.jqx.mobile.getTouchEventName("touchstart");
        }
        if (b) {
          this.addHandler(this.downbutton, "click", function (e) {
            d.spinDown();
          });
          this.addHandler(this.upbutton, "click", function (e) {
            d.spinUp();
          });
        }
        this.addHandler(this.downbutton, c, function (e) {
          if (!b) {
            if (d._selection().start == 0) {
              d._setSelectionStart(d.numberInput.val().length);
            }
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
              d._setSelectionStart(d._inputSelection.start);
            }
          } else {
            e.preventDefault();
            e.stopPropagation();
          }
          d.spinDown();
          return false;
        });
        this.addHandler(this.upbutton, c, function (e) {
          if (!b) {
            if (d._selection().start == 0) {
              d._setSelectionStart(d.numberInput.val().length);
            }
            if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
              d._setSelectionStart(d._inputSelection.start);
            }
          } else {
            e.preventDefault();
            e.stopPropagation();
          }
          d.spinUp();
          return false;
        });
      } else {
        throw new Error("jqxNumberInput: Missing reference to jqxbuttons.js.");
      }
    },
    spinDown: function () {
      var m = this;
      var l = this.decimal;
      if (m.spinMode == "none") {
        return;
      }
      if (this.decimal == null) {
        this.setDecimal(0);
        return;
      }
      var b = this.getvalue("negative");
      var q = b ? -1 : 0;
      if (a.jqx.mobile.isTouchDevice() || this.inputMode == "textbox") {
        m._doTouchHandling();
      }
      if (!m.disabled) {
        var o = this._selection();
        var n = this.decimal;
        var j = this.getDecimal();
        if (j < this.min) {
          j = this.min;
          this.setDecimal(this.min);
          this._setSelectionStart(o.start);
          this.spinDown();
          return;
        } else {
          if (j > this.max) {
            j = this.max;
            this.setDecimal(this.max);
            this._setSelectionStart(o.start);
            this.spinDown();
            return;
          }
        }
        if (m.spinButtonsStep < 0) {
          m.spinButtonsStep = 1;
        }
        var d = parseInt(m.decimal) - m.spinButtonsStep;
        d = d.toString().length;
        var f = q + d <= m.digits + m.decimalDigits;
        if (m.spinMode != "advanced") {
          if (j - m.spinButtonsStep >= m.min && f) {
            var s = 1;
            for (g = 0; g < m.decimalDigits; g++) {
              s = s * 10;
            }
            var e = s * j - s * m.spinButtonsStep;
            e = e / s;
            e = this._parseDecimalValueToEditorValue(e);
            m.setDecimal(e);
          }
        } else {
          var p = this._getspindecimal();
          var k = this._getSeparatorPosition();
          var j = parseFloat(p.decimal);
          if (m.spinButtonsStep < 0) {
            m.spinButtonsStep = 1;
          }
          var d = parseInt(j) - m.spinButtonsStep;
          d = d.toString().length;
          var f = q + d <= m.digits;
          var s = 1;
          var c = p.decimal.indexOf(".");
          if (c != -1) {
            var h = p.decimal.length - c - 1;
            var s = 1;
            for (var g = 0; g < h; g++) {
              s = s * 10;
            }
            j -= new Number(m.spinButtonsStep / s);
            j = j.toFixed(h);
            var c = j.toString().indexOf(".");
            if (c == -1) {
              j = j.toString() + ".";
            }
            var r = j.toString() + p.afterdecimal;
            r = new Number(r);
            r = r.toFixed(m.decimalDigits);
            if (r >= m.min) {
              r = this._parseDecimalValueToEditorValue(r);
              m.setDecimal(r);
            }
          } else {
            if (j - m.spinButtonsStep >= m.min && f) {
              var e = s * j - s * m.spinButtonsStep;
              e = e / s;
              var r = e.toString() + p.afterdecimal;
              if (r >= m.min) {
                r = this._parseDecimalValueToEditorValue(r);
                m.setDecimal(r);
              }
            }
          }
        }
        if (r == undefined || this.inputMode != "simple") {
          var b = this.getvalue("negative");
          if (q == 0 && b) {
            this._setSelectionStart(o.start + 1);
          } else {
            this._setSelectionStart(o.start);
          }
          m.savedValue = m.numberInput[0].value;
          if (l != this.decimal) {
            if (a.jqx.mobile.isTouchDevice()) {
              this._raiseEvent(0, {});
            }
            this._raiseEvent(7, {});
          }
          a.jqx.aria(this, "aria-valuenow", this.decimal);
          return;
        }
        r = this.decimal.toString();
        var b = this.getvalue("negative");
        if (q == 0 && b) {
          this._setSelectionStart(o.start + 1);
        } else {
          if (
            r != undefined &&
            (n == undefined || n.toString().length == r.length)
          ) {
            this._setSelectionStart(o.start);
          } else {
            if (b) {
              this._setSelectionStart(o.start + 1);
            } else {
              this._setSelectionStart(o.start - 1);
            }
          }
        }
        if (l != this.decimal) {
          if (a.jqx.mobile.isTouchDevice()) {
            this._raiseEvent(0, {});
          }
          this._raiseEvent(7, {});
        }
        a.jqx.aria(this, "aria-valuenow", this.decimal);
      }
    },
    _getspindecimal: function () {
      var n = this._selection();
      var o = "";
      var k = this._getSeparatorPosition();
      var q = this._getVisibleItems();
      var e = this._getHiddenPrefixCount();
      var p = this.numberInput.val();
      if (this.numberInput.val().length == n.start && n.length == 0) {
        this._setSelection(n.start, n.start + 1);
        n = this._selection();
      }
      var j = this.inputMode != "advanced";
      var m = n.start;
      if (m === 0) {
        m++;
      }
      if (m === 1 && this.symbolPosition === "left" && this.symbol !== "") {
        m += this.symbol.length;
      }
      for (var c = 0; c < m; c++) {
        if (j) {
          var l = p.substring(c, c + 1);
          var h = !isNaN(parseInt(l));
          if (h) {
            o += l;
          }
          if (l == this.decimalSeparator) {
            o += l;
          }
          continue;
        }
        if (q[c].canEdit && q[c].character != this.promptChar) {
          o += q[c].character;
        } else {
          if (
            !q[c].canEdit &&
            this.decimalSeparatorPosition != -1 &&
            q[c] == q[this.decimalSeparatorPosition - e]
          ) {
            if (o.length == 0) {
              o = "0";
            }
            o += q[c].character;
          }
        }
      }
      var g = "";
      for (var c = m; c < q.length; c++) {
        if (j) {
          var l = p.substring(c, c + 1);
          var h = !isNaN(parseInt(l));
          if (h) {
            g += l;
          }
          if (l == this.decimalSeparator) {
            g += l;
          }
          continue;
        }
        if (q[c].canEdit && q[c].character != this.promptChar) {
          g += q[c].character;
        } else {
          if (
            !q[c].canEdit &&
            this.decimalSeparatorPosition != -1 &&
            q[c] == q[this.decimalSeparatorPosition - e]
          ) {
            g += q[c].character;
          }
        }
      }
      var b = this.getvalue("negative");
      var f = b
        ? "-" + this._parseDecimalValue(o).toString()
        : this._parseDecimalValue(o).toString();
      return { decimal: f, afterdecimal: this._parseDecimalValue(g) };
    },
    _parseDecimalValue: function (c) {
      if (this.decimalSeparator != ".") {
        var d = c.toString().indexOf(this.decimalSeparator);
        if (d >= 0) {
          var b =
            c.toString().substring(0, d) + "." + c.toString().substring(d + 1);
          return b;
        }
      }
      return c;
    },
    _parseDecimalValueToEditorValue: function (c) {
      if (this.decimalSeparator != ".") {
        var d = c.toString().indexOf(".");
        if (d >= 0) {
          var b =
            c.toString().substring(0, d) +
            this.decimalSeparator +
            c.toString().substring(d + 1);
          return b;
        }
      }
      return c;
    },
    spinUp: function () {
      var r = this;
      var t = this.decimal;
      if (r.spinMode == "none") {
        return;
      }
      if (this.decimal == null) {
        this.setDecimal(0);
        return;
      }
      if (a.jqx.mobile.isTouchDevice() || this.inputMode == "textbox") {
        r._doTouchHandling();
      }
      var l = this.getvalue("negative");
      var e = l ? -1 : 0;
      if (!r.disabled) {
        var s = this._selection();
        var h = r.decimal;
        var d = r.getDecimal();
        if (d < this.min) {
          d = this.min;
          this.setDecimal(this.min);
          this._setSelectionStart(s.start);
          this.spinUp();
          return;
        } else {
          if (d > this.max) {
            d = this.max;
            this.setDecimal(this.max);
            this._setSelectionStart(s.start);
            this.spinUp();
            return;
          }
        }
        if (r.spinButtonsStep < 0) {
          r.spinButtonsStep = 1;
        }
        var n = parseInt(r.decimal) + r.spinButtonsStep;
        n = n.toString().length;
        var k = e + n <= r.digits + r.decimalDigits;
        if (r.spinMode != "advanced") {
          if (d + r.spinButtonsStep <= r.max && k) {
            var p = 1;
            for (var o = 0; o < r.decimalDigits; o++) {
              p = p * 10;
            }
            var g = p * d + p * r.spinButtonsStep;
            g = g / p;
            g = this._parseDecimalValueToEditorValue(g);
            r.setDecimal(g);
          }
        } else {
          var c = this._getspindecimal();
          var f = this._getSeparatorPosition();
          var d = parseFloat(c.decimal);
          if (r.spinButtonsStep < 0) {
            r.spinButtonsStep = 1;
          }
          var n = parseInt(d) + r.spinButtonsStep;
          n = n.toString().length;
          var k = e + n <= r.digits;
          var p = 1;
          var q = c.decimal.indexOf(".");
          if (q != -1) {
            var m = c.decimal.length - q - 1;
            var p = 1;
            for (var o = 0; o < m; o++) {
              p = p * 10;
            }
            d += new Number(r.spinButtonsStep / p);
            d = d.toFixed(m);
            var q = d.toString().indexOf(".");
            if (q == -1) {
              d = d.toString() + ".";
            }
            var j = d.toString() + c.afterdecimal;
            j = new Number(j);
            j = j.toFixed(r.decimalDigits);
            var b = new Number(j).toFixed(r.decimalDigits);
            if (b <= r.max) {
              j = this._parseDecimalValueToEditorValue(j);
              r.setDecimal(j);
            } else {
              j = undefined;
            }
          } else {
            if (d + r.spinButtonsStep <= r.max && k) {
              var g = p * d + p * r.spinButtonsStep;
              g = g / p;
              var j = g.toString() + c.afterdecimal;
              var b = new Number(j).toFixed(r.decimalDigits);
              if (b <= r.max) {
                j = this._parseDecimalValueToEditorValue(j);
                if (l && j.indexOf("-") == -1) {
                  if (c.decimal != "-0") {
                    j = "-" + j;
                  }
                }
                r.setDecimal(j);
              } else {
                j = undefined;
              }
            }
          }
        }
        if (j == undefined || this.inputMode != "simple") {
          this._setSelectionStart(s.start);
          r.savedValue = r.numberInput[0].value;
          if (t != this.decimal) {
            if (a.jqx.mobile.isTouchDevice()) {
              this._raiseEvent(0, {});
            }
            this._raiseEvent(7, {});
          }
          a.jqx.aria(this, "aria-valuenow", this.decimal);
          return;
        }
        j = this.decimal.toString();
        var l = this.getvalue("negative");
        if (e == -1 && !l) {
          this._setSelectionStart(-1 + s.start);
        } else {
          if (
            j != undefined &&
            (h == undefined || h.toString().length == j.length)
          ) {
            this._setSelectionStart(s.start);
          } else {
            if (l) {
              this._setSelectionStart(s.start);
            } else {
              this._setSelectionStart(1 + s.start);
            }
          }
        }
        if (t != this.decimal) {
          if (a.jqx.mobile.isTouchDevice()) {
            this._raiseEvent(0, {});
          }
          this._raiseEvent(7, {});
        }
        a.jqx.aria(this, "aria-valuenow", this.decimal);
      }
    },
    _exitSimpleInputMode: function (b, k, h, d) {
      if (k == undefined) {
        k = b.data;
      }
      if (k == null) {
        return;
      }
      if (h == undefined) {
        if (b.target != null && k.element != null) {
          if (
            (b.target.id != undefined &&
              b.target.id.toString().length > 0 &&
              k.host.find("#" + b.target.id).length > 0) ||
            b.target == k.element
          ) {
            return;
          }
        }
        var f = k.host.offset();
        var e = f.left;
        var g = f.top;
        var c = k.host.width();
        var j = k.host.height();
        var l = a(b.target).offset();
        if (l.left >= e && l.left <= e + c) {
          if (l.top >= g && l.top <= g + j) {
            return;
          }
        }
      }
      if (a.jqx.mobile.isOperaMiniBrowser()) {
        k.numberInput.attr("readonly", true);
      }
      if (k.disabled || k.readOnly) {
        return;
      }
      var i = a.data(k.numberInput, "simpleInputMode");
      if (i == null) {
        return;
      }
      a.data(k.numberInput, "simpleInputMode", null);
      this._parseDecimalInSimpleMode();
      return false;
    },
    _getDecimalInSimpleMode: function () {
      var d = this.decimal;
      if (this.decimalSeparator != ".") {
        var b = d.toString().indexOf(this.decimalSeparator);
        if (b > 0) {
          var c = d.toString().substring(0, b);
          var d = c + "." + d.toString().substring(b + 1);
        }
      }
      return d;
    },
    _parseDecimalInSimpleMode: function (d) {
      var k = this;
      var b = k.getvalue("negative");
      var e = this.ValueString;
      if (e == undefined) {
        e = this.GetValueString(
          this.numberInput.val(),
          this.decimalSeparator,
          this.decimalSeparator != ""
        );
      }
      if (this.decimalSeparator != ".") {
        var g = e.toString().indexOf(".");
        if (g > 0) {
          var f = e.toString().substring(0, g);
          var c = f + this.decimalSeparator + e.toString().substring(g + 1);
          e = c;
        }
      }
      var h = b ? "-" : "";
      if (this.symbolPosition == "left") {
        h += this.symbol;
      }
      var i = this.digits % this.groupSize;
      if (i == 0) {
        i = this.groupSize;
      }
      var j = e.toString();
      if (j.indexOf("-") >= 0) {
        j = j.substring(j.indexOf("-") + 1);
      }
      h += j;
      if (this.symbolPosition == "right") {
        h += this.symbol;
      }
      if (d != false) {
        k.numberInput.val(h);
      }
    },
    _enterSimpleInputMode: function (f, d) {
      if (d == undefined) {
        d = f.data;
      }
      var e = this._selection();
      if (d == null) {
        return;
      }
      var c = d.getvalue("negative");
      var b = d.decimal;
      if (c) {
        if (b > 0) {
          b = -b;
        }
      }
      d.numberInput.val(b);
      a.data(d.numberInput, "simpleInputMode", true);
      if (a.jqx.mobile.isOperaMiniBrowser()) {
        d.numberInput.attr("readonly", false);
      }
      this._parseDecimalInSimpleMode();
      this._setSelectionStart(e.start);
    },
    setvalue: function (b, c) {
      if (this[b] !== undefined) {
        if (b == "decimal") {
          this._setDecimal(c);
        } else {
          this[b] = c;
          this.propertyChangedHandler(this, b, c, c);
        }
      }
    },
    getvalue: function (b) {
      if (b == "decimal") {
        if (this.negative != undefined && this.negative == true) {
          if (this.decimal.toString().indexOf(",")) {
            return -Math.abs(this.decimal.toString().replace(/,/, "."));
          }
          return -Math.abs(this[b]);
        }
      }
      if (b in this) {
        return this[b];
      }
      return null;
    },
    _getString: function () {
      var c = "";
      for (var b = 0; b < this.items.length; b++) {
        var d = this.items[b].character;
        c += d;
      }
      return c;
    },
    _literal: function (d, b, c, e) {
      return { character: d, regex: b, canEdit: c, isSeparator: e };
    },
    _initializeLiterals: function () {
      if (this.inputMode == "textbox") {
        return;
      }
      var h = 0;
      var e = this.negativeSymbol.length;
      for (var d = 0; d < e; d++) {
        var g = this.negativeSymbol.substring(d, d + 1);
        var k = "";
        var b = false;
        var l = null;
        if (this.negative) {
          l = this._literal(g, k, b, false);
        } else {
          l = this._literal("", k, b, false);
        }
        this.items[h] = l;
        h++;
      }
      var c = this.symbol.length;
      if (this.symbolPosition == "left") {
        for (d = 0; d < c; d++) {
          var g = this.symbol.substring(d, d + 1);
          var k = "";
          var b = false;
          var l = this._literal(g, k, b, false);
          this.items[h] = l;
          h++;
        }
      }
      var f = this.digits % this.groupSize;
      if (f == 0) {
        f = this.groupSize;
      }
      for (var d = 0; d < this.digits; d++) {
        var g = this.promptChar;
        var k = "\\d";
        var b = true;
        var l = this._literal(g, k, b, false);
        this.items[h] = l;
        h++;
        if (
          d < this.digits - 1 &&
          this.groupSeparator != undefined &&
          this.groupSeparator.length > 0
        ) {
          f--;
          if (f == 0) {
            f = this.groupSize;
            var j = this._literal(this.groupSeparator, "", false, false);
            this.items[h] = j;
            h++;
          }
        } else {
          if (d == this.digits - 1) {
            l.character = 0;
          }
        }
      }
      this.decimalSeparatorPosition = -1;
      if (this.decimalDigits != undefined && this.decimalDigits > 0) {
        var g = this.decimalSeparator;
        if (g.length == 0) {
          g = ".";
        }
        var l = this._literal(g, "", false, true);
        this.items[h] = l;
        this.decimalSeparatorPosition = h;
        h++;
        for (var d = 0; d < this.decimalDigits; d++) {
          var n = 0;
          var k = "\\d";
          var m = this._literal(n, k, true, false);
          this.items[h] = m;
          h++;
        }
      }
      if (this.symbolPosition == "right") {
        for (var d = 0; d < c; d++) {
          var g = this.symbol.substring(d, d + 1);
          var k = "";
          var b = false;
          var l = this._literal(g, k, b);
          this.items[h] = l;
          h++;
        }
      }
    },
    _match: function (c, b) {
      var d = new RegExp(b, "i");
      return d.test(c);
    },
    _raiseEvent: function (m, d) {
      var k = this.events[m];
      var c = {};
      c.owner = this;
      if (this.host.css("display") == "none") {
        return true;
      }
      var s = d.charCode ? d.charCode : d.keyCode ? d.keyCode : 0;
      var f = true;
      var h = this.readOnly;
      var q = this;
      if (m == 3 || m == 2) {
        if (!this.disabled) {
          if (this.inputMode != "simple" && this.inputMode != "textbox") {
            this._handleMouse(d);
          } else {
            return true;
          }
        }
      }
      if (m == 0) {
        var g = this.getvalue("decimal");
        if (this.max < g || this.min > g) {
          this.host.addClass(this.toThemeProperty("jqx-input-invalid"));
        } else {
          this.host.removeClass(this.toThemeProperty("jqx-input-invalid"));
          this.host.addClass(this.toThemeProperty("jqx-input"));
          this.host.addClass(this.toThemeProperty("jqx-rc-all"));
        }
      }
      var n = new a.Event(k);
      n.owner = this;
      c.value = this.getvalue("decimal");
      c.text = this.numberInput.val();
      n.args = c;
      if (m == 7) {
        c.type = this.changeType;
        this.changeType = null;
      }
      if (k != undefined) {
        if (m != 4 && m != 5 && m != 6) {
          f = this.host.trigger(n);
        }
      }
      var q = this;
      if (this.inputMode == "textbox") {
        return f;
      }
      if (this.inputMode != "simple") {
        if (m == 4) {
          if (h || this.disabled) {
            return false;
          }
          f = q._handleKeyDown(d, s);
        } else {
          if (m == 5) {
            if (h || this.disabled) {
              f = false;
            }
          } else {
            if (m == 6) {
              if (h || this.disabled) {
                return false;
              }
              f = q._handleKeyPress(d, s);
            }
          }
        }
      } else {
        if (m == 4 || m == 5 || m == 6) {
          if (a.jqx.mobile.isTouchDevice() || this.touchMode === true) {
            return true;
          }
          if (h || this.disabled) {
            return false;
          }
          var r = String.fromCharCode(s);
          var l = parseInt(r);
          var o = true;
          if (!d.ctrlKey && !d.shiftKey && !d.metaKey) {
            if (s >= 65 && s <= 90) {
              o = false;
            }
          }
          if (m == 6 && a.jqx.browser.opera != undefined) {
            if (s == 8) {
              return false;
            }
          }
          if (o) {
            if (m == 4) {
              o = q._handleSimpleKeyDown(d, s);
            }
            if (s == 107) {
              var i = q.getvalue("negative");
              if (i) {
                q.setvalue("negative", false);
                q.decimal = q.ValueString;
                q._parseDecimalInSimpleMode();
                q._setSelectionStart(t.start + 1);
                q._raiseEvent(0, q.value);
                q._raiseEvent(1, q.numberInput.val());
              }
            }
            if (s == 189 || s == 45 || s == 109 || s == 173) {
              var t = q._selection();
              if (m == 4) {
                var i = q.getvalue("negative");
                if (i == false) {
                  q.setvalue("negative", true);
                } else {
                  q.setvalue("negative", false);
                }
                q.decimal = q.ValueString;
                q._parseDecimalInSimpleMode();
                if (!i) {
                  q._setSelectionStart(t.start + 1);
                } else {
                  q._setSelectionStart(t.start - 1);
                }
                o = false;
                q._raiseEvent(0, q.value);
                q._raiseEvent(1, q.numberInput.val());
              }
            }
            var b = c.ctrlKey || c.metaKey;
            if (!a.jqx.browser.msie) {
              var p = d;
              if (
                (b && s == 99) ||
                (b && s == 67) ||
                (b && s == 122) ||
                (b && s == 90) ||
                (b && s == 118) ||
                (b && s == 86) ||
                (p.shiftKey && s == 45)
              ) {
                if (a.jqx.browser.webkit || a.jqx.browser.chrome) {
                  q._handleSimpleKeyDown(d, s);
                }
                if (s == 67) {
                  return true;
                }
                return false;
              }
            }
            if ((b && s == 97) || (b && s == 65)) {
              return true;
            }
            if (m == 6 && o) {
              var j = this._isSpecialKey(s);
              return j;
            }
          }
          return o;
        }
      }
      return f;
    },
    GetSelectionInValue: function (j, h, g, f) {
      var c = 0;
      for (var d = 0; d < h.length; d++) {
        if (d >= j) {
          break;
        }
        var e = h.substring(d, d + 1);
        var b = !isNaN(parseInt(e));
        if (b || (f && h.substring(d, d + 1) == g)) {
          c++;
        }
      }
      return c;
    },
    GetSelectionLengthInValue: function (h, j, g, f) {
      var c = 0;
      for (var d = 0; d < g.length; d++) {
        if (d >= h + j) {
          break;
        }
        var e = g.substring(d, d + 1);
        var b = !isNaN(parseInt(e));
        if ((j > 0 && d >= h && b) || (d >= h && g[d].toString() == f)) {
          c++;
        }
      }
      return c;
    },
    GetInsertTypeByPositionInValue: function (e, g, h, f) {
      var c = "before";
      var b = this.GetValueString(h, g, f);
      var d = this.GetDigitsToSeparator(0, b, g);
      if (e > d) {
        c = "after";
      }
      return c;
    },
    RemoveRange: function (f, e, m, g, s, b) {
      var h = this.digits;
      var n = f;
      var t = e;
      var c = 0;
      var o = this.decimal;
      var x = this._selection();
      var g = this.decimalSeparator;
      var j = g != "";
      if (t == 0 && this.ValueString.length < this.decimalPossibleChars - 1) {
        return c;
      }
      var u = this.GetSeparatorPositionInText(g, m);
      if (!s) {
        u = this.GetSeparatorPositionInText(g, m);
      }
      if (u < 0 && !j && m.length > 1) {
        u = m.length;
      }
      if (u == -1) {
        u = m.length;
      }
      var d = j ? 1 : 0;
      if (e < 2 && b == true) {
        var w = this.ValueString.length - this.decimalDigits - d;
        if (w == h && f + e < u) {
          t++;
        }
      }
      var k = "";
      for (var r = 0; r < m.length; r++) {
        if (r < n || r >= n + t) {
          k += m.substring(r, r + 1);
          continue;
        } else {
          var q = m.substring(r, r + 1);
          if (q == g) {
            k += g;
            continue;
          } else {
            var q = m.substring(r, r + 1);
            if (
              this.symbol &&
              this.symbol != "" &&
              this.symbol.indexOf(q) >= 0
            ) {
              continue;
            }
            if (r > u) {
              k += "0";
              continue;
            }
          }
        }
        var q = m.substring(r, r + 1);
        var p = !isNaN(parseInt(q));
        if (p) {
          c++;
        }
      }
      if (k.length == 0) {
        k = "0";
      }
      if (s) {
        this.numberInput.val(k);
      } else {
        this.ValueString = k;
      }
      var l = k.substring(0, 1);
      if (l == g && isNaN(parseInt(l))) {
        var v = "0" + k;
        k = v;
      }
      this.ValueString = this.GetValueString(k, g, j);
      this.decimal = this.ValueString;
      this._parseDecimalInSimpleMode();
      this._setSelectionStart(n);
      return c;
    },
    InsertDigit: function (q, w) {
      if (typeof this.digits != "number") {
        this.digits = parseInt(this.digits);
      }
      if (typeof this.decimalDigits != "number") {
        this.decimalDigits = parseInt(this.decimalDigits);
      }
      var i = 1 + this.digits;
      var x = this._selection();
      var l = this.getvalue("negative");
      var d = false;
      if (x.start == 0 && this.symbol != "" && this.symbolPosition == "left") {
        this._setSelectionStart(x.start + 1);
        x = this._selection();
        d = true;
      }
      if ((l && d) || (l && !d && x.start == 0)) {
        this._setSelectionStart(x.start + 1);
        x = this._selection();
      }
      var u = this.numberInput.val().substring(x.start, x.start + 1);
      var n = this.numberInput.val();
      var g = this.decimalSeparator;
      var j = g != "" && this.decimalDigits > 0;
      if (u == this.symbol && this.symbolPosition == "right") {
        if (this.decimalDigits == 0) {
          this.ValueString = this.GetValueString(n, g, j);
          if (this.ValueString.length >= i) {
            return;
          }
        } else {
          return;
        }
      }
      this.ValueString = this.GetValueString(n, g, j);
      if (this.ValueString == "") {
        this.ValueString = new Number(0).toFixed(this.decimalDigits);
      }
      var t = this.ValueString;
      if (this.decimalDigits > 0 && w >= t.length) {
        w = t.length - 1;
      }
      var o = "";
      if (w < t.length) {
        o = t.substring(w, w + 1);
      }
      var h = false;
      var v = false;
      var e = this.GetInsertTypeByPositionInValue(w, g, n, j);
      if (e == "after") {
        h = true;
      }
      var b = j ? 1 : 0;
      if (o != g && this.ValueString.length - this.decimalDigits - b >= i - 1) {
        h = true;
      }
      if (
        o === "0" &&
        this.ValueString.length === 1 &&
        this.decimalDigits === 0
      ) {
        h = true;
      }
      var p = false;
      var r = j ? 1 : 0;
      if (
        !h &&
        this.ValueString &&
        this.ValueString.length >= this.digits + this.decimalDigits + r
      ) {
        return;
      }
      if (h && o != g) {
        if (p) {
          w++;
        }
        var m = t.substring(0, w);
        if (m.length == t.length) {
          if (this.ValueString.length >= this.digits + this.decimalDigits + r) {
            return;
          }
        }
        var s = q;
        var c = "";
        if (w + 1 < t.length) {
          c = t.substring(w + 1);
        }
        var k = m + s + c;
        this.ValueString = k;
      } else {
        var m = t.substring(0, w);
        var s = q;
        var c = t.substring(w);
        var k = m + s + c;
        if (t.substring(0, 1) == "0" && t.substring(1, 2) == g) {
          k = s + t.substring(1);
          if (o == g) {
            this._setSelectionStart(x.start - 1);
            x = this._selection();
          }
        }
        this.ValueString = k;
      }
      if (l) {
        this.decimal = "-" + this.ValueString;
      } else {
        this.decimal = this.ValueString;
      }
      this._parseDecimalInSimpleMode();
      var f = x.start;
      f += 1;
      this._setSelectionStart(f);
      this.value = this.decimal;
      this._raiseEvent(0, this.value);
      this._raiseEvent(1, this.numberInput.val());
    },
    GetStringToSeparator: function (h, f, e) {
      var d = "";
      var b = f;
      var g = this.GetSeparatorPositionInText(f, h);
      var c = h.subString(0, g);
      d = this.GetValueString(c, f, e);
      return d;
    },
    GetSeparatorPositionInText: function (d, e) {
      var c = -1;
      for (var b = 0; b < e.length; b++) {
        if (e.substring(b, b + 1) == d) {
          c = b;
          break;
        }
      }
      return c;
    },
    GetValueString: function (h, g, f) {
      var d = "";
      for (var c = 0; c < h.length; c++) {
        var e = h.substring(c, c + 1);
        var b = !isNaN(parseInt(e));
        if (b) {
          d += e;
        }
        if (e == g) {
          d += g;
        }
      }
      return d;
    },
    Backspace: function () {
      var d = this._selection();
      var e = this._selection();
      var f = this.numberInput.val();
      if (d.start == 0 && d.length == 0) {
        return;
      }
      this.isBackSpace = true;
      var c = f.substring[(d.start, d.start + 1)];
      var b = !isNaN(parseInt(c));
      if (d.start > 0 && d.length == 0) {
        this._setSelectionStart(d.start - 1);
        var d = this._selection();
      }
      this.Delete();
      this._setSelectionStart(e.start - 1);
      this.isBackSpace = false;
    },
    Delete: function (c) {
      var e = this._selection();
      var h = this.numberInput.val();
      if (e.start === 0 && h.substring(0, 1) == "-") {
        this.setvalue("negative", false);
        var e = this._selection();
        var h = this.numberInput.val();
      }
      var f = e.start;
      if (e.start > 0 && h.substring(0, 1) == "-") {
        f--;
        e.start = f;
      }
      var i = e.length;
      i = Math.max(i, 1);
      this.ValueString = this.GetValueString(
        h,
        this.decimalSeparator,
        this.decimalSeparator != ""
      );
      if (
        f > this.ValueString.indexOf(this.decimalSeparator) &&
        this.decimalDigits > 0
      ) {
        f++;
      }
      var g = 0;
      if (this.symbol) {
        if (this.symbolPosition == "left") {
          g--;
        }
        if (this.negative) {
          g--;
        }
      }
      this.RemoveRange(e.start + g, i, this.ValueString, ".", false);
      var d = this.ValueString.substring(0, 1);
      var b = !isNaN(parseInt(d));
      if (!b) {
        this.ValueString = "0" + this.ValueString;
      }
      this.decimal = this.ValueString;
      this._parseDecimalInSimpleMode();
      this._setSelectionStart(f);
      this.value = this.decimal;
      this._raiseEvent(0, this.value);
      this._raiseEvent(1, this.numberInput.val());
    },
    insertsimple: function (d) {
      var i = this._selection();
      var j = this.numberInput.val();
      if (
        i.start == j.length &&
        this.decimal != null &&
        this.decimalDigits > 0
      ) {
        return;
      }
      var b = this.decimal;
      var g = this.decimalSeparator;
      this.ValueString = this.GetValueString(j, g, g != "");
      var h = this.GetSelectionInValue(i.start, j, g, g != "");
      var e = this.GetSelectionLengthInValue(i.start, i.length, j, g);
      var f = this.GetDigitsToSeparator(0, this.ValueString, g);
      var c = false;
      if (this.decimalDigits > 0 && h >= this.ValueString.length) {
        h--;
      }
      if (this.ValueString == "") {
        this.ValueString = new Number(0).toFixed(this.decimalDigits);
        this.ValueString = this.ValueString.replace(".", g);
        this.RemoveRange(i.start, e, this.ValueString, g, false, true);
        this.InsertDigit(d, 0, i);
        return;
      }
      this.RemoveRange(i.start, e, this.ValueString, g, false, true);
      this.InsertDigit(d, h, i);
    },
    GetDigitsToSeparator: function (d, b, e) {
      if (e == undefined) {
        e = ".";
      }
      if (b.indexOf(e) < 0) {
        return b.length;
      }
      for (var c = 0; c < b.length; c++) {
        if (b.substring(c, c + 1) == e) {
          d = c;
          break;
        }
      }
      return d;
    },
    _handleSimpleKeyDown: function (k, r) {
      var q = this._selection();
      var b = k.ctrlKey || k.metaKey;
      if ((r == 8 || r == 46) && b) {
        this.setDecimal(null);
        return false;
      }
      if (q.start >= 0 && q.start < this.items.length) {
        var d = String.fromCharCode(r);
      }
      if (r === 27) {
        this.setDecimal(this._savedValue);
        var j = this.GetSeparatorPositionInText(
          this.decimalSeparator,
          this.numberInput.val()
        );
        if (j != -1) {
          this._setSelectionStart(j);
        }
        k.preventDefault();
      }
      if (this.rtl && r == 37) {
        var c = k.shiftKey;
        var g = c ? 1 : 0;
        if (c) {
          this._setSelection(q.start + 1 - g, q.start + q.length + 1);
        } else {
          this._setSelection(q.start + 1 - g, q.start + 1);
        }
        return false;
      } else {
        if (this.rtl && r == 39) {
          var c = k.shiftKey;
          var g = c ? 1 : 0;
          if (c) {
            this._setSelection(q.start - 1, q.length + g + q.start - 1);
          } else {
            this._setSelection(q.start - 1, q.start - 1);
          }
          return false;
        }
      }
      if (r == 8) {
        this.Backspace();
        return false;
      }
      if (r == 190 || r == 110) {
        var j = this.GetSeparatorPositionInText(
          this.decimalSeparator,
          this.numberInput.val()
        );
        if (j != -1) {
          this._setSelectionStart(j + 1);
        }
        return false;
      }
      if (r == 188 && this.groupSeparator === ",") {
        var p = this.numberInput.val();
        for (h = q.start; h < p.length; h++) {
          if (p[h] == this.groupSeparator) {
            this._setSelectionStart(1 + h);
            break;
          }
        }
        return false;
      }
      var b = k.ctrlKey || k.metaKey;
      if ((b && r == 99) || (b && r == 67)) {
        var q = this._selection();
        var s = "";
        var o = this.numberInput.val();
        if (q.start > 0 || q.length > 0) {
          for (var h = q.start; h < q.end; h++) {
            s += o.substring(h, h + 1);
          }
        }
        a.data(document.body, "jqxSelection", s);
        if (a.jqx.browser.msie) {
          window.clipboardData.setData("Text", s);
        } else {
          var l = this;
          var f = a(
            '<textarea style="position: absolute; left: -1000px; top: -1000px;"/>'
          );
          f.val(s);
          a("body").append(f);
          f.select();
          setTimeout(function () {
            document.designMode = "off";
            f.select();
            f.remove();
            l.focus();
          }, 100);
        }
        this.savedText = s;
        return true;
      }
      if ((b && r == 122) || (b && r == 90)) {
        return false;
      }
      if ((b && r == 118) || (b && r == 86) || (k.shiftKey && r == 45)) {
        if (a.jqx.browser.msie && !this.savedText) {
          this.savedText = window.clipboardData.getData("Text");
        }
        if (this.savedText != null && this.savedText.length > 0) {
          this.val(this.savedText);
        } else {
          this.val(a.data(document.body, "jqxSelection"));
        }
        return false;
      }
      var d = String.fromCharCode(r);
      var m = parseInt(d);
      if (r >= 96 && r <= 105) {
        m = r - 96;
        r = r - 48;
      }
      if (!isNaN(m)) {
        var l = this;
        this.insertsimple(m);
        return false;
      }
      if (r == 46) {
        this.Delete();
        return false;
      }
      if (r == 38) {
        this.spinUp();
        return false;
      } else {
        if (r == 40) {
          this.spinDown();
          return false;
        }
      }
      var n = this._isSpecialKey(r);
      if (!a.jqx.browser.mozilla) {
        return true;
      }
      return n;
    },
    _getEditRange: function () {
      var d = 0;
      var b = 0;
      for (var c = 0; c < this.items.length; c++) {
        if (this.items[c].canEdit) {
          d = c;
          break;
        }
      }
      for (c = this.items.length - 1; c >= 0; c--) {
        if (this.items[c].canEdit) {
          b = c;
          break;
        }
      }
      return { start: d, end: b };
    },
    _getVisibleItems: function () {
      var b = new Array();
      var c = 0;
      for (var d = 0; d < this.items.length; d++) {
        if (this.items[d].character.toString().length > 0) {
          b[c] = this.items[d];
          c++;
        }
      }
      return b;
    },
    _hasEmptyVisibleItems: function () {
      var b = this._getVisibleItems();
      for (var c = 0; c < b.length; c++) {
        if (b[c].canEdit && b[c].character == this.promptChar) {
          return true;
        }
      }
      return false;
    },
    _getFirstVisibleNonEmptyIndex: function () {
      var b = this._getVisibleItems();
      for (var c = 0; c < b.length; c++) {
        if (b[c].canEdit && b[c].character != this.promptChar) {
          return c;
        }
      }
    },
    _handleMouse: function (f, b) {
      var d = this._selection();
      if (d.length <= 1) {
        var c = this._getFirstVisibleNonEmptyIndex();
        if (d.start < c) {
          this._setSelectionStart(c);
        }
      }
    },
    _insertKey: function (k) {
      this.numberInput[0].focus();
      var d = String.fromCharCode(k);
      var e = parseInt(d);
      if (isNaN(e)) {
        return;
      }
      var n = 0;
      for (var f = 0; f < this.items.length; f++) {
        if (this.items[f].character.length == 0) {
          n++;
        }
      }
      var j = this._selection();
      var b = this;
      if (j.start >= 0 && j.start <= this.items.length) {
        var g = false;
        var h = this._getFirstVisibleNonEmptyIndex();
        if (j.start < h && j.length == 0) {
          if (!isNaN(d) || d == " ") {
            this._setSelectionStart(h);
            j = this._selection();
          }
        }
        var c = this._getFirstEditableItemIndex();
        var m = this._getLastEditableItemIndex();
        if (this.value === null) {
          c = m = 0;
        }
        var l = this._getVisibleItems();
        a.each(l, function (x, B) {
          if (j.start > x && x != l.length - 1) {
            return;
          }
          var E = l[x];
          if (x > m) {
            E = l[m];
          }
          if (isNaN(d) || d == " " || d == "" || !E) {
            return;
          }
          if (!E.canEdit) {
            return;
          }
          var A = b._getSeparatorPosition();
          if (b._match(d, E.regex)) {
            if (!g && j.length > 0) {
              for (var w = j.start + n; w < j.end + n; w++) {
                if (b.items[w].canEdit) {
                  if (w > A) {
                    b.items[w].character = "0";
                  } else {
                    b.items[w].character = b.promptChar;
                  }
                }
              }
              var D = b._getString();
              g = true;
            }
            var A = b._getSeparatorPosition();
            var y = b._hasEmptyVisibleItems();
            if (b.decimal == null) {
              j.start = A - 1;
              if (j.start < 0) {
                j.start = 0;
              }
              j.end = j.start;
            }
            if (j.start <= A && y) {
              var u = x;
              if (b.decimalSeparatorPosition == -1 && j.start == A) {
                u = x + 1;
              }
              if (b.decimal == null) {
                u = j.start;
              }
              var t = "";
              for (var r = 0; r < u; r++) {
                if (l[r].canEdit && l[r].character != b.promptChar) {
                  t += l[r].character;
                }
              }
              t += d;
              var v = b.decimal < 1 ? 1 : 0;
              if (j.start == A && b.decimalSeparatorPosition != -1) {
                t += b.decimalSeparator;
                v = 0;
              }
              for (var r = u + v; r < l.length; r++) {
                if (l[r].character == b.decimalSeparator && l[r].isSeparator) {
                  t += l[r].character;
                } else {
                  if (l[r].canEdit && l[r].character != b.promptChar) {
                    t += l[r].character;
                  }
                }
              }
              if (b.decimalSeparator != ".") {
                t = b._parseDecimalValue(t);
              }
              t = parseFloat(t).toString();
              t = new Number(t);
              t = t.toFixed(b.decimalDigits);
              if (b.decimalSeparator != ".") {
                t = b._parseDecimalValueToEditorValue(t);
              }
              b.setvalue("decimal", t);
              var D = b._getString();
              if (j.end < A) {
                b._setSelectionStart(j.end + v);
              } else {
                b._setSelectionStart(j.end);
              }
              if (j.length >= 1) {
                b._setSelectionStart(j.end);
              }
              if (j.length == b.numberInput.val().length) {
                var o = b._moveCaretToDecimalSeparator();
                var C = b.decimalSeparatorPosition >= 0 ? 1 : 0;
                b._setSelectionStart(o - C);
              }
            } else {
              if (j.start < A || j.start > A) {
                if (
                  b.numberInput.val().length == j.start &&
                  b.decimalSeparatorPosition != -1
                ) {
                  return false;
                } else {
                  if (
                    b.numberInput.val().length == j.start &&
                    b.decimalSeparatorPosition == -1 &&
                    !y
                  ) {
                    return false;
                  }
                }
                var t = "";
                var q = false;
                for (var r = 0; r < x; r++) {
                  if (l[r].canEdit && l[r].character != b.promptChar) {
                    t += l[r].character;
                  }
                  if (
                    l[r].character == b.decimalSeparator &&
                    l[r].isSeparator
                  ) {
                    t += l[r].character;
                    q = true;
                  }
                }
                t += d;
                var v = b.decimal < 1 ? 1 : 0;
                if (!q && j.start == A - 1) {
                  t += b.decimalSeparator;
                  q = true;
                }
                for (var r = x + 1; r < l.length; r++) {
                  if (
                    !q &&
                    l[r].character == b.decimalSeparator &&
                    l[r].isSeparator
                  ) {
                    t += l[r].character;
                  } else {
                    if (l[r].canEdit && l[r].character != b.promptChar) {
                      t += l[r].character;
                    }
                  }
                }
                b.setvalue("decimal", t);
                var D = b._getString();
                if (b.decimalSeparatorPosition < 0 && E == l[m]) {
                  b._setSelectionStart(x);
                  return false;
                }
                var z = D.indexOf(b.symbol);
                var s = !b.getvalue("negative") ? 0 : 1;
                if (z <= s) {
                  z = D.length;
                }
                if (j.start < z) {
                  b._setSelectionStart(x + 1);
                } else {
                  b._setSelectionStart(x);
                }
                if (j.length >= 1) {
                }
                if (j.length == b.numberInput.val().length) {
                  var o = b._moveCaretToDecimalSeparator();
                  b._setSelectionStart(o - 1);
                }
              }
            }
            return false;
          }
        });
      }
    },
    _handleKeyPress: function (h, d) {
      var f = this._selection();
      var b = this;
      var i = h.ctrlKey || h.metaKey;
      if ((i && d == 97) || (i && d == 65)) {
        return true;
      }
      if (d == 8) {
        if (f.start > 0) {
          b._setSelectionStart(f.start);
        }
        return false;
      }
      if (d == 46) {
        if (f.start < this.items.length) {
          b._setSelectionStart(f.start);
        }
        return false;
      }
      if (!a.jqx.browser.mozilla) {
        if (d == 45 || d == 173 || d == 109 || d == 189) {
          var c = this.getvalue("negative");
          if (c == false) {
            this.setvalue("negative", true);
          } else {
            this.setvalue("negative", false);
          }
        }
      }
      if (a.jqx.browser.msie) {
        this._insertKey(d);
      }
      var g = this._isSpecialKey(d);
      return g;
    },
    _deleteSelectedText: function () {
      var e = this._selection();
      var d = "";
      var g = this._getSeparatorPosition();
      var b = this._getVisibleItems();
      var f = this._getHiddenPrefixCount();
      if (this.numberInput.val().length == e.start && e.length == 0) {
        this._setSelection(e.start, e.start + 1);
        e = this._selection();
      }
      for (var c = 0; c < e.start; c++) {
        if (b[c].canEdit && b[c].character != this.promptChar) {
          d += b[c].character;
        } else {
          if (
            !b[c].canEdit &&
            this.decimalSeparatorPosition != -1 &&
            b[c] == b[this.decimalSeparatorPosition - f]
          ) {
            if (d.length == 0) {
              d = "0";
            }
            d += b[c].character;
          }
        }
      }
      for (var c = e.start; c < e.end; c++) {
        if (c > g && this.decimalSeparatorPosition != -1) {
          if (b[c].canEdit && b[c].character != this.promptChar) {
            d += "0";
          }
        } else {
          if (
            !b[c].canEdit &&
            this.decimalSeparatorPosition != -1 &&
            b[c] == b[this.decimalSeparatorPosition - f]
          ) {
            if (d.length == 0) {
              d = "0";
            }
            d += b[c].character;
          }
        }
      }
      for (var c = e.end; c < b.length; c++) {
        if (b[c].canEdit && b[c].character != this.promptChar) {
          d += b[c].character;
        } else {
          if (
            !b[c].canEdit &&
            this.decimalSeparatorPosition != -1 &&
            b[c] == b[this.decimalSeparatorPosition - f]
          ) {
            if (d.length == 0) {
              d = "0";
            }
            d += b[c].character;
          }
        }
      }
      this.setvalue("decimal", d);
      return e.length > 0;
    },
    _restoreInitialState: function () {
      var c = parseInt(this.decimalDigits);
      if (c > 0) {
        c += 2;
      }
      for (var b = this.items.length - 1; b > this.items.length - 1 - c; b--) {
        if (!this.items[b]) {
          break;
        }
        if (
          this.items[b].canEdit &&
          this.items[b].character == this.promptChar
        ) {
          this.items[b].character = 0;
        }
      }
    },
    clear: function () {
      this.setDecimal(0);
    },
    clearDecimal: function () {
      if (this.inputMode == "textbox") {
        this.numberInput.val();
        return;
      }
      for (var b = 0; b < this.items.length; b++) {
        if (this.items[b].canEdit) {
          this.items[b].character = this.promptChar;
        }
      }
      this._restoreInitialState();
    },
    _saveSelectedText: function () {
      var d = this._selection();
      var e = "";
      var b = this._getVisibleItems();
      if (d.start > 0 || d.length > 0) {
        for (var c = d.start; c < d.end; c++) {
          if (b[c].canEdit && b[c].character != this.promptChar) {
            e += b[c].character;
          } else {
            if (b[c].isSeparator) {
              e += b[c].character;
            }
          }
        }
      }
      if (a.jqx.browser.msie) {
        window.clipboardData.setData("Text", e);
      }
      return e;
    },
    _pasteSelectedText: function () {
      var f = this._selection();
      var h = "";
      var c = 0;
      this.selectedText = a.data(document.body, "jqxSelection");
      if (window.clipboardData) {
        var d = window.clipboardData.getData("Text");
        if (d != this.selectedText && d.length > 0) {
          this.selectedText = window.clipboardData.getData("Text");
          if (this.selectedText == null || this.selectedText == undefined) {
            return;
          }
        }
      }
      var e = f.start;
      var j = this._getVisibleItems();
      if (this.selectedText != null) {
        for (var i = 0; i < this.selectedText.length; i++) {
          var b = parseInt(this.selectedText[i]);
          if (!isNaN(b)) {
            var g = 48 + b;
            this._insertKey(g);
          }
        }
      }
    },
    _getHiddenPrefixCount: function () {
      var c = 0;
      if (!this.negative) {
        c++;
      }
      if (this.symbolPosition == "left") {
        for (var b = 0; b < this.symbol.length; b++) {
          if (this.symbol.substring(b, b + 1) == "") {
            c++;
          }
        }
      }
      return c;
    },
    _getEditableItem: function () {
      var c = this._selection();
      for (var b = 0; b < this.items.length; b++) {
        if (b < c.start) {
          if (
            this.items[b].canEdit &&
            this.items[b].character != this.promptChar
          ) {
            return this.items[b];
          }
        }
      }
      return null;
    },
    _getEditableItems: function () {
      var d = new Array();
      var b = 0;
      for (var c = 0; c < this.items.length; c++) {
        if (this.items[c].canEdit) {
          d[b] = this.items[c];
          b++;
        }
      }
      return d;
    },
    _getValidSelectionStart: function (c) {
      for (var b = this.items.length - 1; b >= 0; b--) {
        if (
          this.items[b].canEdit &&
          this.items[b].character != this.promptChar
        ) {
          return b;
        }
      }
      return -1;
    },
    _getEditableItemIndex: function (c) {
      var f = this._selection();
      var g = this._getHiddenPrefixCount();
      var b = this._getVisibleItems();
      var d = f.start;
      var h = -1;
      for (var e = 0; e < d; e++) {
        if (e < b.length && b[e].canEdit) {
          h = e + g;
        }
      }
      if (h == -1 && f.length > 0) {
        d = f.end;
        for (e = 0; e < d; e++) {
          if (e < b.length && b[e].canEdit) {
            h = e + g;
            break;
          }
        }
      }
      return h;
    },
    _getEditableItemByIndex: function (c) {
      for (var b = 0; b < this.items.length; b++) {
        if (b > c) {
          if (
            this.items[b].canEdit &&
            this.items[b].character != this.promptChar
          ) {
            return b;
          }
        }
      }
      return -1;
    },
    _getFirstEditableItemIndex: function () {
      var c = this._getVisibleItems();
      for (var b = 0; b < c.length; b++) {
        if (
          c[b].character != this.promptChar &&
          c[b].canEdit &&
          c[b].character != "0"
        ) {
          return b;
        }
      }
      return -1;
    },
    _getLastEditableItemIndex: function () {
      var c = this._getVisibleItems();
      for (var b = c.length - 1; b >= 0; b--) {
        if (c[b].character != this.promptChar && c[b].canEdit) {
          return b;
        }
      }
      return -1;
    },
    _moveCaretToDecimalSeparator: function () {
      for (var b = this.items.length - 1; b >= 0; b--) {
        if (
          this.items[b].character == this.decimalSeparator &&
          this.items[b].isSeparator
        ) {
          if (!this.negative) {
            this._setSelectionStart(b);
            return b;
          } else {
            this._setSelectionStart(b + 1);
            return b;
          }
          break;
        }
      }
      return this.numberInput.val().length;
    },
    _handleBackspace: function () {
      var g = this._selection();
      var h = this._getHiddenPrefixCount();
      var b = this._getEditableItemIndex() - h;
      var f = this._getFirstVisibleNonEmptyIndex();
      var c = false;
      if (this.negative) {
        c = true;
        if (f >= b + 1 || g.start == 0) {
          this.setvalue("negative", false);
          if (g.length == 0) {
            this._setSelectionStart(g.start - 1);
            var g = this._selection();
          }
        }
      }
      if (b >= 0) {
        if (g.length == 0 && b != -1) {
          this._setSelection(b, b + 1);
        }
        var i =
          g.start > this._getSeparatorPosition() + 1 &&
          this.decimalSeparatorPosition > 0;
        if (i) {
          g = this._selection();
        }
        var e = this._deleteSelectedText();
        if (g.length < 1 || i) {
          this._setSelectionStart(g.start);
        } else {
          if (g.length >= 1) {
            this._setSelectionStart(g.end);
          }
        }
        if (g.length == this.numberInput.val().length || c) {
          var d = this._moveCaretToDecimalSeparator();
          this._setSelectionStart(d - 1);
        }
      } else {
        this._setSelectionStart(g.start);
      }
    },
    _handleKeyDown: function (j, p) {
      var o = this._selection();
      var c = j.ctrlKey || j.metaKey;
      if ((p == 8 || p == 46) && c) {
        this.setDecimal(null);
        return false;
      }
      if (this.rtl && p == 37) {
        var d = j.shiftKey;
        var g = d ? 1 : 0;
        if (d) {
          this._setSelection(o.start + 1 - g, o.start + o.length + 1);
        } else {
          this._setSelection(o.start + 1 - g, o.start + 1);
        }
        return false;
      } else {
        if (this.rtl && p == 39) {
          var d = j.shiftKey;
          var g = d ? 1 : 0;
          if (d) {
            this._setSelection(o.start - 1, o.length + g + o.start - 1);
          } else {
            this._setSelection(o.start - 1, o.start - 1);
          }
          return false;
        }
      }
      if ((c && p == 97) || (c && p == 65)) {
        return true;
      }
      if ((c && p == 120) || (c && p == 88)) {
        this.selectedText = this._saveSelectedText(j);
        a.data(document.body, "jqxSelection", this.selectedText);
        this._handleBackspace();
        return false;
      }
      if ((c && p == 99) || (c && p == 67)) {
        this.selectedText = this._saveSelectedText(j);
        a.data(document.body, "jqxSelection", this.selectedText);
        return false;
      }
      if ((c && p == 122) || (c && p == 90)) {
        return false;
      }
      if ((c && p == 118) || (c && p == 86) || (j.shiftKey && p == 45)) {
        this._pasteSelectedText();
        return false;
      }
      if (o.start >= 0 && o.start < this.items.length) {
        var f = String.fromCharCode(p);
        var r = this.items[o.start];
      }
      if (p == 8) {
        this._handleBackspace();
        return false;
      }
      if (p == 190 || p == 110) {
        this._moveCaretToDecimalSeparator();
        return false;
      }
      if (p === 188 && this.decimalSeparator === ",") {
        this._moveCaretToDecimalSeparator();
        return false;
      }
      if (p == 188 && this.groupSeparator === ",") {
        var n = this.numberInput.val();
        for (var h = o.start; h < n.length; h++) {
          if (n[h] == this.groupSeparator) {
            this._setSelectionStart(1 + h);
            break;
          }
        }
        return false;
      }
      if (a.jqx.browser.msie == null) {
        var f = String.fromCharCode(p);
        var l = parseInt(f);
        if (p >= 96 && p <= 105) {
          l = p - 96;
          p = p - 48;
        }
        if (!isNaN(l)) {
          var k = this;
          k._insertKey(p);
          return false;
        }
      }
      if (p == 46) {
        var q = this._getVisibleItems();
        if (o.start < q.length) {
          var g = q[o.start].canEdit == false ? 2 : 1;
          if (o.start == 0) {
            if (this.negative) {
              this.setvalue("negative", false);
              if (o.length == 0) {
                this._setSelectionStart(0);
              }
              var o = this._selection();
              if (o.length == 0) {
                return false;
              }
            }
          }
          if (o.length == 0) {
            this._setSelection(o.start + g, o.start + g + o.length);
          }
          this._handleBackspace();
          if (
            new Number(this.decimal) < 1 ||
            o.start > this._getSeparatorPosition()
          ) {
            this._setSelectionStart(o.end + g);
          } else {
            if (o.start + 1 < this.decimalSeparatorPosition) {
              this._setSelectionStart(o.end + g);
            }
          }
        }
        return false;
      }
      if (p == 38) {
        this.spinUp();
        return false;
      } else {
        if (p == 40) {
          this.spinDown();
          return false;
        }
      }
      if (p === 27) {
        this.setDecimal(this._savedValue);
        this._setSelectionStart(o.end);
        j.preventDefault();
      }
      var m = this._isSpecialKey(p);
      if (a.jqx.browser.mozilla) {
        if (p == 45 || p == 173 || p == 109 || p == 189) {
          var b = this.getvalue("negative");
          if (b == false) {
            this.setvalue("negative", true);
          } else {
            this.setvalue("negative", false);
          }
        }
      }
      if (!a.jqx.browser.mozilla) {
        return true;
      }
      return m;
    },
    _isSpecialKey: function (b) {
      if (
        b != 8 &&
        b != 9 &&
        b != 13 &&
        b != 35 &&
        b != 36 &&
        b != 37 &&
        b != 39 &&
        b != 27 &&
        b != 46
      ) {
        return false;
      }
      return true;
    },
    _selection: function () {
      try {
        if ("selectionStart" in this.numberInput[0]) {
          var g = this.numberInput[0];
          var h = g.selectionEnd - g.selectionStart;
          return {
            start: g.selectionStart,
            end: g.selectionEnd,
            length: h,
            text: g.value,
          };
        } else {
          var d = document.selection.createRange();
          if (d == null) {
            return { start: 0, end: g.value.length, length: 0 };
          }
          var c = this.numberInput[0].createTextRange();
          var f = c.duplicate();
          c.moveToBookmark(d.getBookmark());
          f.setEndPoint("EndToStart", c);
          var h = d.text.length;
          return {
            start: f.text.length,
            end: f.text.length + d.text.length,
            length: h,
            text: d.text,
          };
        }
      } catch (b) {
        return { start: 0, end: 0, length: 0 };
      }
    },
    selectAll: function () {
      var b = this.numberInput;
      setTimeout(function () {
        if ("selectionStart" in b[0]) {
          b[0].focus();
          b[0].setSelectionRange(0, b[0].value.length);
        } else {
          var c = b[0].createTextRange();
          c.collapse(true);
          c.moveEnd("character", b[0].value.length);
          c.moveStart("character", 0);
          c.select();
        }
      }, 10);
    },
    _setSelection: function (f, b) {
      if (this._disableSetSelection == true) {
        return;
      }
      var e = a.jqx.mobile.isTouchDevice();
      if (e || this.touchMode == true) {
        return;
      }
      try {
        if ("selectionStart" in this.numberInput[0]) {
          this.numberInput[0].focus();
          this.numberInput[0].setSelectionRange(f, b);
        } else {
          var c = this.numberInput[0].createTextRange();
          c.collapse(true);
          c.moveEnd("character", b);
          c.moveStart("character", f);
          c.select();
        }
      } catch (d) {}
    },
    _setSelectionStart: function (b) {
      this._setSelection(b, b);
      a.data(this.numberInput, "selectionstart", b);
    },
    resize: function (c, b) {
      this.width = c;
      this.height = b;
      this._render(false);
    },
    _render: function (g) {
      var c = parseInt(this.host.css("border-left-width"));
      var j = parseInt(this.host.css("border-left-width"));
      var i = parseInt(this.host.css("border-left-width"));
      var e = parseInt(this.host.css("border-left-width"));
      this.numberInput.css("padding-top", "0px");
      this.numberInput.css("padding-bottom", "0px");
      var k = window.getComputedStyle(this.element);
      var h = parseInt(k.borderLeftWidth) * 2;
      var f = k.boxSizing;
      if (f === "border-box" || isNaN(h)) {
        h = 0;
      }
      if (this.width != null && this.width.toString().indexOf("px") != -1) {
        this.element.style.width = parseInt(this.width) - h + "px";
      } else {
        if (this.width != undefined && !isNaN(this.width)) {
          this.element.style.width = parseInt(this.width) - h + "px";
        }
      }
      if (this.height != null && this.height.toString().indexOf("px") != -1) {
        this.element.style.height = parseInt(this.height) - h + "px";
      } else {
        if (this.height != undefined && !isNaN(this.height)) {
          this.element.style.height = parseInt(this.height) - h + "px";
        }
      }
      var d = this.host.width();
      var n = this.host.height();
      this.numberInput.css({
        "border-left-width": 0,
        "border-right-width": 0,
        "border-bottom-width": 0,
        "border-top-width": 0,
      });
      if (isNaN(i)) {
        i = 1;
      }
      if (isNaN(j)) {
        j = 1;
      }
      if (isNaN(e)) {
        e = 1;
      }
      if (isNaN(c)) {
        c = 1;
      }
      this.numberInput.css("text-align", this.textAlign);
      var o = this.numberInput.css("font-size");
      if ("" == o) {
        o = 13;
      }
      this.numberInput.css("height", parseInt(o) + 4 + "px");
      this.numberInput.css("width", d - 2);
      var m = n - 2 * i - parseInt(o) - 2;
      if (isNaN(m)) {
        m = 0;
      }
      if (m < 0) {
        m = 0;
      }
      if (this.spinButtons && this.spincontainer) {
        d -= parseInt(this.spinButtonsWidth - 2);
        var l = a.jqx.mobile.isTouchDevice();
        if (!l && this.touchMode !== true) {
          this.spincontainer.width(this.spinButtonsWidth);
          this.upbutton.width(this.spinButtonsWidth + 2);
          this.downbutton.width(this.spinButtonsWidth + 2);
          this.upbutton.height("50%");
          this.downbutton.height("50%");
          this.spincontainer.width(this.spinButtonsWidth);
        } else {
          this.spincontainer.width(2 * this.spinButtonsWidth);
          d -= this.spinButtonsWidth;
          this.upbutton.height("100%");
          this.downbutton.height("100%");
          this.downbutton.css("float", "left");
          this.upbutton.css("float", "right");
          this.upbutton.width(this.spinButtonsWidth);
          this.downbutton.width(1 + this.spinButtonsWidth);
        }
        this._upArrow.height("100%");
        this._downArrow.height("100%");
        this.numberInput.css("width", d - 6);
        this.numberInput.css("margin-right", "2px");
      }
      var b = m / 2;
      if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
        b = m / 4;
      }
      this.numberInput.css("padding-left", "0px");
      this.numberInput.css("padding-right", "0px");
      this.numberInput.css("padding-top", Math.round(b) + "px");
      this.numberInput.css("padding-bottom", Math.round(b) + "px");
      if (g == undefined || g == true) {
        this.numberInput.val(this._getString());
        if (this.inputMode != "advanced") {
          this._parseDecimalInSimpleMode();
        }
      }
      this._addBarAndLabel(this.numberInput);
      this._updateHint();
    },
    _addBarAndLabel: function (e) {
      var d = this;
      if (d.bar !== null || d.label !== null) {
        return;
      }
      var b = a("<label></label");
      if (this.hint) {
        b[0].innerHTML = this.placeHolder;
      }
      b.addClass(d.toThemeProperty("jqx-input-label"));
      e.after(b);
      d.label = b;
      var c = a("<span></span>");
      e.after(c);
      c.addClass(d.toThemeProperty("jqx-input-bar"));
      if (d.spinButtons) {
        c.css("top", d.host.height());
      } else {
        c.css("top", "0px");
      }
      d.bar = c;
      if (d.template) {
        d.bar.addClass(d.toThemeProperty("jqx-" + d.template));
        d.label.addClass(d.toThemeProperty("jqx-" + d.template));
      }
    },
    destroy: function () {
      this._removeHandlers();
      this.host.remove();
    },
    inputValue: function (b) {
      if (b === undefined) {
        return this._value();
      }
      this.propertyChangedHandler(this, "value", this._value, b);
      this._refreshValue();
      return this;
    },
    _value: function () {
      var b = this.numberInput.val();
      return b;
    },
    val: function (c) {
      if ((c !== undefined && typeof c != "object") || c === null) {
        if (c === null) {
          this.setDecimal(null);
          return;
        } else {
          var f = c;
          if (f < 0) {
            this.setDecimal(f);
            return;
          } else {
            this.setvalue("negative", false);
          }
          f = f.toString();
          if (f.indexOf(this.symbol) > -1) {
            f = f.replace(this.symbol, "");
          }
          var b = function (l, j, k) {
            var h = l;
            if (j == k) {
              return l;
            }
            var i = h.indexOf(j);
            while (i != -1) {
              h = h.replace(j, k);
              i = h.indexOf(j);
            }
            return h;
          };
          f = f.replace(this.decimalSeparator, ".");
          f = b(f, this.groupSeparator, "");
          var g = "";
          for (var d = 0; d < f.length; d++) {
            var e = f.substring(d, d + 1);
            if (e === "-") {
              g += "-";
            }
            if (e === ".") {
              g += ".";
            }
            if (e.match(/^[0-9]+$/) != null) {
              g += e;
            }
          }
          f = g;
          f = f.replace(/ /g, "");
          f = f.replace(".", this.decimalSeparator);
          this._setDecimal(f);
        }
      } else {
        return this.getDecimal();
      }
    },
    getDecimal: function () {
      if (this.decimal == null) {
        return null;
      }
      if (this.inputMode == "simple") {
        this._parseDecimalInSimpleMode(false);
        this.decimal = this._getDecimalInSimpleMode(this.decimal);
      }
      if (this.decimal == "") {
        return 0;
      }
      var b = this.getvalue("negative");
      if (b && this.decimal > 0) {
        return -parseFloat(this.decimal);
      }
      return parseFloat(this.decimal);
    },
    setDecimal: function (e) {
      var b = e;
      if (this.decimalSeparator != ".") {
        if (e === null) {
          this._setDecimal(e);
        } else {
          var d = e;
          if (typeof e != "number") {
            e = e.toString();
            var g = e.indexOf(".");
            if (g != -1) {
              var c = e.substring(0, g);
              var f = e.substring(g + 1);
              d = c + "." + f;
              if (c.indexOf("-") != -1) {
                c = c.substring(1);
              }
              if (this.inputMode != "advanced") {
                e = c + "." + f;
              } else {
                e = c + this.decimalSeparator + f;
              }
            } else {
              var g = e.indexOf(this.decimalSeparator);
              if (g != -1) {
                var c = e.substring(0, g);
                var f = e.substring(g + 1);
                d = c + "." + f;
                if (c.indexOf("-") != -1) {
                  c = c.substring(1);
                }
                if (this.inputMode != "advanced") {
                  e = c + "." + f;
                } else {
                  e = c + this.decimalSeparator + f;
                }
              }
            }
          }
          if (d < 0) {
            this.setvalue("negative", true);
          } else {
            this.setvalue("negative", false);
          }
          if (e === null) {
            this._setDecimal(e);
          } else {
            this._setDecimal(Math.abs(e));
          }
        }
      } else {
        if (e < 0) {
          this.setvalue("negative", true);
        } else {
          this.setvalue("negative", false);
        }
        if (e === null) {
          this._setDecimal(e);
        } else {
          this._setDecimal(Math.abs(e));
        }
      }
      if (b == null) {
        this.numberInput.val("");
      }
      this._updateHint();
    },
    _setDecimal: function (o) {
      if (!this.allowNull && o == null) {
        this.decimal = 0;
        o = 0;
      }
      if (o == null) {
        this.decimal = null;
        this.value = null;
        this.clearDecimal();
        this._refreshValue();
        this.decimal = null;
        this.value = null;
        this.ValueString = "";
        return;
      }
      if (o.toString().indexOf("e") != -1) {
        o = new Number(o).toFixed(this.decimalDigits).toString();
      }
      this.clearDecimal();
      var p = o.toString();
      var q = "";
      var b = "";
      var d = true;
      if (p.length == 0) {
        p = "0";
      }
      for (var g = 0; g < p.length; g++) {
        if (typeof o == "number") {
          if (p.substring(g, g + 1) == ".") {
            d = false;
            continue;
          }
        } else {
          if (p.substring(g, g + 1) == this.decimalSeparator) {
            d = false;
            continue;
          }
        }
        if (d) {
          q += p.substring(g, g + 1);
        } else {
          b += p.substring(g, g + 1);
        }
      }
      if (q.length > 0) {
        q = parseFloat(q).toString();
      }
      var m = this.digits;
      if (m < q.length) {
        q = q.substr(0, m);
      }
      var f = 0;
      var n = this._getSeparatorPosition();
      var l = this._getHiddenPrefixCount();
      n = n + l;
      for (var g = n; g >= 0; g--) {
        if (g < this.items.length && this.items[g].canEdit) {
          if (f < q.length) {
            this.items[g].character = q.substring(
              q.length - f - 1,
              q.length - f
            );
            f++;
          }
        }
      }
      f = 0;
      for (var g = n; g < this.items.length; g++) {
        if (this.items[g].canEdit) {
          if (f < b.length) {
            this.items[g].character = b.substring(f, f + 1);
            f++;
          }
        }
      }
      this._refreshValue();
      if (this.decimalSeparator == ".") {
        this.ValueString = new Number(o).toFixed(this.decimalDigits);
      } else {
        var j = o.toString().indexOf(this.decimalSeparator);
        if (j > 0) {
          var h = o.toString().substring(0, j);
          var e = h + "." + o.toString().substring(j + 1);
          this.ValueString = new Number(e).toFixed(this.decimalDigits);
        } else {
          this.ValueString = new Number(o).toFixed(this.decimalDigits);
        }
      }
      if (this.inputMode != "advanced") {
        this._parseDecimalInSimpleMode();
        this._raiseEvent(1, this.ValueString);
      }
      if (this.inputMode == "textbox") {
        this.decimal = this.ValueString;
        var c = this.getvalue("negative");
        if (c) {
          this.decimal = "-" + this.ValueString;
        }
      }
      var o = this.val();
      if (o < this.min || o > this.max) {
        this.host.addClass("jqx-input-invalid");
      } else {
        this.host.removeClass("jqx-input-invalid");
      }
      this._updateHint();
    },
    _getSeparatorPosition: function () {
      var b = this._getHiddenPrefixCount();
      if (this.decimalSeparatorPosition > 0) {
        return this.decimalSeparatorPosition - b;
      }
      return this.items.length - b;
    },
    _setTheme: function () {
      this.host.removeClass();
      this.host.addClass(this.toThemeProperty("jqx-input"));
      this.host.addClass(this.toThemeProperty("jqx-rc-all"));
      this.host.addClass(this.toThemeProperty("jqx-widget"));
      this.host.addClass(this.toThemeProperty("jqx-widget-content"));
      this.host.addClass(this.toThemeProperty("jqx-numberinput"));
      if (this.spinButtons) {
        this.downbutton.removeClass();
        this.upbutton.removeClass();
        this.downbutton.addClass(
          this.toThemeProperty("jqx-scrollbar-button-state-normal")
        );
        this.upbutton.addClass(
          this.toThemeProperty("jqx-scrollbar-button-state-normal")
        );
        this._upArrow.removeClass();
        this._downArrow.removeClass();
        this._upArrow.addClass(this.toThemeProperty("jqx-icon-arrow-up"));
        this._downArrow.addClass(this.toThemeProperty("jqx-icon-arrow-down"));
      }
      this.numberInput.removeClass();
      this.numberInput.addClass(this.toThemeProperty("jqx-input-content"));
    },
    propertiesChangedHandler: function (d, b, c) {
      if (c && c.width && c.height && Object.keys(c).length == 2) {
        d._render();
      }
    },
    propertyChangedHandler: function (c, e, h, g) {
      if (
        c.batchUpdate &&
        c.batchUpdate.width &&
        c.batchUpdate.height &&
        Object.keys(c.batchUpdate).length == 2
      ) {
        return;
      }
      if (e == "template") {
        c.upbutton.removeClass(c.toThemeProperty("jqx-" + c.template));
        c.downbutton.removeClass(c.toThemeProperty("jqx-" + c.template));
        c.upbutton.addClass(c.toThemeProperty("jqx-" + c.template));
        c.downbutton.addClass(c.toThemeProperty("jqx-" + c.template));
      }
      if (e == "digits" || e == "groupSize" || e == "decimalDigits") {
        if (g < 0) {
          throw new Exception(this.invalidArgumentExceptions[0]);
        }
      }
      if (e == "placeHolder") {
        if (!c.isMaterialized()) {
          c.numberInput.attr("placeholder", c.placeHolder);
        } else {
          if (c.hint) {
            c.label[0].innerHTML = c.placeHolder;
          }
        }
      }
      if (e === "theme") {
        a.jqx.utilities.setTheme(h, g, c.host);
      }
      if (e == "digits") {
        if (g != h) {
          c.digits = parseInt(g);
        }
      }
      if (e == "min" || e == "max") {
        a.jqx.aria(c, "aria-value" + e, g.toString());
        c._refreshValue();
      }
      if (e == "decimalDigits") {
        if (g != h) {
          c.decimalDigits = parseInt(g);
        }
      }
      if (
        e == "decimalSeparator" ||
        e == "digits" ||
        e == "symbol" ||
        e == "symbolPosition" ||
        e == "groupSize" ||
        e == "groupSeparator" ||
        e == "decimalDigits" ||
        e == "negativeSymbol"
      ) {
        var b = c.decimal;
        if (e == "decimalSeparator" && g == "") {
          g = " ";
        }
        if (h != g) {
          var f = c._selection();
          c.items = new Array();
          c._initializeLiterals();
          c.value = c._getString();
          c._refreshValue();
          c._setDecimal(b);
        }
      }
      if (e == "rtl") {
        if (c.rtl) {
          if (c.spincontainer) {
            c.spincontainer.css("float", "right");
            c.spincontainer.css("border-right-width", "1px");
          }
          c.numberInput.css("float", "right");
        } else {
          if (c.spincontainer) {
            c.spincontainer.css("float", "right");
            c.spincontainer.css("border-right-width", "1px");
          }
          c.numberInput.css("float", "left");
        }
      }
      if (e == "spinButtons") {
        if (c.spincontainer) {
          if (!g) {
            c.spincontainer.css("display", "none");
          } else {
            c.spincontainer.css("display", "block");
          }
          c._render();
        } else {
          c._spinButtons();
        }
      }
      if (e === "touchMode") {
        c.inputMode = "textbox";
        c.spinMode = "simple";
        c.render();
      }
      if (e == "negative" && c.inputMode == "advanced") {
        var f = c._selection();
        var j = 0;
        if (g) {
          c.items[0].character = c.negativeSymbol[0];
          j = 1;
        } else {
          c.items[0].character = "";
          j = -1;
        }
        c._refreshValue();
        if (c.isInitialized) {
          c._setSelection(f.start + j, f.end + j);
        }
      }
      if (e == "decimal") {
        c.value = g;
        c.setDecimal(g);
      }
      if (e === "value") {
        c.value = g;
        c.setDecimal(g);
        c._raiseEvent(1, g);
      }
      if (e == "textAlign") {
        c.textAlign = g;
        c._render();
      }
      if (e == "disabled") {
        c.numberInput.attr("disabled", g);
        if (c.disabled) {
          c.host.addClass(c.toThemeProperty("jqx-fill-state-disabled"));
        } else {
          c.host.removeClass(c.toThemeProperty("jqx-fill-state-disabled"));
        }
        a.jqx.aria(c, "aria-disabled", g.toString());
      }
      if (e == "readOnly") {
        c.readOnly = g;
      }
      if (e == "promptChar") {
        for (var d = 0; d < c.items.length; d++) {
          if (c.items[d].character == c.promptChar) {
            c.items[d].character = g;
          }
        }
        c.promptChar = g;
      }
      if (e == "width") {
        c.width = g;
        c._render();
      } else {
        if (e == "height") {
          c.height = g;
          c._render();
        }
      }
    },
    _value: function () {
      var b = this.value;
      return b;
    },
    _refreshValue: function () {
      var g = this.value;
      var b = 0;
      if (this.inputMode === "textbox") {
        return;
      }
      this.value = this._getString();
      g = this.value;
      var f = "";
      for (var c = 0; c < this.items.length; c++) {
        var e = this.items[c];
        if (e.canEdit && e.character != this.promptChar) {
          f += e.character;
        }
        if (c == this.decimalSeparatorPosition) {
          f += ".";
        }
      }
      this.decimal = f;
      var d = false;
      if (this.oldValue !== g) {
        this.oldValue = g;
        this._raiseEvent(0, g);
        d = true;
      }
      if (this.inputMode != "simple") {
        this.numberInput.val(g);
        if (d) {
          this._raiseEvent(1, g);
        }
      }
      if (g == null) {
        this.numberInput.val("");
      }
    },
  });
})(jqxBaseFramework);
