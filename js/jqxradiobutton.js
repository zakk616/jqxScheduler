/*
jQWidgets v14.0.0 (2022-May)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function (a) {
  a.jqx.jqxWidget("jqxRadioButton", "", {});
  a.extend(a.jqx._jqxRadioButton.prototype, {
    defineInstance: function () {
      var b = {
        animationShowDelay: 300,
        animationHideDelay: 300,
        width: null,
        height: null,
        boxSize: "16px",
        checked: false,
        hasThreeStates: false,
        disabled: false,
        enableContainerClick: true,
        locked: false,
        groupName: "",
        rtl: false,
        changeType: null,
        _canFocus: true,
        aria: {
          "aria-checked": { name: "checked", type: "boolean" },
          "aria-disabled": { name: "disabled", type: "boolean" },
        },
        events: ["checked", "unchecked", "indeterminate", "change"],
      };
      if (this === a.jqx._jqxRadioButton.prototype) {
        return b;
      }
      a.extend(true, this, b);
      return b;
    },
    createInstance: function (b) {
      var c = this;
      c._createFromInput("RadioButton");
      c.render();
    },
    _createFromInput: function (c) {
      var j = this;
      if (j.element.nodeName.toLowerCase() == "input") {
        j.field = j.element;
        if (j.field.className) {
          j._className = j.field.className;
        }
        var l = { title: j.field.title };
        if (j.field.value) {
          l.value = j.field.value;
        }
        if (j.field.checked) {
          l.checked = true;
        }
        if (j.field.id.length) {
          l.id = j.field.id.replace(/[^\w]/g, "_") + "_" + c;
        } else {
          l.id = a.jqx.utilities.createId() + "_" + c;
        }
        var e = j.element.nextSibling;
        var h = false;
        if (e && (e.nodeName == "#text" || e.nodeName == "span")) {
          h = true;
        }
        var k = 0;
        var b = a("<div></div>", l);
        if (h) {
          b.append(e);
          var i = a("<span>" + a(e).text() + "</span>");
          i.appendTo(a(document.body));
          k += i.width();
          i.remove();
        }
        b[0].style.cssText = j.field.style.cssText;
        if (!j.width) {
          j.width = a(j.field).width() + k + 10;
        }
        if (!j.height) {
          j.height = a(j.field).outerHeight() + 10;
        }
        a(j.field).hide().after(b);
        var g = j.host.data();
        j.host = b;
        j.host.data(g);
        j.element = b[0];
        j.element.id = j.field.id;
        j.field.id = l.id;
        if (j._className) {
          j.host.addClass(j._className);
          a(j.field).removeClass(j._className);
        }
        if (j.field.tabIndex) {
          var d = j.field.tabIndex;
          j.field.tabIndex = -1;
          j.element.tabIndex = d;
        }
      }
    },
    render: function () {
      this.setSize();
      var e = this;
      this.propertyChangeMap.width = function (i, k, j, l) {
        e.setSize();
      };
      this.propertyChangeMap.height = function (i, k, j, l) {
        e.setSize();
      };
      if (this.radiobutton) {
        this.radiobutton.remove();
      }
      if (!this.width) {
        this.host.css("overflow-x", "visible");
      }
      if (!this.height) {
        this.host.css("overflow-y", "visible");
      }
      if (this.boxSize == null) {
        this.boxSize = 16;
      }
      var h = parseInt(this.boxSize) + "px";
      var g = "16px";
      var f = Math.floor((parseInt(this.boxSize) - 16) / 2);
      var b = f;
      f += "px";
      b += "px";
      var c = parseInt(this.boxSize) / 2 + "px";
      if (this.boxSize != "16px") {
        this.radiobutton = a(
          '<div><div style="width: ' +
            h +
            "; height: " +
            h +
            ';"><span style="position: relative; left: ' +
            f +
            "; top: " +
            b +
            "; width: " +
            g +
            "; height: " +
            g +
            ';"></span></div></div>'
        );
      } else {
        this.radiobutton = a(
          '<div><div style="width: ' +
            h +
            "; height: " +
            h +
            ';"><span style="width: ' +
            c +
            "; height: " +
            c +
            ';"></span></div></div>'
        );
      }
      this.host.attr("role", "radio");
      this.host.prepend(this.radiobutton);
      if (!this.disabledContainer) {
        if (!this.host.attr("tabIndex")) {
          this.host.attr("tabIndex", 0);
        }
        this.clear = a('<div style="clear: both;"></div>');
        this.host.append(this.clear);
      }
      this.checkMark = a(this.radiobutton[0].firstChild.firstChild);
      this.box = this.radiobutton;
      this._supportsRC = true;
      if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
        this._supportsRC = false;
      }
      this.box.addClass(this.toThemeProperty("jqx-fill-state-normal"));
      this.box.addClass(this.toThemeProperty("jqx-radiobutton-default"));
      this.host.addClass(this.toThemeProperty("jqx-widget"));
      if (this.disabled) {
        this.disable();
      }
      this.host.addClass(this.toThemeProperty("jqx-radiobutton"));
      if (this.locked) {
        this.host.css("cursor", "auto");
      }
      var d = this.element.getAttribute("checked");
      if (d == "checked" || d == "true" || d == true) {
        this.checked = true;
      }
      this._addInput();
      this._render();
      this._addHandlers();
      a.jqx.aria(this);
      this._centerBox();
      if (this.isMaterialized()) {
        a(this.radiobutton).addClass("ripple");
        a.jqx.ripple(a(this.radiobutton), this.host, "radiobutton");
      }
    },
    _centerBox: function () {
      if (
        this.height &&
        this.height.toString().indexOf("%") == -1 &&
        this.box
      ) {
        var b = parseInt(this.height);
        this.host.css("line-height", b + "px");
        var c = b - parseInt(this.boxSize) - 1;
        c /= 2;
        this.box.css("margin-top", parseInt(c));
      }
    },
    _addInput: function () {
      var b = this.host.attr("name");
      this.input = a("<input type='hidden'/>");
      this.host.append(this.input);
      if (b) {
        this.input.attr("name", b);
      }
    },
    refresh: function (b) {
      if (!b) {
        this.setSize();
        this._render();
      }
    },
    resize: function (c, b) {
      this.width = c;
      this.height = b;
      this.setSize();
    },
    setSize: function () {
      if (this.width != null && this.width.toString().indexOf("px") != -1) {
        this.host.width(this.width);
      } else {
        if (this.width != undefined && !isNaN(this.width)) {
          this.host.width(this.width);
        } else {
          if (this.width != null && this.width.toString().indexOf("%") != -1) {
            this.element.style.width = this.width;
          }
        }
      }
      if (this.height != null && this.height.toString().indexOf("px") != -1) {
        this.host.height(this.height);
      } else {
        if (this.height != undefined && !isNaN(this.height)) {
          this.host.height(this.height);
        } else {
          if (
            this.height != null &&
            this.height.toString().indexOf("%") != -1
          ) {
            this.element.style.height = this.height;
          }
        }
      }
      this._centerBox();
    },
    _addHandlers: function () {
      var b = this;
      this.addHandler(this.box, "click", function (c) {
        if (!b.disabled && !b.enableContainerClick) {
          b.changeType = "mouse";
          b.toggle("click");
          c.preventDefault();
          return false;
        }
      });
      this.addHandler(this.host, "keydown", function (c) {
        if (!b.disabled && !b.locked) {
          if (c.keyCode == 32) {
            if (!b._canFocus) {
              return true;
            }
            b.changeType = "keyboard";
            b.toggle("click");
            c.preventDefault();
            return false;
          }
        }
      });
      this.addHandler(this.host, "mousedown", function (c) {
        if (!b.disabled && b.enableContainerClick) {
          b.clickTime = new Date();
          b.changeType = "mouse";
          b.toggle("click");
          if (b._canFocus) {
            b.focus();
          }
          c.preventDefault();
          return false;
        }
      });
      this.addHandler(this.host, "selectstart", function (c) {
        if (!b.disabled && b.enableContainerClick) {
          c.preventDefault();
        }
      });
      this.addHandler(this.host, "mouseup", function (c) {
        if (!b.disabled && b.enableContainerClick) {
          c.preventDefault();
        }
      });
      this.addHandler(this.host, "focus", function (c) {
        if (!b.disabled && b.enableContainerClick && !b.locked) {
          a(b.radiobutton).removeClass("active");
          if (!b.clickTime || (b.clickTime && new Date() - b.clickTime > 300)) {
            a(b.radiobutton).addClass("active");
          }
          b.box.addClass(b.toThemeProperty("jqx-radiobutton-hover"));
          b.box.addClass(b.toThemeProperty("jqx-fill-state-focus"));
          c.preventDefault();
          return false;
        }
      });
      this.addHandler(this.host, "blur", function (c) {
        a(b.radiobutton).removeClass("active");
        if (!b.disabled && b.enableContainerClick && !b.locked) {
          b.box.removeClass(b.toThemeProperty("jqx-radiobutton-hover"));
          b.box.removeClass(b.toThemeProperty("jqx-fill-state-focus"));
          c.preventDefault();
          return false;
        }
      });
      this.addHandler(this.host, "mouseenter", function (c) {
        if (!b.disabled && b.enableContainerClick && !b.locked) {
          b.box.addClass(b.toThemeProperty("jqx-radiobutton-hover"));
          b.box.addClass(b.toThemeProperty("jqx-fill-state-hover"));
          c.preventDefault();
          return false;
        }
      });
      this.addHandler(this.host, "mouseleave", function (c) {
        if (!b.disabled && b.enableContainerClick && !b.locked) {
          b.box.removeClass(b.toThemeProperty("jqx-radiobutton-hover"));
          b.box.removeClass(b.toThemeProperty("jqx-fill-state-hover"));
          c.preventDefault();
          return false;
        }
      });
      this.addHandler(this.box, "mouseenter", function () {
        if (!b.disabled && !b.enableContainerClick) {
          b.box.addClass(b.toThemeProperty("jqx-radiobutton-hover"));
          b.box.addClass(b.toThemeProperty("jqx-fill-state-hover"));
        }
      });
      this.addHandler(this.box, "mouseleave", function () {
        if (!b.disabled && !b.enableContainerClick) {
          b.box.removeClass(b.toThemeProperty("jqx-radiobutton-hover"));
          b.box.removeClass(b.toThemeProperty("jqx-fill-state-hover"));
        }
      });
    },
    focus: function () {
      try {
        this.host.focus();
      } catch (b) {}
    },
    _removeHandlers: function () {
      this.removeHandler(this.box, "click");
      this.removeHandler(this.box, "mouseenter");
      this.removeHandler(this.box, "mouseleave");
      this.removeHandler(this.host, "click");
      this.removeHandler(this.host, "mouseup");
      this.removeHandler(this.host, "mousedown");
      this.removeHandler(this.host, "selectstart");
      this.removeHandler(this.host, "mouseenter");
      this.removeHandler(this.host, "mouseleave");
      this.removeHandler(this.host, "keydown");
      this.removeHandler(this.host, "focus");
      this.removeHandler(this.host, "blur");
    },
    _render: function () {
      if (this.boxSize == null) {
        this.boxSize = 13;
      }
      this.box.width(this.boxSize);
      this.box.height(this.boxSize);
      if (!this.disabled) {
        if (this.enableContainerClick) {
          this.host.css("cursor", "pointer");
        } else {
          this.host.css("cursor", "auto");
        }
      } else {
        this.disable();
      }
      if (this.rtl) {
        this.box.addClass(this.toThemeProperty("jqx-radiobutton-rtl"));
        this.host.addClass(this.toThemeProperty("jqx-rtl"));
      }
      this.updateStates();
    },
    val: function (b) {
      if (arguments.length == 0 || typeof b == "object") {
        return this.checked;
      }
      if (typeof b == "string") {
        if (b == "true") {
          this.check("api");
        }
        if (b == "false") {
          this.uncheck("api");
        }
        if (b == "") {
          this.indeterminate("api");
        }
      } else {
        if (b == true) {
          this.check("api");
        }
        if (b == false) {
          this.uncheck("api");
        }
        if (b == null) {
          this.indeterminate("api");
        }
      }
      return this.checked;
    },
    check: function (d) {
      this.checked = true;
      var e = this;
      this.checkMark.removeClass();
      this.checkMark.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
      if (a.jqx.browser.msie) {
        if (!this.disabled) {
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-checked")
          );
        } else {
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-disabled")
          );
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-checked")
          );
        }
      } else {
        if (!this.disabled) {
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-checked")
          );
        } else {
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-disabled")
          );
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-checked")
          );
        }
        this.checkMark.css("opacity", 0);
        this.checkMark
          .stop()
          .animate({ opacity: 1 }, this.animationShowDelay, function () {});
      }
      var f = a.find(".jqx-radiobutton");
      if (this.groupName == null) {
        this.groupName = "";
      }
      a.each(f, function () {
        var g = a(this).jqxRadioButton("groupName");
        if (g == e.groupName && this != e.element) {
          a(this).jqxRadioButton("uncheck", "api");
        }
      });
      var b = this.changeType;
      this._raiseEvent("0");
      this.changeType = b;
      this._raiseEvent("3", { type: d, checked: true });
      if (this.checkMark.height() == 0) {
        var c = parseInt(this.boxSize) / 2;
        this.checkMark.height(c);
        this.checkMark.width(c);
      } else {
        if (this.boxSize != "13px") {
          var c = parseInt(this.boxSize) / 2;
          this.checkMark.height(c);
          this.checkMark.width(c);
          this.checkMark.css("margin-left", 1 + c / 4);
          this.checkMark.css("margin-top", 1 + c / 4);
        }
      }
      this.input.val(this.checked);
      a.jqx.aria(this, "aria-checked", this.checked);
      this.host.attr("checked", this.checked);
    },
    uncheck: function (c) {
      var e = this.checked;
      this.checked = false;
      var d = this;
      if (a.jqx.browser.msie) {
        d.checkMark.removeClass();
      } else {
        this.checkMark.css("opacity", 1);
        this.checkMark
          .stop()
          .animate({ opacity: 0 }, this.animationHideDelay, function () {
            d.checkMark.removeClass();
          });
      }
      if (e) {
        var b = this.changeType;
        this._raiseEvent("1");
        this.changeType = b;
        this._raiseEvent("3", { type: c, checked: false });
      }
      this.input.val(this.checked);
      a.jqx.aria(this, "aria-checked", this.checked);
      this.host.attr("checked", this.checked);
    },
    indeterminate: function (c) {
      var d = this.checked;
      this.checked = null;
      this.checkMark.removeClass();
      if (a.jqx.browser.msie) {
        this.checkMark.addClass(
          this.toThemeProperty("jqx-radiobutton-check-indeterminate")
        );
      } else {
        this.checkMark.addClass(
          this.toThemeProperty("jqx-radiobutton-check-indeterminate")
        );
        this.checkMark.css("opacity", 0);
        this.checkMark
          .stop()
          .animate({ opacity: 1 }, this.animationShowDelay, function () {});
      }
      if (d != null) {
        var b = this.changeType;
        this._raiseEvent("2");
        this.changeType = b;
        this._raiseEvent("3", { type: c, checked: null });
      }
      this.input.val(this.checked);
      a.jqx.aria(this, "aria-checked", "undefined");
      this.host.attr("checked", "undefined");
    },
    toggle: function (c) {
      if (this.disabled) {
        return;
      }
      if (this.locked) {
        return;
      }
      var b = this.checked;
      if (this.checked == true) {
        this.checked = this.hasTreeStates ? null : true;
      } else {
        this.checked = true;
      }
      if (b != this.checked) {
        this.updateStates(c);
      }
      this.input.val(this.checked);
    },
    updateStates: function (b) {
      if (this.checked) {
        this.check(b);
      } else {
        if (this.checked == false) {
          this.uncheck(b);
        } else {
          if (this.checked == null) {
            this.indeterminate(b);
          }
        }
      }
    },
    disable: function () {
      this.disabled = true;
      if (this.checked == true) {
        this.checkMark.addClass(
          this.toThemeProperty("jqx-radiobutton-check-disabled")
        );
      } else {
        if (this.checked == null) {
          this.checkMark.addClass(
            this.toThemeProperty("jqx-radiobutton-check-indeterminate-disabled")
          );
        }
      }
      this.box.addClass(this.toThemeProperty("jqx-radiobutton-disabled"));
      this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));
      a.jqx.aria(this, "aria-disabled", this.disabled);
    },
    enable: function () {
      this.host.removeClass(this.toThemeProperty("jqx-fill-state-disabled"));
      if (this.checked == true) {
        this.checkMark.removeClass(
          this.toThemeProperty("jqx-radiobutton-check-disabled")
        );
      } else {
        if (this.checked == null) {
          this.checkMark.removeClass(
            this.toThemeProperty("jqx-radiobutton-check-indeterminate-disabled")
          );
        }
      }
      this.box.removeClass(this.toThemeProperty("jqx-radiobutton-disabled"));
      this.disabled = false;
      a.jqx.aria(this, "aria-disabled", this.disabled);
    },
    destroy: function () {
      this._removeHandlers();
      this.host.remove();
    },
    _raiseEvent: function (g, e) {
      var c = this.events[g];
      var f = new a.Event(c);
      f.owner = this;
      if (!e) {
        e = {};
      }
      e.type = this.changeType;
      this.changeType = null;
      f.args = e;
      try {
        var b = this.host.trigger(f);
      } catch (d) {}
      return b;
    },
    propertiesChangedHandler: function (b, c, d) {
      if (d.width && d.height && Object.keys(d).length == 2) {
        b.setSize();
      }
    },
    propertyChangedHandler: function (b, c, e, d) {
      if (this.isInitialized == undefined || this.isInitialized == false) {
        return;
      }
      if (
        b.batchUpdate &&
        b.batchUpdate.width &&
        b.batchUpdate.height &&
        Object.keys(b.batchUpdate).length == 2
      ) {
        return;
      }
      if (c == this.enableContainerClick && !this.disabled && !this.locked) {
        if (d) {
          this.host.css("cursor", "pointer");
        } else {
          this.host.css("cursor", "auto");
        }
      }
      if (c == "rtl") {
        if (d) {
          b.box.addClass(b.toThemeProperty("jqx-radiobutton-rtl"));
          b.host.addClass(b.toThemeProperty("jqx-rtl"));
        } else {
          b.box.removeClass(b.toThemeProperty("jqx-radiobutton-rtl"));
          b.host.removeClass(b.toThemeProperty("jqx-rtl"));
        }
      }
      if (c == "boxSize") {
        b.render();
      }
      if (c == "checked") {
        switch (d) {
          case true:
            this.check("api");
            break;
          case false:
            this.uncheck("api");
            break;
          case null:
            this.indeterminate();
            break;
        }
      }
      if (c == "theme") {
        a.jqx.utilities.setTheme(e, d, this.host);
      }
      if (c == "disabled") {
        if (d) {
          this.disable();
        } else {
          this.enable();
        }
      }
    },
  });
})(jqxBaseFramework);
