/*
jQWidgets v14.0.0 (2022-May)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function (a) {
  a.jqx.jqxWidget("jqxListBox", "", {});
  a.extend(a.jqx._jqxListBox.prototype, {
    defineInstance: function () {
      var b = {
        disabled: false,
        checkboxSize: 16,
        checkboxes: false,
        width: null,
        height: null,
        items: new Array(),
        multiple: false,
        selectedIndex: -1,
        selectedIndexes: new Array(),
        source: null,
        scrollBarSize: a.jqx.utilities.scrollBarSize,
        enableHover: true,
        enableSelection: true,
        visualItems: new Array(),
        groups: new Array(),
        equalItemsWidth: true,
        itemHeight: -1,
        visibleItems: new Array(),
        emptyGroupText: "Group",
        hasThreeStates: false,
        autoHeight: false,
        autoItemsHeight: false,
        roundedcorners: true,
        touchMode: "auto",
        displayMember: "",
        groupMember: "",
        valueMember: "",
        searchMember: "",
        searchMode: "startswithignorecase",
        incrementalSearch: true,
        incrementalSearchDelay: 1000,
        incrementalSearchKeyDownDelay: 300,
        allowDrag: false,
        allowDrop: true,
        dropAction: "default",
        touchModeStyle: "auto",
        keyboardNavigation: true,
        enableMouseWheel: true,
        multipleextended: false,
        selectedValues: new Array(),
        emptyString: "",
        rtl: false,
        rendered: null,
        renderer: null,
        dragStart: null,
        dragEnd: null,
        focusable: true,
        ready: null,
        _checkForHiddenParent: true,
        autoBind: true,
        _renderOnDemand: false,
        filterable: false,
        filterHeight: 27,
        filterPlaceHolder: "Looking for",
        filterDelay: 100,
        filterChange: null,
        aria: { "aria-disabled": { name: "disabled", type: "boolean" } },
        events: [
          "select",
          "unselect",
          "change",
          "checkChange",
          "dragStart",
          "dragEnd",
          "bindingComplete",
          "itemAdd",
          "itemRemove",
          "itemUpdate",
        ],
      };
      if (this === a.jqx._jqxListBox.prototype) {
        return b;
      }
      a.extend(true, this, b);
      return b;
    },
    createInstance: function (c) {
      var b = this;
      if (a.jqx.utilities.scrollBarSize != 15) {
        b.scrollBarSize = a.jqx.utilities.scrollBarSize;
      }
      if (b.width == null) {
        b.width = 200;
      }
      if (b.height == null) {
        b.height = 200;
      }
      if (b.isMaterialized()) {
        var f = window.getComputedStyle(b.element);
        var e = f.getPropertyValue("--jqx-list-item-height");
        if (e && this.itemHeight === -1) {
          this.itemHeight = parseInt(e);
        }
      }
      b.renderListBox();
      var d = b;
      a.jqx.utilities.resize(
        b.host,
        function () {
          d._updateSize();
        },
        false,
        b._checkForHiddenParent
      );
    },
    resize: function (c, b) {
      this.width = c;
      this.height = b;
      this._updateSize();
    },
    render: function () {
      this.renderListBox();
      this.refresh();
    },
    renderListBox: function () {
      var p = this;
      var o = p.element.nodeName.toLowerCase();
      if (o == "select" || o == "ul" || o == "ol") {
        p.field = p.element;
        if (p.field.className) {
          p._className = p.field.className;
        }
        var k = { title: p.field.title };
        if (p.field.id.length) {
          k.id = p.field.id.replace(/[^\w]/g, "_") + "_jqxListBox";
        } else {
          k.id = a.jqx.utilities.createId() + "_jqxListBox";
        }
        var b = a("<div></div>", k);
        if (!p.width) {
          p.width = a(p.field).width();
        }
        if (!p.height) {
          p.height = a(p.field).outerHeight();
        }
        p.element.style.cssText = p.field.style.cssText;
        a(p.field).hide().after(b);
        var h = p.host.data();
        p.host = b;
        p.host.data(h);
        p.element = b[0];
        p.element.id = p.field.id;
        p.field.id = k.id;
        if (p._className) {
          p.host.addClass(p._className);
          a(p.field).removeClass(p._className);
        }
        if (p.field.tabIndex) {
          var d = p.field.tabIndex;
          p.field.tabIndex = -1;
          p.element.tabIndex = d;
        }
      } else {
        if (p.host.find("li").length > 0 || p.host.find("option").length > 0) {
          var r = a.jqx.parseSourceTag(p.element);
          p.source = r.items;
        }
      }
      p.element.innerHTML = "";
      var p = p;
      var j = p.element.className;
      j += " " + p.toThemeProperty("jqx-listbox");
      j += " " + p.toThemeProperty("jqx-reset");
      j += " " + p.toThemeProperty("jqx-rc-all");
      j += " " + p.toThemeProperty("jqx-widget");
      j += " " + p.toThemeProperty("jqx-widget-content");
      p.element.className = j;
      var i = false;
      var m = window.getComputedStyle(this.element);
      var g = parseInt(m.borderLeftWidth) * 2;
      var c = m.boxSizing;
      if (this.element.offsetWidth === 0) {
        g = 2;
      }
      if (c === "border-box" || isNaN(g)) {
        g = 0;
      }
      if (p.width != null && p.width.toString().indexOf("%") != -1) {
        p.host.width(p.width);
        if (g > 0) {
          this.host.css("box-sizing", "border-box");
        }
        i = true;
      }
      if (p.height != null && p.height.toString().indexOf("%") != -1) {
        p.host.height(p.height);
        if (p.host.height() == 0) {
          p.host.height(200);
        }
        i = true;
      }
      if (p.width != null && p.width.toString().indexOf("px") != -1) {
        p.element.style.width = parseInt(p.width) - g + "px";
      } else {
        if (p.width != undefined && !isNaN(p.width)) {
          p.element.style.width = parseInt(p.width) - g + "px";
        }
      }
      if (p.height != null && p.height.toString().indexOf("px") != -1) {
        p.element.style.height = parseInt(p.height) - g + "px";
      } else {
        if (p.height != undefined && !isNaN(p.height)) {
          p.element.style.height = parseInt(p.height) - g + "px";
        }
      }
      if (p.multiple || p.multipleextended || p.checkboxes) {
        a.jqx.aria(p, "aria-multiselectable", true);
      } else {
        a.jqx.aria(p, "aria-multiselectable", false);
      }
      var f =
        "<div style='-webkit-appearance: none; background: transparent; outline: none; width:100%; height: 100%; align:left; border: 0px; padding: 0px; margin: 0px; left: 0px; top: 0px; valign:top; position: relative;'><div style='-webkit-appearance: none; border: none; background: transparent; outline: none; width:100%; height: 100%; padding: 0px; margin: 0px; align:left; left: 0px; top: 0px; valign:top; position: relative;'><div id='filter" +
        p.element.id +
        "' style='display: none; visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'><input style='position: absolute;'/></div><div id='listBoxContent' style='-webkit-appearance: none; border: none; background: transparent; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='verticalScrollBar" +
        p.element.id +
        "' style='visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='horizontalScrollBar" +
        p.element.id +
        "' style='visibility: inherit; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div><div id='bottomRight' style='align:left; valign:top; left: 0px; top: 0px; border: none; position: absolute;'/></div></div>";
      p.host.attr("role", "listbox");
      p.element.innerHTML = f;
      if (p._checkForHiddenParent) {
        p._addInput();
        if (!p.host.attr("tabIndex")) {
          p.host.attr("tabIndex", 1);
        }
      }
      p.filter = a(p.element.firstChild.firstChild.firstChild);
      p.filterInput = a(p.filter[0].firstChild);
      p.filterInput.attr("placeholder", p.filterPlaceHolder);
      p.filterInput.addClass(
        p.toThemeProperty(
          "jqx-widget jqx-listbox-filter-input jqx-input jqx-rc-all"
        )
      );
      p.addHandler(p.filterInput, "keyup.textchange", function (s) {
        if (s.keyCode == 13) {
          p._search(s);
        } else {
          if (p.filterDelay > 0) {
            if (p._filterTimer) {
              clearTimeout(p._filterTimer);
            }
            p._filterTimer = setTimeout(function () {
              p._search(s);
            }, p.filterDelay);
          }
        }
        s.stopPropagation();
      });
      var l = a(
        p.element.firstChild.firstChild.firstChild.nextSibling.nextSibling
      );
      if (!p.host.jqxButton) {
        throw new Error("jqxListBox: Missing reference to jqxbuttons.js.");
        return;
      }
      if (!l.jqxScrollBar) {
        throw new Error("jqxListBox: Missing reference to jqxscrollbar.js.");
        return;
      }
      var e = parseInt(p.host.height()) / 2;
      if (e == 0) {
        e = 10;
      }
      p.vScrollBar = l.jqxScrollBar({
        _initialLayout: true,
        vertical: true,
        rtl: p.rtl,
        theme: p.theme,
        touchMode: p.touchMode,
        largestep: e,
      });
      var q = a(
        p.element.firstChild.firstChild.firstChild.nextSibling.nextSibling
          .nextSibling
      );
      p.hScrollBar = q.jqxScrollBar({
        _initialLayout: true,
        vertical: false,
        rtl: p.rtl,
        touchMode: p.touchMode,
        theme: p.theme,
      });
      p.content = a(p.element.firstChild.firstChild.firstChild.nextSibling);
      p.content[0].id = "listBoxContent" + p.element.id;
      p.bottomRight = a(
        p.element.firstChild.firstChild.firstChild.nextSibling.nextSibling
          .nextSibling.nextSibling
      )
        .addClass(p.toThemeProperty("jqx-listbox-bottomright"))
        .addClass(p.toThemeProperty("jqx-scrollbar-state-normal"));
      p.bottomRight[0].id = "bottomRight" + p.element.id;
      p.vScrollInstance = a.data(p.vScrollBar[0], "jqxScrollBar").instance;
      p.hScrollInstance = a.data(p.hScrollBar[0], "jqxScrollBar").instance;
      if (p.isTouchDevice()) {
        if (!(a.jqx.browser.msie && a.jqx.browser.version < 9)) {
          var n = a(
            "<div class='overlay' unselectable='on' style='z-index: 99; -webkit-appearance: none; border: none; background: black; opacity: 0.01; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>"
          );
          p.content.parent().append(n);
          p.overlayContent = p.host.find(".overlay");
          if (p.filterable) {
            p.overlayContent.css("top", "30px");
          }
        }
      }
      p._updateTouchScrolling();
      p.host.addClass("jqx-disableselect");
      if (p.host.jqxDragDrop) {
        window.jqxListBoxDragDrop();
      }
    },
    _highlight: function (b, c) {
      var d = c.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      return b.replace(new RegExp("(" + d + ")", "ig"), function (e, f) {
        return "<b>" + f + "</b>";
      });
    },
    _addInput: function () {
      var b = this.host.attr("name");
      if (b) {
        this.host.attr("name", "");
      }
      this.input = a("<input type='hidden'/>");
      this.host.append(this.input);
      this.input.attr("name", b);
    },
    _updateTouchScrolling: function () {
      var b = this;
      if (this.isTouchDevice()) {
        b.enableHover = false;
        var c = this.overlayContent ? this.overlayContent : this.content;
        this.removeHandler(
          a(c),
          a.jqx.mobile.getTouchEventName("touchstart") + ".touchScroll"
        );
        this.removeHandler(
          a(c),
          a.jqx.mobile.getTouchEventName("touchmove") + ".touchScroll"
        );
        this.removeHandler(
          a(c),
          a.jqx.mobile.getTouchEventName("touchend") + ".touchScroll"
        );
        this.removeHandler(a(c), "touchcancel.touchScroll");
        a.jqx.mobile.touchScroll(
          c,
          b.vScrollInstance.max,
          function (f, e) {
            if (e != null && b.vScrollBar.css("visibility") != "hidden") {
              var d = b.vScrollInstance.value;
              b.vScrollInstance.setPosition(e);
              b._lastScroll = new Date();
            }
            if (f != null && b.hScrollBar.css("visibility") != "hidden") {
              var d = b.hScrollInstance.value;
              b.hScrollInstance.setPosition(f);
              b._lastScroll = new Date();
            }
          },
          this.element.id,
          this.hScrollBar,
          this.vScrollBar
        );
        if (
          b.vScrollBar.css("visibility") != "visible" &&
          b.hScrollBar.css("visibility") != "visible"
        ) {
          a.jqx.mobile.setTouchScroll(false, this.element.id);
        } else {
          a.jqx.mobile.setTouchScroll(true, this.element.id);
        }
        this._arrange();
      }
    },
    isTouchDevice: function () {
      var b = a.jqx.mobile.isTouchDevice();
      if (this.touchMode == true) {
        if (this.touchDevice) {
          return true;
        }
        if (a.jqx.browser.msie && a.jqx.browser.version < 9) {
          return false;
        }
        this.touchDevice = true;
        b = true;
        a.jqx.mobile.setMobileSimulator(this.element);
      } else {
        if (this.touchMode == false) {
          b = false;
        }
      }
      if (b && this.touchModeStyle != false) {
        this.scrollBarSize = a.jqx.utilities.touchScrollBarSize;
      }
      if (b) {
        this.host.addClass(this.toThemeProperty("jqx-touch"));
      }
      return b;
    },
    beginUpdate: function () {
      this.updatingListBox = true;
    },
    endUpdate: function () {
      this.updatingListBox = false;
      if (
        (this.allowDrag && this._enableDragDrop) ||
        (this.virtualSize && this.virtualSize.height < 10 + this.host.height())
      ) {
        this._addItems(true);
      } else {
        this._addItems(false);
      }
      this._renderItems();
      if (this.allowDrag && this._enableDragDrop) {
        this._enableDragDrop();
      }
    },
    beginUpdateLayout: function () {
      this.updating = true;
    },
    resumeUpdateLayout: function () {
      this.updating = false;
      this.vScrollInstance.value = 0;
      this._render(false);
    },
    propertiesChangedHandler: function (b, c, d) {
      if (d.width && d.height && Object.keys(d).length == 2) {
        b._cachedItemHtml = new Array();
        b.refresh();
      }
    },
    propertyChangedHandler: function (b, c, e, d) {
      if (this.isInitialized == undefined || this.isInitialized == false) {
        return;
      }
      if (e == d) {
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
      if (c == "_renderOnDemand") {
        b._render(false, true);
        if (b.selectedIndex != -1) {
          var f = b.selectedIndex;
          b.selectedIndex = -1;
          b._stopEvents = true;
          b.selectIndex(f, false, true);
          if (b.selectedIndex == -1) {
            b.selectedIndex = f;
          }
          b._stopEvents = false;
        }
      }
      if (c == "filterable") {
        b.refresh();
      }
      if (c == "filterHeight") {
        b._arrange();
      }
      if (c == "filterPlaceHolder") {
        b.filterInput.attr("placeholder", d);
      }
      if (c == "renderer") {
        b._cachedItemHtml = new Array();
        b.refresh();
      }
      if (c == "itemHeight" || c === "checkboxSize") {
        b.refresh();
      }
      if (c == "source" || c == "checkboxes") {
        if (d == null && e && e.unbindBindingUpdate) {
          e.unbindBindingUpdate(b.element.id);
          e.unbindDownloadComplete(b.element.id);
        }
        b.clearSelection();
        b.refresh();
      }
      if (c == "scrollBarSize" || c == "equalItemsWidth") {
        if (d != e) {
          b._updatescrollbars();
        }
      }
      if (c == "disabled") {
        b._renderItems();
        b.vScrollBar.jqxScrollBar({ disabled: d });
        b.hScrollBar.jqxScrollBar({ disabled: d });
      }
      if (c == "touchMode" || c == "rtl") {
        b._removeHandlers();
        b.vScrollBar.jqxScrollBar({ touchMode: d });
        b.hScrollBar.jqxScrollBar({ touchMode: d });
        if (c == "touchMode") {
          if (!(a.jqx.browser.msie && a.jqx.browser.version < 9)) {
            var h = a(
              "<div class='overlay' unselectable='on' style='z-index: 99; -webkit-appearance: none; border: none; background: black; opacity: 0.01; outline: none; border: none; padding: 0px; overflow: hidden; margin: 0px; align:left; valign:top; left: 0px; top: 0px; position: absolute;'></div>"
            );
            b.content.parent().append(h);
            b.overlayContent = b.host.find(".overlay");
          }
        }
        if (b.filterable && b.filterInput) {
          if (c == "rtl" && d) {
            b.filterInput.addClass(b.toThemeProperty("jqx-rtl"));
          } else {
            if (c == "rtl" && !d) {
              b.filterInput.removeClass(b.toThemeProperty("jqx-rtl"));
            }
          }
          b._arrange();
        }
        b._updateTouchScrolling();
        b._addHandlers();
        b._render(false);
      }
      if (!this.updating) {
        if (c == "width" || c == "height") {
          b._updateSize();
        }
      }
      if (c == "theme") {
        if (e != d) {
          b.hScrollBar.jqxScrollBar({ theme: b.theme });
          b.vScrollBar.jqxScrollBar({ theme: b.theme });
          b.host.removeClass();
          b.host.addClass(b.toThemeProperty("jqx-listbox"));
          b.host.addClass(b.toThemeProperty("jqx-widget"));
          b.host.addClass(b.toThemeProperty("jqx-widget-content"));
          b.host.addClass(b.toThemeProperty("jqx-reset"));
          b.host.addClass(b.toThemeProperty("jqx-rc-all"));
          b.refresh();
        }
      }
      if (c == "selectedIndex") {
        b.clearSelection();
        b.selectIndex(d, true);
      }
      if (c == "displayMember" || c == "valueMember") {
        if (e != d) {
          var g = b.selectedIndex;
          b.refresh();
          b.selectedIndex = g;
          b.selectedIndexes[g] = g;
        }
        b._renderItems();
      }
      if (c == "autoHeight") {
        if (e != d) {
          b._render(false);
        } else {
          b._updatescrollbars();
          b._renderItems();
        }
      }
      if (b._checkForHiddenParent && a.jqx.isHidden(b.host)) {
        a.jqx.utilities.resize(
          this.host,
          function () {
            b._updateSize();
          },
          false,
          b._checkForHiddenParent
        );
      }
    },
    loadFromSelect: function (g) {
      if (g == null) {
        return;
      }
      var c = "#" + g;
      var d = a(c);
      if (d.length > 0) {
        var b = a.jqx.parseSourceTag(d[0]);
        var f = b.items;
        var e = b.index;
        this.source = f;
        this.fromSelect = true;
        this.clearSelection();
        this.selectedIndex = e;
        this.selectedIndexes[this.selectedIndex] = this.selectedIndex;
        this.refresh();
      }
    },
    invalidate: function () {
      this._cachedItemHtml = [];
      this._renderItems();
      this.virtualSize = null;
      this._updateSize();
    },
    refresh: function (c) {
      var b = this;
      if (this.vScrollBar == undefined) {
        return;
      }
      this.itemHeight = parseInt(this.itemHeight);
      this._cachedItemHtml = [];
      this.visibleItems = new Array();
      var d = function (e) {
        if (e == true) {
          if (b.selectedIndex != -1) {
            var f = b.selectedIndex;
            b.selectedIndex = -1;
            b._stopEvents = true;
            b.selectIndex(f, false, true);
            if (b.selectedIndex == -1) {
              b.selectedIndex = f;
            }
            b._stopEvents = false;
          }
        }
      };
      if (this.itemswrapper != null) {
        this.itemswrapper.remove();
        this.itemswrapper = null;
      }
      if (a.jqx.dataAdapter && this.source != null && this.source._source) {
        this.databind(this.source, c);
        d(c);
        return;
      }
      if (this.autoBind || (!this.autoBind && !c)) {
        if (this.field) {
          this.loadSelectTag();
        }
        this.items = this.loadItems(this.source);
      }
      this._render(false, c == true);
      d(c);
      this._raiseEvent("6");
    },
    loadSelectTag: function () {
      var b = a.jqx.parseSourceTag(this.field);
      this.source = b.items;
      if (this.selectedIndex == -1) {
        this.selectedIndex = b.index;
      }
    },
    _render: function (c, b) {
      if (this._renderOnDemand) {
        this.visibleItems = new Array();
        this.renderedVisibleItems = new Array();
        this._renderItems();
        return;
      }
      this._addItems();
      this._renderItems();
      this.vScrollInstance.setPosition(0);
      this._cachedItemHtml = new Array();
      if (c == undefined || c) {
        if (this.items != undefined && this.items != null) {
          if (
            this.selectedIndex >= 0 &&
            this.selectedIndex < this.items.length
          ) {
            this.selectIndex(this.selectedIndex, true, true, true);
          }
        }
      }
      if (this.allowDrag && this._enableDragDrop) {
        this._enableDragDrop();
        if (this.isTouchDevice()) {
          this._removeHandlers();
          if (this.overlayContent) {
            this.overlayContent.remove();
            this.overlayContent = null;
          }
          this._updateTouchScrolling();
          this._addHandlers();
          return;
        }
      }
      this._updateTouchScrolling();
      if (this.rendered) {
        this.rendered();
      }
      if (this.ready) {
        this.ready();
      }
    },
    _hitTest: function (c, f) {
      if (this.filterable) {
        f -= this.filterHeight;
        if (f < 0) {
          f = 0;
        }
      }
      var e = parseInt(this.vScrollInstance.value);
      var b = this._searchFirstVisibleIndex(f + e, this.renderedVisibleItems);
      if (
        this.renderedVisibleItems[b] != undefined &&
        this.renderedVisibleItems[b].isGroup
      ) {
        return null;
      }
      if (this.renderedVisibleItems.length > 0) {
        var d = this.renderedVisibleItems[this.renderedVisibleItems.length - 1];
        if (d.height + d.top < f + e) {
          return null;
        }
      }
      b = this._searchFirstVisibleIndex(f + e);
      return this.visibleItems[b];
      return null;
    },
    _searchFirstVisibleIndex: function (f, g) {
      if (f == undefined) {
        f = parseInt(this.vScrollInstance.value);
      }
      var d = 0;
      if (g == undefined || g == null) {
        g = this.visibleItems;
      }
      var b = g.length;
      while (d <= b) {
        var c = parseInt((d + b) / 2);
        var e = g[c];
        if (e == undefined) {
          break;
        }
        if (e.initialTop > f && e.initialTop + e.height > f) {
          b = c - 1;
        } else {
          if (e.initialTop < f && e.initialTop + e.height <= f) {
            d = c + 1;
          } else {
            return c;
            break;
          }
        }
      }
      return 0;
    },
    _renderItems: function () {
      if (this.items == undefined || this.items.length == 0) {
        this.visibleItems = new Array();
        return;
      }
      if (this.updatingListBox == true) {
        return;
      }
      var O = this.isTouchDevice();
      var H = this.vScrollInstance;
      var h = this.hScrollInstance;
      var g = parseInt(H.value);
      var f = parseInt(h.value);
      if (this.rtl) {
        if (this.hScrollBar[0].style.visibility != "hidden") {
          f = h.max - f;
        }
      }
      var C = this.items.length;
      var N = this.host.width();
      var L = parseInt(this.content[0].style.width);
      var b = L + parseInt(h.max);
      var r = parseInt(this.vScrollBar[0].style.width) + 2;
      if (this.vScrollBar[0].style.visibility == "hidden") {
        r = 0;
      }
      if (this.hScrollBar[0].style.visibility != "visible") {
        b = L;
      }
      var l = this._getVirtualItemsCount();
      var M = new Array();
      var G = 0;
      var F = parseInt(this.element.style.height) + 2;
      if (this.element.style.height.indexOf("%") != -1) {
        F = this.host.outerHeight();
      }
      if (isNaN(F)) {
        F = 0;
      }
      var u = 0;
      var t = 0;
      var R = 0;
      if (H.value == 0 || this.visibleItems.length == 0) {
        for (var s = 0; s < this.items.length; s++) {
          var z = this.items[s];
          if (z.visible) {
            z.top = -g;
            z.initialTop = -g;
            if (!z.isGroup && z.visible) {
              this.visibleItems[t++] = z;
              z.visibleIndex = t - 1;
            }
            this.renderedVisibleItems[R++] = z;
            z.left = -f;
            var c = z.top + z.height;
            if (c >= 0 && z.top - z.height <= F) {
              M[G++] = { index: s, item: z };
            }
            g -= z.height;
            g--;
          }
        }
      }
      var m =
        g > 0
          ? this._searchFirstVisibleIndex(
              this.vScrollInstance.value,
              this.renderedVisibleItems
            )
          : 0;
      var P = 0;
      G = 0;
      var A = this.vScrollInstance.value;
      var K = 0;
      while (P < 100 + F) {
        var z = this.renderedVisibleItems[m];
        if (z == undefined) {
          break;
        }
        if (z.visible) {
          z.left = -f;
          var c = z.top + z.height - A;
          if (c >= 0 && z.initialTop - A - z.height <= 2 * F) {
            M[G++] = { index: m, item: z };
          }
        }
        m++;
        if (z.visible) {
          P += z.initialTop - A + z.height - P;
        }
        K++;
        if (K > this.items.length - 1) {
          break;
        }
      }
      if (this._renderOnDemand) {
        return;
      }
      var p =
        this.toThemeProperty("jqx-listitem-state-normal") +
        " " +
        this.toThemeProperty("jqx-item");
      var i = this.toThemeProperty("jqx-listitem-state-group");
      var Q =
        this.toThemeProperty("jqx-listitem-state-disabled") +
        " " +
        this.toThemeProperty("jqx-fill-state-disabled");
      if (this.checkboxes) {
        p += " checkboxes";
      }
      var D = 0;
      var n = this;
      for (var s = 0; s < this.visualItems.length; s++) {
        var E = this.visualItems[s];
        var J = function () {
          var y = E[0].firstChild;
          if (n.checkboxes) {
            y = E[0].lastChild;
          }
          if (y != null) {
            y.style.visibility = "hidden";
            y.className = "";
          }
          if (n.checkboxes) {
            var S = E[0].firstChild;
            S.style.visibility = "hidden";
          }
        };
        if (s < M.length) {
          var z = M[s].item;
          if (z.initialTop - A >= F) {
            J();
            continue;
          }
          var B = a(E[0].firstChild);
          if (this.checkboxes) {
            B = a(E[0].lastChild);
          }
          if (B.length == 0) {
            continue;
          }
          if (B[0] == null) {
            continue;
          }
          B[0].className = "";
          B[0].style.display = "block";
          B[0].style.visibility = "inherit";
          var q = "";
          if (!z.isGroup && !this.selectedIndexes[z.index] >= 0) {
            q = p;
          } else {
            q = i;
          }
          if (z.disabled || this.disabled) {
            q += " " + Q;
          }
          if (this.roundedcorners) {
            q += " " + this.toThemeProperty("jqx-rc-all");
          }
          if (O) {
            q += " " + this.toThemeProperty("jqx-listitem-state-normal-touch");
          }
          B[0].className = q;
          if (this.renderer) {
            if (!z.key) {
              z.key = this.generatekey();
            }
            if (!this._cachedItemHtml) {
              this._cachedItemHtml = new Array();
            }
            if (this._cachedItemHtml[z.key]) {
              if (B[0].innerHTML != this._cachedItemHtml[z.key]) {
                B[0].innerHTML = this._cachedItemHtml[z.key];
              }
            } else {
              var x = this.renderer(z.index, z.label, z.value);
              B[0].innerHTML = x;
              this._cachedItemHtml[z.key] = B[0].innerHTML;
            }
          } else {
            if (this.itemHeight !== -1) {
              var k = 2 + 2 * parseInt(B.css("padding-top"));
              B[0].style.lineHeight = z.height - k + "px";
              B.css("vertical-align", "middle");
            }
            if (z.html != null && z.html.toString().length > 0) {
              B[0].innerHTML = z.html;
            } else {
              if (z.label != null || z.value != null) {
                if (z.label != null) {
                  if (B[0].innerHTML !== z.label) {
                    B[0].innerHTML = z.label;
                  }
                  if (a.trim(z.label) == "") {
                    B[0].innerHTML = this.emptyString;
                    if (this.emptyString == "") {
                      B[0].style.height = z.height - 8 + "px";
                    }
                  }
                  if (!this.incrementalSearch && !z.disabled) {
                    if (
                      this.searchString != undefined &&
                      this.searchString != ""
                    ) {
                      B[0].innerHTML = this._highlight(
                        z.label.toString(),
                        this.searchString
                      );
                    }
                  }
                } else {
                  if (z.label === null) {
                    B[0].innerHTML = this.emptyString;
                    if (this.emptyString == "") {
                      B[0].style.height = z.height - 8 + "px";
                    }
                  } else {
                    if (B[0].innerHTML !== z.value) {
                      B[0].innerHTML = z.value;
                    } else {
                      if (z.label == "") {
                        B[0].innerHTML = " ";
                      }
                    }
                  }
                }
              } else {
                if (z.label == "" || z.label == null) {
                  B[0].innerHTML = "";
                  B[0].style.height = z.height - 8 + "px";
                }
              }
            }
          }
          E[0].style.left = z.left + "px";
          E[0].style.top = z.initialTop - A + "px";
          z.element = B[0];
          if (this.isMaterialized() && !this.renderer) {
            if (this._checkForHiddenParent) {
              a(z.element).addClass("ripple");
              a.jqx.ripple(a(z.element));
            }
          }
          if (z.title) {
            B[0].title = z.title;
          }
          if (this.equalItemsWidth && !z.isGroup) {
            if (u == 0) {
              var d = parseInt(b);
              var w = parseInt(B.outerWidth()) - parseInt(B.width());
              d -= w;
              var I = 1;
              if (I != null) {
                I = parseInt(I);
              } else {
                I = 0;
              }
              if (this.host.css("box-sizing") === "border-box") {
                d -= 2;
              }
              u = d;
              if (
                this.checkboxes &&
                this.hScrollBar[0].style.visibility == "hidden"
              ) {
                u -= this.checkboxSize + 13;
              }
            }
            if (L > this.virtualSize.width) {
              B[0].style.width = u + "px";
              z.width = u;
            } else {
              B[0].style.width = -4 + this.virtualSize.width + "px";
              z.width = this.virtualSize.width - 4;
            }
          } else {
            if (B.width() < this.host.width()) {
              B.width(this.host.width() - 2);
            }
          }
          if (this.rtl) {
            B[0].style.textAlign = "right";
          }
          if (this.autoItemsHeight) {
            B[0].style.whiteSpace = "pre-line";
            B.width(u);
            z.width = u;
          }
          D = 0;
          if (this.checkboxes && !z.isGroup) {
            if (D == 0) {
              D = (z.height - this.checkboxSize - 3) / 2;
              D = parseInt(D);
              D++;
            }
            var e = a(E.children()[0]);
            e[0].item = z;
            if (!this.rtl) {
              var o = this.checkboxSize + 9;
              if (B[0].style.left != o + "px") {
                B[0].style.left = o + "px";
              }
            } else {
              if (B[0].style.left != "0px") {
                B[0].style.left = "0px";
              }
            }
            if (this.rtl) {
              e.css("left", 8 + z.width + "px");
            }
            e[0].style.top = D + "px";
            e[0].style.display = "block";
            e[0].style.visibility = "inherit";
            var v = z.checked;
            var j = z.checked
              ? " " + this.toThemeProperty("jqx-checkbox-check-checked")
              : "";
            e[0].setAttribute("checked", z.checked);
            if (
              e[0].firstChild &&
              e[0].firstChild.firstChild &&
              e[0].firstChild.firstChild.firstChild
            ) {
              if (e[0].firstChild.firstChild) {
                if (v) {
                  e[0].firstChild.firstChild.firstChild.className = j;
                } else {
                  if (v === false) {
                    e[0].firstChild.firstChild.firstChild.className = "";
                  } else {
                    if (v === null) {
                      e[0].firstChild.firstChild.firstChild.className =
                        this.toThemeProperty(
                          "jqx-checkbox-check-indeterminate"
                        );
                    }
                  }
                }
              }
            }
            if (a.jqx.ariaEnabled) {
              if (v) {
                E[0].setAttribute("aria-selected", true);
              } else {
                E[0].removeAttribute("aria-selected");
              }
            }
          } else {
            if (this.checkboxes) {
              var e = a(E.children()[0]);
              e.css({ display: "none", visibility: "inherit" });
            }
          }
          if (
            !z.disabled &&
            ((!this.filterable && this.selectedIndexes[z.visibleIndex] >= 0) ||
              (z.selected && this.filterable))
          ) {
            B.addClass(this.toThemeProperty("jqx-listitem-state-selected"));
            B.addClass(this.toThemeProperty("jqx-fill-state-pressed"));
            if (a.jqx.ariaEnabled) {
              E[0].setAttribute("aria-selected", true);
              this._activeElement = E[0];
            }
          } else {
            if (!this.checkboxes) {
              if (a.jqx.ariaEnabled) {
                E[0].removeAttribute("aria-selected");
              }
            }
          }
        } else {
          J();
        }
      }
    },
    escapeHTML: function (c) {
      var b = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
      };
      return String(c).replace(/[&<>"'`=\/]/g, function (d) {
        return b[d];
      });
    },
    sanitizeHTML: function (e) {
      var d = this;
      var c = new RegExp(
        "<s*(applet|audio|base|bgsound|embed|form|iframe|isindex|keygen|layout|link|meta|object|script|svg|style|template|video)[^>]*>(.*?)<s*/s*(applet|audio|base|bgsound|embed|form|iframe|isindex|keygen|layout|link|meta|object|script|svg|style|template|video)>",
        "ig"
      );
      var b = String(e).replace(c, function (f) {
        return d.escapeHTML(f);
      });
      return b;
    },
    escape_HTML: function (b) {
      b = "" + b;
      if (
        b &&
        (b.indexOf("onclick") >= 0 ||
          b.indexOf("onload") >= 0 ||
          b.indexOf("onerror") >= 0)
      ) {
        return this.escapeHTML(b);
      }
      var c = this.sanitizeHTML(b);
      return c;
    },
    generatekey: function () {
      var b = function () {
        return (((1 + Math.random()) * 65536) | 0).toString(16).substring(1);
      };
      return (
        b() + b() + "-" + b() + "-" + b() + "-" + b() + "-" + b() + b() + b()
      );
    },
    _calculateVirtualSize: function (l) {
      if (this._renderOnDemand) {
        return;
      }
      var p = 0;
      var n = 2;
      var g = 0;
      var o = document.createElement("span");
      if (this.equalItemsWidth) {
        a(o).css("float", "left");
      }
      o.style.whiteSpace = "pre";
      var h = 0;
      var i = undefined === l ? this.host.outerHeight() : l + 2;
      document.body.appendChild(o);
      var e = this.items.length;
      var j = this.host.width();
      if (this.autoItemsHeight) {
        j -= 10;
        if (this.vScrollBar.css("visibility") != "hidden") {
          j -= 20;
        }
      }
      if (
        this.autoItemsHeight ||
        this.renderer ||
        this.groups.length >= 1 ||
        (e > 0 && this.items[0].html != null && this.items[0].html != "")
      ) {
        for (var g = 0; g < e; g++) {
          var s = this.items[g];
          if (s.isGroup && s.label == "" && s.html == "") {
            continue;
          }
          if (!s.visible) {
            continue;
          }
          var d = "";
          if (!s.isGroup) {
            d += this.toThemeProperty(
              "jqx-widget jqx-listitem-state-normal jqx-rc-all"
            );
          } else {
            d += this.toThemeProperty("jqx-listitem-state-group jqx-rc-all");
          }
          d += " " + this.toThemeProperty("jqx-fill-state-normal");
          if (this.isTouchDevice()) {
            d += " " + this.toThemeProperty("jqx-touch");
          }
          o.className = d;
          if (this.autoItemsHeight) {
            o.style.whiteSpace = "pre-line";
            var u = this.checkboxSize + 9;
            var c = this.checkboxes ? -u : 0;
            o.style.width = c + j + "px";
          }
          if (this.renderer) {
            var k = this.renderer(s.index, s.label, s.value);
            o.innerHTML = k;
          } else {
            if (s.html != null && s.html.toString().length > 0) {
              o.innerHTML = s.html;
            } else {
              if (s.label != null || s.value != null) {
                if (s.label != null) {
                  o.innerHTML = this.escape_HTML(s.label);
                  if (s.label == "") {
                    o.innerHTML = "Empty";
                  }
                } else {
                  o.innerHTML = this.escape_HTML(s.value);
                }
              }
            }
          }
          var r = o.offsetHeight;
          var t = o.offsetWidth;
          if (this.itemHeight > -1) {
            r = this.itemHeight;
          }
          s.height = r;
          s.width = t;
          r++;
          n += r;
          p = Math.max(p, t);
          if (n <= i) {
            h++;
          }
        }
      } else {
        var n = 0;
        var m = 0;
        var b = "";
        var v = 0;
        var f = 0;
        var q = -1;
        for (var g = 0; g < e; g++) {
          var s = this.items[g];
          if (s.isGroup && s.label == "" && s.html == "") {
            continue;
          }
          if (!s.visible) {
            continue;
          }
          q++;
          var d = "";
          if (q == 0) {
            d += this.toThemeProperty("jqx-listitem-state-normal jqx-rc-all");
            d += " " + this.toThemeProperty("jqx-fill-state-normal");
            d += " " + this.toThemeProperty("jqx-widget");
            d += " " + this.toThemeProperty("jqx-listbox");
            d += " " + this.toThemeProperty("jqx-widget-content");
            if (this.isTouchDevice()) {
              d += " " + this.toThemeProperty("jqx-touch");
              d +=
                " " + this.toThemeProperty("jqx-listitem-state-normal-touch");
            }
            o.className = d;
            if (this.autoItemsHeight) {
              o.style.whiteSpace = "pre-line";
              var u = this.checkboxSize + 9;
              var c = this.checkboxes ? -u : 0;
              o.style.width = c + j + "px";
            }
            if (s.html == null || s.label == "" || s.label == null) {
              o.innerHTML = "Item";
            } else {
              if (s.html != null && s.html.toString().length > 0) {
                o.innerHTML = s.html;
              } else {
                if (s.label != null || s.value != null) {
                  if (s.label != null) {
                    if (
                      s.label.toString().match(new RegExp("\\w")) != null ||
                      s.label.toString().match(new RegExp("\\d")) != null
                    ) {
                      o.innerHTML = s.label;
                    } else {
                      o.innerHTML = "Item";
                    }
                  } else {
                    o.innerHTML = s.value;
                  }
                }
              }
            }
            var r = 1 + o.offsetHeight;
            if (this.itemHeight > -1) {
              r = this.itemHeight;
            }
            m = r;
          }
          if (v != undefined) {
            f = v;
          }
          if (s.html != null && s.html.toString().length > 0) {
            v = Math.max(v, s.html.toString().length);
            if (f != v) {
              b = s.html;
            }
          } else {
            if (s.label != null) {
              v = Math.max(v, s.label.length);
              if (f != v) {
                b = s.label;
              }
            } else {
              if (s.value != null) {
                v = Math.max(v, s.value.length);
                if (f != v) {
                  b = s.value;
                }
              }
            }
          }
          s.height = m;
          n += m;
          n++;
          if (n <= i) {
            h++;
          }
        }
        o.innerHTML = b;
        p = o.offsetWidth;
      }
      n += 2;
      if (h < 10) {
        h = 10;
      }
      if (this.filterable) {
        n += this.filterHeight;
      }
      n -= 4;
      o.parentNode.removeChild(o);
      return { width: p, height: n, itemsPerPage: h };
    },
    _getVirtualItemsCount: function () {
      if (this.virtualItemsCount == 0) {
        var b = parseInt(this.host.height()) / 5;
        if (b > this.items.length) {
          b = this.items.length;
        }
        return b;
      } else {
        return this.virtualItemsCount;
      }
    },
    _addItems: function (r) {
      if (this._renderOnDemand) {
        return;
      }
      var v = this;
      if (v.updatingListBox == true) {
        return;
      }
      if (v.items == undefined || v.items.length == 0) {
        v.virtualSize = { width: 0, height: 0, itemsPerPage: 0 };
        v._updatescrollbars();
        v.renderedVisibleItems = new Array();
        if (v.itemswrapper) {
          v.itemswrapper.children().remove();
        }
        return;
      }
      var h = v.host.height();
      if (r == false) {
        var b = v._calculateVirtualSize(h);
        var g = b.itemsPerPage * 2;
        if (v.autoHeight) {
          g = v.items.length;
        }
        v.virtualItemsCount = Math.min(g, v.items.length);
        var q = b.width;
        v.virtualSize = b;
        v._updatescrollbars();
        return;
      }
      var n = this;
      var l = 0;
      v.visibleItems = new Array();
      v.renderedVisibleItems = new Array();
      v._removeHandlers();
      if (v.allowDrag && v._enableDragDrop) {
        v.itemswrapper = null;
      }
      if (v.itemswrapper == null) {
        v.content[0].innerHTML = "";
        v.itemswrapper = a(
          '<div style="outline: 0 none; overflow:hidden; width:100%; position: relative;"></div>'
        );
        v.itemswrapper[0].style.height = 2 * h + "px";
        v.content[0].appendChild(v.itemswrapper[0]);
      }
      var b = v._calculateVirtualSize(h);
      var g = b.itemsPerPage * 2;
      if (v.autoHeight) {
        g = v.items.length;
      }
      v.virtualItemsCount = Math.min(g, v.items.length);
      var v = this;
      var q = b.width;
      v.virtualSize = b;
      var c = Math.max(v.host.width(), 17 + b.width);
      v.itemswrapper[0].style.width = c + "px";
      var e = 0;
      var i = "";
      var f = a.jqx.browser.msie && a.jqx.browser.version < 9;
      var s = f ? ' unselectable="on"' : "";
      for (var j = e; j < v.virtualItemsCount; j++) {
        var u = v.items[j];
        var p = "listitem" + j + v.element.id;
        if (v.theme != "") {
          i +=
            "<div" +
            s +
            " role='option' id='" +
            p +
            "' class='jqx-listitem-element jqx-listitem-element-" +
            v.theme +
            "'>";
        } else {
          i +=
            "<div" +
            s +
            " role='option' id='" +
            p +
            "' class='jqx-listitem-element'>";
        }
        if (v.checkboxes) {
          var w = this.checkboxSize + 8;
          i +=
            '<div style="background-color: transparent; padding: 0; margin: 0; overflow:hidden; position: absolute; float: left; width: ' +
            w +
            "px; height:  " +
            w +
            'px;" class="' +
            v.toThemeProperty("jqx-checkbox") +
            ' chkbox">';
          var o =
            '<div class="' +
            v.toThemeProperty("jqx-checkbox-default") +
            " " +
            v.toThemeProperty("jqx-fill-state-normal") +
            " " +
            v.toThemeProperty("jqx-rc-all") +
            '"><div style="cursor: pointer; width:  ' +
            this.checkboxSize +
            "px; height:  " +
            this.checkboxSize +
            'px;">';
          var x = u.checked
            ? " " + v.toThemeProperty("jqx-checkbox-check-checked")
            : "";
          o +=
            '<span style="width: ' +
            this.checkboxSize +
            "px; height:  " +
            this.checkboxSize +
            'px;" class="checkBoxCheck' +
            x +
            '"></span>';
          o += "</div></div>";
          i += o;
          i += "</div>";
        }
        i +=
          "<span" +
          s +
          " style='white-space: pre; -ms-touch-action: none;'></span></div>";
      }
      if (n.WinJS) {
        v.itemswrapper.html(i);
      } else {
        v.itemswrapper[0].innerHTML = i;
      }
      var d = v.itemswrapper.children();
      for (var j = e; j < v.virtualItemsCount; j++) {
        var u = v.items[j];
        var t = a(d[j]);
        if (v.allowDrag && v._enableDragDrop) {
          t.addClass("draggable");
        }
        if (v.checkboxes) {
          var k = a(t.children()[0]);
          t.css("float", "left");
          var m = a(t[0].firstChild);
          m.css("float", "left");
        }
        t[0].style.height = u.height + "px";
        t[0].style.top = l + "px";
        l += u.height + 1;
        v.visualItems[j] = t;
      }
      v._addHandlers();
      v._updatescrollbars();
      if (v.autoItemsHeight) {
        var b = v._calculateVirtualSize(h);
        var g = b.itemsPerPage * 2;
        if (v.autoHeight) {
          g = v.items.length;
        }
        v.virtualItemsCount = Math.min(g, v.items.length);
        var v = this;
        var q = b.width;
        v.virtualSize = b;
        v._updatescrollbars();
      }
      if (a.jqx.browser.msie && a.jqx.browser.version < 8) {
        v.host.attr("hideFocus", true);
        v.host.find("div").attr("hideFocus", true);
      }
    },
    _updatescrollbars: function () {
      var k = this;
      if (!k.virtualSize) {
        return;
      }
      var n = k.virtualSize.height;
      var j = k.virtualSize.width;
      var f = k.vScrollInstance;
      var e = k.hScrollInstance;
      k._arrange(false);
      var l = false;
      var o = k.host.outerWidth();
      var m = k.host.outerHeight();
      var b = 0;
      if (j > o) {
        b = k.hScrollBar.outerHeight() + 2;
      }
      if (n + b > m) {
        var d = f.max;
        f.max = 2 + parseInt(n) + b - parseInt(m - 2);
        if (k.vScrollBar[0].style.visibility != "inherit") {
          k.vScrollBar[0].style.visibility = "inherit";
          l = true;
        }
        if (d != f.max) {
          f._arrange();
        }
      } else {
        if (k.vScrollBar[0].style.visibility != "hidden") {
          k.vScrollBar[0].style.visibility = "hidden";
          l = true;
          f.setPosition(0);
        }
      }
      var h = 0;
      if (k.vScrollBar[0].style.visibility != "hidden") {
        h = k.scrollBarSize + 6;
      }
      var g = k.checkboxes ? this.checkboxSize + 6 : 0;
      if (k.autoItemsHeight) {
        k.hScrollBar[0].style.visibility = "hidden";
      } else {
        if (j >= o - h - g) {
          var i = e.max;
          if (k.vScrollBar[0].style.visibility == "inherit") {
            e.max = g + h + parseInt(j) - k.host.width() + 2;
          } else {
            e.max = g + parseInt(j) - k.host.width() + 4;
          }
          if (k.hScrollBar[0].style.visibility != "inherit") {
            k.hScrollBar[0].style.visibility = "inherit";
            l = true;
          }
          if (i != e.max) {
            e._arrange();
          }
          if (k.vScrollBar[0].style.visibility == "inherit") {
            f.max =
              2 +
              parseInt(n) +
              k.hScrollBar.outerHeight() +
              2 -
              parseInt(k.host.height());
          }
        } else {
          if (k.hScrollBar[0].style.visibility != "hidden") {
            k.hScrollBar[0].style.visibility = "hidden";
            l = true;
          }
        }
      }
      e.setPosition(0);
      if (l) {
        k._arrange();
      }
      if (k.itemswrapper) {
        k.itemswrapper[0].style.width =
          Math.max(0, Math.max(o - 2, 17 + j)) + "px";
        k.itemswrapper[0].style.height = Math.max(0, 2 * m) + "px";
      }
      var c = k.isTouchDevice();
      if (c) {
        if (
          k.vScrollBar.css("visibility") != "visible" &&
          k.hScrollBar.css("visibility") != "visible"
        ) {
          a.jqx.mobile.setTouchScroll(false, k.element.id);
        } else {
          a.jqx.mobile.setTouchScroll(true, k.element.id);
        }
      }
    },
    clear: function () {
      this.source = null;
      this.visibleItems = new Array();
      this.renderedVisibleItems = new Array();
      this.itemsByValue = new Array();
      this.clearSelection();
      this.refresh();
    },
    clearSelection: function (b) {
      for (var c = 0; c < this.selectedIndexes.length; c++) {
        if (this.selectedIndexes[c] && this.selectedIndexes[c] != -1) {
          this._raiseEvent("1", {
            index: c,
            type: "api",
            item: this.getVisibleItem(c),
            originalEvent: null,
          });
        }
        this.selectedIndexes[c] = -1;
      }
      this.selectedIndex = -1;
      this.selectedValue = null;
      this.selectedValues = new Array();
      if (b != false) {
        this._renderItems();
      }
    },
    unselectIndex: function (c, d) {
      if (isNaN(c)) {
        return;
      }
      this.selectedIndexes[c] = -1;
      var g = false;
      for (var e = 0; e < this.selectedIndexes.length; e++) {
        var b = this.selectedIndexes[e];
        if (b != -1 && b != undefined) {
          g = true;
        }
      }
      if (!g) {
        this.selectedValue = null;
        this.selectedIndex = -1;
        var f = this.getVisibleItem(c);
        if (f) {
          if (this.selectedValues[f.value]) {
            this.selectedValues[f.value] = null;
          }
        }
      }
      if (d == undefined || d == true) {
        this._renderItems();
        this._raiseEvent("1", {
          index: c,
          type: "api",
          item: this.getVisibleItem(c),
          originalEvent: null,
        });
      }
      this._updateInputSelection();
      this._raiseEvent("2", { index: c, type: "api", item: this.getItem(c) });
    },
    getInfo: function () {
      var d = this;
      var c = this.getItems();
      var b = this.getVisibleItems();
      var e = (function () {
        var h = d.vScrollInstance.value;
        if (d.filterable) {
          h -= d.filterHeight;
        }
        var m = new Array();
        for (var g = 0; g < b.length; g++) {
          var j = b[g];
          if (j) {
            var f = j.initialTop;
            var l = j.height;
            var k = true;
            if (f + l - h < 0 || f - h >= d.host.height()) {
              k = false;
            }
            if (k) {
              m.push(j);
            }
          }
        }
        return m;
      })();
      return { items: c, visibleItems: b, viewItems: e };
    },
    getItem: function (c) {
      if (c == -1 || isNaN(c) || typeof c === "string") {
        if (c === -1) {
          return null;
        }
        return this.getItemByValue(c);
      }
      var b = null;
      var d = a.each(this.items, function () {
        if (this.index == c) {
          b = this;
          return false;
        }
      });
      return b;
    },
    getVisibleItem: function (b) {
      if (b == -1 || isNaN(b) || typeof b === "string") {
        if (b === -1) {
          return null;
        }
        return this.getItemByValue(b);
      }
      return this.visibleItems[b];
    },
    getVisibleItems: function () {
      return this.visibleItems;
    },
    checkIndex: function (b, c, e) {
      if (!this.checkboxes) {
        return;
      }
      if (isNaN(b)) {
        return;
      }
      if (b < 0 || b >= this.visibleItems.length) {
        return;
      }
      if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
        return;
      }
      if (this.disabled) {
        return;
      }
      var d = this.getItem(b);
      if (this.groups.length > 0 || this.filterable) {
        var d = this.getVisibleItem(b);
      }
      if (d != null) {
        var f = a(d.checkBoxElement);
        d.checked = true;
        if (c == undefined || c == true) {
          this._updateCheckedItems();
        }
      }
      if (e == undefined || e == true) {
        this._raiseEvent(3, {
          label: d.label,
          value: d.value,
          checked: true,
          item: d,
        });
      }
    },
    getCheckedItems: function () {
      if (!this.checkboxes) {
        return null;
      }
      var b = new Array();
      if (this.items == undefined) {
        return;
      }
      a.each(this.items, function () {
        if (this.checked) {
          b[b.length] = this;
        }
      });
      return b;
    },
    checkAll: function (b) {
      if (!this.checkboxes) {
        return;
      }
      if (this.disabled) {
        return;
      }
      var c = this;
      a.each(this.items, function () {
        var d = this;
        var e = d.checked;
        this.checked = true;
        if (b !== false && e !== true) {
          c._raiseEvent(3, {
            label: d.label,
            value: d.value,
            checked: true,
            item: d,
          });
        }
      });
      this._updateCheckedItems();
    },
    uncheckAll: function (b) {
      if (!this.checkboxes) {
        return;
      }
      if (this.disabled) {
        return;
      }
      var c = this;
      a.each(this.items, function () {
        var d = this;
        var e = d.checked;
        this.checked = false;
        if (b !== false && e !== false) {
          this.checked = false;
          c._raiseEvent(3, {
            label: d.label,
            value: d.value,
            checked: false,
            item: d,
          });
        }
      });
      this._updateCheckedItems();
    },
    uncheckIndex: function (b, c, e) {
      if (!this.checkboxes) {
        return;
      }
      if (isNaN(b)) {
        return;
      }
      if (b < 0 || b >= this.visibleItems.length) {
        return;
      }
      if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
        return;
      }
      if (this.disabled) {
        return;
      }
      var d = this.getItem(b);
      if (this.groups.length > 0 || this.filterable) {
        var d = this.getVisibleItem(b);
      }
      if (d != null) {
        var f = a(d.checkBoxElement);
        d.checked = false;
        if (c == undefined || c == true) {
          this._updateCheckedItems();
        }
      }
      if (e == undefined || e == true) {
        this._raiseEvent(3, {
          label: d.label,
          value: d.value,
          checked: false,
          item: d,
        });
      }
    },
    indeterminateIndex: function (b, c, e) {
      if (!this.checkboxes) {
        return;
      }
      if (isNaN(b)) {
        return;
      }
      if (b < 0 || b >= this.visibleItems.length) {
        return;
      }
      if (this.visibleItems[b] != null && this.visibleItems[b].disabled) {
        return;
      }
      if (this.disabled) {
        return;
      }
      var d = this.getItem(b);
      if (this.groups.length > 0 || this.filterable) {
        var d = this.getVisibleItem(b);
      }
      if (d != null) {
        var f = a(d.checkBoxElement);
        d.checked = null;
        if (c == undefined || c == true) {
          this._updateCheckedItems();
        }
      }
      if (e == undefined || e == true) {
        this._raiseEvent(3, { checked: null });
      }
    },
    getSelectedIndex: function () {
      return this.selectedIndex;
    },
    getSelectedItems: function () {
      var b = this.getItems();
      var e = this.selectedIndexes;
      var d = [];
      for (var c in e) {
        if (e[c] != -1) {
          d[d.length] = b[c];
        }
      }
      return d;
    },
    getSelectedItem: function () {
      var b = this.getSelectedItems();
      if (b && b.length > 0) {
        return b[0];
      }
      return null;
    },
    _updateCheckedItems: function () {
      var b = this.selectedIndex;
      this.clearSelection(false);
      var c = this.getCheckedItems();
      this.selectedIndex = b;
      this._renderItems();
      var d = a.data(this.element, "hoveredItem");
      if (d != null) {
        a(d).addClass(this.toThemeProperty("jqx-listitem-state-hover"));
        a(d).addClass(this.toThemeProperty("jqx-fill-state-hover"));
      }
      this._updateInputSelection();
    },
    getItemByValue: function (d) {
      if (this.visibleItems == null) {
        return;
      }
      if (d && d.value) {
        d = d.value;
      }
      if (this.itemsByValue) {
        return this.itemsByValue[a.trim(d).split(" ").join("?")];
      }
      var b = this.visibleItems;
      for (var c = 0; c < b.length; c++) {
        if (b[c].value == d) {
          return b[c];
          break;
        }
      }
    },
    checkItem: function (c) {
      if (c != null) {
        var b = this._getItemByParam(c);
        return this.checkIndex(b.visibleIndex, true);
      }
      return false;
    },
    uncheckItem: function (c) {
      if (c != null) {
        var b = this._getItemByParam(c);
        return this.uncheckIndex(b.visibleIndex, true);
      }
      return false;
    },
    indeterminateItem: function (c) {
      if (c != null) {
        var b = this._getItemByParam(c);
        return this.indeterminateIndex(b.visibleIndex, true);
      }
      return false;
    },
    val: function (c) {
      if (!this.input) {
        return;
      }
      var d = function (f) {
        for (var e in f) {
          if (f.hasOwnProperty(e)) {
            return false;
          }
        }
        if (typeof c == "number") {
          return false;
        }
        if (typeof c == "date") {
          return false;
        }
        if (typeof c == "boolean") {
          return false;
        }
        if (typeof c == "string") {
          return false;
        }
        return true;
      };
      if (d(c) || arguments.length == 0) {
        return this.input.val();
      }
      var b = this.getItemByValue(c);
      if (b != null) {
        this.selectItem(b);
      }
      if (this.input) {
        return this.input.val();
      }
    },
    selectItem: function (c) {
      if (c != null) {
        if (c.index == undefined) {
          var b = this.getItemByValue(c);
          if (b) {
            c = b;
          }
        }
        return this.selectIndex(c.visibleIndex, true);
      } else {
        this.clearSelection();
      }
      return false;
    },
    unselectItem: function (c) {
      if (c != null) {
        if (c.index == undefined) {
          var b = this.getItemByValue(c);
          if (b) {
            c = b;
          }
        }
        return this.unselectIndex(c.visibleIndex, true);
      }
      return false;
    },
    selectIndex: function (j, r, c, d, m, b) {
      if (isNaN(j)) {
        return;
      }
      var q = this.selectedIndex;
      if (this.filterable) {
        this.selectedIndex = -1;
      }
      if (j < -1 || j >= this.visibleItems.length) {
        return;
      }
      if (this.visibleItems[j] != null && this.visibleItems[j].disabled) {
        return;
      }
      if (this.disabled) {
        return;
      }
      if (
        !this.multiple &&
        !this.multipleextended &&
        this.selectedIndex == j &&
        !d &&
        !this.checkboxes
      ) {
        if (
          this.visibleItems &&
          this.items &&
          this.visibleItems.length != this.items.length
        ) {
          h = this.getVisibleItem(j);
          if (h) {
            this.selectedValue = h.value;
            this.selectedValues[h.value] = h.value;
          }
        }
        return;
      }
      if (this.checkboxes) {
        this._updateCheckedItems();
        var p = q;
        if (this.selectedIndex == j && !this.multiple) {
          p = -1;
        }
        if (m == undefined) {
          m = "none";
        }
        var h = this.getItem(j);
        var s = this.getItem(p);
        if (
          this.visibleItems &&
          this.items &&
          this.visibleItems.length != this.items.length
        ) {
          h = this.getVisibleItem(j);
          s = this.getVisibleItem(p);
        }
        this._raiseEvent("1", { index: p, type: m, item: s, originalEvent: b });
        this.selectedIndex = j;
        this.selectedIndexes[p] = -1;
        this.selectedIndexes[j] = j;
        if (h) {
          this.selectedValue = h.value;
          this.selectedValues[h.value] = h.value;
        }
        this._raiseEvent("0", { index: j, type: m, item: h, originalEvent: b });
        this._renderItems();
        return;
      }
      this.focused = true;
      var o = false;
      if (this.selectedIndex != j) {
        o = true;
      }
      var p = q;
      if (this.selectedIndex == j && !this.multiple) {
        p = -1;
      }
      if (m == undefined) {
        m = "none";
      }
      var h = this.getItem(j);
      var s = this.getItem(p);
      if (
        this.visibleItems &&
        this.items &&
        this.visibleItems.length != this.items.length
      ) {
        h = this.getVisibleItem(j);
        s = this.getVisibleItem(p);
      }
      if (d != undefined && d) {
        this._raiseEvent("1", { index: p, type: m, item: s, originalEvent: b });
        this.selectedIndex = j;
        this.selectedIndexes[p] = -1;
        this.selectedIndexes[j] = j;
        if (h) {
          this.selectedValue = h.value;
          this.selectedValues[h.value] = h.value;
        }
        this._raiseEvent("0", { index: j, type: m, item: h, originalEvent: b });
      } else {
        var l = this;
        var e = function (t, x, v, w, u, i) {
          l._raiseEvent("1", { index: x, type: v, item: w, originalEvent: i });
          l.selectedIndex = t;
          l.selectedIndexes = [];
          x = t;
          l.selectedIndexes[t] = t;
          l.selectedValues = new Array();
          if (u) {
            l.selectedValues[u.value] = u.value;
          }
          l._raiseEvent("0", { index: t, type: v, item: u, originalEvent: i });
        };
        var k = function (t, x, v, w, u, i) {
          if (l.selectedIndexes[t] == undefined || l.selectedIndexes[t] == -1) {
            l.selectedIndexes[t] = t;
            l.selectedIndex = t;
            if (u) {
              l.selectedValues[u.value] = u.value;
              l._raiseEvent("0", {
                index: t,
                type: v,
                item: u,
                originalEvent: i,
              });
            }
          } else {
            x = l.selectedIndexes[t];
            w = l.getVisibleItem(x);
            if (w) {
              l.selectedValues[w.value] = null;
            }
            l.selectedIndexes[t] = -1;
            l.selectedIndex = -1;
            l._raiseEvent("1", {
              index: x,
              type: v,
              item: w,
              originalEvent: i,
            });
          }
        };
        if (this.multipleextended) {
          if (!this._shiftKey && !this._ctrlKey) {
            if (m != "keyboard" && m != "mouse") {
              k(j, p, m, s, h, b);
              l._clickedIndex = j;
            } else {
              this.clearSelection(false);
              l._clickedIndex = j;
              e(j, p, m, s, h, b);
            }
          } else {
            if (this._ctrlKey) {
              if (m == "keyboard") {
                this.clearSelection(false);
                l._clickedIndex = j;
              }
              k(j, p, m, s, h, b);
            } else {
              if (this._shiftKey) {
                if (l._clickedIndex == undefined) {
                  l._clickedIndex = p;
                }
                var f = Math.min(l._clickedIndex, j);
                var n = Math.max(l._clickedIndex, j);
                this.clearSelection(false);
                for (var g = f; g <= n; g++) {
                  l.selectedIndexes[g] = g;
                  l.selectedValues[l.getVisibleItem(g).value] =
                    l.getVisibleItem(g).value;
                  l._raiseEvent("0", {
                    index: g,
                    type: m,
                    item: this.getVisibleItem(g),
                    originalEvent: b,
                  });
                }
                if (m != "keyboard") {
                  l.selectedIndex = l._clickedIndex;
                } else {
                  l.selectedIndex = j;
                }
              }
            }
          }
        } else {
          if (this.multiple) {
            k(j, p, m, s, h, b);
          } else {
            if (h) {
              this.selectedValue = h.value;
            }
            e(j, p, m, s, h, b);
          }
        }
      }
      if (c == undefined || c == true) {
        this._renderItems();
      }
      if (r != undefined && r != null && r == true) {
        this.ensureVisible(j);
      }
      this._raiseEvent("2", {
        index: j,
        item: h,
        oldItem: s,
        type: m,
        originalEvent: b,
      });
      this._updateInputSelection();
      return o;
    },
    _updateInputSelection: function () {
      this._syncSelection();
      var c = new Array();
      if (this.input) {
        if (this.selectedIndex == -1) {
          this.input.val("");
        } else {
          if (this.items) {
            if (this.items[this.selectedIndex] != undefined) {
              this.input.val(this.items[this.selectedIndex].value);
              c.push(this.items[this.selectedIndex].value);
            }
          }
        }
        if (this.multiple || this.multipleextended || this.checkboxes) {
          var b = !this.checkboxes
            ? this.getSelectedItems()
            : this.getCheckedItems();
          var e = "";
          if (b) {
            for (var d = 0; d < b.length; d++) {
              if (undefined != b[d]) {
                if (d == b.length - 1) {
                  e += b[d].value;
                } else {
                  e += b[d].value + ",";
                }
                c.push(b[d].value);
              }
            }
            this.input.val(e);
          }
        }
      }
      if (this.field && this.input) {
        if (this.field.nodeName.toLowerCase() == "select") {
          a.each(this.field, function (f, g) {
            a(this).removeAttr("selected");
            this.selected = c.indexOf(this.value) >= 0;
            if (this.selected) {
              a(this).attr("selected", true);
            }
          });
        } else {
          a.each(this.items, function (f, g) {
            a(this.originalItem.originalItem).removeAttr("data-selected");
            this.selected = c.indexOf(this.value) >= 0;
            if (this.selected) {
              a(this.originalItem.originalItem).attr("data-selected", true);
            }
          });
        }
      }
    },
    isIndexInView: function (c) {
      if (isNaN(c)) {
        return false;
      }
      if (!this.items) {
        return false;
      }
      if (c < 0 || c >= this.items.length) {
        return false;
      }
      var e = this.vScrollInstance.value;
      var d = 0;
      if (this.filterable) {
        d = this.filterHeight;
      }
      var f = this.visibleItems[c];
      if (f == undefined) {
        return true;
      }
      var b = f.initialTop;
      var g = f.height;
      if (b - e < d || b - e + d + g >= this.host.outerHeight()) {
        return false;
      }
      return true;
    },
    _itemsInPage: function () {
      var b = 0;
      var c = this;
      if (this.items) {
        a.each(this.items, function () {
          if (this.initialTop + this.height >= c.content.height()) {
            return false;
          }
          b++;
        });
      }
      return b;
    },
    _firstItemIndex: function () {
      if (this.visibleItems != null) {
        if (this.visibleItems[0]) {
          if (this.visibleItems[0].isGroup) {
            return this._nextItemIndex(0);
          } else {
            return 0;
          }
        } else {
          return 0;
        }
      }
      return -1;
    },
    _lastItemIndex: function () {
      if (this.visibleItems != null) {
        if (this.visibleItems[this.visibleItems.length - 1]) {
          if (this.visibleItems[this.visibleItems.length - 1].isGroup) {
            return this._prevItemIndex(this.visibleItems.length - 1);
          } else {
            return this.visibleItems.length - 1;
          }
        } else {
          return this.visibleItems.length - 1;
        }
      }
      return -1;
    },
    _nextItemIndex: function (b) {
      for (var c = b + 1; c < this.visibleItems.length; c++) {
        if (this.visibleItems[c]) {
          if (!this.visibleItems[c].disabled && !this.visibleItems[c].isGroup) {
            return c;
          }
        }
      }
      return -1;
    },
    _prevItemIndex: function (b) {
      for (var c = b - 1; c >= 0; c--) {
        if (this.visibleItems[c]) {
          if (!this.visibleItems[c].disabled && !this.visibleItems[c].isGroup) {
            return c;
          }
        }
      }
      return -1;
    },
    clearFilter: function () {
      this.filterInput.val("");
      this._updateItemsVisibility("");
    },
    _search: function (c) {
      var b = this;
      var d = b.filterInput.val();
      if (c.keyCode == 9) {
        return;
      }
      if (
        b.searchMode == "none" ||
        b.searchMode == null ||
        b.searchMode == "undefined"
      ) {
        return;
      }
      if (c.keyCode == 16 || c.keyCode == 17 || c.keyCode == 20) {
        return;
      }
      if (c.keyCode == 37 || c.keyCode == 39) {
        return false;
      }
      if (c.altKey || c.keyCode == 18) {
        return;
      }
      if (c.keyCode >= 33 && c.keyCode <= 40) {
        return;
      }
      if (c.ctrlKey || c.metaKey || b.ctrlKey) {
        if (c.keyCode != 88 && c.keyCode != 86) {
          return;
        }
      }
      if (d === b.searchString) {
        return;
      }
      b._updateItemsVisibility(d);
    },
    _updateItemsVisibility: function (h) {
      var e = this.getItems();
      if (e == undefined) {
        return { index: -1, matchItem: new Array() };
      }
      var f = this;
      var d = -1;
      var i = new Array();
      var g = 0;
      a.each(e, function (k) {
        var m = "";
        if (!this.isGroup) {
          if (this.searchLabel) {
            m = this.searchLabel;
          } else {
            if (this.label) {
              m = this.label;
            } else {
              if (this.value) {
                m = this.value;
              } else {
                if (this.title) {
                  m = this.title;
                } else {
                  m = "jqxItem";
                }
              }
            }
          }
          m = m.toString();
          var l = false;
          switch (f.searchMode) {
            case "containsignorecase":
              l = a.jqx.string.containsIgnoreCase(m, h);
              break;
            case "contains":
              l = a.jqx.string.contains(m, h);
              break;
            case "equals":
              l = a.jqx.string.equals(m, h);
              break;
            case "equalsignorecase":
              l = a.jqx.string.equalsIgnoreCase(m, h);
              break;
            case "startswith":
              l = a.jqx.string.startsWith(m, h);
              break;
            case "startswithignorecase":
              l = a.jqx.string.startsWithIgnoreCase(m, h);
              break;
            case "endswith":
              l = a.jqx.string.endsWith(m, h);
              break;
            case "endswithignorecase":
              l = a.jqx.string.endsWithIgnoreCase(m, h);
              break;
          }
          if (!l) {
            this.visible = false;
          }
          if (l) {
            i[g++] = this;
            this.visible = true;
            d = this.visibleIndex;
          }
          if (h == "") {
            this.visible = true;
            l = false;
          }
        }
      });
      f.renderedVisibleItems = new Array();
      f.visibleItems = new Array();
      f.vScrollInstance.setPosition(0, true);
      f._addItems(false);
      f._renderItems();
      for (var b = 0; b < f.items.length; b++) {
        f.selectedIndexes[b] = -1;
      }
      f.selectedIndex = -1;
      for (var c in f.selectedValues) {
        var h = f.selectedValues[c];
        var j = f.getItemByValue(h);
        if (j) {
          if (j.visible) {
            f.selectedIndex = j.visibleIndex;
            f.selectedIndexes[j.visibleIndex] = j.visibleIndex;
          }
        }
      }
      f._syncSelection();
      if (f.filterChange) {
        f.filterChange(h);
      }
    },
    _getMatches: function (g, d) {
      if (g == undefined || g.length == 0) {
        return -1;
      }
      if (d == undefined) {
        d = 0;
      }
      var b = this.getItems();
      var f = this;
      var c = -1;
      var e = 0;
      a.each(b, function (h) {
        var k = "";
        if (!this.isGroup) {
          if (this.searchLabel) {
            k = this.searchLabel.toString();
          } else {
            if (this.label) {
              k = this.label.toString();
            } else {
              if (this.value) {
                k = this.value.toString();
              } else {
                if (this.title) {
                  k = this.title.toString();
                } else {
                  k = "jqxItem";
                }
              }
            }
          }
          var j = false;
          switch (f.searchMode) {
            case "containsignorecase":
              j = a.jqx.string.containsIgnoreCase(k, g);
              break;
            case "contains":
              j = a.jqx.string.contains(k, g);
              break;
            case "equals":
              j = a.jqx.string.equals(k, g);
              break;
            case "equalsignorecase":
              j = a.jqx.string.equalsIgnoreCase(k, g);
              break;
            case "startswith":
              j = a.jqx.string.startsWith(k, g);
              break;
            case "startswithignorecase":
              j = a.jqx.string.startsWithIgnoreCase(k, g);
              break;
            case "endswith":
              j = a.jqx.string.endsWith(k, g);
              break;
            case "endswithignorecase":
              j = a.jqx.string.endsWithIgnoreCase(k, g);
              break;
          }
          if (j && this.visibleIndex >= d) {
            c = this.visibleIndex;
            return false;
          }
        }
      });
      return c;
    },
    findItems: function (e) {
      var b = this.getItems();
      var d = this;
      var c = 0;
      var f = new Array();
      a.each(b, function (g) {
        var j = "";
        if (!this.isGroup) {
          if (this.label) {
            j = this.label;
          } else {
            if (this.value) {
              j = this.value;
            } else {
              if (this.title) {
                j = this.title;
              } else {
                j = "jqxItem";
              }
            }
          }
          var h = false;
          switch (d.searchMode) {
            case "containsignorecase":
              h = a.jqx.string.containsIgnoreCase(j, e);
              break;
            case "contains":
              h = a.jqx.string.contains(j, e);
              break;
            case "equals":
              h = a.jqx.string.equals(j, e);
              break;
            case "equalsignorecase":
              h = a.jqx.string.equalsIgnoreCase(j, e);
              break;
            case "startswith":
              h = a.jqx.string.startsWith(j, e);
              break;
            case "startswithignorecase":
              h = a.jqx.string.startsWithIgnoreCase(j, e);
              break;
            case "endswith":
              h = a.jqx.string.endsWith(j, e);
              break;
            case "endswithignorecase":
              h = a.jqx.string.endsWithIgnoreCase(j, e);
              break;
          }
          if (h) {
            f[c++] = this;
          }
        }
      });
      return f;
    },
    _syncSelection: function () {
      var d = this;
      if (d.filterable) {
        if (d.items) {
          for (var b = 0; b < d.items.length; b++) {
            var c = d.items[b];
            c.selected = false;
          }
        }
        for (var b = 0; b < d.visibleItems.length; b++) {
          var c = d.visibleItems[b];
          if (d.selectedIndexes && d.selectedIndexes[b] == c.visibleIndex) {
            c.selected = true;
          }
        }
        if (d.itemswrapper) {
          d._renderItems();
        }
      }
    },
    _handleKeyDown: function (n) {
      var s = n.keyCode;
      var k = this;
      var g = k.selectedIndex;
      var d = k.selectedIndex;
      var l = false;
      if (!this.keyboardNavigation || !this.enableSelection) {
        return;
      }
      if (this.filterInput && n.target == this.filterInput[0]) {
        return;
      }
      if (
        n.target instanceof HTMLInputElement &&
        a(n.target).ischildof(this.host)
      ) {
        return;
      }
      var j = function () {
        if (k.multiple || k.checkboxes) {
          k.clearSelection(false);
        }
      };
      if (n.altKey) {
        s = -1;
      }
      if (s == 32 && this.checkboxes) {
        var f = this.getItem(g);
        if (f != null) {
          k._updateItemCheck(f, g);
          n.preventDefault();
        }
        k._searchString = "";
        k.selectIndex(f.visibleIndex, false, true, true, "keyboard", n);
        k._renderItems();
        return;
      }
      if (k.incrementalSearch) {
        var o = -1;
        if (!k._searchString) {
          k._searchString = "";
        }
        if ((s == 8 || s == 46) && k._searchString.length >= 1) {
          k._searchString = k._searchString.substr(
            0,
            k._searchString.length - 1
          );
        }
        var r = String.fromCharCode(s);
        if (n.key) {
          r = n.key;
        }
        var m = !isNaN(parseInt(r));
        var i = false;
        if ((s >= 65 && s <= 97) || m || s == 8 || s == 32 || s == 46) {
          if (!n.shiftKey) {
            r = r.toLocaleLowerCase();
          }
          var e = 1 + k.selectedIndex;
          if (s != 8 && s != 32 && s != 46) {
            if (
              k._searchString.length > 0 &&
              k._searchString.substr(0, 1) == r
            ) {
              e = 1 + k.selectedIndex;
              k._searchString += r;
            } else {
              k._searchString += r;
            }
          }
          if (s == 32) {
            k._searchString += " ";
          }
          var b = this._getMatches(k._searchString, e);
          o = b;
          if (o == k._lastMatchIndex || o == -1) {
            var b = this._getMatches(k._searchString, 0);
            o = b;
          }
          k._lastMatchIndex = o;
          if (o >= 0) {
            var h = function () {
              j();
              k.selectIndex(o, false, false, false, "keyboard", n);
              var t = k.isIndexInView(o);
              if (!t) {
                k.ensureVisible(o);
              } else {
                k._renderItems();
              }
            };
            if (k._toSelectTimer) {
              clearTimeout(k._toSelectTimer);
            }
            k._toSelectTimer = setTimeout(function () {
              h();
            }, k.incrementalSearchKeyDownDelay);
          }
          i = true;
        }
        if (k._searchTimer != undefined) {
          clearTimeout(k._searchTimer);
        }
        if (s == 27 || s == 13) {
          k._searchString = "";
        }
        k._searchTimer = setTimeout(function () {
          k._searchString = "";
          k._renderItems();
        }, k.incrementalSearchDelay);
        if (o >= 0) {
          return;
        }
        if (i) {
          return false;
        }
      }
      if (s == 33) {
        var p = k._itemsInPage();
        if (k.selectedIndex - p >= 0) {
          j();
          k.selectIndex(d - p, false, false, false, "keyboard", n);
        } else {
          j();
          k.selectIndex(
            k._firstItemIndex(),
            false,
            false,
            false,
            "keyboard",
            n
          );
        }
        k._searchString = "";
      }
      if (s == 32 && this.checkboxes) {
        var f = this.getItem(g);
        if (f != null) {
          k._updateItemCheck(f, g);
          n.preventDefault();
        }
        k._searchString = "";
      }
      if (s == 36) {
        j();
        k.selectIndex(k._firstItemIndex(), false, false, false, "keyboard", n);
        k._searchString = "";
      }
      if (s == 35) {
        j();
        k.selectIndex(k._lastItemIndex(), false, false, false, "keyboard", n);
        k._searchString = "";
      }
      if (s == 34) {
        var p = k._itemsInPage();
        if (k.selectedIndex + p < k.visibleItems.length) {
          j();
          k.selectIndex(d + p, false, false, false, "keyboard", n);
        } else {
          j();
          k.selectIndex(k._lastItemIndex(), false, false, false, "keyboard", n);
        }
        k._searchString = "";
      }
      if (s == 38) {
        k._searchString = "";
        if (k.selectedIndex > 0) {
          var c = k._prevItemIndex(k.selectedIndex);
          if (c != k.selectedIndex && c != -1) {
            j();
            k.selectIndex(c, false, false, false, "keyboard", n);
          } else {
            return true;
          }
        } else {
          return false;
        }
      } else {
        if (s == 40) {
          k._searchString = "";
          if (k.selectedIndex + 1 < k.visibleItems.length) {
            var c = k._nextItemIndex(k.selectedIndex);
            if (c != k.selectedIndex && c != -1) {
              j();
              k.selectIndex(c, false, false, false, "keyboard", n);
            } else {
              return true;
            }
          } else {
            return false;
          }
        }
      }
      if (s == 35 || s == 36 || s == 38 || s == 40 || s == 34 || s == 33) {
        var q = k.isIndexInView(k.selectedIndex);
        if (!q) {
          k.ensureVisible(k.selectedIndex);
        } else {
          k._renderItems();
        }
        return false;
      }
      return true;
    },
    _updateItemCheck: function (b, c) {
      if (this.disabled) {
        return;
      }
      if (b.checked == true) {
        b.checked = b.hasThreeStates && this.hasThreeStates ? null : false;
      } else {
        b.checked = b.checked != null;
      }
      switch (b.checked) {
        case true:
          this.checkIndex(c);
          break;
        case false:
          this.uncheckIndex(c);
          break;
        default:
          this.indeterminateIndex(c);
          break;
      }
    },
    wheel: function (d, c) {
      if (c.autoHeight || !c.enableMouseWheel) {
        d.returnValue = true;
        return true;
      }
      if (c.disabled) {
        return true;
      }
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
        if (b) {
          if (d.preventDefault) {
            d.preventDefault();
          }
          if (d.originalEvent != null) {
            d.originalEvent.mouseHandled = true;
          }
          if (d.stopPropagation != undefined) {
            d.stopPropagation();
          }
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
    _handleDelta: function (d) {
      var c = this.vScrollInstance.value;
      if (d < 0) {
        this.scrollDown();
      } else {
        this.scrollUp();
      }
      var b = this.vScrollInstance.value;
      if (c != b) {
        return true;
      }
      return false;
    },
    focus: function () {
      try {
        this.focused = true;
        this.host.focus();
        var c = this;
        setTimeout(function () {
          c.host.focus();
        }, 25);
      } catch (b) {}
    },
    _removeHandlers: function () {
      var b = this;
      this.removeHandler(a(document), "keydown.listbox" + this.element.id);
      this.removeHandler(a(document), "keyup.listbox" + this.element.id);
      this.removeHandler(this.vScrollBar, "valueChanged");
      this.removeHandler(this.hScrollBar, "valueChanged");
      if (this._mousewheelfunc) {
        this.removeHandler(this.host, "mousewheel", this._mousewheelfunc);
      } else {
        this.removeHandler(this.host, "mousewheel");
      }
      this.removeHandler(this.host, "keydown");
      this.removeHandler(this.content, "mouseleave");
      this.removeHandler(this.content, "focus");
      this.removeHandler(this.content, "blur");
      this.removeHandler(this.host, "focus");
      this.removeHandler(this.host, "blur");
      this.removeHandler(this.content, "mouseenter");
      this.removeHandler(this.content, "mouseup");
      this.removeHandler(this.content, "mousedown");
      this.removeHandler(this.content, "touchend");
      if (this._mousemovefunc) {
        this.removeHandler(this.content, "mousemove", this._mousemovefunc);
      } else {
        this.removeHandler(this.content, "mousemove");
      }
      this.removeHandler(this.content, "selectstart");
      if (this.overlayContent) {
        this.removeHandler(
          this.overlayContent,
          a.jqx.mobile.getTouchEventName("touchend")
        );
      }
    },
    _updateSize: function () {
      if (!this.virtualSize) {
        this._oldheight = null;
        this.virtualSize = this._calculateVirtualSize();
      }
      var b = this;
      b._arrange();
      if (b.host.height() != b._oldheight || b.host.width() != b._oldwidth) {
        var c = b.host.width() != b._oldwidth;
        if (b.autoItemsHeight) {
          b._render(false);
        } else {
          if (b.items) {
            if (
              b.items.length > 0 &&
              b.virtualItemsCount * b.items[0].height < b._oldheight - 2
            ) {
              b._render(false);
            } else {
              var d = b.vScrollInstance.value;
              b._updatescrollbars();
              b._renderItems();
              if (d < b.vScrollInstance.max) {
                b.vScrollInstance.setPosition(d);
              } else {
                b.vScrollInstance.setPosition(b.vScrollInstance.max);
              }
            }
          }
        }
        b._oldwidth = b.host.width();
        b._oldheight = b.host.height();
      }
    },
    _addHandlers: function () {
      var l = this;
      this.focused = false;
      var m = false;
      var j = 0;
      var g = null;
      var j = 0;
      var b = 0;
      var h = new Date();
      var e = this.isTouchDevice();
      this.addHandler(this.vScrollBar, "valueChanged", function (n) {
        if (a.jqx.browser.msie && a.jqx.browser.version > 9) {
          setTimeout(function () {
            l._renderItems();
          }, 1);
        } else {
          l._renderItems();
        }
      });
      this.addHandler(this.hScrollBar, "valueChanged", function () {
        l._renderItems();
      });
      if (this._mousewheelfunc) {
        this.removeHandler(this.host, "mousewheel", this._mousewheelfunc);
      }
      this._mousewheelfunc = function (n) {
        l.wheel(n, l);
      };
      this.addHandler(this.host, "mousewheel", this._mousewheelfunc);
      this.addHandler(
        a(document),
        "keydown.listbox" + this.element.id,
        function (n) {
          l._ctrlKey = n.ctrlKey || n.metaKey;
          l._shiftKey = n.shiftKey;
        }
      );
      this.addHandler(
        a(document),
        "keyup.listbox" + this.element.id,
        function (n) {
          l._ctrlKey = n.ctrlKey || n.metaKey;
          l._shiftKey = n.shiftKey;
        }
      );
      this.addHandler(this.host, "keydown", function (n) {
        return l._handleKeyDown(n);
      });
      this.addHandler(this.content, "mouseleave", function (n) {
        l.focused = false;
        var o = a.data(l.element, "hoveredItem");
        if (o != null) {
          a(o).removeClass(l.toThemeProperty("jqx-listitem-state-hover"));
          a(o).removeClass(l.toThemeProperty("jqx-fill-state-hover"));
          a.data(l.element, "hoveredItem", null);
        }
      });
      this.addHandler(this.content, "focus", function (n) {
        if (!l.disabled) {
          l.host.addClass(l.toThemeProperty("jqx-fill-state-focus"));
          l.focused = true;
        }
      });
      this.addHandler(this.content, "blur", function (n) {
        l.focused = false;
        l.host.removeClass(l.toThemeProperty("jqx-fill-state-focus"));
      });
      this.addHandler(this.host, "focus", function (n) {
        if (!l.disabled) {
          l.host.addClass(l.toThemeProperty("jqx-fill-state-focus"));
          l.focused = true;
        }
      });
      this.addHandler(this.host, "blur", function (n) {
        if (a.jqx.browser.msie && a.jqx.browser.version < 9 && l.focused) {
          return;
        }
        l.host.removeClass(l.toThemeProperty("jqx-fill-state-focus"));
        l.focused = false;
      });
      this.addHandler(this.content, "mouseenter", function (n) {
        l.focused = true;
      });
      var c = a.jqx.utilities.hasTransform(this.host);
      var f = l.isTouchDevice() && this.touchMode !== true;
      var i = !f ? "mousedown" : "touchend";
      var k = !f ? "mouseup" : "touchend";
      if (this.overlayContent) {
        this.addHandler(
          this.overlayContent,
          a.jqx.mobile.getTouchEventName("touchend"),
          function (p) {
            if (!l.enableSelection) {
              return true;
            }
            if (f) {
              l._newScroll = new Date();
              if (l._newScroll - l._lastScroll < 500) {
                return true;
              }
            }
            var s = a.jqx.mobile.getTouches(p);
            var t = s[0];
            if (t != undefined) {
              var n = l.host.offset();
              var r = parseInt(t.pageX);
              var q = parseInt(t.pageY);
              if (l.touchMode == true) {
                if (t._pageX != undefined) {
                  r = parseInt(t._pageX);
                  q = parseInt(t._pageY);
                }
              }
              r = r - n.left;
              q = q - n.top;
              var o = l._hitTest(r, q);
              if (o != null && !o.isGroup) {
                l._newScroll = new Date();
                if (l._newScroll - l._lastScroll < 500) {
                  return false;
                }
                if (l.checkboxes) {
                  l._updateItemCheck(o, o.visibleIndex);
                  l.selectIndex(o.visibleIndex, false, true, false, "mouse", p);
                  return;
                }
                if (o.html.indexOf("href") != -1) {
                  setTimeout(function () {
                    l.selectIndex(
                      o.visibleIndex,
                      false,
                      true,
                      false,
                      "mouse",
                      p
                    );
                    l.content.trigger("click");
                    return false;
                  }, 100);
                } else {
                  l.selectIndex(o.visibleIndex, false, true, false, "mouse", p);
                  if (p.preventDefault) {
                    p.preventDefault();
                  }
                  l.content.trigger("click");
                  return false;
                }
              }
            }
          }
        );
      } else {
        var d = false;
        this.addHandler(this.content, i, function (n) {
          if (!l.enableSelection) {
            return true;
          }
          d = true;
          if (f) {
            l._newScroll = new Date();
            if (l._newScroll - l._lastScroll < 500) {
              return false;
            }
          }
          l.focused = true;
          if (!l.isTouchDevice() && l.focusable) {
            l.host.focus();
          }
          if (
            n.target.id != "listBoxContent" + l.element.id &&
            l.itemswrapper[0] != n.target
          ) {
            var r = n.target;
            var z = a(r).offset();
            var q = l.host.offset();
            if (c) {
              var o = a.jqx.mobile.getLeftPos(r);
              var t = a.jqx.mobile.getTopPos(r);
              z.left = o;
              z.top = t;
              o = a.jqx.mobile.getLeftPos(l.element);
              t = a.jqx.mobile.getTopPos(l.element);
              q.left = o;
              q.top = t;
            }
            var s = parseInt(z.top) - parseInt(q.top);
            var v = parseInt(z.left) - parseInt(q.left);
            var w = l._hitTest(v, s);
            if (w != null && !w.isGroup) {
              var p = function (y, x) {
                if (!l._shiftKey) {
                  l._clickedIndex = y.visibleIndex;
                }
                if (!l.checkboxes) {
                  l.selectIndex(y.visibleIndex, false, true, false, "mouse", x);
                } else {
                  v = 20 + x.pageX - z.left;
                  if (l.rtl) {
                    var A =
                      l.hScrollBar.css("visibility") != "hidden"
                        ? l.hScrollInstance.max
                        : l.host.width();
                    if (v <= l.host.width() - 20) {
                      if (!l.allowDrag) {
                        l._updateItemCheck(y, y.visibleIndex);
                        l.selectIndex(
                          y.visibleIndex,
                          false,
                          true,
                          false,
                          "mouse",
                          x
                        );
                      } else {
                        setTimeout(function () {
                          if (!l._dragItem) {
                            if (!d) {
                              l._updateItemCheck(y, y.visibleIndex);
                              l.selectIndex(
                                y.visibleIndex,
                                false,
                                true,
                                false,
                                "mouse",
                                x
                              );
                            }
                          }
                        }, 200);
                      }
                    }
                  } else {
                    if (v + l.hScrollInstance.value >= 20) {
                      if (!l.allowDrag) {
                        l._updateItemCheck(y, y.visibleIndex);
                        l.selectIndex(
                          y.visibleIndex,
                          false,
                          true,
                          false,
                          "mouse",
                          x
                        );
                      } else {
                        setTimeout(function () {
                          if (!l._dragItem) {
                            if (!d) {
                              l._updateItemCheck(y, y.visibleIndex);
                              l.selectIndex(
                                y.visibleIndex,
                                false,
                                true,
                                false,
                                "mouse",
                                x
                              );
                            }
                          }
                        }, 200);
                      }
                    }
                  }
                }
              };
              if (!w.disabled) {
                if (w.html.indexOf("href") != -1) {
                  setTimeout(function () {
                    p(w, n);
                  }, 100);
                } else {
                  p(w, n);
                }
              }
            }
            if (i == "mousedown") {
              var u = false;
              if (n.which) {
                u = n.which == 3;
              } else {
                if (n.button) {
                  u = n.button == 2;
                }
              }
              if (u) {
                return true;
              }
            }
          }
          return true;
        });
      }
      this.addHandler(this.content, "mouseup", function (n) {
        l.vScrollInstance.handlemouseup(l, n);
        d = false;
      });
      if (a.jqx.browser.msie) {
        this.addHandler(this.content, "selectstart", function (n) {
          return false;
        });
      }
      var e = this.isTouchDevice();
      if (this.enableHover && !e) {
        this._mousemovefunc = function (n) {
          if (e) {
            return true;
          }
          if (!l.enableHover) {
            return true;
          }
          var p =
            a.jqx.browser.msie == true && a.jqx.browser.version < 9 ? 0 : 1;
          if (n.target == null) {
            return true;
          }
          if (l.disabled) {
            return true;
          }
          l.focused = true;
          var r = l.vScrollInstance.isScrolling();
          if (!r && n.target.id != "listBoxContent" + l.element.id) {
            if (l.itemswrapper[0] != n.target) {
              var t = n.target;
              var B = a(t).offset();
              var s = l.host.offset();
              if (c) {
                var o = a.jqx.mobile.getLeftPos(t);
                var v = a.jqx.mobile.getTopPos(t);
                B.left = o;
                B.top = v;
                o = a.jqx.mobile.getLeftPos(l.element);
                v = a.jqx.mobile.getTopPos(l.element);
                s.left = o;
                s.top = v;
              }
              var u = parseInt(B.top) - parseInt(s.top);
              var w = parseInt(B.left) - parseInt(s.left);
              var A = l._hitTest(w, u);
              if (A != null && !A.isGroup && !A.disabled) {
                var q = a.data(l.element, "hoveredItem");
                if (q != null) {
                  a(q).removeClass(
                    l.toThemeProperty("jqx-listitem-state-hover")
                  );
                  a(q).removeClass(l.toThemeProperty("jqx-fill-state-hover"));
                }
                a.data(l.element, "hoveredItem", A.element);
                var z = a(A.element);
                z.addClass(l.toThemeProperty("jqx-listitem-state-hover"));
                z.addClass(l.toThemeProperty("jqx-fill-state-hover"));
              }
            }
          }
        };
        this.addHandler(this.content, "mousemove", this._mousemovefunc);
      }
    },
    _arrange: function (y) {
      if (y == undefined) {
        y = true;
      }
      var x = this;
      var s = null;
      var q = null;
      var j = x.filterable ? x.filterHeight : 0;
      var i = window.getComputedStyle(this.element);
      var n = parseInt(i.borderLeftWidth) * 2;
      var d = i.boxSizing;
      if (this.element.offsetWidth === 0) {
        n = 2;
      }
      if (d === "border-box" || isNaN(n)) {
        n = 0;
      }
      var m = function (h) {
        h = x.host.height() - n;
        if (h == 0) {
          h = 200;
          x.host.height(h);
        }
        return h;
      };
      if (x.width != null && x.width.toString().indexOf("px") != -1) {
        s = x.width;
      } else {
        if (x.width != undefined && !isNaN(x.width)) {
          s = x.width;
        }
      }
      if (x.height != null && x.height.toString().indexOf("px") != -1) {
        q = x.height;
      } else {
        if (x.height != undefined && !isNaN(x.height)) {
          q = x.height;
        }
      }
      if (x.width != null && x.width.toString().indexOf("%") != -1) {
        x.host.css("width", x.width);
        s = x.host.width();
      }
      if (x.height != null && x.height.toString().indexOf("%") != -1) {
        x.host.css("height", x.height);
        q = m(q);
      }
      if (s != null) {
        s = parseInt(s) - n;
        if (parseInt(x.element.style.width) != parseInt(x.width)) {
          x.element.style.width = parseInt(s) + "px";
        }
      }
      if (!x.autoHeight) {
        if (q != null) {
          q = parseInt(q);
          if (parseInt(x.element.style.height) != parseInt(x.height)) {
            x.host.height(x.height);
            m(q);
          }
        }
      } else {
        if (x.virtualSize) {
          if (x.hScrollBar.css("visibility") != "hidden") {
            x.host.height(x.virtualSize.height + parseInt(x.scrollBarSize) + 3);
            x.height = x.virtualSize.height + parseInt(x.scrollBarSize) + 3;
            q = x.height;
          } else {
            x.host.height(x.virtualSize.height);
            x.height = x.virtualSize.height;
            q = x.virtualSize.height;
          }
        }
      }
      var c = x.scrollBarSize;
      if (isNaN(c)) {
        c = parseInt(c);
        if (isNaN(c)) {
          c = "17px";
        } else {
          c = c + "px";
        }
      }
      c = parseInt(c);
      var p = 4;
      var f = 2;
      var g = 1;
      if (x.vScrollBar) {
        if (x.vScrollBar[0].style.visibility != "hidden") {
          g = c + p;
        } else {
          g = 0;
          x.vScrollInstance.setPosition(0);
        }
      } else {
        return;
      }
      if (c == 0) {
        g = 0;
        f = 0;
      }
      if (x.hScrollBar) {
        if (x.hScrollBar[0].style.visibility != "hidden") {
          f = c + p;
        } else {
          x.hScrollInstance.setPosition(0);
          f = 0;
        }
      } else {
        return;
      }
      if (x.autoItemsHeight) {
        x.hScrollBar[0].style.visibility = "hidden";
        f = 0;
      }
      if (q == null) {
        q = 0;
      }
      var t = parseInt(q) - p - c;
      if (t < 0) {
        t = 0;
      }
      if (parseInt(x.hScrollBar[0].style.height) != c) {
        if (parseInt(c) < 0) {
          c = 0;
        }
        x.hScrollBar[0].style.height = parseInt(c) + "px";
      }
      if (x.hScrollBar[0].style.top != t + "px") {
        x.hScrollBar[0].style.top = t + "px";
        x.hScrollBar[0].style.left = "0px";
      }
      var b = s - c - p;
      if (b < 0) {
        b = 0;
      }
      var o = b + "px";
      if (x.hScrollBar[0].style.width != o) {
        x.hScrollBar[0].style.width = o;
      }
      if (g <= 1) {
        if (s >= 2) {
          x.hScrollBar[0].style.width = parseInt(s - 2) + "px";
        }
      }
      if (c != parseInt(x.vScrollBar[0].style.width)) {
        x.vScrollBar[0].style.width = parseInt(c) + "px";
      }
      if (parseInt(q) - f != parseInt(x.vScrollBar[0].style.height)) {
        var v = parseInt(q) - f;
        if (v < 0) {
          v = 0;
        }
        x.vScrollBar[0].style.height = v + "px";
      }
      if (s == null) {
        s = 0;
      }
      var e = parseInt(s) - parseInt(c) - p + "px";
      if (this.host.css("box-sizing") === "border-box") {
        e = parseInt(e) - 2 + "px";
      }
      if (e != x.vScrollBar[0].style.left) {
        if (parseInt(e) >= 0) {
          x.vScrollBar[0].style.left = e;
        }
        x.vScrollBar[0].style.top = "0px";
      }
      var l = x.vScrollInstance;
      l.disabled = x.disabled;
      if (y) {
        l._arrange();
      }
      var r = x.hScrollInstance;
      r.disabled = x.disabled;
      if (y) {
        r._arrange();
      }
      if (
        x.vScrollBar[0].style.visibility != "hidden" &&
        x.hScrollBar[0].style.visibility != "hidden"
      ) {
        x.bottomRight[0].style.visibility = "inherit";
        x.bottomRight[0].style.left =
          1 + parseInt(x.vScrollBar[0].style.left) + "px";
        x.bottomRight[0].style.top =
          1 + parseInt(x.hScrollBar[0].style.top) + "px";
        if (x.rtl) {
          x.bottomRight.css({ left: 0 });
        }
        x.bottomRight[0].style.width = parseInt(c) + 3 + "px";
        x.bottomRight[0].style.height = parseInt(c) + 3 + "px";
      } else {
        x.bottomRight[0].style.visibility = "hidden";
      }
      if (parseInt(x.content[0].style.width) != parseInt(s) - g) {
        var k = parseInt(s) - g;
        if (k < 0) {
          k = 0;
        }
        x.content[0].style.width = k + "px";
      }
      if (x.rtl) {
        x.vScrollBar.css({ left: 0 + "px", top: "0px" });
        x.hScrollBar.css({ left: x.vScrollBar.width() + 2 + "px" });
        if (x.vScrollBar[0].style.visibility != "hidden") {
          x.content.css("margin-left", 4 + x.vScrollBar.width());
        } else {
          x.content.css("margin-left", 0);
          x.hScrollBar.css({ left: "0px" });
        }
        if (x.filterable && x.filterInput) {
          x.filterInput.css({ left: x.vScrollBar.width() + 6 + "px" });
        }
      }
      if (parseInt(x.content[0].style.height) != parseInt(q) - f) {
        var u = parseInt(q) - f;
        if (u < 0) {
          u = 0;
        }
        x.content[0].style.height = u + "px";
        x.content[0].style.top = "0px";
      }
      if (j > 0) {
        x.content[0].style.top = j + "px";
        x.content[0].style.height =
          parseInt(x.content[0].style.height) - j + "px";
      }
      if (x.filterable) {
        x.filterInput[0].style.height = j - 6 + "px";
        x.filterInput[0].style.top = "3px";
        if (!x.rtl) {
          x.filterInput[0].style.left =
            parseInt(x.content.css("left")) + 3 + "px";
        }
        x.filterInput[0].style.width =
          parseInt(x.content.css("width")) - 7 + "px";
        x.filter[0].style.display = "block";
      } else {
        x.filter[0].style.display = "none";
      }
      if (x.overlayContent) {
        x.overlayContent.width(parseInt(s) - g);
        x.overlayContent.height(parseInt(q) - f);
      }
    },
    ensureVisible: function (i, j) {
      if (isNaN(i)) {
        var m = this.getItemByValue(i);
        if (m) {
          i = m.index;
        }
      }
      var f = this.isIndexInView(i);
      if (!f) {
        if (i < 0) {
          return;
        }
        if (this.autoHeight) {
          var g = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
          g.setPosition(0);
        } else {
          for (var h = 0; h < this.visibleItems.length; h++) {
            var m = this.visibleItems[h];
            if (m.visibleIndex == i && !m.isGroup) {
              var g = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
              var l = g.value;
              var b = !this.filterable ? 0 : this.filterHeight + 2;
              var e = this.hScrollBar.css("visibility") === "hidden";
              var d = e ? 0 : this.scrollBarSize + 4;
              if (m.initialTop < l) {
                g.setPosition(m.initialTop);
                if (h == 0) {
                  g.setPosition(0);
                }
              } else {
                if (m.initialTop + m.height > l + this.host.height() - b) {
                  var c = this.host.height();
                  if (this.filterable) {
                    g.setPosition(
                      this.filterHeight +
                        2 +
                        m.initialTop +
                        m.height +
                        2 -
                        c +
                        d
                    );
                  } else {
                    g.setPosition(m.initialTop + m.height + 2 - c + d);
                    if (h === this.visibleItems.length - 1) {
                      g.setPosition(g.max);
                    }
                  }
                  if (j) {
                    var l = g.value;
                    var k = m.initialTop;
                    if (this.filterable) {
                      k = this.filterHeight + 2 + m.initialTop;
                    }
                    if (l + c < g.max) {
                      g.setPosition(k);
                    }
                  }
                }
              }
              break;
            }
          }
        }
      } else {
        if (j) {
          for (var h = 0; h < this.visibleItems.length; h++) {
            var m = this.visibleItems[h];
            if (m.visibleIndex == i && !m.isGroup) {
              var l = this.vScrollInstance.value;
              var k = m.initialTop;
              if (this.filterable) {
                k = this.filterHeight + 2 + m.initialTop;
              }
              if (l + this.host.height() < this.vScrollInstance.max) {
                this.vScrollInstance.setPosition(k);
              }
            }
          }
        }
      }
      this._renderItems();
    },
    scrollTo: function (c, b) {
      if (this.vScrollBar.css("visibility") != "hidden") {
        this.vScrollInstance.setPosition(b);
      }
      if (this.hScrollBar.css("visibility") != "hidden") {
        this.hScrollInstance.setPosition(c);
      }
    },
    scrollDown: function () {
      if (this.vScrollBar.css("visibility") == "hidden") {
        return false;
      }
      var b = this.vScrollInstance;
      if (b.value + b.largestep <= b.max) {
        b.setPosition(b.value + b.largestep);
        return true;
      } else {
        b.setPosition(b.max);
        return true;
      }
      return false;
    },
    scrollUp: function () {
      if (this.vScrollBar.css("visibility") == "hidden") {
        return false;
      }
      var b = this.vScrollInstance;
      if (b.value - b.largestep >= b.min) {
        b.setPosition(b.value - b.largestep);
        return true;
      } else {
        if (b.value != b.min) {
          b.setPosition(b.min);
          return true;
        }
      }
      return false;
    },
    databind: function (b, d) {
      this.records = new Array();
      var f = b._source ? true : false;
      var c = new a.jqx.dataAdapter(b, { autoBind: false });
      if (f) {
        c = b;
        b = b._source;
      }
      var e = function (k) {
        if (b.type != undefined) {
          c._options.type = b.type;
        }
        if (b.formatdata != undefined) {
          c._options.formatData = b.formatdata;
        }
        if (b.contenttype != undefined) {
          c._options.contentType = b.contenttype;
        }
        if (b.async != undefined) {
          c._options.async = b.async;
        }
      };
      var h = function (q, r) {
        var s = function (w) {
          var D = null;
          if (typeof w === "string") {
            var z = w;
            var A = w;
            var C = "";
          } else {
            if (q.displayMember != undefined && q.displayMember != "") {
              var A = w[q.valueMember];
              var z = w[q.displayMember];
            }
          }
          var C = "";
          if (q.groupMember) {
            C = w[q.groupMember];
          } else {
            if (w && w.group != undefined) {
              C = w.group;
            }
          }
          if (q.searchMember) {
            D = w[q.searchMember];
          } else {
            if (w && w.searchLabel != undefined) {
              D = w.searchLabel;
            }
          }
          if (!q.valueMember && !q.displayMember) {
            if (a.type(w) == "string") {
              z = A = w.toString();
            }
          }
          if (w && w.label != undefined) {
            var z = w.label;
          }
          if (w && w.value != undefined) {
            var A = w.value;
          }
          var B = false;
          if (w && w.checked != undefined) {
            B = w.checked;
          }
          var v = "";
          if (w && w.html != undefined) {
            v = w.html;
          }
          var t = true;
          if (w && w.visible != undefined) {
            t = w.visible;
          }
          var u = false;
          if (w && w.disabled != undefined) {
            u = w.disabled;
          }
          var y = false;
          if (w && w.hasThreeStates != undefined) {
            y = w.hasThreeStates;
          }
          var x = {};
          x.label = z;
          x.value = A;
          x.searchLabel = D;
          x.html = v;
          x.visible = t;
          x.originalItem = w;
          x.group = C;
          x.groupHtml = "";
          x.disabled = u;
          x.checked = B;
          x.hasThreeStates = y;
          return x;
        };
        if (r != undefined) {
          var k = c._changedrecords[0];
          if (k) {
            a.each(c._changedrecords, function () {
              var t = this.index;
              var u = this.record;
              if (r != "remove") {
                var v = s(u);
              }
              switch (r) {
                case "update":
                  q.updateAt(v, t);
                  break;
                case "add":
                  q.insertAt(v, t);
                  break;
                case "remove":
                  q.removeAt(t);
                  break;
              }
            });
            return;
          }
        }
        q.records = c.records;
        var m = q.records.length;
        var p = new Array();
        for (var l = 0; l < m; l++) {
          var n = q.records[l];
          var o = s(n);
          o.index = l;
          p[l] = o;
        }
        q.items = q.loadItems(p, true);
        q._render();
        q._raiseEvent("6");
      };
      e(this);
      var i = this;
      switch (b.datatype) {
        case "local":
        case "array":
        default:
          if (b.localdata != null || a.isArray(b)) {
            c.unbindBindingUpdate(this.element.id);
            if (this.autoBind || (!this.autoBind && !d)) {
              c.dataBind();
            }
            h(this);
            c.bindBindingUpdate(this.element.id, function (k) {
              h(i, k);
            });
          }
          break;
        case "json":
        case "jsonp":
        case "xml":
        case "xhtml":
        case "script":
        case "text":
        case "csv":
        case "tab":
          if (b.localdata != null) {
            c.unbindBindingUpdate(this.element.id);
            if (this.autoBind || (!this.autoBind && !d)) {
              c.dataBind();
            }
            h(this);
            c.bindBindingUpdate(this.element.id, function () {
              h(i);
            });
            return;
          }
          var j = {};
          if (c._options.data) {
            a.extend(c._options.data, j);
          } else {
            if (b.data) {
              a.extend(j, b.data);
            }
            c._options.data = j;
          }
          var g = function () {
            h(i);
          };
          c.unbindDownloadComplete(i.element.id);
          c.bindDownloadComplete(i.element.id, g);
          if (this.autoBind || (!this.autoBind && !d)) {
            c.dataBind();
          }
      }
    },
    loadItems: function (m, o) {
      if (m == null) {
        this.groups = new Array();
        this.items = new Array();
        this.visualItems = new Array();
        return;
      }
      var t = this;
      var k = 0;
      var d = 0;
      var b = 0;
      this.groups = new Array();
      this.items = new Array();
      this.visualItems = new Array();
      var e = new Array();
      this.itemsByValue = new Array();
      a.map(m, function (x) {
        if (x == undefined) {
          return null;
        }
        var j = new a.jqx._jqxListBox.item();
        var y = x.group;
        var i = x.groupHtml;
        var z = x.title;
        var v = null;
        if (t.searchMember) {
          v = x[t.searchMember];
        } else {
          if (x && x.searchLabel != undefined) {
            v = x.searchLabel;
          }
        }
        if (z == null || z == undefined) {
          z = "";
        }
        if (y == null || y == undefined) {
          y = "";
        }
        if (t.groupMember) {
          y = x[t.groupMember];
        }
        if (i == null || i == undefined) {
          i = "";
        }
        if (!t.groups[y]) {
          t.groups[y] = {
            items: new Array(),
            index: -1,
            caption: y,
            captionHtml: i,
          };
          k++;
          var u = k + "jqxGroup";
          t.groups[u] = t.groups[y];
          d++;
          t.groups.length = d;
        }
        var w = t.groups[y];
        w.index++;
        w.items[w.index] = j;
        if (typeof x === "string") {
          j.label = x;
          j.value = x;
          if (
            arguments.length > 1 &&
            arguments[1] &&
            a.type(arguments[1]) == "string"
          ) {
            j.label = x;
            j.value = arguments[1];
          }
        } else {
          if (
            x.label == null &&
            x.value == null &&
            x.html == null &&
            x.group == null &&
            x.groupHtml == null
          ) {
            j.label = x.toString();
            j.value = x.toString();
          } else {
            j.label = x.label;
            j.value = x.value;
            if (j.label === undefined) {
              j.label = x.value;
            }
            if (j.value === undefined) {
              j.value = x.label;
            }
          }
        }
        if (typeof x != "string") {
          if (x.label === undefined) {
            if (t.displayMember != "") {
              if (x[t.displayMember] != undefined) {
                j.label = x[t.displayMember];
              } else {
                j.label = "";
              }
            }
          }
          if (x.value === undefined) {
            if (t.valueMember != "") {
              j.value = x[t.valueMember];
            }
          }
        }
        j.hasThreeStates =
          x.hasThreeStates != undefined ? x.hasThreeStates : true;
        j.originalItem = x;
        if (o) {
          j.originalItem = x.originalItem;
        }
        j.title = z;
        if (z && j.value === undefined && j.label === undefined) {
          j.value = j.label = z;
        }
        j.html = x.html || "";
        if (x.html && x.html != "") {
          if (z && z != "") {
          }
        }
        if (typeof j.label === "string") {
        }
        j.group = y;
        j.checked = x.checked || false;
        j.groupHtml = x.groupHtml || "";
        j.disabled = x.disabled || false;
        j.visible = x.visible != undefined ? x.visible : true;
        j.searchLabel = v;
        j.index = b;
        e[b] = j;
        b++;
        return j;
      });
      var c = new Array();
      var p = 0;
      if (this.fromSelect == undefined || this.fromSelect == false) {
        for (var h = 0; h < d; h++) {
          var k = h + 1;
          var n = k + "jqxGroup";
          var r = this.groups[n];
          if (r == undefined || r == null) {
            break;
          }
          if (h == 0 && r.caption == "" && r.captionHtml == "" && d <= 1) {
            for (var g = 0; g < r.items.length; g++) {
              var q = r.items[g].value;
              if (r.items[g].value == undefined || r.items[g].value == null) {
                q = g;
              }
              this.itemsByValue[a.trim(q).split(" ").join("?")] = r.items[g];
            }
            return r.items;
          } else {
            var l = new a.jqx._jqxListBox.item();
            l.isGroup = true;
            l.label = r.caption;
            if (r.caption == "" && r.captionHtml == "") {
              r.caption = this.emptyGroupText;
              l.label = r.caption;
            }
            l.html = r.captionHtml;
            c[p] = l;
            p++;
          }
          for (var f = 0; f < r.items.length; f++) {
            c[p] = r.items[f];
            var q = r.items[f].value;
            if (r.items[f].value == "" || r.items[f].value == null) {
              q = p;
            }
            t.itemsByValue[a.trim(q).split(" ").join("?")] = r.items[f];
            p++;
          }
        }
      } else {
        var p = 0;
        var s = new Array();
        a.each(e, function () {
          if (!s[this.group]) {
            if (this.group != "") {
              var i = new a.jqx._jqxListBox.item();
              i.isGroup = true;
              i.label = this.group;
              c[p] = i;
              p++;
              s[this.group] = true;
            }
          }
          c[p] = this;
          var j = this.value;
          if (this.value == "" || this.value == null) {
            j = p - 1;
          }
          t.itemsByValue[a.trim(j).split(" ").join("?")] = this;
          p++;
        });
      }
      return c;
    },
    _mapItem: function (c) {
      var b = new a.jqx._jqxListBox.item();
      if (this.displayMember) {
        if (c.label == undefined) {
          c.label = c[this.displayMember];
        }
        if (c.value == undefined) {
          c.value = c[this.valueMember];
        }
      }
      if (typeof c === "string") {
        b.label = c;
        b.value = c;
      } else {
        if (typeof c === "number") {
          b.label = c.toString();
          b.value = c.toString();
        } else {
          b.label = c.label !== undefined ? c.label : c.value;
          b.value = c.value !== undefined ? c.value : c.label;
        }
      }
      if (b.label == undefined && b.value == undefined && b.html == undefined) {
        b.label = b.value = c;
      }
      b.html = c.html || "";
      b.group = c.group || "";
      b.checked = c.checked || false;
      b.title = c.title || "";
      b.groupHtml = c.groupHtml || "";
      b.disabled = c.disabled || false;
      b.visible = c.visible || true;
      return b;
    },
    addItem: function (b) {
      return this.insertAt(b, this.items ? this.items.length : 0);
    },
    _getItemByParam: function (c) {
      if (c != null) {
        if (c.index == undefined) {
          var b = this.getItemByValue(c);
          if (b) {
            c = b;
          }
        }
      }
      return c;
    },
    insertItem: function (d, b) {
      var c = this._getItemByParam(d);
      return this.insertAt(c, b);
    },
    updateItem: function (c, d) {
      var b = this._getItemByParam(d);
      if (b && b.index != undefined) {
        return this.updateAt(c, b.index);
      }
      return false;
    },
    updateAt: function (d, c) {
      if (d != null) {
        var b = this._mapItem(d);
        this.itemsByValue[a.trim(b.value).split(" ").join("?")] = this.items[c];
        this.items[c].value = b.value;
        this.items[c].label = b.label;
        this.items[c].html = b.html;
        this.items[c].disabled = b.disabled;
        this._raiseEvent("9", { item: this.items[c] });
      }
      this._cachedItemHtml = [];
      this._renderItems();
      if (this.rendered) {
        this.rendered();
      }
    },
    insertAt: function (l, f) {
      if (l == null) {
        return false;
      }
      this._cachedItemHtml = [];
      if (this.items == undefined || this.items.length == 0) {
        this.source = new Array();
        this.refresh();
        var g = this._mapItem(l);
        g.index = 0;
        this.items[this.items.length] = g;
        this._addItems(true);
        this._renderItems();
        if (this.rendered) {
          this.rendered();
        }
        if (this.allowDrag && this._enableDragDrop) {
          this._enableDragDrop();
        }
        var k = g.value;
        if (g.value == "" || g.value == null) {
          k = f;
        }
        this.itemsByValue[a.trim(k).split(" ").join("?")] = g;
        return false;
      }
      var g = this._mapItem(l);
      if (f == -1 || f == undefined || f == null || f >= this.items.length) {
        g.index = this.items.length;
        this.items[this.items.length] = g;
      } else {
        var c = new Array();
        var j = 0;
        var e = false;
        var h = 0;
        for (var b = 0; b < this.items.length; b++) {
          if (this.items[b].isGroup == false) {
            if (h >= f && !e) {
              c[j++] = g;
              g.index = f;
              h++;
              e = true;
            }
          }
          c[j] = this.items[b];
          if (!this.items[b].isGroup) {
            c[j].index = h;
            h++;
          }
          j++;
        }
        this.items = c;
      }
      var k = g.value;
      if (g.value == "" || g.value == null) {
        k = f;
      }
      this.itemsByValue[a.trim(k).split(" ").join("?")] = g;
      this.visibleItems = new Array();
      this.renderedVisibleItems = new Array();
      var d = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
      var i = d.value;
      d.setPosition(0);
      if (
        (this.allowDrag && this._enableDragDrop) ||
        (this.virtualSize && this.virtualSize.height < 10 + this.host.height())
      ) {
        this._addItems(true);
      } else {
        this._addItems(false);
      }
      if (this.groups.length > 1) {
      }
      this._renderItems();
      if (this.allowDrag && this._enableDragDrop) {
        this._enableDragDrop();
      }
      d.setPosition(i);
      this._raiseEvent("7", { item: g });
      if (this.rendered) {
        this.rendered();
      }
      return true;
    },
    removeAt: function (j) {
      if (j < 0 || j > this.items.length - 1) {
        return false;
      }
      if (j == undefined) {
        return false;
      }
      var d = this.items[j].height;
      var o = this.items[j].value;
      if (o == "" || o == null) {
        o = j;
      }
      this.itemsByValue[a.trim(o).split(" ").join("?")] = null;
      var k = this.items[j];
      if (this.groups.length > 1) {
        var h = new Array();
        for (var b = 0; b < this.items.length; b++) {
          if (!this.items[b].isGroup) {
            h.push({ item: this.items[b], key: b });
          }
        }
        if (h[j]) {
          this.items.splice(h[j].key, 1);
        } else {
          return false;
        }
      } else {
        this.items.splice(j, 1);
      }
      var c = new Array();
      var n = 0;
      var f = false;
      var l = 0;
      for (var b = 0; b < this.items.length; b++) {
        c[n] = this.items[b];
        if (!this.items[b].isGroup) {
          c[n].index = l;
          l++;
        }
        n++;
      }
      this.items = c;
      var e = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
      var e = a.data(this.vScrollBar[0], "jqxScrollBar").instance;
      var m = e.value;
      e.setPosition(0);
      this.visibleItems = new Array();
      this.renderedVisibleItems = new Array();
      if (this.items.length > 0) {
        if (this.virtualSize) {
          this.virtualSize.height -= d;
          var p = this.virtualSize.itemsPerPage * 2;
          if (this.autoHeight) {
            p = this.items.length;
          }
          this.virtualItemsCount = Math.min(p, this.items.length);
        }
        this._updatescrollbars();
      } else {
        this._addItems();
      }
      this._renderItems();
      if (this.allowDrag && this._enableDragDrop) {
        this._enableDragDrop();
      }
      if (this.vScrollBar.css("visibility") != "hidden") {
        e.setPosition(m);
      } else {
        e.setPosition(0);
      }
      this.itemsByValue = new Array();
      for (var g = 0; g < this.items.length; g++) {
        var o = this.items[g].value;
        if (this.items[g].value == "" || this.items[g].value == null) {
          o = g;
        }
        this.itemsByValue[a.trim(o).split(" ").join("?")] = this.items[g];
      }
      this._raiseEvent("8", { item: k });
      if (this.items.length === 0) {
        this.selectedIndex = -1;
        this.selectedValue = null;
        this._updateInputSelection();
      }
      if (this.rendered) {
        this.rendered();
      }
      return true;
    },
    removeItem: function (e, f) {
      var d = this._getItemByParam(e);
      var b = -1;
      if (d && d.index != undefined && f !== true) {
        for (var c = 0; c < this.items.length; c++) {
          if (
            this.items[c].label == d.label &&
            this.items[c].value == d.value
          ) {
            b = c;
            break;
          }
        }
        if (b != -1) {
          return this.removeAt(b);
        }
      }
      if (b == -1) {
        return this.removeAt(d.index);
      }
    },
    getItems: function () {
      return this.items;
    },
    disableItem: function (c) {
      var b = this._getItemByParam(c);
      this.disableAt(b.index);
    },
    enableItem: function (c) {
      var b = this._getItemByParam(c);
      this.enableAt(b.index);
    },
    disableAt: function (b) {
      if (!this.items) {
        return false;
      }
      if (b < 0 || b > this.items.length - 1) {
        return false;
      }
      this.items[b].disabled = true;
      this._renderItems();
      return true;
    },
    enableAt: function (b) {
      if (!this.items) {
        return false;
      }
      if (b < 0 || b > this.items.length - 1) {
        return false;
      }
      this.items[b].disabled = false;
      this._renderItems();
      return true;
    },
    destroy: function () {
      if (this.source && this.source.unbindBindingUpdate) {
        this.source.unbindBindingUpdate(this.element.id);
      }
      this._removeHandlers();
      this.vScrollBar.jqxScrollBar("destroy");
      this.hScrollBar.jqxScrollBar("destroy");
      this.vScrollBar.remove();
      this.hScrollBar.remove();
      this.content.remove();
      a.jqx.utilities.resize(this.host, null, true);
      var b = a.data(this.element, "jqxListBox");
      delete this.hScrollInstance;
      delete this.vScrollInstance;
      delete this.vScrollBar;
      delete this.hScrollBar;
      delete this.content;
      delete this.bottomRight;
      delete this.itemswrapper;
      delete this.visualItems;
      delete this.visibleItems;
      delete this.items;
      delete this.groups;
      delete this.renderedVisibleItems;
      delete this._mousewheelfunc;
      delete this._mousemovefunc;
      delete this._cachedItemHtml;
      delete this.itemsByValue;
      delete this._activeElement;
      delete this.source;
      delete this.events;
      if (this.input) {
        this.input.remove();
        delete this.input;
      }
      if (b) {
        delete b.instance;
      }
      this.host.removeData();
      this.host.removeClass();
      this.host.remove();
      this.element = null;
      delete this.element;
      this.host = null;
      delete this.set;
      delete this.get;
      delete this.call;
      delete this.host;
    },
    _raiseEvent: function (g, c) {
      if (this._stopEvents == true) {
        return true;
      }
      if (c == undefined) {
        c = { owner: null };
      }
      var d = this.events[g];
      var e = c;
      e.owner = this;
      this._updateInputSelection();
      var f = new a.Event(d);
      f.owner = this;
      f.args = e;
      if (this.host != null) {
        var b = this.host.trigger(f);
      }
      return b;
    },
  });
})(jqxBaseFramework);
(function (a) {
  a.jqx.parseSourceTag = function (c) {
    var t = new Array();
    var f = a(c).find("option");
    var C = a(c).find("optgroup");
    var s = false;
    if (f.length === 0) {
      f = a(c).find("li");
      if (f.length > 0) {
        s = true;
      }
    }
    if (f.length === 0) {
      var D = [];
      var q = a(c).find("tr");
      var d = a(c).find("th");
      var A = 0;
      if (d.length === 0 && q.length > 0) {
        d = a(q[0]).find("td");
        A = 1;
      }
      var v = [];
      var B = [];
      var D = [];
      for (var x = 0; x < q.length; x++) {
        var m = q[x];
        var h = {};
        if (x === A + 1) {
          B = [];
        }
        for (var w = 0; w < d.length; w++) {
          var g = a.trim(a(d[w]).text());
          var b = a(m).find("td:eq(" + w + ")");
          h[g] = a.trim(b.text());
          if (x === A) {
            v.push({ text: g, dataField: g });
            B.push({ name: g });
          }
          if (x === A + 1) {
            var e = typeof h[g];
            var z = "";
            if (e === "string") {
              if (h[g] === "true" || h[g] === "false") {
                e = "bool";
              } else {
                if (
                  !isNaN(parseFloat(h[g])) &&
                  h[g].indexOf("-") === -1 &&
                  h[g].indexOf("/") === -1
                ) {
                  e = "number";
                  if (h[g].indexOf(".") >= 0) {
                    z = "f";
                  } else {
                    z = "n";
                  }
                } else {
                  if (h[g].indexOf("$") >= 0 || h[g].indexOf("%") >= 0) {
                    e = "number";
                    if (h[g].indexOf("$") >= 0) {
                      z = "c";
                    }
                    if (h[g].indexOf("%") >= 0) {
                      z = "p";
                    }
                    h[g] = h[g].replace("%", "").replace("$", "");
                  } else {
                    if (new Date(h[g]).toString() !== "Invalid Date") {
                      e = "date";
                      z = "d";
                    }
                  }
                }
              }
            }
            v[w].cellsformat = z;
            if (e === "number") {
              v[w].cellsalign = "right";
              v[w].align = "right";
            }
            B.push({ name: g, type: e });
          }
        }
        if (x >= 1) {
          D[D.length] = h;
        }
      }
      var u = { localdata: D, datatype: "array", datafields: B };
      return { source: new a.jqx.dataAdapter(u), columns: v };
    }
    var o = null;
    var l = 0;
    var o = -1;
    var n = this;
    var y = new Array();
    a.each(f, function (j) {
      var E = C.find(this).length > 0;
      var G = null;
      if (this.text != null && (this.label == null || this.label == "")) {
        this.label = this.text;
      }
      if (s === true) {
        this.label = a(this).text().trim();
        this.selected = a(this).attr("data-selected");
        this.checked = this.selected;
        this.value = a(this).attr("data-value") || j;
        this.disabled = a(this).attr("disabled");
      }
      var F = {
        style: this.style.cssText,
        selected: this.selected,
        html: this.innerHTML.trim(),
        classes: this.className,
        disabled: this.disabled,
        value: this.value,
        label: this.label,
        title: this.title,
        originalItem: this,
      };
      var i = a.jqx.browser.msie && a.jqx.browser.version < 8;
      if (i && !s) {
        if (F.value == "" && this.text != null && this.text.length > 0) {
          F.value = this.text;
        }
      }
      if (E) {
        G = C.find(this).parent()[0].label;
        F.group = G;
        if (!y[G]) {
          y[G] = new Array();
          y.length++;
        }
        y[G].push(F);
      }
      if (this.selected) {
        o = j;
      }
      F.checked = this.selected;
      if (F.label !== undefined) {
        t.push(F);
      }
    });
    if (y.length > 0) {
      var p = new Array();
      for (var r in y) {
        if (r === "indexOf") {
          continue;
        }
        var k = null;
        for (var x = 0; x < C.length; x++) {
          if (r === C[x].label || C[x].text) {
            k = C[x];
            break;
          }
        }
        a.each(y[r], function (i, j) {
          if (this.label !== undefined) {
            p.push(this);
          }
        });
      }
    }
    if (p && p.length > 0) {
      return { items: p, index: o };
    } else {
      return { items: t, index: o };
    }
  };
  a.jqx._jqxListBox.item = function () {
    var b = {
      group: "",
      groupHtml: "",
      selected: false,
      isGroup: false,
      highlighted: false,
      value: null,
      label: "",
      html: null,
      visible: true,
      disabled: false,
      element: null,
      width: null,
      height: null,
      initialTop: null,
      top: null,
      left: null,
      title: "",
      index: -1,
      checkBoxElement: null,
      originalItem: null,
      checked: false,
      visibleIndex: -1,
    };
    return b;
  };
})(jqxBaseFramework);
