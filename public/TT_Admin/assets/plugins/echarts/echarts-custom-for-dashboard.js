!(function (t) {
  var e, i;
  !(function () {
    function t(t, e) {
      if (!e) return t;
      if (0 === t.indexOf('.')) {
        var i = e.split('/'),
          o = t.split('/'),
          n = i.length - 1,
          s = o.length,
          r = 0,
          a = 0;
        t: for (var h = 0; s > h; h++)
          switch (o[h]) {
            case '..':
              if (!(n > r)) break t;
              r++, a++;
              break;
            case '.':
              a++;
              break;
            default:
              break t;
          }
        return (i.length = n - r), (o = o.slice(a)), i.concat(o).join('/');
      }
      return t;
    }
    function o(e) {
      function i(i, r) {
        if ('string' == typeof i) {
          var a = o[i];
          return a || ((a = s(t(i, e))), (o[i] = a)), a;
        }
        i instanceof Array &&
          ((r = r || function () {}), r.apply(this, n(i, r, e)));
      }
      var o = {};
      return i;
    }
    function n(i, o, n) {
      for (
        var a = [], h = r[n], l = 0, d = Math.min(i.length, o.length);
        d > l;
        l++
      ) {
        var c,
          p = t(i[l], n);
        switch (p) {
          case 'require':
            c = (h && h.require) || e;
            break;
          case 'exports':
            c = h.exports;
            break;
          case 'module':
            c = h;
            break;
          default:
            c = s(p);
        }
        a.push(c);
      }
      return a;
    }
    function s(t) {
      var e = r[t];
      if (!e) throw new Error('No ' + t);
      if (!e.defined) {
        var i = e.factory,
          o = i.apply(this, n(e.deps || [], i, t));
        'undefined' != typeof o && (e.exports = o), (e.defined = 1);
      }
      return e.exports;
    }
    var r = {};
    (i = function (t, e, i) {
      r[t] = {
        id: t,
        deps: e,
        factory: i,
        defined: 0,
        exports: {},
        require: o(t),
      };
    }),
      (e = o(''));
  })(),
    i(
      'echarts/chart/scatter',
      [
        'require',
        './base',
        '../util/shape/Symbol',
        '../component/axis',
        '../component/grid',
        '../component/dataZoom',
        '../component/dataRange',
        '../config',
        'zrender/tool/util',
        'zrender/tool/color',
        '../chart',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s), this.refresh(n);
        }
        var i = t('./base'),
          o = t('../util/shape/Symbol');
        t('../component/axis'),
          t('../component/grid'),
          t('../component/dataZoom'),
          t('../component/dataRange');
        var n = t('../config');
        n.scatter = {
          zlevel: 0,
          z: 2,
          clickable: !0,
          legendHoverLink: !0,
          xAxisIndex: 0,
          yAxisIndex: 0,
          symbolSize: 4,
          large: !1,
          largeThreshold: 2e3,
          itemStyle: {
            normal: { label: { show: !1 } },
            emphasis: { label: { show: !1 } },
          },
        };
        var s = t('zrender/tool/util'),
          r = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: n.CHART_TYPE_SCATTER,
            _buildShape: function () {
              var t = this.series;
              (this._sIndex2ColorMap = {}),
                (this._symbol = this.option.symbolList),
                (this._sIndex2ShapeMap = {}),
                (this.selectedMap = {}),
                (this.xMarkMap = {});
              for (
                var e,
                  i,
                  o,
                  s,
                  a = this.component.legend,
                  h = [],
                  l = 0,
                  d = t.length;
                d > l;
                l++
              )
                if (
                  ((e = t[l]), (i = e.name), e.type === n.CHART_TYPE_SCATTER)
                ) {
                  if (
                    ((t[l] = this.reformOption(t[l])),
                    (this.legendHoverLink =
                      t[l].legendHoverLink || this.legendHoverLink),
                    (this._sIndex2ShapeMap[l] =
                      this.query(e, 'symbol') ||
                      this._symbol[l % this._symbol.length]),
                    a)
                  ) {
                    if (
                      ((this.selectedMap[i] = a.isSelected(i)),
                      (this._sIndex2ColorMap[l] = r.alpha(a.getColor(i), 0.5)),
                      (o = a.getItemShape(i)))
                    ) {
                      var s = this._sIndex2ShapeMap[l];
                      (o.style.brushType = s.match('empty')
                        ? 'stroke'
                        : 'both'),
                        (s = s.replace('empty', '').toLowerCase()),
                        s.match('rectangle') &&
                          ((o.style.x += Math.round(
                            (o.style.width - o.style.height) / 2,
                          )),
                          (o.style.width = o.style.height)),
                        s.match('star') &&
                          ((o.style.n = s.replace('star', '') - 0 || 5),
                          (s = 'star')),
                        s.match('image') &&
                          ((o.style.image = s.replace(
                            new RegExp('^image:\\/\\/'),
                            '',
                          )),
                          (o.style.x += Math.round(
                            (o.style.width - o.style.height) / 2,
                          )),
                          (o.style.width = o.style.height),
                          (s = 'image')),
                        (o.style.iconType = s),
                        a.setItemShape(i, o);
                    }
                  } else
                    (this.selectedMap[i] = !0),
                      (this._sIndex2ColorMap[l] = r.alpha(
                        this.zr.getColor(l),
                        0.5,
                      ));
                  this.selectedMap[i] && h.push(l);
                }
              this._buildSeries(h), this.addShapeList();
            },
            _buildSeries: function (t) {
              if (0 !== t.length) {
                for (
                  var e,
                    i,
                    o,
                    n,
                    s,
                    r,
                    a,
                    h,
                    l = this.series,
                    d = {},
                    c = 0,
                    p = t.length;
                  p > c;
                  c++
                )
                  if (((e = t[c]), (i = l[e]), 0 !== i.data.length)) {
                    (s = this.component.xAxis.getAxis(i.xAxisIndex || 0)),
                      (r = this.component.yAxis.getAxis(i.yAxisIndex || 0)),
                      (d[e] = []);
                    for (var u = 0, g = i.data.length; g > u; u++)
                      (o = i.data[u]),
                        (n = this.getDataFromOption(o, '-')),
                        '-' === n ||
                          n.length < 2 ||
                          ((a = s.getCoord(n[0])),
                          (h = r.getCoord(n[1])),
                          d[e].push([a, h, u, o.name || '']));
                    (this.xMarkMap[e] = this._markMap(s, r, i.data, d[e])),
                      this.buildMark(e);
                  }
                this._buildPointList(d);
              }
            },
            _markMap: function (t, e, i, o) {
              for (
                var n,
                  s = {
                    min0: Number.POSITIVE_INFINITY,
                    max0: Number.NEGATIVE_INFINITY,
                    sum0: 0,
                    counter0: 0,
                    average0: 0,
                    min1: Number.POSITIVE_INFINITY,
                    max1: Number.NEGATIVE_INFINITY,
                    sum1: 0,
                    counter1: 0,
                    average1: 0,
                  },
                  r = 0,
                  a = o.length;
                a > r;
                r++
              )
                (n = i[o[r][2]].value || i[o[r][2]]),
                  s.min0 > n[0] &&
                    ((s.min0 = n[0]), (s.minY0 = o[r][1]), (s.minX0 = o[r][0])),
                  s.max0 < n[0] &&
                    ((s.max0 = n[0]), (s.maxY0 = o[r][1]), (s.maxX0 = o[r][0])),
                  (s.sum0 += n[0]),
                  s.counter0++,
                  s.min1 > n[1] &&
                    ((s.min1 = n[1]), (s.minY1 = o[r][1]), (s.minX1 = o[r][0])),
                  s.max1 < n[1] &&
                    ((s.max1 = n[1]), (s.maxY1 = o[r][1]), (s.maxX1 = o[r][0])),
                  (s.sum1 += n[1]),
                  s.counter1++;
              var h = this.component.grid.getX(),
                l = this.component.grid.getXend(),
                d = this.component.grid.getY(),
                c = this.component.grid.getYend();
              s.average0 = s.sum0 / s.counter0;
              var p = t.getCoord(s.average0);
              (s.averageLine0 = [
                [p, c],
                [p, d],
              ]),
                (s.minLine0 = [
                  [s.minX0, c],
                  [s.minX0, d],
                ]),
                (s.maxLine0 = [
                  [s.maxX0, c],
                  [s.maxX0, d],
                ]),
                (s.average1 = s.sum1 / s.counter1);
              var u = e.getCoord(s.average1);
              return (
                (s.averageLine1 = [
                  [h, u],
                  [l, u],
                ]),
                (s.minLine1 = [
                  [h, s.minY1],
                  [l, s.minY1],
                ]),
                (s.maxLine1 = [
                  [h, s.maxY1],
                  [l, s.maxY1],
                ]),
                s
              );
            },
            _buildPointList: function (t) {
              var e,
                i,
                o,
                n,
                s = this.series;
              for (var r in t)
                if (
                  ((e = s[r]),
                  (i = t[r]),
                  e.large && e.data.length > e.largeThreshold)
                )
                  this.shapeList.push(
                    this._getLargeSymbol(
                      e,
                      i,
                      this.getItemStyleColor(
                        this.query(e, 'itemStyle.normal.color'),
                        r,
                        -1,
                      ) || this._sIndex2ColorMap[r],
                    ),
                  );
                else
                  for (var a = 0, h = i.length; h > a; a++)
                    (o = i[a]),
                      (n = this._getSymbol(r, o[2], o[3], o[0], o[1])),
                      n && this.shapeList.push(n);
            },
            _getSymbol: function (t, e, i, o, n) {
              var s,
                r = this.series,
                a = r[t],
                h = a.data[e],
                l = this.component.dataRange;
              if (l) {
                if (
                  ((s = isNaN(h[2])
                    ? this._sIndex2ColorMap[t]
                    : l.getColor(h[2])),
                  !s)
                )
                  return null;
              } else s = this._sIndex2ColorMap[t];
              var d = this.getSymbolShape(
                a,
                t,
                h,
                e,
                i,
                o,
                n,
                this._sIndex2ShapeMap[t],
                s,
                'rgba(0,0,0,0)',
                'vertical',
              );
              return (d.zlevel = a.zlevel), (d.z = a.z), (d._main = !0), d;
            },
            _getLargeSymbol: function (t, e, i) {
              return new o({
                zlevel: t.zlevel,
                z: t.z,
                _main: !0,
                hoverable: !1,
                style: { pointList: e, color: i, strokeColor: i },
                highlightStyle: { pointList: [] },
              });
            },
            getMarkCoord: function (t, e) {
              var i,
                o = this.series[t],
                n = this.xMarkMap[t],
                s = this.component.xAxis.getAxis(o.xAxisIndex),
                r = this.component.yAxis.getAxis(o.yAxisIndex);
              if (
                !e.type ||
                ('max' !== e.type && 'min' !== e.type && 'average' !== e.type)
              )
                i = [
                  'string' != typeof e.xAxis && s.getCoordByIndex
                    ? s.getCoordByIndex(e.xAxis || 0)
                    : s.getCoord(e.xAxis || 0),
                  'string' != typeof e.yAxis && r.getCoordByIndex
                    ? r.getCoordByIndex(e.yAxis || 0)
                    : r.getCoord(e.yAxis || 0),
                ];
              else {
                var a = null != e.valueIndex ? e.valueIndex : 1;
                i = [
                  n[e.type + 'X' + a],
                  n[e.type + 'Y' + a],
                  n[e.type + 'Line' + a],
                  n[e.type + a],
                ];
              }
              return i;
            },
            refresh: function (t) {
              t && ((this.option = t), (this.series = t.series)),
                this.backupShapeList(),
                this._buildShape();
            },
            ondataRange: function (t, e) {
              this.component.dataRange &&
                (this.refresh(), (e.needRefresh = !0));
            },
          }),
          s.inherits(e, i),
          t('../chart').define('scatter', e),
          e
        );
      },
    ),
    i(
      'echarts/chart/gauge',
      [
        'require',
        './base',
        '../util/shape/GaugePointer',
        'zrender/shape/Text',
        'zrender/shape/Line',
        'zrender/shape/Rectangle',
        'zrender/shape/Circle',
        'zrender/shape/Sector',
        '../config',
        '../util/ecData',
        '../util/accMath',
        'zrender/tool/util',
        '../chart',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s), this.refresh(n);
        }
        var i = t('./base'),
          o = t('../util/shape/GaugePointer'),
          n = t('zrender/shape/Text'),
          s = t('zrender/shape/Line'),
          r = t('zrender/shape/Rectangle'),
          a = t('zrender/shape/Circle'),
          h = t('zrender/shape/Sector'),
          l = t('../config');
        l.gauge = {
          zlevel: 0,
          z: 2,
          center: ['50%', '50%'],
          clickable: !0,
          legendHoverLink: !0,
          radius: '75%',
          startAngle: 225,
          endAngle: -45,
          min: 0,
          max: 100,
          splitNumber: 10,
          axisLine: {
            show: !0,
            lineStyle: {
              color: [
                [0.2, '#228b22'],
                [0.8, '#48b'],
                [1, '#ff4500'],
              ],
              width: 30,
            },
          },
          axisTick: {
            show: !0,
            splitNumber: 5,
            length: 8,
            lineStyle: { color: '#eee', width: 1, type: 'solid' },
          },
          axisLabel: { show: !0, textStyle: { color: 'auto' } },
          splitLine: {
            show: !0,
            length: 30,
            lineStyle: { color: '#eee', width: 2, type: 'solid' },
          },
          pointer: { show: !0, length: '80%', width: 8, color: 'auto' },
          title: {
            show: !0,
            offsetCenter: [0, '-40%'],
            textStyle: { color: '#333', fontSize: 15 },
          },
          detail: {
            show: !0,
            backgroundColor: 'rgba(0,0,0,0)',
            borderWidth: 0,
            borderColor: '#ccc',
            width: 100,
            height: 40,
            offsetCenter: [0, '40%'],
            textStyle: { color: 'auto', fontSize: 30 },
          },
        };
        var d = t('../util/ecData'),
          c = t('../util/accMath'),
          p = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: l.CHART_TYPE_GAUGE,
            _buildShape: function () {
              var t = this.series;
              (this._paramsMap = {}), (this.selectedMap = {});
              for (var e = 0, i = t.length; i > e; e++)
                t[e].type === l.CHART_TYPE_GAUGE &&
                  ((this.selectedMap[t[e].name] = !0),
                  (t[e] = this.reformOption(t[e])),
                  (this.legendHoverLink =
                    t[e].legendHoverLink || this.legendHoverLink),
                  this._buildSingleGauge(e),
                  this.buildMark(e));
              this.addShapeList();
            },
            _buildSingleGauge: function (t) {
              var e = this.series[t];
              (this._paramsMap[t] = {
                center: this.parseCenter(this.zr, e.center),
                radius: this.parseRadius(this.zr, e.radius),
                startAngle: e.startAngle.toFixed(2) - 0,
                endAngle: e.endAngle.toFixed(2) - 0,
              }),
                (this._paramsMap[t].totalAngle =
                  this._paramsMap[t].startAngle - this._paramsMap[t].endAngle),
                this._colorMap(t),
                this._buildAxisLine(t),
                this._buildSplitLine(t),
                this._buildAxisTick(t),
                this._buildAxisLabel(t),
                this._buildPointer(t),
                this._buildTitle(t),
                this._buildDetail(t);
            },
            _buildAxisLine: function (t) {
              var e = this.series[t];
              if (e.axisLine.show)
                for (
                  var i,
                    o,
                    n = e.min,
                    s = e.max - n,
                    r = this._paramsMap[t],
                    a = r.center,
                    h = r.startAngle,
                    l = r.totalAngle,
                    c = r.colorArray,
                    p = e.axisLine.lineStyle,
                    u = this.parsePercent(p.width, r.radius[1]),
                    g = r.radius[1],
                    f = g - u,
                    m = h,
                    _ = 0,
                    y = c.length;
                  y > _;
                  _++
                )
                  (o = h - (l * (c[_][0] - n)) / s),
                    (i = this._getSector(
                      a,
                      f,
                      g,
                      o,
                      m,
                      c[_][1],
                      p,
                      e.zlevel,
                      e.z,
                    )),
                    (m = o),
                    (i._animationAdd = 'r'),
                    d.set(i, 'seriesIndex', t),
                    d.set(i, 'dataIndex', _),
                    this.shapeList.push(i);
            },
            _buildSplitLine: function (t) {
              var e = this.series[t];
              if (e.splitLine.show)
                for (
                  var i,
                    o,
                    n,
                    r = this._paramsMap[t],
                    a = e.splitNumber,
                    h = e.min,
                    l = e.max - h,
                    d = e.splitLine,
                    c = this.parsePercent(d.length, r.radius[1]),
                    p = d.lineStyle,
                    u = p.color,
                    g = r.center,
                    f = (r.startAngle * Math.PI) / 180,
                    m = (r.totalAngle * Math.PI) / 180,
                    _ = r.radius[1],
                    y = _ - c,
                    x = 0;
                  a >= x;
                  x++
                )
                  (i = f - (m / a) * x),
                    (o = Math.sin(i)),
                    (n = Math.cos(i)),
                    this.shapeList.push(
                      new s({
                        zlevel: e.zlevel,
                        z: e.z + 1,
                        hoverable: !1,
                        style: {
                          xStart: g[0] + n * _,
                          yStart: g[1] - o * _,
                          xEnd: g[0] + n * y,
                          yEnd: g[1] - o * y,
                          strokeColor:
                            'auto' === u
                              ? this._getColor(t, h + (l / a) * x)
                              : u,
                          lineType: p.type,
                          lineWidth: p.width,
                          shadowColor: p.shadowColor,
                          shadowBlur: p.shadowBlur,
                          shadowOffsetX: p.shadowOffsetX,
                          shadowOffsetY: p.shadowOffsetY,
                        },
                      }),
                    );
            },
            _buildAxisTick: function (t) {
              var e = this.series[t];
              if (e.axisTick.show)
                for (
                  var i,
                    o,
                    n,
                    r = this._paramsMap[t],
                    a = e.splitNumber,
                    h = e.min,
                    l = e.max - h,
                    d = e.axisTick,
                    c = d.splitNumber,
                    p = this.parsePercent(d.length, r.radius[1]),
                    u = d.lineStyle,
                    g = u.color,
                    f = r.center,
                    m = (r.startAngle * Math.PI) / 180,
                    _ = (r.totalAngle * Math.PI) / 180,
                    y = r.radius[1],
                    x = y - p,
                    v = 0,
                    b = a * c;
                  b >= v;
                  v++
                )
                  v % c !== 0 &&
                    ((i = m - (_ / b) * v),
                    (o = Math.sin(i)),
                    (n = Math.cos(i)),
                    this.shapeList.push(
                      new s({
                        zlevel: e.zlevel,
                        z: e.z + 1,
                        hoverable: !1,
                        style: {
                          xStart: f[0] + n * y,
                          yStart: f[1] - o * y,
                          xEnd: f[0] + n * x,
                          yEnd: f[1] - o * x,
                          strokeColor:
                            'auto' === g
                              ? this._getColor(t, h + (l / b) * v)
                              : g,
                          lineType: u.type,
                          lineWidth: u.width,
                          shadowColor: u.shadowColor,
                          shadowBlur: u.shadowBlur,
                          shadowOffsetX: u.shadowOffsetX,
                          shadowOffsetY: u.shadowOffsetY,
                        },
                      }),
                    ));
            },
            _buildAxisLabel: function (t) {
              var e = this.series[t];
              if (e.axisLabel.show)
                for (
                  var i,
                    o,
                    s,
                    r,
                    a = e.splitNumber,
                    h = e.min,
                    l = e.max - h,
                    d = e.axisLabel.textStyle,
                    p = this.getFont(d),
                    u = d.color,
                    g = this._paramsMap[t],
                    f = g.center,
                    m = g.startAngle,
                    _ = g.totalAngle,
                    y =
                      g.radius[1] -
                      this.parsePercent(e.splitLine.length, g.radius[1]) -
                      5,
                    x = 0;
                  a >= x;
                  x++
                )
                  (r = c.accAdd(h, c.accMul(c.accDiv(l, a), x))),
                    (i = m - (_ / a) * x),
                    (o = Math.sin((i * Math.PI) / 180)),
                    (s = Math.cos((i * Math.PI) / 180)),
                    (i = (i + 360) % 360),
                    this.shapeList.push(
                      new n({
                        zlevel: e.zlevel,
                        z: e.z + 1,
                        hoverable: !1,
                        style: {
                          x: f[0] + s * y,
                          y: f[1] - o * y,
                          color: 'auto' === u ? this._getColor(t, r) : u,
                          text: this._getLabelText(e.axisLabel.formatter, r),
                          textAlign:
                            i >= 110 && 250 >= i
                              ? 'left'
                              : 70 >= i || i >= 290
                              ? 'right'
                              : 'center',
                          textBaseline:
                            i >= 10 && 170 >= i
                              ? 'top'
                              : i >= 190 && 350 >= i
                              ? 'bottom'
                              : 'middle',
                          textFont: p,
                          shadowColor: d.shadowColor,
                          shadowBlur: d.shadowBlur,
                          shadowOffsetX: d.shadowOffsetX,
                          shadowOffsetY: d.shadowOffsetY,
                        },
                      }),
                    );
            },
            _buildPointer: function (t) {
              var e = this.series[t];
              if (e.pointer.show) {
                var i = e.max - e.min,
                  n = e.pointer,
                  s = this._paramsMap[t],
                  r = this.parsePercent(n.length, s.radius[1]),
                  h = this.parsePercent(n.width, s.radius[1]),
                  l = s.center,
                  c = this._getValue(t);
                c = c < e.max ? c : e.max;
                var p =
                    ((s.startAngle - (s.totalAngle / i) * (c - e.min)) *
                      Math.PI) /
                    180,
                  u = 'auto' === n.color ? this._getColor(t, c) : n.color,
                  g = new o({
                    zlevel: e.zlevel,
                    z: e.z + 1,
                    clickable: this.query(e, 'clickable'),
                    style: {
                      x: l[0],
                      y: l[1],
                      r: r,
                      startAngle: (s.startAngle * Math.PI) / 180,
                      angle: p,
                      color: u,
                      width: h,
                      shadowColor: n.shadowColor,
                      shadowBlur: n.shadowBlur,
                      shadowOffsetX: n.shadowOffsetX,
                      shadowOffsetY: n.shadowOffsetY,
                    },
                    highlightStyle: {
                      brushType: 'fill',
                      width: h > 2 ? 2 : h / 2,
                      color: '#fff',
                    },
                  });
                d.pack(
                  g,
                  this.series[t],
                  t,
                  this.series[t].data[0],
                  0,
                  this.series[t].data[0].name,
                  c,
                ),
                  this.shapeList.push(g),
                  this.shapeList.push(
                    new a({
                      zlevel: e.zlevel,
                      z: e.z + 2,
                      hoverable: !1,
                      style: {
                        x: l[0],
                        y: l[1],
                        r: n.width / 2.5,
                        color: '#fff',
                      },
                    }),
                  );
              }
            },
            _buildTitle: function (t) {
              var e = this.series[t];
              if (e.title.show) {
                var i = e.data[0],
                  o = null != i.name ? i.name : '';
                if ('' !== o) {
                  var s = e.title,
                    r = s.offsetCenter,
                    a = s.textStyle,
                    h = a.color,
                    l = this._paramsMap[t],
                    d = l.center[0] + this.parsePercent(r[0], l.radius[1]),
                    c = l.center[1] + this.parsePercent(r[1], l.radius[1]);
                  this.shapeList.push(
                    new n({
                      zlevel: e.zlevel,
                      z:
                        e.z +
                        (Math.abs(d - l.center[0]) + Math.abs(c - l.center[1]) <
                        2 * a.fontSize
                          ? 2
                          : 1),
                      hoverable: !1,
                      style: {
                        x: d,
                        y: c,
                        color: 'auto' === h ? this._getColor(t) : h,
                        text: o,
                        textAlign: 'center',
                        textFont: this.getFont(a),
                        shadowColor: a.shadowColor,
                        shadowBlur: a.shadowBlur,
                        shadowOffsetX: a.shadowOffsetX,
                        shadowOffsetY: a.shadowOffsetY,
                      },
                    }),
                  );
                }
              }
            },
            _buildDetail: function (t) {
              var e = this.series[t];
              if (e.detail.show) {
                var i = e.detail,
                  o = i.offsetCenter,
                  n = i.backgroundColor,
                  s = i.textStyle,
                  a = s.color,
                  h = this._paramsMap[t],
                  l = this._getValue(t),
                  d =
                    h.center[0] -
                    i.width / 2 +
                    this.parsePercent(o[0], h.radius[1]),
                  c = h.center[1] + this.parsePercent(o[1], h.radius[1]);
                this.shapeList.push(
                  new r({
                    zlevel: e.zlevel,
                    z:
                      e.z +
                      (Math.abs(d + i.width / 2 - h.center[0]) +
                        Math.abs(c + i.height / 2 - h.center[1]) <
                      s.fontSize
                        ? 2
                        : 1),
                    hoverable: !1,
                    style: {
                      x: d,
                      y: c,
                      width: i.width,
                      height: i.height,
                      brushType: 'both',
                      color: 'auto' === n ? this._getColor(t, l) : n,
                      lineWidth: i.borderWidth,
                      strokeColor: i.borderColor,
                      shadowColor: i.shadowColor,
                      shadowBlur: i.shadowBlur,
                      shadowOffsetX: i.shadowOffsetX,
                      shadowOffsetY: i.shadowOffsetY,
                      text: this._getLabelText(i.formatter, l),
                      textFont: this.getFont(s),
                      textPosition: 'inside',
                      textColor: 'auto' === a ? this._getColor(t, l) : a,
                    },
                  }),
                );
              }
            },
            _getValue: function (t) {
              return this.getDataFromOption(this.series[t].data[0]);
            },
            _colorMap: function (t) {
              var e = this.series[t],
                i = e.min,
                o = e.max - i,
                n = e.axisLine.lineStyle.color;
              n instanceof Array || (n = [[1, n]]);
              for (var s = [], r = 0, a = n.length; a > r; r++)
                s.push([n[r][0] * o + i, n[r][1]]);
              this._paramsMap[t].colorArray = s;
            },
            _getColor: function (t, e) {
              null == e && (e = this._getValue(t));
              for (
                var i = this._paramsMap[t].colorArray, o = 0, n = i.length;
                n > o;
                o++
              )
                if (i[o][0] >= e) return i[o][1];
              return i[i.length - 1][1];
            },
            _getSector: function (t, e, i, o, n, s, r, a, l) {
              return new h({
                zlevel: a,
                z: l,
                hoverable: !1,
                style: {
                  x: t[0],
                  y: t[1],
                  r0: e,
                  r: i,
                  startAngle: o,
                  endAngle: n,
                  brushType: 'fill',
                  color: s,
                  shadowColor: r.shadowColor,
                  shadowBlur: r.shadowBlur,
                  shadowOffsetX: r.shadowOffsetX,
                  shadowOffsetY: r.shadowOffsetY,
                },
              });
            },
            _getLabelText: function (t, e) {
              if (t) {
                if ('function' == typeof t) return t.call(this.myChart, e);
                if ('string' == typeof t) return t.replace('{value}', e);
              }
              return e;
            },
            refresh: function (t) {
              t && ((this.option = t), (this.series = t.series)),
                this.backupShapeList(),
                this._buildShape();
            },
          }),
          p.inherits(e, i),
          t('../chart').define('gauge', e),
          e
        );
      },
    ),
    i(
      'echarts/chart/bar',
      [
        'require',
        './base',
        'zrender/shape/Rectangle',
        '../component/axis',
        '../component/grid',
        '../component/dataZoom',
        '../config',
        '../util/ecData',
        'zrender/tool/util',
        'zrender/tool/color',
        '../chart',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s), this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Rectangle');
        t('../component/axis'),
          t('../component/grid'),
          t('../component/dataZoom');
        var n = t('../config');
        n.bar = {
          zlevel: 0,
          z: 2,
          clickable: !0,
          legendHoverLink: !0,
          xAxisIndex: 0,
          yAxisIndex: 0,
          barMinHeight: 0,
          barGap: '30%',
          barCategoryGap: '20%',
          itemStyle: {
            normal: {
              barBorderColor: '#fff',
              barBorderRadius: 0,
              barBorderWidth: 0,
              label: { show: !1 },
            },
            emphasis: {
              barBorderColor: '#fff',
              barBorderRadius: 0,
              barBorderWidth: 0,
              label: { show: !1 },
            },
          },
        };
        var s = t('../util/ecData'),
          r = t('zrender/tool/util'),
          a = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: n.CHART_TYPE_BAR,
            _buildShape: function () {
              this._buildPosition();
            },
            _buildNormal: function (t, e, i, s, r) {
              for (
                var a,
                  h,
                  l,
                  d,
                  c,
                  p,
                  u,
                  g,
                  f,
                  m,
                  _,
                  y,
                  x = this.series,
                  v = i[0][0],
                  b = x[v],
                  S = 'horizontal' == r,
                  T = this.component.xAxis,
                  z = this.component.yAxis,
                  C = S ? T.getAxis(b.xAxisIndex) : z.getAxis(b.yAxisIndex),
                  L = this._mapSize(C, i),
                  w = L.gap,
                  E = L.barGap,
                  M = L.barWidthMap,
                  A = L.barMaxWidthMap,
                  k = L.barWidth,
                  O = L.barMinHeightMap,
                  I = L.interval,
                  P = this.deepQuery([this.ecTheme, n], 'island.r'),
                  R = 0,
                  D = e;
                D > R && null != C.getNameByIndex(R);
                R++
              ) {
                S
                  ? (d = C.getCoordByIndex(R) - w / 2)
                  : (c = C.getCoordByIndex(R) + w / 2);
                for (var H = 0, B = i.length; B > H; H++) {
                  var N = x[i[H][0]].yAxisIndex || 0,
                    F = x[i[H][0]].xAxisIndex || 0;
                  (a = S ? z.getAxis(N) : T.getAxis(F)),
                    (u = p = f = g = a.getCoord(0));
                  for (var Y = 0, W = i[H].length; W > Y; Y++)
                    (v = i[H][Y]),
                      (b = x[v]),
                      (_ = b.data[R]),
                      (y = this.getDataFromOption(_, '-')),
                      (s[v] = s[v] || {
                        min: Number.POSITIVE_INFINITY,
                        max: Number.NEGATIVE_INFINITY,
                        sum: 0,
                        counter: 0,
                        average: 0,
                      }),
                      (l = Math.min(A[v] || Number.MAX_VALUE, M[v] || k)),
                      '-' !== y &&
                        (y > 0
                          ? ((h =
                              Y > 0
                                ? a.getCoordSize(y)
                                : S
                                ? u - a.getCoord(y)
                                : a.getCoord(y) - u),
                            1 === W && O[v] > h && (h = O[v]),
                            S ? ((p -= h), (c = p)) : ((d = p), (p += h)))
                          : 0 > y
                          ? ((h =
                              Y > 0
                                ? a.getCoordSize(y)
                                : S
                                ? a.getCoord(y) - f
                                : f - a.getCoord(y)),
                            1 === W && O[v] > h && (h = O[v]),
                            S ? ((c = g), (g += h)) : ((g -= h), (d = g)))
                          : ((h = 0),
                            S ? ((p -= h), (c = p)) : ((d = p), (p += h))),
                        (s[v][R] = S ? d + l / 2 : c - l / 2),
                        s[v].min > y &&
                          ((s[v].min = y),
                          S
                            ? ((s[v].minY = c), (s[v].minX = s[v][R]))
                            : ((s[v].minX = d + h), (s[v].minY = s[v][R]))),
                        s[v].max < y &&
                          ((s[v].max = y),
                          S
                            ? ((s[v].maxY = c), (s[v].maxX = s[v][R]))
                            : ((s[v].maxX = d + h), (s[v].maxY = s[v][R]))),
                        (s[v].sum += y),
                        s[v].counter++,
                        R % I === 0 &&
                          ((m = this._getBarItem(
                            v,
                            R,
                            C.getNameByIndex(R),
                            d,
                            c - (S ? 0 : l),
                            S ? l : h,
                            S ? h : l,
                            S ? 'vertical' : 'horizontal',
                          )),
                          this.shapeList.push(new o(m))));
                  for (var Y = 0, W = i[H].length; W > Y; Y++)
                    (v = i[H][Y]),
                      (b = x[v]),
                      (_ = b.data[R]),
                      (y = this.getDataFromOption(_, '-')),
                      (l = Math.min(A[v] || Number.MAX_VALUE, M[v] || k)),
                      '-' == y &&
                        this.deepQuery([_, b, this.option], 'calculable') &&
                        (S ? ((p -= P), (c = p)) : ((d = p), (p += P)),
                        (m = this._getBarItem(
                          v,
                          R,
                          C.getNameByIndex(R),
                          d,
                          c - (S ? 0 : l),
                          S ? l : P,
                          S ? P : l,
                          S ? 'vertical' : 'horizontal',
                        )),
                        (m.hoverable = !1),
                        (m.draggable = !1),
                        (m.style.lineWidth = 1),
                        (m.style.brushType = 'stroke'),
                        (m.style.strokeColor =
                          b.calculableHolderColor ||
                          this.ecTheme.calculableHolderColor ||
                          n.calculableHolderColor),
                        this.shapeList.push(new o(m)));
                  S ? (d += l + E) : (c -= l + E);
                }
              }
              this._calculMarkMapXY(s, i, S ? 'y' : 'x');
            },
            _buildHorizontal: function (t, e, i, o) {
              return this._buildNormal(t, e, i, o, 'horizontal');
            },
            _buildVertical: function (t, e, i, o) {
              return this._buildNormal(t, e, i, o, 'vertical');
            },
            _buildOther: function (t, e, i, n) {
              for (var s = this.series, r = 0, a = i.length; a > r; r++)
                for (var h = 0, l = i[r].length; l > h; h++) {
                  var d = i[r][h],
                    c = s[d],
                    p = c.xAxisIndex || 0,
                    u = this.component.xAxis.getAxis(p),
                    g = u.getCoord(0),
                    f = c.yAxisIndex || 0,
                    m = this.component.yAxis.getAxis(f),
                    _ = m.getCoord(0);
                  n[d] = n[d] || {
                    min0: Number.POSITIVE_INFINITY,
                    min1: Number.POSITIVE_INFINITY,
                    max0: Number.NEGATIVE_INFINITY,
                    max1: Number.NEGATIVE_INFINITY,
                    sum0: 0,
                    sum1: 0,
                    counter0: 0,
                    counter1: 0,
                    average0: 0,
                    average1: 0,
                  };
                  for (var y = 0, x = c.data.length; x > y; y++) {
                    var v = c.data[y],
                      b = this.getDataFromOption(v, '-');
                    if (b instanceof Array) {
                      var S,
                        T,
                        z = u.getCoord(b[0]),
                        C = m.getCoord(b[1]),
                        L = [v, c],
                        w = this.deepQuery(L, 'barWidth') || 10,
                        E = this.deepQuery(L, 'barHeight');
                      null != E
                        ? ((S = 'horizontal'),
                          b[0] > 0
                            ? ((w = z - g), (z -= w))
                            : (w = b[0] < 0 ? g - z : 0),
                          (T = this._getBarItem(
                            d,
                            y,
                            b[0],
                            z,
                            C - E / 2,
                            w,
                            E,
                            S,
                          )))
                        : ((S = 'vertical'),
                          b[1] > 0
                            ? (E = _ - C)
                            : b[1] < 0
                            ? ((E = C - _), (C -= E))
                            : (E = 0),
                          (T = this._getBarItem(
                            d,
                            y,
                            b[0],
                            z - w / 2,
                            C,
                            w,
                            E,
                            S,
                          ))),
                        this.shapeList.push(new o(T)),
                        (z = u.getCoord(b[0])),
                        (C = m.getCoord(b[1])),
                        n[d].min0 > b[0] &&
                          ((n[d].min0 = b[0]),
                          (n[d].minY0 = C),
                          (n[d].minX0 = z)),
                        n[d].max0 < b[0] &&
                          ((n[d].max0 = b[0]),
                          (n[d].maxY0 = C),
                          (n[d].maxX0 = z)),
                        (n[d].sum0 += b[0]),
                        n[d].counter0++,
                        n[d].min1 > b[1] &&
                          ((n[d].min1 = b[1]),
                          (n[d].minY1 = C),
                          (n[d].minX1 = z)),
                        n[d].max1 < b[1] &&
                          ((n[d].max1 = b[1]),
                          (n[d].maxY1 = C),
                          (n[d].maxX1 = z)),
                        (n[d].sum1 += b[1]),
                        n[d].counter1++;
                    }
                  }
                }
              this._calculMarkMapXY(n, i, 'xy');
            },
            _mapSize: function (t, e, i) {
              var o,
                n,
                s = this._findSpecialBarSzie(e, i),
                r = s.barWidthMap,
                a = s.barMaxWidthMap,
                h = s.barMinHeightMap,
                l = s.sBarWidthCounter,
                d = s.sBarWidthTotal,
                c = s.barGap,
                p = s.barCategoryGap,
                u = 1;
              if (e.length != l) {
                if (i)
                  (o = t.getGap()),
                    (c = 0),
                    (n = +(o / e.length).toFixed(2)),
                    0 >= n && ((u = Math.floor(e.length / o)), (n = 1));
                else if (
                  ((o =
                    'string' == typeof p && p.match(/%$/)
                      ? ((t.getGap() * (100 - parseFloat(p))) / 100).toFixed(
                          2,
                        ) - 0
                      : t.getGap() - p),
                  'string' == typeof c && c.match(/%$/)
                    ? ((c = parseFloat(c) / 100),
                      (n = +(
                        (o - d) /
                        ((e.length - 1) * c + e.length - l)
                      ).toFixed(2)),
                      (c = n * c))
                    : ((c = parseFloat(c)),
                      (n = +(
                        (o - d - c * (e.length - 1)) /
                        (e.length - l)
                      ).toFixed(2))),
                  0 >= n)
                )
                  return this._mapSize(t, e, !0);
              } else if (
                ((o =
                  l > 1
                    ? 'string' == typeof p && p.match(/%$/)
                      ? +((t.getGap() * (100 - parseFloat(p))) / 100).toFixed(2)
                      : t.getGap() - p
                    : d),
                (n = 0),
                (c = l > 1 ? +((o - d) / (l - 1)).toFixed(2) : 0),
                0 > c)
              )
                return this._mapSize(t, e, !0);
              return this._recheckBarMaxWidth(e, r, a, h, o, n, c, u);
            },
            _findSpecialBarSzie: function (t, e) {
              for (
                var i,
                  o,
                  n,
                  s,
                  r = this.series,
                  a = {},
                  h = {},
                  l = {},
                  d = 0,
                  c = 0,
                  p = 0,
                  u = t.length;
                u > p;
                p++
              )
                for (
                  var g = { barWidth: !1, barMaxWidth: !1 },
                    f = 0,
                    m = t[p].length;
                  m > f;
                  f++
                ) {
                  var _ = t[p][f],
                    y = r[_];
                  if (!e) {
                    if (g.barWidth) a[_] = i;
                    else if (((i = this.query(y, 'barWidth')), null != i)) {
                      (a[_] = i), (c += i), d++, (g.barWidth = !0);
                      for (var x = 0, v = f; v > x; x++) {
                        var b = t[p][x];
                        a[b] = i;
                      }
                    }
                    if (g.barMaxWidth) h[_] = o;
                    else if (((o = this.query(y, 'barMaxWidth')), null != o)) {
                      (h[_] = o), (g.barMaxWidth = !0);
                      for (var x = 0, v = f; v > x; x++) {
                        var b = t[p][x];
                        h[b] = o;
                      }
                    }
                  }
                  (l[_] = this.query(y, 'barMinHeight')),
                    (n = null != n ? n : this.query(y, 'barGap')),
                    (s = null != s ? s : this.query(y, 'barCategoryGap'));
                }
              return {
                barWidthMap: a,
                barMaxWidthMap: h,
                barMinHeightMap: l,
                sBarWidth: i,
                sBarMaxWidth: o,
                sBarWidthCounter: d,
                sBarWidthTotal: c,
                barGap: n,
                barCategoryGap: s,
              };
            },
            _recheckBarMaxWidth: function (t, e, i, o, n, s, r, a) {
              for (var h = 0, l = t.length; l > h; h++) {
                var d = t[h][0];
                i[d] && i[d] < s && (n -= s - i[d]);
              }
              return {
                barWidthMap: e,
                barMaxWidthMap: i,
                barMinHeightMap: o,
                gap: n,
                barWidth: s,
                barGap: r,
                interval: a,
              };
            },
            _getBarItem: function (t, e, i, o, n, r, h, l) {
              var d,
                c = this.series,
                p = c[t],
                u = p.data[e],
                g = this._sIndex2ColorMap[t],
                f = [u, p],
                m = this.deepMerge(f, 'itemStyle.normal'),
                _ = this.deepMerge(f, 'itemStyle.emphasis'),
                y = m.barBorderWidth;
              d = {
                zlevel: p.zlevel,
                z: p.z,
                clickable: this.deepQuery(f, 'clickable'),
                style: {
                  x: o,
                  y: n,
                  width: r,
                  height: h,
                  brushType: 'both',
                  color: this.getItemStyleColor(
                    this.deepQuery(f, 'itemStyle.normal.color') || g,
                    t,
                    e,
                    u,
                  ),
                  radius: m.barBorderRadius,
                  lineWidth: y,
                  strokeColor: m.barBorderColor,
                },
                highlightStyle: {
                  color: this.getItemStyleColor(
                    this.deepQuery(f, 'itemStyle.emphasis.color'),
                    t,
                    e,
                    u,
                  ),
                  radius: _.barBorderRadius,
                  lineWidth: _.barBorderWidth,
                  strokeColor: _.barBorderColor,
                },
                _orient: l,
              };
              var x = d.style;
              (d.highlightStyle.color =
                d.highlightStyle.color ||
                ('string' == typeof x.color ? a.lift(x.color, -0.3) : x.color)),
                (x.x = Math.floor(x.x)),
                (x.y = Math.floor(x.y)),
                (x.height = Math.ceil(x.height)),
                (x.width = Math.ceil(x.width)),
                y > 0 && x.height > y && x.width > y
                  ? ((x.y += y / 2),
                    (x.height -= y),
                    (x.x += y / 2),
                    (x.width -= y))
                  : (x.brushType = 'fill'),
                (d.highlightStyle.textColor = d.highlightStyle.color),
                (d = this.addLabel(d, p, u, i, l));
              for (
                var v = [x, d.highlightStyle], b = 0, S = v.length;
                S > b;
                b++
              ) {
                var T = v[b].textPosition;
                if (
                  'insideLeft' === T ||
                  'insideRight' === T ||
                  'insideTop' === T ||
                  'insideBottom' === T
                ) {
                  var z = 5;
                  switch (T) {
                    case 'insideLeft':
                      (v[b].textX = x.x + z),
                        (v[b].textY = x.y + x.height / 2),
                        (v[b].textAlign = 'left'),
                        (v[b].textBaseline = 'middle');
                      break;
                    case 'insideRight':
                      (v[b].textX = x.x + x.width - z),
                        (v[b].textY = x.y + x.height / 2),
                        (v[b].textAlign = 'right'),
                        (v[b].textBaseline = 'middle');
                      break;
                    case 'insideTop':
                      (v[b].textX = x.x + x.width / 2),
                        (v[b].textY = x.y + z / 2),
                        (v[b].textAlign = 'center'),
                        (v[b].textBaseline = 'top');
                      break;
                    case 'insideBottom':
                      (v[b].textX = x.x + x.width / 2),
                        (v[b].textY = x.y + x.height - z / 2),
                        (v[b].textAlign = 'center'),
                        (v[b].textBaseline = 'bottom');
                  }
                  (v[b].textPosition = 'specific'),
                    (v[b].textColor = v[b].textColor || '#fff');
                }
              }
              return (
                this.deepQuery([u, p, this.option], 'calculable') &&
                  (this.setCalculable(d), (d.draggable = !0)),
                s.pack(d, c[t], t, c[t].data[e], e, i),
                d
              );
            },
            getMarkCoord: function (t, e) {
              var i,
                o,
                n = this.series[t],
                s = this.xMarkMap[t],
                r = this.component.xAxis.getAxis(n.xAxisIndex),
                a = this.component.yAxis.getAxis(n.yAxisIndex);
              if (
                !e.type ||
                ('max' !== e.type && 'min' !== e.type && 'average' !== e.type)
              )
                if (s.isHorizontal) {
                  i =
                    'string' == typeof e.xAxis && r.getIndexByName
                      ? r.getIndexByName(e.xAxis)
                      : e.xAxis || 0;
                  var h = s[i];
                  (h =
                    null != h
                      ? h
                      : 'string' != typeof e.xAxis && r.getCoordByIndex
                      ? r.getCoordByIndex(e.xAxis || 0)
                      : r.getCoord(e.xAxis || 0)),
                    (o = [h, a.getCoord(e.yAxis || 0)]);
                } else {
                  i =
                    'string' == typeof e.yAxis && a.getIndexByName
                      ? a.getIndexByName(e.yAxis)
                      : e.yAxis || 0;
                  var l = s[i];
                  (l =
                    null != l
                      ? l
                      : 'string' != typeof e.yAxis && a.getCoordByIndex
                      ? a.getCoordByIndex(e.yAxis || 0)
                      : a.getCoord(e.yAxis || 0)),
                    (o = [r.getCoord(e.xAxis || 0), l]);
                }
              else {
                var d =
                  null != e.valueIndex
                    ? e.valueIndex
                    : null != s.maxX0
                    ? '1'
                    : '';
                o = [
                  s[e.type + 'X' + d],
                  s[e.type + 'Y' + d],
                  s[e.type + 'Line' + d],
                  s[e.type + d],
                ];
              }
              return o;
            },
            refresh: function (t) {
              t && ((this.option = t), (this.series = t.series)),
                this.backupShapeList(),
                this._buildShape();
            },
            addDataAnimation: function (t, e) {
              function i() {
                f--, 0 === f && e && e();
              }
              for (var o = this.series, n = {}, r = 0, a = t.length; a > r; r++)
                n[t[r][0]] = t[r];
              for (
                var h, l, d, c, p, u, g, f = 0, r = this.shapeList.length - 1;
                r >= 0;
                r--
              )
                if (
                  ((u = s.get(this.shapeList[r], 'seriesIndex')),
                  n[u] && !n[u][3] && 'rectangle' === this.shapeList[r].type)
                ) {
                  if (
                    ((g = s.get(this.shapeList[r], 'dataIndex')),
                    (p = o[u]),
                    n[u][2] && g === p.data.length - 1)
                  ) {
                    this.zr.delShape(this.shapeList[r].id);
                    continue;
                  }
                  if (!n[u][2] && 0 === g) {
                    this.zr.delShape(this.shapeList[r].id);
                    continue;
                  }
                  'horizontal' === this.shapeList[r]._orient
                    ? ((c = this.component.yAxis
                        .getAxis(p.yAxisIndex || 0)
                        .getGap()),
                      (d = n[u][2] ? -c : c),
                      (h = 0))
                    : ((l = this.component.xAxis
                        .getAxis(p.xAxisIndex || 0)
                        .getGap()),
                      (h = n[u][2] ? l : -l),
                      (d = 0)),
                    (this.shapeList[r].position = [0, 0]),
                    f++,
                    this.zr
                      .animate(this.shapeList[r].id, '')
                      .when(
                        this.query(this.option, 'animationDurationUpdate'),
                        { position: [h, d] },
                      )
                      .done(i)
                      .start();
                }
              f || (e && e());
            },
          }),
          r.inherits(e, i),
          t('../chart').define('bar', e),
          e
        );
      },
    ),
    i(
      'echarts/chart/line',
      [
        'require',
        './base',
        'zrender/shape/Polyline',
        '../util/shape/Icon',
        '../util/shape/HalfSmoothPolygon',
        '../component/axis',
        '../component/grid',
        '../component/dataZoom',
        '../config',
        '../util/ecData',
        'zrender/tool/util',
        'zrender/tool/color',
        '../chart',
      ],
      function (t) {
        function e(t, e, i, n, s) {
          o.call(this, t, e, i, n, s), this.refresh(n);
        }
        function i(t, e, i) {
          var o = e.x,
            n = e.y,
            r = e.width,
            a = e.height,
            h = a / 2;
          e.symbol.match('empty') && (t.fillStyle = '#fff'),
            (e.brushType = 'both');
          var l = e.symbol.replace('empty', '').toLowerCase();
          l.match('star')
            ? ((h = l.replace('star', '') - 0 || 5), (n -= 1), (l = 'star'))
            : ('rectangle' === l || 'arrow' === l) &&
              ((o += (r - a) / 2), (r = a));
          var d = '';
          if (
            (l.match('image') &&
              ((d = l.replace(new RegExp('^image:\\/\\/'), '')),
              (l = 'image'),
              (o += Math.round((r - a) / 2) - 1),
              (r = a += 2)),
            (l = s.prototype.iconLibrary[l]))
          ) {
            var c = e.x,
              p = e.y;
            t.moveTo(c, p + h),
              t.lineTo(c + 5, p + h),
              t.moveTo(c + e.width - 5, p + h),
              t.lineTo(c + e.width, p + h);
            var u = this;
            l(
              t,
              {
                x: o + 4,
                y: n + 4,
                width: r - 8,
                height: a - 8,
                n: h,
                image: d,
              },
              function () {
                u.modSelf(), i();
              },
            );
          } else t.moveTo(o, n + h), t.lineTo(o + r, n + h);
        }
        var o = t('./base'),
          n = t('zrender/shape/Polyline'),
          s = t('../util/shape/Icon'),
          r = t('../util/shape/HalfSmoothPolygon');
        t('../component/axis'),
          t('../component/grid'),
          t('../component/dataZoom');
        var a = t('../config');
        a.line = {
          zlevel: 0,
          z: 2,
          clickable: !0,
          legendHoverLink: !0,
          xAxisIndex: 0,
          yAxisIndex: 0,
          dataFilter: 'nearest',
          itemStyle: {
            normal: {
              label: { show: !1 },
              lineStyle: {
                width: 2,
                type: 'solid',
                shadowColor: 'rgba(0,0,0,0)',
                shadowBlur: 0,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
              },
            },
            emphasis: { label: { show: !1 } },
          },
          symbolSize: 2,
          showAllSymbol: !1,
        };
        var h = t('../util/ecData'),
          l = t('zrender/tool/util'),
          d = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: a.CHART_TYPE_LINE,
            _buildShape: function () {
              (this.finalPLMap = {}), this._buildPosition();
            },
            _buildHorizontal: function (t, e, i, o) {
              for (
                var n,
                  s,
                  r,
                  a,
                  h,
                  l,
                  d,
                  c,
                  p,
                  u = this.series,
                  g = i[0][0],
                  f = u[g],
                  m = this.component.xAxis.getAxis(f.xAxisIndex || 0),
                  _ = {},
                  y = 0,
                  x = e;
                x > y && null != m.getNameByIndex(y);
                y++
              ) {
                s = m.getCoordByIndex(y);
                for (var v = 0, b = i.length; b > v; v++) {
                  (n = this.component.yAxis.getAxis(
                    u[i[v][0]].yAxisIndex || 0,
                  )),
                    (h = a = d = l = n.getCoord(0));
                  for (var S = 0, T = i[v].length; T > S; S++)
                    (g = i[v][S]),
                      (f = u[g]),
                      (c = f.data[y]),
                      (p = this.getDataFromOption(c, '-')),
                      (_[g] = _[g] || []),
                      (o[g] = o[g] || {
                        min: Number.POSITIVE_INFINITY,
                        max: Number.NEGATIVE_INFINITY,
                        sum: 0,
                        counter: 0,
                        average: 0,
                      }),
                      '-' !== p
                        ? (p >= 0
                            ? ((a -=
                                S > 0 ? n.getCoordSize(p) : h - n.getCoord(p)),
                              (r = a))
                            : 0 > p &&
                              ((l +=
                                S > 0 ? n.getCoordSize(p) : n.getCoord(p) - d),
                              (r = l)),
                          _[g].push([s, r, y, m.getNameByIndex(y), s, h]),
                          o[g].min > p &&
                            ((o[g].min = p), (o[g].minY = r), (o[g].minX = s)),
                          o[g].max < p &&
                            ((o[g].max = p), (o[g].maxY = r), (o[g].maxX = s)),
                          (o[g].sum += p),
                          o[g].counter++)
                        : _[g].length > 0 &&
                          ((this.finalPLMap[g] = this.finalPLMap[g] || []),
                          this.finalPLMap[g].push(_[g]),
                          (_[g] = []));
                }
                a = this.component.grid.getY();
                for (var z, v = 0, b = i.length; b > v; v++)
                  for (var S = 0, T = i[v].length; T > S; S++)
                    (g = i[v][S]),
                      (f = u[g]),
                      (c = f.data[y]),
                      (p = this.getDataFromOption(c, '-')),
                      '-' == p &&
                        this.deepQuery([c, f, this.option], 'calculable') &&
                        ((z = this.deepQuery([c, f], 'symbolSize')),
                        (a += 2 * z + 5),
                        (r = a),
                        this.shapeList.push(
                          this._getCalculableItem(
                            g,
                            y,
                            m.getNameByIndex(y),
                            s,
                            r,
                            'horizontal',
                          ),
                        ));
              }
              for (var C in _)
                _[C].length > 0 &&
                  ((this.finalPLMap[C] = this.finalPLMap[C] || []),
                  this.finalPLMap[C].push(_[C]),
                  (_[C] = []));
              this._calculMarkMapXY(o, i, 'y'),
                this._buildBorkenLine(t, this.finalPLMap, m, 'horizontal');
            },
            _buildVertical: function (t, e, i, o) {
              for (
                var n,
                  s,
                  r,
                  a,
                  h,
                  l,
                  d,
                  c,
                  p,
                  u = this.series,
                  g = i[0][0],
                  f = u[g],
                  m = this.component.yAxis.getAxis(f.yAxisIndex || 0),
                  _ = {},
                  y = 0,
                  x = e;
                x > y && null != m.getNameByIndex(y);
                y++
              ) {
                r = m.getCoordByIndex(y);
                for (var v = 0, b = i.length; b > v; v++) {
                  (n = this.component.xAxis.getAxis(
                    u[i[v][0]].xAxisIndex || 0,
                  )),
                    (h = a = d = l = n.getCoord(0));
                  for (var S = 0, T = i[v].length; T > S; S++)
                    (g = i[v][S]),
                      (f = u[g]),
                      (c = f.data[y]),
                      (p = this.getDataFromOption(c, '-')),
                      (_[g] = _[g] || []),
                      (o[g] = o[g] || {
                        min: Number.POSITIVE_INFINITY,
                        max: Number.NEGATIVE_INFINITY,
                        sum: 0,
                        counter: 0,
                        average: 0,
                      }),
                      '-' !== p
                        ? (p >= 0
                            ? ((a +=
                                S > 0 ? n.getCoordSize(p) : n.getCoord(p) - h),
                              (s = a))
                            : 0 > p &&
                              ((l -=
                                S > 0 ? n.getCoordSize(p) : d - n.getCoord(p)),
                              (s = l)),
                          _[g].push([s, r, y, m.getNameByIndex(y), h, r]),
                          o[g].min > p &&
                            ((o[g].min = p), (o[g].minX = s), (o[g].minY = r)),
                          o[g].max < p &&
                            ((o[g].max = p), (o[g].maxX = s), (o[g].maxY = r)),
                          (o[g].sum += p),
                          o[g].counter++)
                        : _[g].length > 0 &&
                          ((this.finalPLMap[g] = this.finalPLMap[g] || []),
                          this.finalPLMap[g].push(_[g]),
                          (_[g] = []));
                }
                a = this.component.grid.getXend();
                for (var z, v = 0, b = i.length; b > v; v++)
                  for (var S = 0, T = i[v].length; T > S; S++)
                    (g = i[v][S]),
                      (f = u[g]),
                      (c = f.data[y]),
                      (p = this.getDataFromOption(c, '-')),
                      '-' == p &&
                        this.deepQuery([c, f, this.option], 'calculable') &&
                        ((z = this.deepQuery([c, f], 'symbolSize')),
                        (a -= 2 * z + 5),
                        (s = a),
                        this.shapeList.push(
                          this._getCalculableItem(
                            g,
                            y,
                            m.getNameByIndex(y),
                            s,
                            r,
                            'vertical',
                          ),
                        ));
              }
              for (var C in _)
                _[C].length > 0 &&
                  ((this.finalPLMap[C] = this.finalPLMap[C] || []),
                  this.finalPLMap[C].push(_[C]),
                  (_[C] = []));
              this._calculMarkMapXY(o, i, 'x'),
                this._buildBorkenLine(t, this.finalPLMap, m, 'vertical');
            },
            _buildOther: function (t, e, i, o) {
              for (
                var n, s = this.series, r = {}, a = 0, h = i.length;
                h > a;
                a++
              )
                for (var l = 0, d = i[a].length; d > l; l++) {
                  var c = i[a][l],
                    p = s[c];
                  n = this.component.xAxis.getAxis(p.xAxisIndex || 0);
                  var u = this.component.yAxis.getAxis(p.yAxisIndex || 0),
                    g = u.getCoord(0);
                  (r[c] = r[c] || []),
                    (o[c] = o[c] || {
                      min0: Number.POSITIVE_INFINITY,
                      min1: Number.POSITIVE_INFINITY,
                      max0: Number.NEGATIVE_INFINITY,
                      max1: Number.NEGATIVE_INFINITY,
                      sum0: 0,
                      sum1: 0,
                      counter0: 0,
                      counter1: 0,
                      average0: 0,
                      average1: 0,
                    });
                  for (var f = 0, m = p.data.length; m > f; f++) {
                    var _ = p.data[f],
                      y = this.getDataFromOption(_, '-');
                    if (y instanceof Array) {
                      var x = n.getCoord(y[0]),
                        v = u.getCoord(y[1]);
                      r[c].push([x, v, f, y[0], x, g]),
                        o[c].min0 > y[0] &&
                          ((o[c].min0 = y[0]),
                          (o[c].minY0 = v),
                          (o[c].minX0 = x)),
                        o[c].max0 < y[0] &&
                          ((o[c].max0 = y[0]),
                          (o[c].maxY0 = v),
                          (o[c].maxX0 = x)),
                        (o[c].sum0 += y[0]),
                        o[c].counter0++,
                        o[c].min1 > y[1] &&
                          ((o[c].min1 = y[1]),
                          (o[c].minY1 = v),
                          (o[c].minX1 = x)),
                        o[c].max1 < y[1] &&
                          ((o[c].max1 = y[1]),
                          (o[c].maxY1 = v),
                          (o[c].maxX1 = x)),
                        (o[c].sum1 += y[1]),
                        o[c].counter1++;
                    }
                  }
                }
              for (var b in r)
                r[b].length > 0 &&
                  ((this.finalPLMap[b] = this.finalPLMap[b] || []),
                  this.finalPLMap[b].push(r[b]),
                  (r[b] = []));
              this._calculMarkMapXY(o, i, 'xy'),
                this._buildBorkenLine(t, this.finalPLMap, n, 'other');
            },
            _buildBorkenLine: function (t, e, i, o) {
              for (
                var s,
                  a = 'other' == o ? 'horizontal' : o,
                  c = this.series,
                  p = t.length - 1;
                p >= 0;
                p--
              ) {
                var u = t[p],
                  g = c[u],
                  f = e[u];
                if (g.type === this.type && null != f)
                  for (
                    var m = this._getBbox(u, a),
                      _ = this._sIndex2ColorMap[u],
                      y = this.query(g, 'itemStyle.normal.lineStyle.width'),
                      x = this.query(g, 'itemStyle.normal.lineStyle.type'),
                      v = this.query(g, 'itemStyle.normal.lineStyle.color'),
                      b = this.getItemStyleColor(
                        this.query(g, 'itemStyle.normal.color'),
                        u,
                        -1,
                      ),
                      S = null != this.query(g, 'itemStyle.normal.areaStyle'),
                      T = this.query(g, 'itemStyle.normal.areaStyle.color'),
                      z = 0,
                      C = f.length;
                    C > z;
                    z++
                  ) {
                    var L = f[z],
                      w = 'other' != o && this._isLarge(a, L);
                    if (w) L = this._getLargePointList(a, L, g.dataFilter);
                    else
                      for (var E = 0, M = L.length; M > E; E++)
                        (s = g.data[L[E][2]]),
                          (this.deepQuery([s, g, this.option], 'calculable') ||
                            this.deepQuery([s, g], 'showAllSymbol') ||
                            ('categoryAxis' === i.type &&
                              i.isMainAxis(L[E][2]) &&
                              'none' != this.deepQuery([s, g], 'symbol'))) &&
                            this.shapeList.push(
                              this._getSymbol(
                                u,
                                L[E][2],
                                L[E][3],
                                L[E][0],
                                L[E][1],
                                a,
                              ),
                            );
                    var A = new n({
                      zlevel: g.zlevel,
                      z: g.z,
                      style: {
                        miterLimit: y,
                        pointList: L,
                        strokeColor: v || b || _,
                        lineWidth: y,
                        lineType: x,
                        smooth: this._getSmooth(g.smooth),
                        smoothConstraint: m,
                        shadowColor: this.query(
                          g,
                          'itemStyle.normal.lineStyle.shadowColor',
                        ),
                        shadowBlur: this.query(
                          g,
                          'itemStyle.normal.lineStyle.shadowBlur',
                        ),
                        shadowOffsetX: this.query(
                          g,
                          'itemStyle.normal.lineStyle.shadowOffsetX',
                        ),
                        shadowOffsetY: this.query(
                          g,
                          'itemStyle.normal.lineStyle.shadowOffsetY',
                        ),
                      },
                      hoverable: !1,
                      _main: !0,
                      _seriesIndex: u,
                      _orient: a,
                    });
                    if (
                      (h.pack(A, c[u], u, 0, z, c[u].name),
                      this.shapeList.push(A),
                      S)
                    ) {
                      var k = new r({
                        zlevel: g.zlevel,
                        z: g.z,
                        style: {
                          miterLimit: y,
                          pointList: l.clone(L).concat([
                            [L[L.length - 1][4], L[L.length - 1][5]],
                            [L[0][4], L[0][5]],
                          ]),
                          brushType: 'fill',
                          smooth: this._getSmooth(g.smooth),
                          smoothConstraint: m,
                          color: T ? T : d.alpha(_, 0.5),
                        },
                        highlightStyle: { brushType: 'fill' },
                        hoverable: !1,
                        _main: !0,
                        _seriesIndex: u,
                        _orient: a,
                      });
                      h.pack(k, c[u], u, 0, z, c[u].name),
                        this.shapeList.push(k);
                    }
                  }
              }
            },
            _getBbox: function (t, e) {
              var i = this.component.grid.getBbox(),
                o = this.xMarkMap[t];
              return null != o.minX0
                ? [
                    [
                      Math.min(o.minX0, o.maxX0, o.minX1, o.maxX1),
                      Math.min(o.minY0, o.maxY0, o.minY1, o.maxY1),
                    ],
                    [
                      Math.max(o.minX0, o.maxX0, o.minX1, o.maxX1),
                      Math.max(o.minY0, o.maxY0, o.minY1, o.maxY1),
                    ],
                  ]
                : ('horizontal' === e
                    ? ((i[0][1] = Math.min(o.minY, o.maxY)),
                      (i[1][1] = Math.max(o.minY, o.maxY)))
                    : ((i[0][0] = Math.min(o.minX, o.maxX)),
                      (i[1][0] = Math.max(o.minX, o.maxX))),
                  i);
            },
            _isLarge: function (t, e) {
              return e.length < 2
                ? !1
                : 'horizontal' === t
                ? Math.abs(e[0][0] - e[1][0]) < 0.5
                : Math.abs(e[0][1] - e[1][1]) < 0.5;
            },
            _getLargePointList: function (t, e, i) {
              var o;
              o =
                'horizontal' === t
                  ? this.component.grid.getWidth()
                  : this.component.grid.getHeight();
              var n = e.length,
                s = [];
              if ('function' != typeof i)
                switch (i) {
                  case 'min':
                    i = function (t) {
                      return Math.max.apply(null, t);
                    };
                    break;
                  case 'max':
                    i = function (t) {
                      return Math.min.apply(null, t);
                    };
                    break;
                  case 'average':
                    i = function (t) {
                      for (var e = 0, i = 0; i < t.length; i++) e += t[i];
                      return e / t.length;
                    };
                    break;
                  default:
                    i = function (t) {
                      return t[0];
                    };
                }
              for (var r = [], a = 0; o > a; a++) {
                var h = Math.floor((n / o) * a),
                  l = Math.min(Math.floor((n / o) * (a + 1)), n);
                if (!(h >= l)) {
                  for (var d = h; l > d; d++)
                    r[d - h] = 'horizontal' === t ? e[d][1] : e[d][0];
                  r.length = l - h;
                  for (var c = i(r), p = -1, u = 1 / 0, d = h; l > d; d++) {
                    var g = 'horizontal' === t ? e[d][1] : e[d][0],
                      f = Math.abs(g - c);
                    u > f && ((p = d), (u = f));
                  }
                  var m = e[p].slice();
                  'horizontal' === t ? (m[1] = c) : (m[0] = c), s.push(m);
                }
              }
              return s;
            },
            _getSmooth: function (t) {
              return t ? 0.3 : 0;
            },
            _getCalculableItem: function (t, e, i, o, n, s) {
              var r = this.series,
                h =
                  r[t].calculableHolderColor ||
                  this.ecTheme.calculableHolderColor ||
                  a.calculableHolderColor,
                l = this._getSymbol(t, e, i, o, n, s);
              return (
                (l.style.color = h),
                (l.style.strokeColor = h),
                (l.rotation = [0, 0]),
                (l.hoverable = !1),
                (l.draggable = !1),
                (l.style.text = void 0),
                l
              );
            },
            _getSymbol: function (t, e, i, o, n, s) {
              var r = this.series,
                a = r[t],
                h = a.data[e],
                l = this.getSymbolShape(
                  a,
                  t,
                  h,
                  e,
                  i,
                  o,
                  n,
                  this._sIndex2ShapeMap[t],
                  this._sIndex2ColorMap[t],
                  '#fff',
                  'vertical' === s ? 'horizontal' : 'vertical',
                );
              return (
                (l.zlevel = a.zlevel),
                (l.z = a.z + 1),
                this.deepQuery([h, a, this.option], 'calculable') &&
                  (this.setCalculable(l), (l.draggable = !0)),
                l
              );
            },
            getMarkCoord: function (t, e) {
              var i = this.series[t],
                o = this.xMarkMap[t],
                n = this.component.xAxis.getAxis(i.xAxisIndex),
                s = this.component.yAxis.getAxis(i.yAxisIndex);
              if (
                e.type &&
                ('max' === e.type || 'min' === e.type || 'average' === e.type)
              ) {
                var r =
                  null != e.valueIndex
                    ? e.valueIndex
                    : null != o.maxX0
                    ? '1'
                    : '';
                return [
                  o[e.type + 'X' + r],
                  o[e.type + 'Y' + r],
                  o[e.type + 'Line' + r],
                  o[e.type + r],
                ];
              }
              return [
                'string' != typeof e.xAxis && n.getCoordByIndex
                  ? n.getCoordByIndex(e.xAxis || 0)
                  : n.getCoord(e.xAxis || 0),
                'string' != typeof e.yAxis && s.getCoordByIndex
                  ? s.getCoordByIndex(e.yAxis || 0)
                  : s.getCoord(e.yAxis || 0),
              ];
            },
            refresh: function (t) {
              t && ((this.option = t), (this.series = t.series)),
                this.backupShapeList(),
                this._buildShape();
            },
            ontooltipHover: function (t, e) {
              for (
                var i, o, n = t.seriesIndex, s = t.dataIndex, r = n.length;
                r--;

              )
                if ((i = this.finalPLMap[n[r]]))
                  for (var a = 0, h = i.length; h > a; a++) {
                    o = i[a];
                    for (var l = 0, d = o.length; d > l; l++)
                      s === o[l][2] &&
                        e.push(
                          this._getSymbol(
                            n[r],
                            o[l][2],
                            o[l][3],
                            o[l][0],
                            o[l][1],
                            'horizontal',
                          ),
                        );
                  }
            },
            addDataAnimation: function (t, e) {
              function i() {
                f--, 0 === f && e && e();
              }
              function o(t) {
                t.style.controlPointList = null;
              }
              for (var n = this.series, s = {}, r = 0, a = t.length; a > r; r++)
                s[t[r][0]] = t[r];
              for (
                var h, l, d, c, p, u, g, f = 0, r = this.shapeList.length - 1;
                r >= 0;
                r--
              )
                if (((p = this.shapeList[r]._seriesIndex), s[p] && !s[p][3])) {
                  if (
                    this.shapeList[r]._main &&
                    this.shapeList[r].style.pointList.length > 1
                  ) {
                    if (
                      ((u = this.shapeList[r].style.pointList),
                      (l = Math.abs(u[0][0] - u[1][0])),
                      (c = Math.abs(u[0][1] - u[1][1])),
                      (g = 'horizontal' === this.shapeList[r]._orient),
                      s[p][2])
                    ) {
                      if ('half-smooth-polygon' === this.shapeList[r].type) {
                        var m = u.length;
                        (this.shapeList[r].style.pointList[m - 3] = u[m - 2]),
                          (this.shapeList[r].style.pointList[m - 3][g ? 0 : 1] =
                            u[m - 4][g ? 0 : 1]),
                          (this.shapeList[r].style.pointList[m - 2] = u[m - 1]);
                      }
                      this.shapeList[r].style.pointList.pop(),
                        g ? ((h = l), (d = 0)) : ((h = 0), (d = -c));
                    } else {
                      if (
                        (this.shapeList[r].style.pointList.shift(),
                        'half-smooth-polygon' === this.shapeList[r].type)
                      ) {
                        var _ = this.shapeList[r].style.pointList.pop();
                        g ? (_[0] = u[0][0]) : (_[1] = u[0][1]),
                          this.shapeList[r].style.pointList.push(_);
                      }
                      g ? ((h = -l), (d = 0)) : ((h = 0), (d = c));
                    }
                    (this.shapeList[r].style.controlPointList = null),
                      this.zr.modShape(this.shapeList[r]);
                  } else {
                    if (
                      s[p][2] &&
                      this.shapeList[r]._dataIndex === n[p].data.length - 1
                    ) {
                      this.zr.delShape(this.shapeList[r].id);
                      continue;
                    }
                    if (!s[p][2] && 0 === this.shapeList[r]._dataIndex) {
                      this.zr.delShape(this.shapeList[r].id);
                      continue;
                    }
                  }
                  (this.shapeList[r].position = [0, 0]),
                    f++,
                    this.zr
                      .animate(this.shapeList[r].id, '')
                      .when(
                        this.query(this.option, 'animationDurationUpdate'),
                        { position: [h, d] },
                      )
                      .during(o)
                      .done(i)
                      .start();
                }
              f || (e && e());
            },
          }),
          (s.prototype.iconLibrary.legendLineIcon = i),
          l.inherits(e, o),
          t('../chart').define('line', e),
          e
        );
      },
    ),
    i(
      'echarts/chart/pie',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Ring',
        'zrender/shape/Circle',
        'zrender/shape/Sector',
        'zrender/shape/Polyline',
        '../config',
        '../util/ecData',
        'zrender/tool/util',
        'zrender/tool/math',
        'zrender/tool/color',
        '../chart',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s);
          var r = this;
          (r.shapeHandler.onmouseover = function (t) {
            var e = t.target,
              i = l.get(e, 'seriesIndex'),
              o = l.get(e, 'dataIndex'),
              n = l.get(e, 'special'),
              s = [e.style.x, e.style.y],
              a = e.style.startAngle,
              h = e.style.endAngle,
              d = ((h + a) / 2 + 360) % 360,
              c = e.highlightStyle.color,
              p = r.getLabel(i, o, n, s, d, c, !0);
            p && r.zr.addHoverShape(p);
            var u = r.getLabelLine(i, o, s, e.style.r0, e.style.r, d, c, !0);
            u && r.zr.addHoverShape(u);
          }),
            this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Ring'),
          s = t('zrender/shape/Circle'),
          r = t('zrender/shape/Sector'),
          a = t('zrender/shape/Polyline'),
          h = t('../config');
        h.pie = {
          zlevel: 0,
          z: 2,
          clickable: !0,
          legendHoverLink: !0,
          center: ['50%', '50%'],
          radius: [0, '75%'],
          clockWise: !0,
          startAngle: 90,
          minAngle: 0,
          selectedOffset: 10,
          itemStyle: {
            normal: {
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              label: { show: !0, position: 'outer' },
              labelLine: {
                show: !0,
                length: 20,
                lineStyle: { width: 1, type: 'solid' },
              },
            },
            emphasis: {
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              label: { show: !1 },
              labelLine: {
                show: !1,
                length: 20,
                lineStyle: { width: 1, type: 'solid' },
              },
            },
          },
        };
        var l = t('../util/ecData'),
          d = t('zrender/tool/util'),
          c = t('zrender/tool/math'),
          p = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: h.CHART_TYPE_PIE,
            _buildShape: function () {
              var t = this.series,
                e = this.component.legend;
              (this.selectedMap = {}), (this._selected = {});
              var i, o, r;
              this._selectedMode = !1;
              for (var a, d = 0, c = t.length; c > d; d++)
                if (t[d].type === h.CHART_TYPE_PIE) {
                  if (
                    ((t[d] = this.reformOption(t[d])),
                    (this.legendHoverLink =
                      t[d].legendHoverLink || this.legendHoverLink),
                    (a = t[d].name || ''),
                    (this.selectedMap[a] = e ? e.isSelected(a) : !0),
                    !this.selectedMap[a])
                  )
                    continue;
                  (i = this.parseCenter(this.zr, t[d].center)),
                    (o = this.parseRadius(this.zr, t[d].radius)),
                    (this._selectedMode =
                      this._selectedMode || t[d].selectedMode),
                    (this._selected[d] = []),
                    this.deepQuery([t[d], this.option], 'calculable') &&
                      ((r = {
                        zlevel: t[d].zlevel,
                        z: t[d].z,
                        hoverable: !1,
                        style: {
                          x: i[0],
                          y: i[1],
                          r0: o[0] <= 10 ? 0 : o[0] - 10,
                          r: o[1] + 10,
                          brushType: 'stroke',
                          lineWidth: 1,
                          strokeColor:
                            t[d].calculableHolderColor ||
                            this.ecTheme.calculableHolderColor ||
                            h.calculableHolderColor,
                        },
                      }),
                      l.pack(r, t[d], d, void 0, -1),
                      this.setCalculable(r),
                      (r = o[0] <= 10 ? new s(r) : new n(r)),
                      this.shapeList.push(r)),
                    this._buildSinglePie(d),
                    this.buildMark(d);
                }
              this.addShapeList();
            },
            _buildSinglePie: function (t) {
              for (
                var e,
                  i = this.series,
                  o = i[t],
                  n = o.data,
                  s = this.component.legend,
                  r = 0,
                  a = 0,
                  h = 0,
                  l = Number.NEGATIVE_INFINITY,
                  d = [],
                  c = 0,
                  p = n.length;
                p > c;
                c++
              )
                (e = n[c].name),
                  (this.selectedMap[e] = s ? s.isSelected(e) : !0),
                  this.selectedMap[e] &&
                    !isNaN(n[c].value) &&
                    (0 !== +n[c].value ? r++ : a++,
                    (h += +n[c].value),
                    (l = Math.max(l, +n[c].value)));
              if (0 !== h) {
                for (
                  var u,
                    g,
                    f,
                    m,
                    _,
                    y,
                    x = 100,
                    v = o.clockWise,
                    b = (o.startAngle.toFixed(2) - 0 + 360) % 360,
                    S = o.minAngle || 0.01,
                    T = 360 - S * r - 0.01 * a,
                    z = o.roseType,
                    c = 0,
                    p = n.length;
                  p > c;
                  c++
                )
                  if (
                    ((e = n[c].name), this.selectedMap[e] && !isNaN(n[c].value))
                  ) {
                    if (
                      ((g = s ? s.getColor(e) : this.zr.getColor(c)),
                      (x = n[c].value / h),
                      (u =
                        'area' != z
                          ? v
                            ? b - x * T - (0 !== x ? S : 0.01)
                            : x * T + b + (0 !== x ? S : 0.01)
                          : v
                          ? b - 360 / p
                          : 360 / p + b),
                      (u = u.toFixed(2) - 0),
                      (x = (100 * x).toFixed(2)),
                      (f = this.parseCenter(this.zr, o.center)),
                      (m = this.parseRadius(this.zr, o.radius)),
                      (_ = +m[0]),
                      (y = +m[1]),
                      'radius' === z
                        ? (y =
                            (n[c].value / l) * (y - _) * 0.8 +
                            0.2 * (y - _) +
                            _)
                        : 'area' === z &&
                          (y = Math.sqrt(n[c].value / l) * (y - _) + _),
                      v)
                    ) {
                      var C;
                      (C = b), (b = u), (u = C);
                    }
                    this._buildItem(
                      d,
                      t,
                      c,
                      x,
                      n[c].selected,
                      f,
                      _,
                      y,
                      b,
                      u,
                      g,
                    ),
                      v || (b = u);
                  }
                this._autoLabelLayout(d, f, y);
                for (var c = 0, p = d.length; p > c; c++)
                  this.shapeList.push(d[c]);
                d = null;
              }
            },
            _buildItem: function (t, e, i, o, n, s, r, a, h, d, c) {
              var p = this.series,
                u = ((d + h) / 2 + 360) % 360,
                g = this.getSector(e, i, o, n, s, r, a, h, d, c);
              l.pack(g, p[e], e, p[e].data[i], i, p[e].data[i].name, o),
                t.push(g);
              var f = this.getLabel(e, i, o, s, u, c, !1),
                m = this.getLabelLine(e, i, s, r, a, u, c, !1);
              m &&
                (l.pack(m, p[e], e, p[e].data[i], i, p[e].data[i].name, o),
                t.push(m)),
                f &&
                  (l.pack(f, p[e], e, p[e].data[i], i, p[e].data[i].name, o),
                  (f._labelLine = m),
                  t.push(f));
            },
            getSector: function (t, e, i, o, n, s, a, h, l, d) {
              var u = this.series,
                g = u[t],
                f = g.data[e],
                m = [f, g],
                _ = this.deepMerge(m, 'itemStyle.normal') || {},
                y = this.deepMerge(m, 'itemStyle.emphasis') || {},
                x = this.getItemStyleColor(_.color, t, e, f) || d,
                v =
                  this.getItemStyleColor(y.color, t, e, f) ||
                  ('string' == typeof x ? p.lift(x, -0.2) : x),
                b = {
                  zlevel: g.zlevel,
                  z: g.z,
                  clickable: this.deepQuery(m, 'clickable'),
                  style: {
                    x: n[0],
                    y: n[1],
                    r0: s,
                    r: a,
                    startAngle: h,
                    endAngle: l,
                    brushType: 'both',
                    color: x,
                    lineWidth: _.borderWidth,
                    strokeColor: _.borderColor,
                    lineJoin: 'round',
                  },
                  highlightStyle: {
                    color: v,
                    lineWidth: y.borderWidth,
                    strokeColor: y.borderColor,
                    lineJoin: 'round',
                  },
                  _seriesIndex: t,
                  _dataIndex: e,
                };
              if (o) {
                var S =
                  ((b.style.startAngle + b.style.endAngle) / 2).toFixed(2) - 0;
                (b.style._hasSelected = !0),
                  (b.style._x = b.style.x),
                  (b.style._y = b.style.y);
                var T = this.query(g, 'selectedOffset');
                (b.style.x += c.cos(S, !0) * T),
                  (b.style.y -= c.sin(S, !0) * T),
                  (this._selected[t][e] = !0);
              } else this._selected[t][e] = !1;
              return (
                this._selectedMode && (b.onclick = this.shapeHandler.onclick),
                this.deepQuery([f, g, this.option], 'calculable') &&
                  (this.setCalculable(b), (b.draggable = !0)),
                (this._needLabel(g, f, !0) || this._needLabelLine(g, f, !0)) &&
                  (b.onmouseover = this.shapeHandler.onmouseover),
                (b = new r(b))
              );
            },
            getLabel: function (t, e, i, n, s, r, a) {
              var h = this.series,
                l = h[t],
                p = l.data[e];
              if (this._needLabel(l, p, a)) {
                var u,
                  g,
                  f,
                  m = a ? 'emphasis' : 'normal',
                  _ = d.merge(d.clone(p.itemStyle) || {}, l.itemStyle),
                  y = _[m].label,
                  x = y.textStyle || {},
                  v = n[0],
                  b = n[1],
                  S = this.parseRadius(this.zr, l.radius),
                  T = 'middle';
                (y.position = y.position || _.normal.label.position),
                  'center' === y.position
                    ? ((u = v), (g = b), (f = 'center'))
                    : 'inner' === y.position || 'inside' === y.position
                    ? ((S = (S[0] + S[1]) * (y.distance || 0.5)),
                      (u = Math.round(v + S * c.cos(s, !0))),
                      (g = Math.round(b - S * c.sin(s, !0))),
                      (r = '#fff'),
                      (f = 'center'))
                    : ((S = S[1] - -_[m].labelLine.length),
                      (u = Math.round(v + S * c.cos(s, !0))),
                      (g = Math.round(b - S * c.sin(s, !0))),
                      (f = s >= 90 && 270 >= s ? 'right' : 'left')),
                  'center' != y.position &&
                    'inner' != y.position &&
                    'inside' != y.position &&
                    (u += 'left' === f ? 20 : -20),
                  (p.__labelX = u - ('left' === f ? 5 : -5)),
                  (p.__labelY = g);
                var z = new o({
                  zlevel: l.zlevel,
                  z: l.z + 1,
                  hoverable: !1,
                  style: {
                    x: u,
                    y: g,
                    color: x.color || r,
                    text: this.getLabelText(t, e, i, m),
                    textAlign: x.align || f,
                    textBaseline: x.baseline || T,
                    textFont: this.getFont(x),
                  },
                  highlightStyle: { brushType: 'fill' },
                });
                return (
                  (z._radius = S),
                  (z._labelPosition = y.position || 'outer'),
                  (z._rect = z.getRect(z.style)),
                  (z._seriesIndex = t),
                  (z._dataIndex = e),
                  z
                );
              }
            },
            getLabelText: function (t, e, i, o) {
              var n = this.series,
                s = n[t],
                r = s.data[e],
                a = this.deepQuery(
                  [r, s],
                  'itemStyle.' + o + '.label.formatter',
                );
              return a
                ? 'function' == typeof a
                  ? a.call(this.myChart, {
                      seriesIndex: t,
                      seriesName: s.name || '',
                      series: s,
                      dataIndex: e,
                      data: r,
                      name: r.name,
                      value: r.value,
                      percent: i,
                    })
                  : 'string' == typeof a
                  ? ((a = a
                      .replace('{a}', '{a0}')
                      .replace('{b}', '{b0}')
                      .replace('{c}', '{c0}')
                      .replace('{d}', '{d0}')),
                    (a = a
                      .replace('{a0}', s.name)
                      .replace('{b0}', r.name)
                      .replace('{c0}', r.value)
                      .replace('{d0}', i)))
                  : void 0
                : r.name;
            },
            getLabelLine: function (t, e, i, o, n, s, r, h) {
              var l = this.series,
                p = l[t],
                u = p.data[e];
              if (this._needLabelLine(p, u, h)) {
                var g = h ? 'emphasis' : 'normal',
                  f = d.merge(d.clone(u.itemStyle) || {}, p.itemStyle),
                  m = f[g].labelLine,
                  _ = m.lineStyle || {},
                  y = i[0],
                  x = i[1],
                  v = n,
                  b = this.parseRadius(this.zr, p.radius)[1] - -m.length,
                  S = c.cos(s, !0),
                  T = c.sin(s, !0);
                return new a({
                  zlevel: p.zlevel,
                  z: p.z + 1,
                  hoverable: !1,
                  style: {
                    pointList: [
                      [y + v * S, x - v * T],
                      [y + b * S, x - b * T],
                      [u.__labelX, u.__labelY],
                    ],
                    strokeColor: _.color || r,
                    lineType: _.type,
                    lineWidth: _.width,
                  },
                  _seriesIndex: t,
                  _dataIndex: e,
                });
              }
            },
            _needLabel: function (t, e, i) {
              return this.deepQuery(
                [e, t],
                'itemStyle.' + (i ? 'emphasis' : 'normal') + '.label.show',
              );
            },
            _needLabelLine: function (t, e, i) {
              return this.deepQuery(
                [e, t],
                'itemStyle.' + (i ? 'emphasis' : 'normal') + '.labelLine.show',
              );
            },
            _autoLabelLayout: function (t, e, i) {
              for (var o = [], n = [], s = 0, r = t.length; r > s; s++)
                ('outer' === t[s]._labelPosition ||
                  'outside' === t[s]._labelPosition) &&
                  ((t[s]._rect._y = t[s]._rect.y),
                  t[s]._rect.x < e[0] ? o.push(t[s]) : n.push(t[s]));
              this._layoutCalculate(o, e, i, -1),
                this._layoutCalculate(n, e, i, 1);
            },
            _layoutCalculate: function (t, e, i, o) {
              function n(e, i, o) {
                for (var n = e; i > n; n++)
                  if (
                    ((t[n]._rect.y += o),
                    (t[n].style.y += o),
                    t[n]._labelLine &&
                      ((t[n]._labelLine.style.pointList[1][1] += o),
                      (t[n]._labelLine.style.pointList[2][1] += o)),
                    n > e &&
                      i > n + 1 &&
                      t[n + 1]._rect.y > t[n]._rect.y + t[n]._rect.height)
                  )
                    return void s(n, o / 2);
                s(i - 1, o / 2);
              }
              function s(e, i) {
                for (
                  var o = e;
                  o >= 0 &&
                  ((t[o]._rect.y -= i),
                  (t[o].style.y -= i),
                  t[o]._labelLine &&
                    ((t[o]._labelLine.style.pointList[1][1] -= i),
                    (t[o]._labelLine.style.pointList[2][1] -= i)),
                  !(
                    o > 0 &&
                    t[o]._rect.y > t[o - 1]._rect.y + t[o - 1]._rect.height
                  ));
                  o--
                );
              }
              function r(t, e, i, o, n) {
                for (
                  var s,
                    r,
                    a,
                    h = i[0],
                    l = i[1],
                    d =
                      n > 0
                        ? e
                          ? Number.MAX_VALUE
                          : 0
                        : e
                        ? Number.MAX_VALUE
                        : 0,
                    c = 0,
                    p = t.length;
                  p > c;
                  c++
                )
                  (r = Math.abs(t[c]._rect.y - l)),
                    (a = t[c]._radius - o),
                    (s =
                      o + a > r
                        ? Math.sqrt(
                            (o + a + 20) * (o + a + 20) -
                              Math.pow(t[c]._rect.y - l, 2),
                          )
                        : Math.abs(
                            t[c]._rect.x + (n > 0 ? 0 : t[c]._rect.width) - h,
                          )),
                    e && s >= d && (s = d - 10),
                    !e && d >= s && (s = d + 10),
                    (t[c]._rect.x = t[c].style.x = h + s * n),
                    t[c]._labelLine &&
                      ((t[c]._labelLine.style.pointList[2][0] =
                        h + (s - 5) * n),
                      (t[c]._labelLine.style.pointList[1][0] =
                        h + (s - 20) * n)),
                    (d = s);
              }
              t.sort(function (t, e) {
                return t._rect.y - e._rect.y;
              });
              for (
                var a, h = 0, l = t.length, d = [], c = [], p = 0;
                l > p;
                p++
              )
                (a = t[p]._rect.y - h),
                  0 > a && n(p, l, -a, o),
                  (h = t[p]._rect.y + t[p]._rect.height);
              this.zr.getHeight() - h < 0 && s(l - 1, h - this.zr.getHeight());
              for (var p = 0; l > p; p++)
                t[p]._rect.y >= e[1] ? c.push(t[p]) : d.push(t[p]);
              r(c, !0, e, i, o), r(d, !1, e, i, o);
            },
            reformOption: function (t) {
              var e = d.merge;
              return (
                (t = e(
                  e(t || {}, d.clone(this.ecTheme.pie || {})),
                  d.clone(h.pie),
                )),
                (t.itemStyle.normal.label.textStyle = this.getTextStyle(
                  t.itemStyle.normal.label.textStyle,
                )),
                (t.itemStyle.emphasis.label.textStyle = this.getTextStyle(
                  t.itemStyle.emphasis.label.textStyle,
                )),
                (this.z = t.z),
                (this.zlevel = t.zlevel),
                t
              );
            },
            refresh: function (t) {
              t && ((this.option = t), (this.series = t.series)),
                this.backupShapeList(),
                this._buildShape();
            },
            addDataAnimation: function (t, e) {
              function i() {
                a--, 0 === a && e && e();
              }
              for (var o = this.series, n = {}, s = 0, r = t.length; r > s; s++)
                n[t[s][0]] = t[s];
              var a = 0,
                l = {},
                d = {},
                c = {},
                p = this.shapeList;
              this.shapeList = [];
              for (var u, g, f, m = {}, s = 0, r = t.length; r > s; s++)
                (u = t[s][0]),
                  (g = t[s][2]),
                  (f = t[s][3]),
                  o[u] &&
                    o[u].type === h.CHART_TYPE_PIE &&
                    (g
                      ? (f || (l[u + '_' + o[u].data.length] = 'delete'),
                        (m[u] = 1))
                      : f
                      ? (m[u] = 0)
                      : ((l[u + '_-1'] = 'delete'), (m[u] = -1)),
                    this._buildSinglePie(u));
              for (var _, y, s = 0, r = this.shapeList.length; r > s; s++)
                switch (
                  ((u = this.shapeList[s]._seriesIndex),
                  (_ = this.shapeList[s]._dataIndex),
                  (y = u + '_' + _),
                  this.shapeList[s].type)
                ) {
                  case 'sector':
                    l[y] = this.shapeList[s];
                    break;
                  case 'text':
                    d[y] = this.shapeList[s];
                    break;
                  case 'polyline':
                    c[y] = this.shapeList[s];
                }
              this.shapeList = [];
              for (var x, s = 0, r = p.length; r > s; s++)
                if (((u = p[s]._seriesIndex), n[u])) {
                  if (
                    ((_ = p[s]._dataIndex + m[u]),
                    (y = u + '_' + _),
                    (x = l[y]),
                    !x)
                  )
                    continue;
                  if ('sector' === p[s].type)
                    'delete' != x
                      ? (a++,
                        this.zr
                          .animate(p[s].id, 'style')
                          .when(400, {
                            startAngle: x.style.startAngle,
                            endAngle: x.style.endAngle,
                          })
                          .done(i)
                          .start())
                      : (a++,
                        this.zr
                          .animate(p[s].id, 'style')
                          .when(
                            400,
                            m[u] < 0
                              ? { startAngle: p[s].style.startAngle }
                              : { endAngle: p[s].style.endAngle },
                          )
                          .done(i)
                          .start());
                  else if ('text' === p[s].type || 'polyline' === p[s].type)
                    if ('delete' === x) this.zr.delShape(p[s].id);
                    else
                      switch (p[s].type) {
                        case 'text':
                          a++,
                            (x = d[y]),
                            this.zr
                              .animate(p[s].id, 'style')
                              .when(400, { x: x.style.x, y: x.style.y })
                              .done(i)
                              .start();
                          break;
                        case 'polyline':
                          a++,
                            (x = c[y]),
                            this.zr
                              .animate(p[s].id, 'style')
                              .when(400, { pointList: x.style.pointList })
                              .done(i)
                              .start();
                      }
                }
              (this.shapeList = p), a || (e && e());
            },
            onclick: function (t) {
              var e = this.series;
              if (this.isClick && t.target) {
                this.isClick = !1;
                for (
                  var i,
                    o = t.target,
                    n = o.style,
                    s = l.get(o, 'seriesIndex'),
                    r = l.get(o, 'dataIndex'),
                    a = 0,
                    d = this.shapeList.length;
                  d > a;
                  a++
                )
                  if (this.shapeList[a].id === o.id) {
                    if (
                      ((s = l.get(o, 'seriesIndex')),
                      (r = l.get(o, 'dataIndex')),
                      n._hasSelected)
                    )
                      (o.style.x = o.style._x),
                        (o.style.y = o.style._y),
                        (o.style._hasSelected = !1),
                        (this._selected[s][r] = !1);
                    else {
                      var p = ((n.startAngle + n.endAngle) / 2).toFixed(2) - 0;
                      (o.style._hasSelected = !0),
                        (this._selected[s][r] = !0),
                        (o.style._x = o.style.x),
                        (o.style._y = o.style.y),
                        (i = this.query(e[s], 'selectedOffset')),
                        (o.style.x += c.cos(p, !0) * i),
                        (o.style.y -= c.sin(p, !0) * i);
                    }
                    this.zr.modShape(o.id);
                  } else
                    this.shapeList[a].style._hasSelected &&
                      'single' === this._selectedMode &&
                      ((s = l.get(this.shapeList[a], 'seriesIndex')),
                      (r = l.get(this.shapeList[a], 'dataIndex')),
                      (this.shapeList[a].style.x = this.shapeList[a].style._x),
                      (this.shapeList[a].style.y = this.shapeList[a].style._y),
                      (this.shapeList[a].style._hasSelected = !1),
                      (this._selected[s][r] = !1),
                      this.zr.modShape(this.shapeList[a].id));
                this.messageCenter.dispatch(
                  h.EVENT.PIE_SELECTED,
                  t.event,
                  { selected: this._selected, target: l.get(o, 'name') },
                  this.myChart,
                ),
                  this.zr.refreshNextFrame();
              }
            },
          }),
          d.inherits(e, i),
          t('../chart').define('pie', e),
          e
        );
      },
    ),
    i(
      'echarts/chart/funnel',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Line',
        'zrender/shape/Polygon',
        '../config',
        '../util/ecData',
        '../util/number',
        'zrender/tool/util',
        'zrender/tool/color',
        'zrender/tool/area',
        '../chart',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s), this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Line'),
          s = t('zrender/shape/Polygon'),
          r = t('../config');
        r.funnel = {
          zlevel: 0,
          z: 2,
          clickable: !0,
          legendHoverLink: !0,
          x: 80,
          y: 60,
          x2: 80,
          y2: 60,
          min: 0,
          max: 100,
          minSize: '0%',
          maxSize: '100%',
          sort: 'descending',
          gap: 0,
          funnelAlign: 'center',
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 1,
              label: { show: !0, position: 'outer' },
              labelLine: {
                show: !0,
                length: 10,
                lineStyle: { width: 1, type: 'solid' },
              },
            },
            emphasis: {
              borderColor: 'rgba(0,0,0,0)',
              borderWidth: 1,
              label: { show: !0 },
              labelLine: { show: !0 },
            },
          },
        };
        var a = t('../util/ecData'),
          h = t('../util/number'),
          l = t('zrender/tool/util'),
          d = t('zrender/tool/color'),
          c = t('zrender/tool/area');
        return (
          (e.prototype = {
            type: r.CHART_TYPE_FUNNEL,
            _buildShape: function () {
              var t = this.series,
                e = this.component.legend;
              (this._paramsMap = {}),
                (this._selected = {}),
                (this.selectedMap = {});
              for (var i, o = 0, n = t.length; n > o; o++)
                if (t[o].type === r.CHART_TYPE_FUNNEL) {
                  if (
                    ((t[o] = this.reformOption(t[o])),
                    (this.legendHoverLink =
                      t[o].legendHoverLink || this.legendHoverLink),
                    (i = t[o].name || ''),
                    (this.selectedMap[i] = e ? e.isSelected(i) : !0),
                    !this.selectedMap[i])
                  )
                    continue;
                  this._buildSingleFunnel(o), this.buildMark(o);
                }
              this.addShapeList();
            },
            _buildSingleFunnel: function (t) {
              var e = this.component.legend,
                i = this.series[t],
                o = this._mapData(t),
                n = this._getLocation(t);
              this._paramsMap[t] = { location: n, data: o };
              for (var s, r = 0, a = [], l = 0, d = o.length; d > l; l++)
                (s = o[l].name),
                  (this.selectedMap[s] = e ? e.isSelected(s) : !0),
                  this.selectedMap[s] &&
                    !isNaN(o[l].value) &&
                    (a.push(o[l]), r++);
              if (0 !== r) {
                for (
                  var c,
                    p,
                    u,
                    g,
                    f = this._buildFunnelCase(t),
                    m = i.funnelAlign,
                    _ = i.gap,
                    y = r > 1 ? (n.height - (r - 1) * _) / r : n.height,
                    x = n.y,
                    v =
                      'descending' === i.sort
                        ? this._getItemWidth(t, a[0].value)
                        : h.parsePercent(i.minSize, n.width),
                    b = 'descending' === i.sort ? 1 : 0,
                    S = n.centerX,
                    T = [],
                    l = 0,
                    d = a.length;
                  d > l;
                  l++
                )
                  if (
                    ((s = a[l].name), this.selectedMap[s] && !isNaN(a[l].value))
                  ) {
                    switch (
                      ((c =
                        d - 2 >= l
                          ? this._getItemWidth(t, a[l + b].value)
                          : 'descending' === i.sort
                          ? h.parsePercent(i.minSize, n.width)
                          : h.parsePercent(i.maxSize, n.width)),
                      m)
                    ) {
                      case 'left':
                        p = n.x;
                        break;
                      case 'right':
                        p = n.x + n.width - v;
                        break;
                      default:
                        p = S - v / 2;
                    }
                    (u = this._buildItem(
                      t,
                      a[l]._index,
                      e ? e.getColor(s) : this.zr.getColor(a[l]._index),
                      p,
                      x,
                      v,
                      c,
                      y,
                      m,
                    )),
                      (x += y + _),
                      (g = u.style.pointList),
                      T.unshift([g[0][0] - 10, g[0][1]]),
                      T.push([g[1][0] + 10, g[1][1]]),
                      0 === l &&
                        (0 === v
                          ? ((g = T.pop()),
                            'center' == m && (T[0][0] += 10),
                            'right' == m && (T[0][0] = g[0]),
                            (T[0][1] -= 'center' == m ? 10 : 15),
                            1 == d && (g = u.style.pointList))
                          : ((T[T.length - 1][1] -= 5), (T[0][1] -= 5))),
                      (v = c);
                  }
                f &&
                  (T.unshift([g[3][0] - 10, g[3][1]]),
                  T.push([g[2][0] + 10, g[2][1]]),
                  0 === v
                    ? ((g = T.pop()),
                      'center' == m && (T[0][0] += 10),
                      'right' == m && (T[0][0] = g[0]),
                      (T[0][1] += 'center' == m ? 10 : 15))
                    : ((T[T.length - 1][1] += 5), (T[0][1] += 5)),
                  (f.style.pointList = T));
              }
            },
            _buildFunnelCase: function (t) {
              var e = this.series[t];
              if (this.deepQuery([e, this.option], 'calculable')) {
                var i = this._paramsMap[t].location,
                  o = 10,
                  n = {
                    hoverable: !1,
                    style: {
                      pointListd: [
                        [i.x - o, i.y - o],
                        [i.x + i.width + o, i.y - o],
                        [i.x + i.width + o, i.y + i.height + o],
                        [i.x - o, i.y + i.height + o],
                      ],
                      brushType: 'stroke',
                      lineWidth: 1,
                      strokeColor:
                        e.calculableHolderColor ||
                        this.ecTheme.calculableHolderColor ||
                        r.calculableHolderColor,
                    },
                  };
                return (
                  a.pack(n, e, t, void 0, -1),
                  this.setCalculable(n),
                  (n = new s(n)),
                  this.shapeList.push(n),
                  n
                );
              }
            },
            _getLocation: function (t) {
              var e = this.series[t],
                i = this.zr.getWidth(),
                o = this.zr.getHeight(),
                n = this.parsePercent(e.x, i),
                s = this.parsePercent(e.y, o),
                r =
                  null == e.width
                    ? i - n - this.parsePercent(e.x2, i)
                    : this.parsePercent(e.width, i);
              return {
                x: n,
                y: s,
                width: r,
                height:
                  null == e.height
                    ? o - s - this.parsePercent(e.y2, o)
                    : this.parsePercent(e.height, o),
                centerX: n + r / 2,
              };
            },
            _mapData: function (t) {
              function e(t, e) {
                return '-' === t.value
                  ? 1
                  : '-' === e.value
                  ? -1
                  : e.value - t.value;
              }
              function i(t, i) {
                return -e(t, i);
              }
              for (
                var o = this.series[t],
                  n = l.clone(o.data),
                  s = 0,
                  r = n.length;
                r > s;
                s++
              )
                n[s]._index = s;
              return (
                'none' != o.sort && n.sort('descending' === o.sort ? e : i), n
              );
            },
            _buildItem: function (t, e, i, o, n, s, r, h, l) {
              var d = this.series,
                c = d[t],
                p = c.data[e],
                u = this.getPolygon(t, e, i, o, n, s, r, h, l);
              a.pack(u, d[t], t, d[t].data[e], e, d[t].data[e].name),
                this.shapeList.push(u);
              var g = this.getLabel(t, e, i, o, n, s, r, h, l);
              a.pack(g, d[t], t, d[t].data[e], e, d[t].data[e].name),
                this.shapeList.push(g),
                this._needLabel(c, p, !1) || (g.invisible = !0);
              var f = this.getLabelLine(t, e, i, o, n, s, r, h, l);
              this.shapeList.push(f),
                this._needLabelLine(c, p, !1) || (f.invisible = !0);
              var m = [],
                _ = [];
              return (
                this._needLabelLine(c, p, !0) && (m.push(f.id), _.push(f.id)),
                this._needLabel(c, p, !0) && (m.push(g.id), _.push(u.id)),
                (u.hoverConnect = m),
                (g.hoverConnect = _),
                u
              );
            },
            _getItemWidth: function (t, e) {
              var i = this.series[t],
                o = this._paramsMap[t].location,
                n = i.min,
                s = i.max,
                r = h.parsePercent(i.minSize, o.width),
                a = h.parsePercent(i.maxSize, o.width);
              return ((e - n) * (a - r)) / (s - n) + r;
            },
            getPolygon: function (t, e, i, o, n, r, a, h, l) {
              var c,
                p = this.series[t],
                u = p.data[e],
                g = [u, p],
                f = this.deepMerge(g, 'itemStyle.normal') || {},
                m = this.deepMerge(g, 'itemStyle.emphasis') || {},
                _ = this.getItemStyleColor(f.color, t, e, u) || i,
                y =
                  this.getItemStyleColor(m.color, t, e, u) ||
                  ('string' == typeof _ ? d.lift(_, -0.2) : _);
              switch (l) {
                case 'left':
                  c = o;
                  break;
                case 'right':
                  c = o + (r - a);
                  break;
                default:
                  c = o + (r - a) / 2;
              }
              var x = {
                zlevel: p.zlevel,
                z: p.z,
                clickable: this.deepQuery(g, 'clickable'),
                style: {
                  pointList: [
                    [o, n],
                    [o + r, n],
                    [c + a, n + h],
                    [c, n + h],
                  ],
                  brushType: 'both',
                  color: _,
                  lineWidth: f.borderWidth,
                  strokeColor: f.borderColor,
                },
                highlightStyle: {
                  color: y,
                  lineWidth: m.borderWidth,
                  strokeColor: m.borderColor,
                },
              };
              return (
                this.deepQuery([u, p, this.option], 'calculable') &&
                  (this.setCalculable(x), (x.draggable = !0)),
                new s(x)
              );
            },
            getLabel: function (t, e, i, n, s, r, a, h, p) {
              var u,
                g = this.series[t],
                f = g.data[e],
                m = this._paramsMap[t].location,
                _ = l.merge(l.clone(f.itemStyle) || {}, g.itemStyle),
                y = 'normal',
                x = _[y].label,
                v = x.textStyle || {},
                b = _[y].labelLine.length,
                S = this.getLabelText(t, e, y),
                T = this.getFont(v),
                z = i;
              (x.position = x.position || _.normal.label.position),
                'inner' === x.position ||
                'inside' === x.position ||
                'center' === x.position
                  ? ((u = p),
                    (z =
                      Math.max(r, a) / 2 > c.getTextWidth(S, T)
                        ? '#fff'
                        : d.reverse(i)))
                  : (u = 'left' === x.position ? 'right' : 'left');
              var C = {
                zlevel: g.zlevel,
                z: g.z + 1,
                style: {
                  x: this._getLabelPoint(x.position, n, m, r, a, b, p),
                  y: s + h / 2,
                  color: v.color || z,
                  text: S,
                  textAlign: v.align || u,
                  textBaseline: v.baseline || 'middle',
                  textFont: T,
                },
              };
              return (
                (y = 'emphasis'),
                (x = _[y].label || x),
                (v = x.textStyle || v),
                (b = _[y].labelLine.length || b),
                (x.position = x.position || _.normal.label.position),
                (S = this.getLabelText(t, e, y)),
                (T = this.getFont(v)),
                (z = i),
                'inner' === x.position ||
                'inside' === x.position ||
                'center' === x.position
                  ? ((u = p),
                    (z =
                      Math.max(r, a) / 2 > c.getTextWidth(S, T)
                        ? '#fff'
                        : d.reverse(i)))
                  : (u = 'left' === x.position ? 'right' : 'left'),
                (C.highlightStyle = {
                  x: this._getLabelPoint(x.position, n, m, r, a, b, p),
                  color: v.color || z,
                  text: S,
                  textAlign: v.align || u,
                  textFont: T,
                  brushType: 'fill',
                }),
                new o(C)
              );
            },
            getLabelText: function (t, e, i) {
              var o = this.series,
                n = o[t],
                s = n.data[e],
                r = this.deepQuery(
                  [s, n],
                  'itemStyle.' + i + '.label.formatter',
                );
              return r
                ? 'function' == typeof r
                  ? r.call(this.myChart, {
                      seriesIndex: t,
                      seriesName: n.name || '',
                      series: n,
                      dataIndex: e,
                      data: s,
                      name: s.name,
                      value: s.value,
                    })
                  : 'string' == typeof r
                  ? (r = r
                      .replace('{a}', '{a0}')
                      .replace('{b}', '{b0}')
                      .replace('{c}', '{c0}')
                      .replace('{a0}', n.name)
                      .replace('{b0}', s.name)
                      .replace('{c0}', s.value))
                  : void 0
                : s.name;
            },
            getLabelLine: function (t, e, i, o, s, r, a, h, d) {
              var c = this.series[t],
                p = c.data[e],
                u = this._paramsMap[t].location,
                g = l.merge(l.clone(p.itemStyle) || {}, c.itemStyle),
                f = 'normal',
                m = g[f].labelLine,
                _ = g[f].labelLine.length,
                y = m.lineStyle || {},
                x = g[f].label;
              x.position = x.position || g.normal.label.position;
              var v = {
                zlevel: c.zlevel,
                z: c.z + 1,
                hoverable: !1,
                style: {
                  xStart: this._getLabelLineStartPoint(o, u, r, a, d),
                  yStart: s + h / 2,
                  xEnd: this._getLabelPoint(x.position, o, u, r, a, _, d),
                  yEnd: s + h / 2,
                  strokeColor: y.color || i,
                  lineType: y.type,
                  lineWidth: y.width,
                },
              };
              return (
                (f = 'emphasis'),
                (m = g[f].labelLine || m),
                (_ = g[f].labelLine.length || _),
                (y = m.lineStyle || y),
                (x = g[f].label || x),
                (x.position = x.position),
                (v.highlightStyle = {
                  xEnd: this._getLabelPoint(x.position, o, u, r, a, _, d),
                  strokeColor: y.color || i,
                  lineType: y.type,
                  lineWidth: y.width,
                }),
                new n(v)
              );
            },
            _getLabelPoint: function (t, e, i, o, n, s, r) {
              switch ((t = 'inner' === t || 'inside' === t ? 'center' : t)) {
                case 'center':
                  return 'center' == r
                    ? e + o / 2
                    : 'left' == r
                    ? e + 10
                    : e + o - 10;
                case 'left':
                  return 'auto' === s
                    ? i.x - 10
                    : 'center' == r
                    ? i.centerX - Math.max(o, n) / 2 - s
                    : 'right' == r
                    ? e - (n > o ? n - o : 0) - s
                    : i.x - s;
                default:
                  return 'auto' === s
                    ? i.x + i.width + 10
                    : 'center' == r
                    ? i.centerX + Math.max(o, n) / 2 + s
                    : 'right' == r
                    ? i.x + i.width + s
                    : e + Math.max(o, n) + s;
              }
            },
            _getLabelLineStartPoint: function (t, e, i, o, n) {
              return 'center' == n
                ? e.centerX
                : o > i
                ? t + Math.min(i, o) / 2
                : t + Math.max(i, o) / 2;
            },
            _needLabel: function (t, e, i) {
              return this.deepQuery(
                [e, t],
                'itemStyle.' + (i ? 'emphasis' : 'normal') + '.label.show',
              );
            },
            _needLabelLine: function (t, e, i) {
              return this.deepQuery(
                [e, t],
                'itemStyle.' + (i ? 'emphasis' : 'normal') + '.labelLine.show',
              );
            },
            refresh: function (t) {
              t && ((this.option = t), (this.series = t.series)),
                this.backupShapeList(),
                this._buildShape();
            },
          }),
          l.inherits(e, i),
          t('../chart').define('funnel', e),
          e
        );
      },
    ),
    i(
      'echarts/echarts',
      [
        'require',
        './config',
        'zrender/tool/util',
        'zrender/tool/event',
        'zrender/tool/env',
        'zrender',
        'zrender/config',
        './chart/island',
        './component/toolbox',
        './component',
        './component/title',
        './component/tooltip',
        './component/legend',
        './util/ecData',
        './chart',
        'zrender/tool/color',
        './component/timeline',
        'zrender/shape/Image',
        'zrender/loadingEffect/Bar',
        'zrender/loadingEffect/Bubble',
        'zrender/loadingEffect/DynamicLine',
        'zrender/loadingEffect/Ring',
        'zrender/loadingEffect/Spin',
        'zrender/loadingEffect/Whirling',
        './theme/macarons',
        './theme/infographic',
      ],
      function (t) {
        function e() {
          r.Dispatcher.call(this);
        }
        function i(t) {
          (t.innerHTML = ''),
            (this._themeConfig = {}),
            (this.dom = t),
            (this._connected = !1),
            (this._status = { dragIn: !1, dragOut: !1, needRefresh: !1 }),
            (this._curEventType = !1),
            (this._chartList = []),
            (this._messageCenter = new e()),
            (this._messageCenterOutSide = new e()),
            (this.resize = this.resize()),
            this._init();
        }
        function o(t, e, i, o, n) {
          for (var s = t._chartList, r = s.length; r--; ) {
            var a = s[r];
            'function' == typeof a[e] && a[e](i, o, n);
          }
        }
        var n = t('./config'),
          s = t('zrender/tool/util'),
          r = t('zrender/tool/event'),
          a = {},
          h = t('zrender/tool/env').canvasSupported,
          l = new Date() - 0,
          d = {},
          c = '_echarts_instance_';
        (a.version = '2.2.7'),
          (a.dependencies = { zrender: '2.1.1' }),
          (a.init = function (e, o) {
            var n = t('zrender');
            n.version.replace('.', '') - 0 <
              a.dependencies.zrender.replace('.', '') - 0 &&
              console.error(
                'ZRender ' +
                  n.version +
                  ' is too old for ECharts ' +
                  a.version +
                  '. Current version need ZRender ' +
                  a.dependencies.zrender +
                  '+',
              ),
              (e = e instanceof Array ? e[0] : e);
            var s = e.getAttribute(c);
            return (
              s || ((s = l++), e.setAttribute(c, s)),
              d[s] && d[s].dispose(),
              (d[s] = new i(e)),
              (d[s].id = s),
              (d[s].canvasSupported = h),
              d[s].setTheme(o),
              d[s]
            );
          }),
          (a.getInstanceById = function (t) {
            return d[t];
          }),
          s.merge(e.prototype, r.Dispatcher.prototype, !0);
        var p = t('zrender/config').EVENT,
          u = [
            'CLICK',
            'DBLCLICK',
            'MOUSEOVER',
            'MOUSEOUT',
            'DRAGSTART',
            'DRAGEND',
            'DRAGENTER',
            'DRAGOVER',
            'DRAGLEAVE',
            'DROP',
          ];
        return (
          (i.prototype = {
            _init: function () {
              var e = this,
                i = t('zrender').init(this.dom);
              (this._zr = i),
                (this._messageCenter.dispatch = function (t, i, o, n) {
                  (o = o || {}),
                    (o.type = t),
                    (o.event = i),
                    e._messageCenter.dispatchWithContext(t, o, n),
                    e._messageCenterOutSide.dispatchWithContext(t, o, n);
                }),
                (this._onevent = function (t) {
                  return e.__onevent(t);
                });
              for (var o in n.EVENT)
                'CLICK' != o &&
                  'DBLCLICK' != o &&
                  'HOVER' != o &&
                  'MOUSEOUT' != o &&
                  'MAP_ROAM' != o &&
                  this._messageCenter.bind(n.EVENT[o], this._onevent, this);
              var s = {};
              this._onzrevent = function (t) {
                return e[s[t.type]](t);
              };
              for (var r = 0, a = u.length; a > r; r++) {
                var h = u[r],
                  l = p[h];
                (s[l] = '_on' + h.toLowerCase()), i.on(l, this._onzrevent);
              }
              (this.chart = {}), (this.component = {});
              var d = t('./chart/island');
              (this._island = new d(
                this._themeConfig,
                this._messageCenter,
                i,
                {},
                this,
              )),
                (this.chart.island = this._island);
              var c = t('./component/toolbox');
              (this._toolbox = new c(
                this._themeConfig,
                this._messageCenter,
                i,
                {},
                this,
              )),
                (this.component.toolbox = this._toolbox);
              var g = t('./component');
              g.define('title', t('./component/title')),
                g.define('tooltip', t('./component/tooltip')),
                g.define('legend', t('./component/legend')),
                (0 === i.getWidth() || 0 === i.getHeight()) &&
                  console.error(
                    'Dom’s width & height should be ready before init.',
                  );
            },
            __onevent: function (t) {
              t.__echartsId = t.__echartsId || this.id;
              var e = t.__echartsId === this.id;
              switch (
                (this._curEventType || (this._curEventType = t.type), t.type)
              ) {
                case n.EVENT.LEGEND_SELECTED:
                  this._onlegendSelected(t);
                  break;
                case n.EVENT.DATA_ZOOM:
                  if (!e) {
                    var i = this.component.dataZoom;
                    i && (i.silence(!0), i.absoluteZoom(t.zoom), i.silence(!1));
                  }
                  this._ondataZoom(t);
                  break;
                case n.EVENT.DATA_RANGE:
                  e && this._ondataRange(t);
                  break;
                case n.EVENT.MAGIC_TYPE_CHANGED:
                  if (!e) {
                    var o = this.component.toolbox;
                    o &&
                      (o.silence(!0),
                      o.setMagicType(t.magicType),
                      o.silence(!1));
                  }
                  this._onmagicTypeChanged(t);
                  break;
                case n.EVENT.DATA_VIEW_CHANGED:
                  e && this._ondataViewChanged(t);
                  break;
                case n.EVENT.TOOLTIP_HOVER:
                  e && this._tooltipHover(t);
                  break;
                case n.EVENT.RESTORE:
                  this._onrestore();
                  break;
                case n.EVENT.REFRESH:
                  e && this._onrefresh(t);
                  break;
                case n.EVENT.TOOLTIP_IN_GRID:
                case n.EVENT.TOOLTIP_OUT_GRID:
                  if (e) {
                    if (this._connected) {
                      var s = this.component.grid;
                      s &&
                        ((t.x = (t.event.zrenderX - s.getX()) / s.getWidth()),
                        (t.y = (t.event.zrenderY - s.getY()) / s.getHeight()));
                    }
                  } else {
                    var s = this.component.grid;
                    s &&
                      this._zr.trigger('mousemove', {
                        connectTrigger: !0,
                        zrenderX: s.getX() + t.x * s.getWidth(),
                        zrenderY: s.getY() + t.y * s.getHeight(),
                      });
                  }
              }
              if (this._connected && e && this._curEventType === t.type) {
                for (var r in this._connected)
                  this._connected[r].connectedEventHandler(t);
                this._curEventType = null;
              }
              (!e || (!this._connected && e)) && (this._curEventType = null);
            },
            _onclick: function (t) {
              if ((o(this, 'onclick', t), t.target)) {
                var e = this._eventPackage(t.target);
                e &&
                  null != e.seriesIndex &&
                  this._messageCenter.dispatch(n.EVENT.CLICK, t.event, e, this);
              }
            },
            _ondblclick: function (t) {
              if ((o(this, 'ondblclick', t), t.target)) {
                var e = this._eventPackage(t.target);
                e &&
                  null != e.seriesIndex &&
                  this._messageCenter.dispatch(
                    n.EVENT.DBLCLICK,
                    t.event,
                    e,
                    this,
                  );
              }
            },
            _onmouseover: function (t) {
              if (t.target) {
                var e = this._eventPackage(t.target);
                e &&
                  null != e.seriesIndex &&
                  this._messageCenter.dispatch(n.EVENT.HOVER, t.event, e, this);
              }
            },
            _onmouseout: function (t) {
              if (t.target) {
                var e = this._eventPackage(t.target);
                e &&
                  null != e.seriesIndex &&
                  this._messageCenter.dispatch(
                    n.EVENT.MOUSEOUT,
                    t.event,
                    e,
                    this,
                  );
              }
            },
            _ondragstart: function (t) {
              (this._status = { dragIn: !1, dragOut: !1, needRefresh: !1 }),
                o(this, 'ondragstart', t);
            },
            _ondragenter: function (t) {
              o(this, 'ondragenter', t);
            },
            _ondragover: function (t) {
              o(this, 'ondragover', t);
            },
            _ondragleave: function (t) {
              o(this, 'ondragleave', t);
            },
            _ondrop: function (t) {
              o(this, 'ondrop', t, this._status),
                this._island.ondrop(t, this._status);
            },
            _ondragend: function (t) {
              if (
                (o(this, 'ondragend', t, this._status),
                this._timeline && this._timeline.ondragend(t, this._status),
                this._island.ondragend(t, this._status),
                this._status.needRefresh)
              ) {
                this._syncBackupData(this._option);
                var e = this._messageCenter;
                e.dispatch(
                  n.EVENT.DATA_CHANGED,
                  t.event,
                  this._eventPackage(t.target),
                  this,
                ),
                  e.dispatch(n.EVENT.REFRESH, null, null, this);
              }
            },
            _onlegendSelected: function (t) {
              (this._status.needRefresh = !1),
                o(this, 'onlegendSelected', t, this._status),
                this._status.needRefresh &&
                  this._messageCenter.dispatch(
                    n.EVENT.REFRESH,
                    null,
                    null,
                    this,
                  );
            },
            _ondataZoom: function (t) {
              (this._status.needRefresh = !1),
                o(this, 'ondataZoom', t, this._status),
                this._status.needRefresh &&
                  this._messageCenter.dispatch(
                    n.EVENT.REFRESH,
                    null,
                    null,
                    this,
                  );
            },
            _ondataRange: function (t) {
              this._clearEffect(),
                (this._status.needRefresh = !1),
                o(this, 'ondataRange', t, this._status),
                this._status.needRefresh && this._zr.refreshNextFrame();
            },
            _onmagicTypeChanged: function () {
              this._clearEffect(), this._render(this._toolbox.getMagicOption());
            },
            _ondataViewChanged: function (t) {
              this._syncBackupData(t.option),
                this._messageCenter.dispatch(
                  n.EVENT.DATA_CHANGED,
                  null,
                  t,
                  this,
                ),
                this._messageCenter.dispatch(n.EVENT.REFRESH, null, null, this);
            },
            _tooltipHover: function (t) {
              var e = [];
              o(this, 'ontooltipHover', t, e);
            },
            _onrestore: function () {
              this.restore();
            },
            _onrefresh: function (t) {
              (this._refreshInside = !0),
                this.refresh(t),
                (this._refreshInside = !1);
            },
            _syncBackupData: function (t) {
              this.component.dataZoom &&
                this.component.dataZoom.syncBackupData(t);
            },
            _eventPackage: function (e) {
              if (e) {
                var i = t('./util/ecData'),
                  o = i.get(e, 'seriesIndex'),
                  n = i.get(e, 'dataIndex');
                return (
                  (n =
                    -1 != o && this.component.dataZoom
                      ? this.component.dataZoom.getRealDataIndex(o, n)
                      : n),
                  {
                    seriesIndex: o,
                    seriesName: (i.get(e, 'series') || {}).name,
                    dataIndex: n,
                    data: i.get(e, 'data'),
                    name: i.get(e, 'name'),
                    value: i.get(e, 'value'),
                    special: i.get(e, 'special'),
                  }
                );
              }
            },
            _noDataCheck: function (t) {
              for (var e = t.series, i = 0, o = e.length; o > i; i++)
                if (
                  e[i].type == n.CHART_TYPE_MAP ||
                  (e[i].data && e[i].data.length > 0) ||
                  (e[i].markPoint &&
                    e[i].markPoint.data &&
                    e[i].markPoint.data.length > 0) ||
                  (e[i].markLine &&
                    e[i].markLine.data &&
                    e[i].markLine.data.length > 0) ||
                  (e[i].nodes && e[i].nodes.length > 0) ||
                  (e[i].links && e[i].links.length > 0) ||
                  (e[i].matrix && e[i].matrix.length > 0) ||
                  (e[i].eventList && e[i].eventList.length > 0)
                )
                  return !1;
              var s = (this._option && this._option.noDataLoadingOption) ||
                this._themeConfig.noDataLoadingOption ||
                n.noDataLoadingOption || {
                  text:
                    (this._option && this._option.noDataText) ||
                    this._themeConfig.noDataText ||
                    n.noDataText,
                  effect:
                    (this._option && this._option.noDataEffect) ||
                    this._themeConfig.noDataEffect ||
                    n.noDataEffect,
                };
              return this.clear(), this.showLoading(s), !0;
            },
            _render: function (e) {
              if ((this._mergeGlobalConifg(e), !this._noDataCheck(e))) {
                var i = e.backgroundColor;
                if (i)
                  if (h || -1 == i.indexOf('rgba'))
                    this.dom.style.backgroundColor = i;
                  else {
                    var o = i.split(',');
                    (this.dom.style.filter =
                      'alpha(opacity=' +
                      100 * o[3].substring(0, o[3].lastIndexOf(')')) +
                      ')'),
                      (o.length = 3),
                      (o[0] = o[0].replace('a', '')),
                      (this.dom.style.backgroundColor = o.join(',') + ')');
                  }
                this._zr.clearAnimation(), (this._chartList = []);
                var s = t('./chart'),
                  r = t('./component');
                (e.xAxis || e.yAxis) &&
                  ((e.grid = e.grid || {}), (e.dataZoom = e.dataZoom || {}));
                for (
                  var a,
                    l,
                    d,
                    c = [
                      'title',
                      'legend',
                      'tooltip',
                      'dataRange',
                      'roamController',
                      'grid',
                      'dataZoom',
                      'xAxis',
                      'yAxis',
                      'polar',
                    ],
                    p = 0,
                    u = c.length;
                  u > p;
                  p++
                )
                  (l = c[p]),
                    (d = this.component[l]),
                    e[l]
                      ? (d
                          ? d.refresh && d.refresh(e)
                          : ((a = r.get(/^[xy]Axis$/.test(l) ? 'axis' : l)),
                            (d = new a(
                              this._themeConfig,
                              this._messageCenter,
                              this._zr,
                              e,
                              this,
                              l,
                            )),
                            (this.component[l] = d)),
                        this._chartList.push(d))
                      : d &&
                        (d.dispose(),
                        (this.component[l] = null),
                        delete this.component[l]);
                for (
                  var g, f, m, _ = {}, p = 0, u = e.series.length;
                  u > p;
                  p++
                )
                  (f = e.series[p].type),
                    f
                      ? _[f] ||
                        ((_[f] = !0),
                        (g = s.get(f)),
                        g
                          ? (this.chart[f]
                              ? ((m = this.chart[f]), m.refresh(e))
                              : (m = new g(
                                  this._themeConfig,
                                  this._messageCenter,
                                  this._zr,
                                  e,
                                  this,
                                )),
                            this._chartList.push(m),
                            (this.chart[f] = m))
                          : console.error(f + ' has not been required.'))
                      : console.error(
                          'series[' + p + '] chart type has not been defined.',
                        );
                for (f in this.chart)
                  f == n.CHART_TYPE_ISLAND ||
                    _[f] ||
                    (this.chart[f].dispose(),
                    (this.chart[f] = null),
                    delete this.chart[f]);
                this.component.grid &&
                  this.component.grid.refixAxisShape(this.component),
                  this._island.refresh(e),
                  this._toolbox.refresh(e),
                  e.animation && !e.renderAsImage
                    ? this._zr.refresh()
                    : this._zr.render();
                var y = 'IMG' + this.id,
                  x = document.getElementById(y);
                e.renderAsImage && h
                  ? (x
                      ? (x.src = this.getDataURL(e.renderAsImage))
                      : ((x = this.getImage(e.renderAsImage)),
                        (x.id = y),
                        (x.style.position = 'absolute'),
                        (x.style.left = 0),
                        (x.style.top = 0),
                        this.dom.firstChild.appendChild(x)),
                    this.un(),
                    this._zr.un(),
                    this._disposeChartList(),
                    this._zr.clear())
                  : x && x.parentNode.removeChild(x),
                  (x = null),
                  (this._option = e);
              }
            },
            restore: function () {
              this._clearEffect(),
                (this._option = s.clone(this._optionRestore)),
                this._disposeChartList(),
                this._island.clear(),
                this._toolbox.reset(this._option, !0),
                this._render(this._option);
            },
            refresh: function (t) {
              this._clearEffect(), (t = t || {});
              var e = t.option;
              !this._refreshInside &&
                e &&
                ((e = this.getOption()),
                s.merge(e, t.option, !0),
                s.merge(this._optionRestore, t.option, !0),
                this._toolbox.reset(e)),
                this._island.refresh(e),
                this._toolbox.refresh(e),
                this._zr.clearAnimation();
              for (var i = 0, o = this._chartList.length; o > i; i++)
                this._chartList[i].refresh && this._chartList[i].refresh(e);
              this.component.grid &&
                this.component.grid.refixAxisShape(this.component),
                this._zr.refresh();
            },
            _disposeChartList: function () {
              this._clearEffect(), this._zr.clearAnimation();
              for (var t = this._chartList.length; t--; ) {
                var e = this._chartList[t];
                if (e) {
                  var i = e.type;
                  this.chart[i] && delete this.chart[i],
                    this.component[i] && delete this.component[i],
                    e.dispose && e.dispose();
                }
              }
              this._chartList = [];
            },
            _mergeGlobalConifg: function (e) {
              for (
                var i = [
                    'backgroundColor',
                    'calculable',
                    'calculableColor',
                    'calculableHolderColor',
                    'nameConnector',
                    'valueConnector',
                    'animation',
                    'animationThreshold',
                    'animationDuration',
                    'animationDurationUpdate',
                    'animationEasing',
                    'addDataAnimation',
                    'symbolList',
                    'DRAG_ENABLE_TIME',
                  ],
                  o = i.length;
                o--;

              ) {
                var s = i[o];
                null == e[s] &&
                  (e[s] =
                    null != this._themeConfig[s] ? this._themeConfig[s] : n[s]);
              }
              var r = e.color;
              (r && r.length) || (r = this._themeConfig.color || n.color),
                (this._zr.getColor = function (e) {
                  var i = t('zrender/tool/color');
                  return i.getColor(e, r);
                }),
                h || ((e.animation = !1), (e.addDataAnimation = !1));
            },
            setOption: function (t, e) {
              return t.timeline
                ? this._setTimelineOption(t)
                : this._setOption(t, e);
            },
            _setOption: function (t, e, i) {
              return (
                !e && this._option
                  ? (this._option = s.merge(this.getOption(), s.clone(t), !0))
                  : ((this._option = s.clone(t)),
                    !i && this._timeline && this._timeline.dispose()),
                (this._optionRestore = s.clone(this._option)),
                this._option.series && 0 !== this._option.series.length
                  ? (this.component.dataZoom &&
                      (this._option.dataZoom ||
                        (this._option.toolbox &&
                          this._option.toolbox.feature &&
                          this._option.toolbox.feature.dataZoom &&
                          this._option.toolbox.feature.dataZoom.show)) &&
                      this.component.dataZoom.syncOption(this._option),
                    this._toolbox.reset(this._option),
                    this._render(this._option),
                    this)
                  : void this._zr.clear()
              );
            },
            getOption: function () {
              function t(t) {
                var o = i._optionRestore[t];
                if (o)
                  if (o instanceof Array)
                    for (var n = o.length; n--; )
                      e[t][n].data = s.clone(o[n].data);
                  else e[t].data = s.clone(o.data);
              }
              var e = s.clone(this._option),
                i = this;
              return t('xAxis'), t('yAxis'), t('series'), e;
            },
            setSeries: function (t, e) {
              return (
                e
                  ? ((this._option.series = t), this.setOption(this._option, e))
                  : this.setOption({ series: t }),
                this
              );
            },
            getSeries: function () {
              return this.getOption().series;
            },
            _setTimelineOption: function (e) {
              this._timeline && this._timeline.dispose();
              var i = t('./component/timeline'),
                o = new i(
                  this._themeConfig,
                  this._messageCenter,
                  this._zr,
                  e,
                  this,
                );
              return (
                (this._timeline = o),
                (this.component.timeline = this._timeline),
                this
              );
            },
            addData: function (t, e, i, o, r) {
              function a() {
                if (c._zr) {
                  c._zr.clearAnimation();
                  for (var t = 0, e = L.length; e > t; t++)
                    L[t].motionlessOnce =
                      l.addDataAnimation && L[t].addDataAnimation;
                  c._messageCenter.dispatch(
                    n.EVENT.REFRESH,
                    null,
                    { option: l },
                    c,
                  );
                }
              }
              for (
                var h = t instanceof Array ? t : [[t, e, i, o, r]],
                  l = this.getOption(),
                  d = this._optionRestore,
                  c = this,
                  p = 0,
                  u = h.length;
                u > p;
                p++
              ) {
                (t = h[p][0]),
                  (e = h[p][1]),
                  (i = h[p][2]),
                  (o = h[p][3]),
                  (r = h[p][4]);
                var g = d.series[t],
                  f = i ? 'unshift' : 'push',
                  m = i ? 'pop' : 'shift';
                if (g) {
                  var _ = g.data,
                    y = l.series[t].data;
                  if (
                    (_[f](e), y[f](e), o || (_[m](), (e = y[m]())), null != r)
                  ) {
                    var x, v;
                    if (
                      g.type === n.CHART_TYPE_PIE &&
                      (x = d.legend) &&
                      (v = x.data)
                    ) {
                      var b = l.legend.data;
                      if ((v[f](r), b[f](r), !o)) {
                        var S = s.indexOf(v, e.name);
                        -1 != S && v.splice(S, 1),
                          (S = s.indexOf(b, e.name)),
                          -1 != S && b.splice(S, 1);
                      }
                    } else if (null != d.xAxis && null != d.yAxis) {
                      var T,
                        z,
                        C = g.xAxisIndex || 0;
                      (null == d.xAxis[C].type ||
                        'category' === d.xAxis[C].type) &&
                        ((T = d.xAxis[C].data),
                        (z = l.xAxis[C].data),
                        T[f](r),
                        z[f](r),
                        o || (T[m](), z[m]())),
                        (C = g.yAxisIndex || 0),
                        'category' === d.yAxis[C].type &&
                          ((T = d.yAxis[C].data),
                          (z = l.yAxis[C].data),
                          T[f](r),
                          z[f](r),
                          o || (T[m](), z[m]()));
                    }
                  }
                  this._option.series[t].data = l.series[t].data;
                }
              }
              this._zr.clearAnimation();
              for (
                var L = this._chartList,
                  w = 0,
                  E = function () {
                    w--, 0 === w && a();
                  },
                  p = 0,
                  u = L.length;
                u > p;
                p++
              )
                l.addDataAnimation &&
                  L[p].addDataAnimation &&
                  (w++, L[p].addDataAnimation(h, E));
              return (
                this.component.dataZoom &&
                  this.component.dataZoom.syncOption(l),
                (this._option = l),
                l.addDataAnimation || setTimeout(a, 0),
                this
              );
            },
            addMarkPoint: function (t, e) {
              return this._addMark(t, e, 'markPoint');
            },
            addMarkLine: function (t, e) {
              return this._addMark(t, e, 'markLine');
            },
            _addMark: function (t, e, i) {
              var o,
                n = this._option.series;
              if (n && (o = n[t])) {
                var r = this._optionRestore.series,
                  a = r[t],
                  h = o[i],
                  l = a[i];
                (h = o[i] = h || { data: [] }), (l = a[i] = l || { data: [] });
                for (var d in e)
                  'data' === d
                    ? ((h.data = h.data.concat(e.data)),
                      (l.data = l.data.concat(e.data)))
                    : 'object' != typeof e[d] || null == h[d]
                    ? (h[d] = l[d] = e[d])
                    : (s.merge(h[d], e[d], !0), s.merge(l[d], e[d], !0));
                var c = this.chart[o.type];
                c && c.addMark(t, e, i);
              }
              return this;
            },
            delMarkPoint: function (t, e) {
              return this._delMark(t, e, 'markPoint');
            },
            delMarkLine: function (t, e) {
              return this._delMark(t, e, 'markLine');
            },
            _delMark: function (t, e, i) {
              var o,
                n,
                s,
                r = this._option.series;
              if (!(r && (o = r[t]) && (n = o[i]) && (s = n.data))) return this;
              e = e.split(' > ');
              for (var a = -1, h = 0, l = s.length; l > h; h++) {
                var d = s[h];
                if (d instanceof Array) {
                  if (d[0].name === e[0] && d[1].name === e[1]) {
                    a = h;
                    break;
                  }
                } else if (d.name === e[0]) {
                  a = h;
                  break;
                }
              }
              if (a > -1) {
                s.splice(a, 1),
                  this._optionRestore.series[t][i].data.splice(a, 1);
                var c = this.chart[o.type];
                c && c.delMark(t, e.join(' > '), i);
              }
              return this;
            },
            getDom: function () {
              return this.dom;
            },
            getZrender: function () {
              return this._zr;
            },
            getDataURL: function (t) {
              if (!h) return '';
              if (0 === this._chartList.length) {
                var e = 'IMG' + this.id,
                  i = document.getElementById(e);
                if (i) return i.src;
              }
              var o = this.component.tooltip;
              switch ((o && o.hideTip(), t)) {
                case 'jpeg':
                  break;
                default:
                  t = 'png';
              }
              var n = this._option.backgroundColor;
              return (
                n && 'rgba(0,0,0,0)' === n.replace(' ', '') && (n = '#fff'),
                this._zr.toDataURL('image/' + t, n)
              );
            },
            getImage: function (t) {
              var e = this._optionRestore.title,
                i = document.createElement('img');
              return (
                (i.src = this.getDataURL(t)),
                (i.title = (e && e.text) || 'ECharts'),
                i
              );
            },
            getConnectedDataURL: function (e) {
              if (!this.isConnected()) return this.getDataURL(e);
              var i = this.dom,
                o = {
                  self: {
                    img: this.getDataURL(e),
                    left: i.offsetLeft,
                    top: i.offsetTop,
                    right: i.offsetLeft + i.offsetWidth,
                    bottom: i.offsetTop + i.offsetHeight,
                  },
                },
                n = o.self.left,
                s = o.self.top,
                r = o.self.right,
                a = o.self.bottom;
              for (var h in this._connected)
                (i = this._connected[h].getDom()),
                  (o[h] = {
                    img: this._connected[h].getDataURL(e),
                    left: i.offsetLeft,
                    top: i.offsetTop,
                    right: i.offsetLeft + i.offsetWidth,
                    bottom: i.offsetTop + i.offsetHeight,
                  }),
                  (n = Math.min(n, o[h].left)),
                  (s = Math.min(s, o[h].top)),
                  (r = Math.max(r, o[h].right)),
                  (a = Math.max(a, o[h].bottom));
              var l = document.createElement('div');
              (l.style.position = 'absolute'),
                (l.style.left = '-4000px'),
                (l.style.width = r - n + 'px'),
                (l.style.height = a - s + 'px'),
                document.body.appendChild(l);
              var d = t('zrender').init(l),
                c = t('zrender/shape/Image');
              for (var h in o)
                d.addShape(
                  new c({
                    style: {
                      x: o[h].left - n,
                      y: o[h].top - s,
                      image: o[h].img,
                    },
                  }),
                );
              d.render();
              var p = this._option.backgroundColor;
              p && 'rgba(0,0,0,0)' === p.replace(/ /g, '') && (p = '#fff');
              var u = d.toDataURL('image/png', p);
              return (
                setTimeout(function () {
                  d.dispose(), l.parentNode.removeChild(l), (l = null);
                }, 100),
                u
              );
            },
            getConnectedImage: function (t) {
              var e = this._optionRestore.title,
                i = document.createElement('img');
              return (
                (i.src = this.getConnectedDataURL(t)),
                (i.title = (e && e.text) || 'ECharts'),
                i
              );
            },
            on: function (t, e) {
              return this._messageCenterOutSide.bind(t, e, this), this;
            },
            un: function (t, e) {
              return this._messageCenterOutSide.unbind(t, e), this;
            },
            connect: function (t) {
              if (!t) return this;
              if (
                (this._connected || (this._connected = {}), t instanceof Array)
              )
                for (var e = 0, i = t.length; i > e; e++)
                  this._connected[t[e].id] = t[e];
              else this._connected[t.id] = t;
              return this;
            },
            disConnect: function (t) {
              if (!t || !this._connected) return this;
              if (t instanceof Array)
                for (var e = 0, i = t.length; i > e; e++)
                  delete this._connected[t[e].id];
              else delete this._connected[t.id];
              for (var o in this._connected) return this;
              return (this._connected = !1), this;
            },
            connectedEventHandler: function (t) {
              t.__echartsId != this.id && this._onevent(t);
            },
            isConnected: function () {
              return !!this._connected;
            },
            showLoading: function (e) {
              var i = {
                bar: t('zrender/loadingEffect/Bar'),
                bubble: t('zrender/loadingEffect/Bubble'),
                dynamicLine: t('zrender/loadingEffect/DynamicLine'),
                ring: t('zrender/loadingEffect/Ring'),
                spin: t('zrender/loadingEffect/Spin'),
                whirling: t('zrender/loadingEffect/Whirling'),
              };
              this._toolbox.hideDataView(), (e = e || {});
              var o = e.textStyle || {};
              e.textStyle = o;
              var r = s.merge(
                s.merge(s.clone(o), this._themeConfig.textStyle),
                n.textStyle,
              );
              (o.textFont =
                r.fontStyle +
                ' ' +
                r.fontWeight +
                ' ' +
                r.fontSize +
                'px ' +
                r.fontFamily),
                (o.text =
                  e.text ||
                  (this._option && this._option.loadingText) ||
                  this._themeConfig.loadingText ||
                  n.loadingText),
                null != e.x && (o.x = e.x),
                null != e.y && (o.y = e.y),
                (e.effectOption = e.effectOption || {}),
                (e.effectOption.textStyle = o);
              var a = e.effect;
              return (
                ('string' == typeof a || null == a) &&
                  (a =
                    i[
                      e.effect ||
                        (this._option && this._option.loadingEffect) ||
                        this._themeConfig.loadingEffect ||
                        n.loadingEffect
                    ] || i.spin),
                this._zr.showLoading(new a(e.effectOption)),
                this
              );
            },
            hideLoading: function () {
              return this._zr.hideLoading(), this;
            },
            setTheme: function (e) {
              if (e) {
                if ('string' == typeof e)
                  switch (e) {
                    case 'macarons':
                      e = t('./theme/macarons');
                      break;
                    case 'infographic':
                      e = t('./theme/infographic');
                      break;
                    default:
                      e = {};
                  }
                else e = e || {};
                this._themeConfig = e;
              }
              if (!h) {
                var i = this._themeConfig.textStyle;
                i &&
                  i.fontFamily &&
                  i.fontFamily2 &&
                  (i.fontFamily = i.fontFamily2),
                  (i = n.textStyle),
                  (i.fontFamily = i.fontFamily2);
              }
              this._timeline && this._timeline.setTheme(!0),
                this._optionRestore && this.restore();
            },
            resize: function () {
              var t = this;
              return function () {
                if (
                  (t._clearEffect(),
                  t._zr.resize(),
                  t._option && t._option.renderAsImage && h)
                )
                  return t._render(t._option), t;
                t._zr.clearAnimation(),
                  t._island.resize(),
                  t._toolbox.resize(),
                  t._timeline && t._timeline.resize();
                for (var e = 0, i = t._chartList.length; i > e; e++)
                  t._chartList[e].resize && t._chartList[e].resize();
                return (
                  t.component.grid &&
                    t.component.grid.refixAxisShape(t.component),
                  t._zr.refresh(),
                  t._messageCenter.dispatch(n.EVENT.RESIZE, null, null, t),
                  t
                );
              };
            },
            _clearEffect: function () {
              this._zr.modLayer(n.EFFECT_ZLEVEL, { motionBlur: !1 }),
                this._zr.painter.clearLayer(n.EFFECT_ZLEVEL);
            },
            clear: function () {
              return (
                this._disposeChartList(),
                this._zr.clear(),
                (this._option = {}),
                (this._optionRestore = {}),
                (this.dom.style.backgroundColor = null),
                this
              );
            },
            dispose: function () {
              var t = this.dom.getAttribute(c);
              t && delete d[t],
                this._island.dispose(),
                this._toolbox.dispose(),
                this._timeline && this._timeline.dispose(),
                this._messageCenter.unbind(),
                this.clear(),
                this._zr.dispose(),
                (this._zr = null);
            },
          }),
          a
        );
      },
    ),
    i(
      'echarts/util/shape/Symbol',
      [
        'require',
        'zrender/shape/Base',
        'zrender/shape/Polygon',
        'zrender/tool/util',
        './normalIsCover',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('zrender/shape/Polygon'),
          n = new o({}),
          s = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: 'symbol',
            buildPath: function (t, e) {
              var i = e.pointList,
                o = i.length;
              if (0 !== o)
                for (
                  var n,
                    s,
                    r,
                    a,
                    h,
                    l = 1e4,
                    d = Math.ceil(o / l),
                    c = i[0] instanceof Array,
                    p = e.size ? e.size : 2,
                    u = p,
                    g = p / 2,
                    f = 2 * Math.PI,
                    m = 0;
                  d > m;
                  m++
                ) {
                  t.beginPath(), (n = m * l), (s = n + l), (s = s > o ? o : s);
                  for (var _ = n; s > _; _++)
                    if (
                      (e.random &&
                        ((r = e['randomMap' + (_ % 20)] / 100),
                        (u = p * r * r),
                        (g = u / 2)),
                      c
                        ? ((a = i[_][0]), (h = i[_][1]))
                        : ((a = i[_].x), (h = i[_].y)),
                      3 > u)
                    )
                      t.rect(a - g, h - g, u, u);
                    else
                      switch (e.iconType) {
                        case 'circle':
                          t.moveTo(a, h), t.arc(a, h, g, 0, f, !0);
                          break;
                        case 'diamond':
                          t.moveTo(a, h - g),
                            t.lineTo(a + g / 3, h - g / 3),
                            t.lineTo(a + g, h),
                            t.lineTo(a + g / 3, h + g / 3),
                            t.lineTo(a, h + g),
                            t.lineTo(a - g / 3, h + g / 3),
                            t.lineTo(a - g, h),
                            t.lineTo(a - g / 3, h - g / 3),
                            t.lineTo(a, h - g);
                          break;
                        default:
                          t.rect(a - g, h - g, u, u);
                      }
                  if ((t.closePath(), d - 1 > m))
                    switch (e.brushType) {
                      case 'both':
                        t.fill(), e.lineWidth > 0 && t.stroke();
                        break;
                      case 'stroke':
                        e.lineWidth > 0 && t.stroke();
                        break;
                      default:
                        t.fill();
                    }
                }
            },
            getRect: function (t) {
              return t.__rect || n.getRect(t);
            },
            isCover: t('./normalIsCover'),
          }),
          s.inherits(e, i),
          e
        );
      },
    ),
    i(
      'echarts/component/axis',
      [
        'require',
        './base',
        'zrender/shape/Line',
        '../config',
        '../util/ecData',
        'zrender/tool/util',
        'zrender/tool/color',
        './categoryAxis',
        './valueAxis',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s, r) {
          i.call(this, t, e, o, n, s),
            (this.axisType = r),
            (this._axisList = []),
            this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Line'),
          n = t('../config'),
          s = t('../util/ecData'),
          r = t('zrender/tool/util'),
          a = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: n.COMPONENT_TYPE_AXIS,
            axisBase: {
              _buildAxisLine: function () {
                var t = this.option.axisLine.lineStyle.width,
                  e = t / 2,
                  i = {
                    _axisShape: 'axisLine',
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 3,
                    hoverable: !1,
                  },
                  n = this.grid;
                switch (this.option.position) {
                  case 'left':
                    i.style = {
                      xStart: n.getX() - e,
                      yStart: n.getYend(),
                      xEnd: n.getX() - e,
                      yEnd: n.getY(),
                      lineCap: 'round',
                    };
                    break;
                  case 'right':
                    i.style = {
                      xStart: n.getXend() + e,
                      yStart: n.getYend(),
                      xEnd: n.getXend() + e,
                      yEnd: n.getY(),
                      lineCap: 'round',
                    };
                    break;
                  case 'bottom':
                    i.style = {
                      xStart: n.getX(),
                      yStart: n.getYend() + e,
                      xEnd: n.getXend(),
                      yEnd: n.getYend() + e,
                      lineCap: 'round',
                    };
                    break;
                  case 'top':
                    i.style = {
                      xStart: n.getX(),
                      yStart: n.getY() - e,
                      xEnd: n.getXend(),
                      yEnd: n.getY() - e,
                      lineCap: 'round',
                    };
                }
                var s = i.style;
                '' !== this.option.name &&
                  ((s.text = this.option.name),
                  (s.textPosition = this.option.nameLocation),
                  (s.textFont = this.getFont(this.option.nameTextStyle)),
                  this.option.nameTextStyle.align &&
                    (s.textAlign = this.option.nameTextStyle.align),
                  this.option.nameTextStyle.baseline &&
                    (s.textBaseline = this.option.nameTextStyle.baseline),
                  this.option.nameTextStyle.color &&
                    (s.textColor = this.option.nameTextStyle.color)),
                  (s.strokeColor = this.option.axisLine.lineStyle.color),
                  (s.lineWidth = t),
                  this.isHorizontal()
                    ? (s.yStart = s.yEnd = this.subPixelOptimize(s.yEnd, t))
                    : (s.xStart = s.xEnd = this.subPixelOptimize(s.xEnd, t)),
                  (s.lineType = this.option.axisLine.lineStyle.type),
                  (i = new o(i)),
                  this.shapeList.push(i);
              },
              _axisLabelClickable: function (t, e) {
                return t
                  ? (s.pack(e, void 0, -1, void 0, -1, e.style.text),
                    (e.hoverable = !0),
                    (e.clickable = !0),
                    (e.highlightStyle = {
                      color: a.lift(e.style.color, 1),
                      brushType: 'fill',
                    }),
                    e)
                  : e;
              },
              refixAxisShape: function (t, e) {
                if (this.option.axisLine.onZero) {
                  var i;
                  if (this.isHorizontal() && null != e)
                    for (var o = 0, n = this.shapeList.length; n > o; o++)
                      'axisLine' === this.shapeList[o]._axisShape
                        ? ((this.shapeList[o].style.yStart = this.shapeList[
                            o
                          ].style.yEnd =
                            this.subPixelOptimize(
                              e,
                              this.shapeList[o].stylelineWidth,
                            )),
                          this.zr.modShape(this.shapeList[o].id))
                        : 'axisTick' === this.shapeList[o]._axisShape &&
                          ((i =
                            this.shapeList[o].style.yEnd -
                            this.shapeList[o].style.yStart),
                          (this.shapeList[o].style.yStart = e - i),
                          (this.shapeList[o].style.yEnd = e),
                          this.zr.modShape(this.shapeList[o].id));
                  if (!this.isHorizontal() && null != t)
                    for (var o = 0, n = this.shapeList.length; n > o; o++)
                      'axisLine' === this.shapeList[o]._axisShape
                        ? ((this.shapeList[o].style.xStart = this.shapeList[
                            o
                          ].style.xEnd =
                            this.subPixelOptimize(
                              t,
                              this.shapeList[o].stylelineWidth,
                            )),
                          this.zr.modShape(this.shapeList[o].id))
                        : 'axisTick' === this.shapeList[o]._axisShape &&
                          ((i =
                            this.shapeList[o].style.xEnd -
                            this.shapeList[o].style.xStart),
                          (this.shapeList[o].style.xStart = t),
                          (this.shapeList[o].style.xEnd = t + i),
                          this.zr.modShape(this.shapeList[o].id));
                }
              },
              getPosition: function () {
                return this.option.position;
              },
              isHorizontal: function () {
                return (
                  'bottom' === this.option.position ||
                  'top' === this.option.position
                );
              },
            },
            reformOption: function (t) {
              if (
                (!t || (t instanceof Array && 0 === t.length)
                  ? (t = [{ type: n.COMPONENT_TYPE_AXIS_VALUE }])
                  : t instanceof Array || (t = [t]),
                t.length > 2 && (t = [t[0], t[1]]),
                'xAxis' === this.axisType)
              ) {
                (!t[0].position ||
                  ('bottom' != t[0].position && 'top' != t[0].position)) &&
                  (t[0].position = 'bottom'),
                  t.length > 1 &&
                    (t[1].position =
                      'bottom' === t[0].position ? 'top' : 'bottom');
                for (var e = 0, i = t.length; i > e; e++)
                  (t[e].type = t[e].type || 'category'),
                    (t[e].xAxisIndex = e),
                    (t[e].yAxisIndex = -1);
              } else {
                (!t[0].position ||
                  ('left' != t[0].position && 'right' != t[0].position)) &&
                  (t[0].position = 'left'),
                  t.length > 1 &&
                    (t[1].position =
                      'left' === t[0].position ? 'right' : 'left');
                for (var e = 0, i = t.length; i > e; e++)
                  (t[e].type = t[e].type || 'value'),
                    (t[e].xAxisIndex = -1),
                    (t[e].yAxisIndex = e);
              }
              return t;
            },
            refresh: function (e) {
              var i;
              e &&
                ((this.option = e),
                'xAxis' === this.axisType
                  ? ((this.option.xAxis = this.reformOption(e.xAxis)),
                    (i = this.option.xAxis))
                  : ((this.option.yAxis = this.reformOption(e.yAxis)),
                    (i = this.option.yAxis)),
                (this.series = e.series));
              for (
                var o = t('./categoryAxis'),
                  n = t('./valueAxis'),
                  s = Math.max((i && i.length) || 0, this._axisList.length),
                  r = 0;
                s > r;
                r++
              )
                !this._axisList[r] ||
                  !e ||
                  (i[r] && this._axisList[r].type == i[r].type) ||
                  (this._axisList[r].dispose && this._axisList[r].dispose(),
                  (this._axisList[r] = !1)),
                  this._axisList[r]
                    ? this._axisList[r].refresh &&
                      this._axisList[r].refresh(i ? i[r] : !1, this.series)
                    : i &&
                      i[r] &&
                      (this._axisList[r] =
                        'category' === i[r].type
                          ? new o(
                              this.ecTheme,
                              this.messageCenter,
                              this.zr,
                              i[r],
                              this.myChart,
                              this.axisBase,
                            )
                          : new n(
                              this.ecTheme,
                              this.messageCenter,
                              this.zr,
                              i[r],
                              this.myChart,
                              this.axisBase,
                              this.series,
                            ));
            },
            getAxis: function (t) {
              return this._axisList[t];
            },
            getAxisCount: function () {
              return this._axisList.length;
            },
            clear: function () {
              for (var t = 0, e = this._axisList.length; e > t; t++)
                this._axisList[t].dispose && this._axisList[t].dispose();
              this._axisList = [];
            },
          }),
          r.inherits(e, i),
          t('../component').define('axis', e),
          e
        );
      },
    ),
    i(
      'echarts/component/grid',
      [
        'require',
        './base',
        'zrender/shape/Rectangle',
        '../config',
        'zrender/tool/util',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s), this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Rectangle'),
          n = t('../config');
        n.grid = {
          zlevel: 0,
          z: 0,
          x: 80,
          y: 60,
          x2: 80,
          y2: 60,
          backgroundColor: 'rgba(0,0,0,0)',
          borderWidth: 1,
          borderColor: '#ccc',
        };
        var s = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: n.COMPONENT_TYPE_GRID,
            getX: function () {
              return this._x;
            },
            getY: function () {
              return this._y;
            },
            getWidth: function () {
              return this._width;
            },
            getHeight: function () {
              return this._height;
            },
            getXend: function () {
              return this._x + this._width;
            },
            getYend: function () {
              return this._y + this._height;
            },
            getArea: function () {
              return {
                x: this._x,
                y: this._y,
                width: this._width,
                height: this._height,
              };
            },
            getBbox: function () {
              return [
                [this._x, this._y],
                [this.getXend(), this.getYend()],
              ];
            },
            refixAxisShape: function (t) {
              for (
                var e,
                  i,
                  o,
                  s = t.xAxis._axisList.concat(
                    t.yAxis ? t.yAxis._axisList : [],
                  ),
                  r = s.length;
                r--;

              )
                (o = s[r]),
                  o.type == n.COMPONENT_TYPE_AXIS_VALUE &&
                    o._min < 0 &&
                    o._max >= 0 &&
                    (o.isHorizontal()
                      ? (e = o.getCoord(0))
                      : (i = o.getCoord(0)));
              if ('undefined' != typeof e || 'undefined' != typeof i)
                for (r = s.length; r--; ) s[r].refixAxisShape(e, i);
            },
            refresh: function (t) {
              if (
                t ||
                this._zrWidth != this.zr.getWidth() ||
                this._zrHeight != this.zr.getHeight()
              ) {
                this.clear(),
                  (this.option = t || this.option),
                  (this.option.grid = this.reformOption(this.option.grid));
                var e = this.option.grid;
                (this._zrWidth = this.zr.getWidth()),
                  (this._zrHeight = this.zr.getHeight()),
                  (this._x = this.parsePercent(e.x, this._zrWidth)),
                  (this._y = this.parsePercent(e.y, this._zrHeight));
                var i = this.parsePercent(e.x2, this._zrWidth),
                  n = this.parsePercent(e.y2, this._zrHeight);
                (this._width =
                  'undefined' == typeof e.width
                    ? this._zrWidth - this._x - i
                    : this.parsePercent(e.width, this._zrWidth)),
                  (this._width = this._width <= 0 ? 10 : this._width),
                  (this._height =
                    'undefined' == typeof e.height
                      ? this._zrHeight - this._y - n
                      : this.parsePercent(e.height, this._zrHeight)),
                  (this._height = this._height <= 0 ? 10 : this._height),
                  (this._x = this.subPixelOptimize(this._x, e.borderWidth)),
                  (this._y = this.subPixelOptimize(this._y, e.borderWidth)),
                  this.shapeList.push(
                    new o({
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        x: this._x,
                        y: this._y,
                        width: this._width,
                        height: this._height,
                        brushType: e.borderWidth > 0 ? 'both' : 'fill',
                        color: e.backgroundColor,
                        strokeColor: e.borderColor,
                        lineWidth: e.borderWidth,
                      },
                    }),
                  ),
                  this.zr.addShape(this.shapeList[0]);
              }
            },
          }),
          s.inherits(e, i),
          t('../component').define('grid', e),
          e
        );
      },
    ),
    i(
      'echarts/component/dataZoom',
      [
        'require',
        './base',
        'zrender/shape/Rectangle',
        'zrender/shape/Polygon',
        '../util/shape/Icon',
        '../config',
        '../util/date',
        'zrender/tool/util',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s);
          var r = this;
          (r._ondrift = function (t, e) {
            return r.__ondrift(this, t, e);
          }),
            (r._ondragend = function () {
              return r.__ondragend();
            }),
            (this._fillerSize = 30),
            (this._isSilence = !1),
            (this._zoom = {}),
            (this.option.dataZoom = this.reformOption(this.option.dataZoom)),
            (this.zoomOption = this.option.dataZoom),
            (this._handleSize = this.zoomOption.handleSize),
            this.myChart.canvasSupported || (this.zoomOption.realtime = !1),
            (this._location = this._getLocation()),
            (this._zoom = this._getZoom()),
            this._backupData(),
            this.option.dataZoom.show && this._buildShape(),
            this._syncData();
        }
        var i = t('./base'),
          o = t('zrender/shape/Rectangle'),
          n = t('zrender/shape/Polygon'),
          s = t('../util/shape/Icon'),
          r = t('../config');
        r.dataZoom = {
          zlevel: 0,
          z: 4,
          show: !1,
          orient: 'horizontal',
          backgroundColor: 'rgba(0,0,0,0)',
          dataBackgroundColor: '#eee',
          fillerColor: 'rgba(144,197,237,0.2)',
          handleColor: 'rgba(70,130,180,0.8)',
          handleSize: 8,
          showDetail: !0,
          realtime: !0,
        };
        var a = t('../util/date'),
          h = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: r.COMPONENT_TYPE_DATAZOOM,
            _buildShape: function () {
              this._buildBackground(),
                this._buildFiller(),
                this._buildHandle(),
                this._buildFrame();
              for (var t = 0, e = this.shapeList.length; e > t; t++)
                this.zr.addShape(this.shapeList[t]);
              this._syncFrameShape();
            },
            _getLocation: function () {
              var t,
                e,
                i,
                o,
                n = this.component.grid;
              return (
                'horizontal' == this.zoomOption.orient
                  ? ((i = this.zoomOption.width || n.getWidth()),
                    (o = this.zoomOption.height || this._fillerSize),
                    (t =
                      null != this.zoomOption.x ? this.zoomOption.x : n.getX()),
                    (e =
                      null != this.zoomOption.y
                        ? this.zoomOption.y
                        : this.zr.getHeight() - o - 2))
                  : ((i = this.zoomOption.width || this._fillerSize),
                    (o = this.zoomOption.height || n.getHeight()),
                    (t = null != this.zoomOption.x ? this.zoomOption.x : 2),
                    (e =
                      null != this.zoomOption.y
                        ? this.zoomOption.y
                        : n.getY())),
                { x: t, y: e, width: i, height: o }
              );
            },
            _getZoom: function () {
              var t = this.option.series,
                e = this.option.xAxis;
              !e || e instanceof Array || ((e = [e]), (this.option.xAxis = e));
              var i = this.option.yAxis;
              !i || i instanceof Array || ((i = [i]), (this.option.yAxis = i));
              var o,
                n,
                s = [],
                a = this.zoomOption.xAxisIndex;
              if (e && null == a) {
                o = [];
                for (var h = 0, l = e.length; l > h; h++)
                  ('category' == e[h].type || null == e[h].type) && o.push(h);
              } else o = a instanceof Array ? a : null != a ? [a] : [];
              if (((a = this.zoomOption.yAxisIndex), i && null == a)) {
                n = [];
                for (var h = 0, l = i.length; l > h; h++)
                  'category' == i[h].type && n.push(h);
              } else n = a instanceof Array ? a : null != a ? [a] : [];
              for (var d, h = 0, l = t.length; l > h; h++)
                if (
                  ((d = t[h]),
                  d.type == r.CHART_TYPE_LINE ||
                    d.type == r.CHART_TYPE_BAR ||
                    d.type == r.CHART_TYPE_SCATTER ||
                    d.type == r.CHART_TYPE_K)
                ) {
                  for (var c = 0, p = o.length; p > c; c++)
                    if (o[c] == (d.xAxisIndex || 0)) {
                      s.push(h);
                      break;
                    }
                  for (var c = 0, p = n.length; p > c; c++)
                    if (n[c] == (d.yAxisIndex || 0)) {
                      s.push(h);
                      break;
                    }
                  null == this.zoomOption.xAxisIndex &&
                    null == this.zoomOption.yAxisIndex &&
                    d.data &&
                    this.getDataFromOption(d.data[0]) instanceof Array &&
                    (d.type == r.CHART_TYPE_SCATTER ||
                      d.type == r.CHART_TYPE_LINE ||
                      d.type == r.CHART_TYPE_BAR) &&
                    s.push(h);
                }
              var u =
                  null != this._zoom.start
                    ? this._zoom.start
                    : null != this.zoomOption.start
                    ? this.zoomOption.start
                    : 0,
                g =
                  null != this._zoom.end
                    ? this._zoom.end
                    : null != this.zoomOption.end
                    ? this.zoomOption.end
                    : 100;
              u > g && ((u += g), (g = u - g), (u -= g));
              var f = Math.round(
                ((g - u) / 100) *
                  ('horizontal' == this.zoomOption.orient
                    ? this._location.width
                    : this._location.height),
              );
              return {
                start: u,
                end: g,
                start2: 0,
                end2: 100,
                size: f,
                xAxisIndex: o,
                yAxisIndex: n,
                seriesIndex: s,
                scatterMap: this._zoom.scatterMap || {},
              };
            },
            _backupData: function () {
              this._originalData = { xAxis: {}, yAxis: {}, series: {} };
              for (
                var t = this.option.xAxis,
                  e = this._zoom.xAxisIndex,
                  i = 0,
                  o = e.length;
                o > i;
                i++
              )
                this._originalData.xAxis[e[i]] = t[e[i]].data;
              for (
                var n = this.option.yAxis,
                  s = this._zoom.yAxisIndex,
                  i = 0,
                  o = s.length;
                o > i;
                i++
              )
                this._originalData.yAxis[s[i]] = n[s[i]].data;
              for (
                var a,
                  h = this.option.series,
                  l = this._zoom.seriesIndex,
                  i = 0,
                  o = l.length;
                o > i;
                i++
              )
                (a = h[l[i]]),
                  (this._originalData.series[l[i]] = a.data),
                  a.data &&
                    this.getDataFromOption(a.data[0]) instanceof Array &&
                    (a.type == r.CHART_TYPE_SCATTER ||
                      a.type == r.CHART_TYPE_LINE ||
                      a.type == r.CHART_TYPE_BAR) &&
                    (this._backupScale(), this._calculScatterMap(l[i]));
            },
            _calculScatterMap: function (e) {
              (this._zoom.scatterMap = this._zoom.scatterMap || {}),
                (this._zoom.scatterMap[e] = this._zoom.scatterMap[e] || {});
              var i = t('../component'),
                o = i.get('axis'),
                n = h.clone(this.option.xAxis);
              'category' == n[0].type && (n[0].type = 'value'),
                n[1] && 'category' == n[1].type && (n[1].type = 'value');
              var s = new o(
                  this.ecTheme,
                  null,
                  !1,
                  { xAxis: n, series: this.option.series },
                  this,
                  'xAxis',
                ),
                r = this.option.series[e].xAxisIndex || 0;
              (this._zoom.scatterMap[e].x = s.getAxis(r).getExtremum()),
                s.dispose(),
                (n = h.clone(this.option.yAxis)),
                'category' == n[0].type && (n[0].type = 'value'),
                n[1] && 'category' == n[1].type && (n[1].type = 'value'),
                (s = new o(
                  this.ecTheme,
                  null,
                  !1,
                  { yAxis: n, series: this.option.series },
                  this,
                  'yAxis',
                )),
                (r = this.option.series[e].yAxisIndex || 0),
                (this._zoom.scatterMap[e].y = s.getAxis(r).getExtremum()),
                s.dispose();
            },
            _buildBackground: function () {
              var t = this._location.width,
                e = this._location.height;
              this.shapeList.push(
                new o({
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  hoverable: !1,
                  style: {
                    x: this._location.x,
                    y: this._location.y,
                    width: t,
                    height: e,
                    color: this.zoomOption.backgroundColor,
                  },
                }),
              );
              for (
                var i = 0,
                  s = this._originalData.xAxis,
                  a = this._zoom.xAxisIndex,
                  h = 0,
                  l = a.length;
                l > h;
                h++
              )
                i = Math.max(i, s[a[h]].length);
              for (
                var d = this._originalData.yAxis,
                  c = this._zoom.yAxisIndex,
                  h = 0,
                  l = c.length;
                l > h;
                h++
              )
                i = Math.max(i, d[c[h]].length);
              for (
                var p,
                  u = this._zoom.seriesIndex[0],
                  g = this._originalData.series[u],
                  f = Number.MIN_VALUE,
                  m = Number.MAX_VALUE,
                  h = 0,
                  l = g.length;
                l > h;
                h++
              )
                (p = this.getDataFromOption(g[h], 0)),
                  this.option.series[u].type == r.CHART_TYPE_K && (p = p[1]),
                  isNaN(p) && (p = 0),
                  (f = Math.max(f, p)),
                  (m = Math.min(m, p));
              var _ = f - m,
                y = [],
                x = t / (i - (i > 1 ? 1 : 0)),
                v = e / (i - (i > 1 ? 1 : 0)),
                b = 1;
              'horizontal' == this.zoomOption.orient && 1 > x
                ? (b = Math.floor((3 * i) / t))
                : 'vertical' == this.zoomOption.orient &&
                  1 > v &&
                  (b = Math.floor((3 * i) / e));
              for (var h = 0, l = i; l > h; h += b)
                (p = this.getDataFromOption(g[h], 0)),
                  this.option.series[u].type == r.CHART_TYPE_K && (p = p[1]),
                  isNaN(p) && (p = 0),
                  y.push(
                    'horizontal' == this.zoomOption.orient
                      ? [
                          this._location.x + x * h,
                          this._location.y +
                            e -
                            1 -
                            Math.round(((p - m) / _) * (e - 10)),
                        ]
                      : [
                          this._location.x +
                            1 +
                            Math.round(((p - m) / _) * (t - 10)),
                          this._location.y + v * (l - h - 1),
                        ],
                  );
              'horizontal' == this.zoomOption.orient
                ? (y.push([this._location.x + t, this._location.y + e]),
                  y.push([this._location.x, this._location.y + e]))
                : (y.push([this._location.x, this._location.y]),
                  y.push([this._location.x, this._location.y + e])),
                this.shapeList.push(
                  new n({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                      pointList: y,
                      color: this.zoomOption.dataBackgroundColor,
                    },
                    hoverable: !1,
                  }),
                );
            },
            _buildFiller: function () {
              (this._fillerShae = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                draggable: !0,
                ondrift: this._ondrift,
                ondragend: this._ondragend,
                _type: 'filler',
              }),
                (this._fillerShae.style =
                  'horizontal' == this.zoomOption.orient
                    ? {
                        x:
                          this._location.x +
                          Math.round(
                            (this._zoom.start / 100) * this._location.width,
                          ) +
                          this._handleSize,
                        y: this._location.y,
                        width: this._zoom.size - 2 * this._handleSize,
                        height: this._location.height,
                        color: this.zoomOption.fillerColor,
                        text: ':::',
                        textPosition: 'inside',
                      }
                    : {
                        x: this._location.x,
                        y:
                          this._location.y +
                          Math.round(
                            (this._zoom.start / 100) * this._location.height,
                          ) +
                          this._handleSize,
                        width: this._location.width,
                        height: this._zoom.size - 2 * this._handleSize,
                        color: this.zoomOption.fillerColor,
                        text: '::',
                        textPosition: 'inside',
                      }),
                (this._fillerShae.highlightStyle = {
                  brushType: 'fill',
                  color: 'rgba(0,0,0,0)',
                }),
                (this._fillerShae = new o(this._fillerShae)),
                this.shapeList.push(this._fillerShae);
            },
            _buildHandle: function () {
              var t = this.zoomOption.showDetail
                ? this._getDetail()
                : { start: '', end: '' };
              (this._startShape = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                draggable: !0,
                style: {
                  iconType: 'rectangle',
                  x: this._location.x,
                  y: this._location.y,
                  width: this._handleSize,
                  height: this._handleSize,
                  color: this.zoomOption.handleColor,
                  text: '=',
                  textPosition: 'inside',
                },
                highlightStyle: {
                  text: t.start,
                  brushType: 'fill',
                  textPosition: 'left',
                },
                ondrift: this._ondrift,
                ondragend: this._ondragend,
              }),
                'horizontal' == this.zoomOption.orient
                  ? ((this._startShape.style.height = this._location.height),
                    (this._endShape = h.clone(this._startShape)),
                    (this._startShape.style.x =
                      this._fillerShae.style.x - this._handleSize),
                    (this._endShape.style.x =
                      this._fillerShae.style.x + this._fillerShae.style.width),
                    (this._endShape.highlightStyle.text = t.end),
                    (this._endShape.highlightStyle.textPosition = 'right'))
                  : ((this._startShape.style.width = this._location.width),
                    (this._endShape = h.clone(this._startShape)),
                    (this._startShape.style.y =
                      this._fillerShae.style.y + this._fillerShae.style.height),
                    (this._startShape.highlightStyle.textPosition = 'bottom'),
                    (this._endShape.style.y =
                      this._fillerShae.style.y - this._handleSize),
                    (this._endShape.highlightStyle.text = t.end),
                    (this._endShape.highlightStyle.textPosition = 'top')),
                (this._startShape = new s(this._startShape)),
                (this._endShape = new s(this._endShape)),
                this.shapeList.push(this._startShape),
                this.shapeList.push(this._endShape);
            },
            _buildFrame: function () {
              var t = this.subPixelOptimize(this._location.x, 1),
                e = this.subPixelOptimize(this._location.y, 1);
              (this._startFrameShape = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                hoverable: !1,
                style: {
                  x: t,
                  y: e,
                  width: this._location.width - (t > this._location.x ? 1 : 0),
                  height:
                    this._location.height - (e > this._location.y ? 1 : 0),
                  lineWidth: 1,
                  brushType: 'stroke',
                  strokeColor: this.zoomOption.handleColor,
                },
              }),
                (this._endFrameShape = h.clone(this._startFrameShape)),
                (this._startFrameShape = new o(this._startFrameShape)),
                (this._endFrameShape = new o(this._endFrameShape)),
                this.shapeList.push(this._startFrameShape),
                this.shapeList.push(this._endFrameShape);
            },
            _syncHandleShape: function () {
              'horizontal' == this.zoomOption.orient
                ? ((this._startShape.style.x =
                    this._fillerShae.style.x - this._handleSize),
                  (this._endShape.style.x =
                    this._fillerShae.style.x + this._fillerShae.style.width),
                  (this._zoom.start =
                    ((this._startShape.style.x - this._location.x) /
                      this._location.width) *
                    100),
                  (this._zoom.end =
                    ((this._endShape.style.x +
                      this._handleSize -
                      this._location.x) /
                      this._location.width) *
                    100))
                : ((this._startShape.style.y =
                    this._fillerShae.style.y + this._fillerShae.style.height),
                  (this._endShape.style.y =
                    this._fillerShae.style.y - this._handleSize),
                  (this._zoom.start =
                    ((this._location.y +
                      this._location.height -
                      this._startShape.style.y) /
                      this._location.height) *
                    100),
                  (this._zoom.end =
                    ((this._location.y +
                      this._location.height -
                      this._endShape.style.y -
                      this._handleSize) /
                      this._location.height) *
                    100)),
                this.zr.modShape(this._startShape.id),
                this.zr.modShape(this._endShape.id),
                this._syncFrameShape(),
                this.zr.refreshNextFrame();
            },
            _syncFillerShape: function () {
              var t, e;
              'horizontal' == this.zoomOption.orient
                ? ((t = this._startShape.style.x),
                  (e = this._endShape.style.x),
                  (this._fillerShae.style.x =
                    Math.min(t, e) + this._handleSize),
                  (this._fillerShae.style.width =
                    Math.abs(t - e) - this._handleSize),
                  (this._zoom.start =
                    ((Math.min(t, e) - this._location.x) /
                      this._location.width) *
                    100),
                  (this._zoom.end =
                    ((Math.max(t, e) + this._handleSize - this._location.x) /
                      this._location.width) *
                    100))
                : ((t = this._startShape.style.y),
                  (e = this._endShape.style.y),
                  (this._fillerShae.style.y =
                    Math.min(t, e) + this._handleSize),
                  (this._fillerShae.style.height =
                    Math.abs(t - e) - this._handleSize),
                  (this._zoom.start =
                    ((this._location.y +
                      this._location.height -
                      Math.max(t, e)) /
                      this._location.height) *
                    100),
                  (this._zoom.end =
                    ((this._location.y +
                      this._location.height -
                      Math.min(t, e) -
                      this._handleSize) /
                      this._location.height) *
                    100)),
                this.zr.modShape(this._fillerShae.id),
                this._syncFrameShape(),
                this.zr.refreshNextFrame();
            },
            _syncFrameShape: function () {
              'horizontal' == this.zoomOption.orient
                ? ((this._startFrameShape.style.width =
                    this._fillerShae.style.x - this._location.x),
                  (this._endFrameShape.style.x =
                    this._fillerShae.style.x + this._fillerShae.style.width),
                  (this._endFrameShape.style.width =
                    this._location.x +
                    this._location.width -
                    this._endFrameShape.style.x))
                : ((this._startFrameShape.style.y =
                    this._fillerShae.style.y + this._fillerShae.style.height),
                  (this._startFrameShape.style.height =
                    this._location.y +
                    this._location.height -
                    this._startFrameShape.style.y),
                  (this._endFrameShape.style.height =
                    this._fillerShae.style.y - this._location.y)),
                this.zr.modShape(this._startFrameShape.id),
                this.zr.modShape(this._endFrameShape.id);
            },
            _syncShape: function () {
              this.zoomOption.show &&
                ('horizontal' == this.zoomOption.orient
                  ? ((this._startShape.style.x =
                      this._location.x +
                      (this._zoom.start / 100) * this._location.width),
                    (this._endShape.style.x =
                      this._location.x +
                      (this._zoom.end / 100) * this._location.width -
                      this._handleSize),
                    (this._fillerShae.style.x =
                      this._startShape.style.x + this._handleSize),
                    (this._fillerShae.style.width =
                      this._endShape.style.x -
                      this._startShape.style.x -
                      this._handleSize))
                  : ((this._startShape.style.y =
                      this._location.y +
                      this._location.height -
                      (this._zoom.start / 100) * this._location.height),
                    (this._endShape.style.y =
                      this._location.y +
                      this._location.height -
                      (this._zoom.end / 100) * this._location.height -
                      this._handleSize),
                    (this._fillerShae.style.y =
                      this._endShape.style.y + this._handleSize),
                    (this._fillerShae.style.height =
                      this._startShape.style.y -
                      this._endShape.style.y -
                      this._handleSize)),
                this.zr.modShape(this._startShape.id),
                this.zr.modShape(this._endShape.id),
                this.zr.modShape(this._fillerShae.id),
                this._syncFrameShape(),
                this.zr.refresh());
            },
            _syncData: function (t) {
              var e, i, o, n, s;
              for (var a in this._originalData) {
                e = this._originalData[a];
                for (var h in e)
                  (s = e[h]),
                    null != s &&
                      ((n = s.length),
                      (i = Math.floor((this._zoom.start / 100) * n)),
                      (o = Math.ceil((this._zoom.end / 100) * n)),
                      this.getDataFromOption(s[0]) instanceof Array &&
                      this.option[a][h].type != r.CHART_TYPE_K
                        ? (this._setScale(),
                          (this.option[a][h].data = this._synScatterData(h, s)))
                        : (this.option[a][h].data = s.slice(i, o)));
              }
              this._isSilence ||
                (!this.zoomOption.realtime && !t) ||
                this.messageCenter.dispatch(
                  r.EVENT.DATA_ZOOM,
                  null,
                  { zoom: this._zoom },
                  this.myChart,
                );
            },
            _synScatterData: function (t, e) {
              if (
                0 === this._zoom.start &&
                100 == this._zoom.end &&
                0 === this._zoom.start2 &&
                100 == this._zoom.end2
              )
                return e;
              var i,
                o,
                n,
                s,
                r,
                a = [],
                h = this._zoom.scatterMap[t];
              'horizontal' == this.zoomOption.orient
                ? ((i = h.x.max - h.x.min),
                  (o = (this._zoom.start / 100) * i + h.x.min),
                  (n = (this._zoom.end / 100) * i + h.x.min),
                  (i = h.y.max - h.y.min),
                  (s = (this._zoom.start2 / 100) * i + h.y.min),
                  (r = (this._zoom.end2 / 100) * i + h.y.min))
                : ((i = h.x.max - h.x.min),
                  (o = (this._zoom.start2 / 100) * i + h.x.min),
                  (n = (this._zoom.end2 / 100) * i + h.x.min),
                  (i = h.y.max - h.y.min),
                  (s = (this._zoom.start / 100) * i + h.y.min),
                  (r = (this._zoom.end / 100) * i + h.y.min));
              var l;
              (l = h.x.dataMappingMethods) &&
                ((o = l.coord2Value(o)), (n = l.coord2Value(n))),
                (l = h.y.dataMappingMethods) &&
                  ((s = l.coord2Value(s)), (r = l.coord2Value(r)));
              for (var d, c = 0, p = e.length; p > c; c++)
                (d = e[c].value || e[c]),
                  d[0] >= o &&
                    d[0] <= n &&
                    d[1] >= s &&
                    d[1] <= r &&
                    a.push(e[c]);
              return a;
            },
            _setScale: function () {
              var t =
                  0 !== this._zoom.start ||
                  100 !== this._zoom.end ||
                  0 !== this._zoom.start2 ||
                  100 !== this._zoom.end2,
                e = { xAxis: this.option.xAxis, yAxis: this.option.yAxis };
              for (var i in e)
                for (var o = 0, n = e[i].length; n > o; o++)
                  e[i][o].scale = t || e[i][o]._scale;
            },
            _backupScale: function () {
              var t = { xAxis: this.option.xAxis, yAxis: this.option.yAxis };
              for (var e in t)
                for (var i = 0, o = t[e].length; o > i; i++)
                  t[e][i]._scale = t[e][i].scale;
            },
            _getDetail: function () {
              for (
                var t = ['xAxis', 'yAxis'], e = 0, i = t.length;
                i > e;
                e++
              ) {
                var o = this._originalData[t[e]];
                for (var n in o) {
                  var s = o[n];
                  if (null != s) {
                    var r = s.length,
                      h = Math.floor((this._zoom.start / 100) * r),
                      l = Math.ceil((this._zoom.end / 100) * r);
                    return (
                      (l -= l > 0 ? 1 : 0),
                      {
                        start: this.getDataFromOption(s[h]),
                        end: this.getDataFromOption(s[l]),
                      }
                    );
                  }
                }
              }
              t = 'horizontal' == this.zoomOption.orient ? 'xAxis' : 'yAxis';
              var d = this._zoom.seriesIndex[0],
                c = this.option.series[d][t + 'Index'] || 0,
                p = this.option[t][c].type,
                u = this._zoom.scatterMap[d][t.charAt(0)].min,
                g = this._zoom.scatterMap[d][t.charAt(0)].max,
                f = g - u;
              if ('value' == p)
                return {
                  start: u + (f * this._zoom.start) / 100,
                  end: u + (f * this._zoom.end) / 100,
                };
              if ('time' == p) {
                (g = u + (f * this._zoom.end) / 100),
                  (u += (f * this._zoom.start) / 100);
                var m = a.getAutoFormatter(u, g).formatter;
                return { start: a.format(m, u), end: a.format(m, g) };
              }
              return { start: '', end: '' };
            },
            __ondrift: function (t, e, i) {
              this.zoomOption.zoomLock && (t = this._fillerShae);
              var o = 'filler' == t._type ? this._handleSize : 0;
              if (
                ('horizontal' == this.zoomOption.orient
                  ? t.style.x + e - o <= this._location.x
                    ? (t.style.x = this._location.x + o)
                    : t.style.x + e + t.style.width + o >=
                      this._location.x + this._location.width
                    ? (t.style.x =
                        this._location.x +
                        this._location.width -
                        t.style.width -
                        o)
                    : (t.style.x += e)
                  : t.style.y + i - o <= this._location.y
                  ? (t.style.y = this._location.y + o)
                  : t.style.y + i + t.style.height + o >=
                    this._location.y + this._location.height
                  ? (t.style.y =
                      this._location.y +
                      this._location.height -
                      t.style.height -
                      o)
                  : (t.style.y += i),
                'filler' == t._type
                  ? this._syncHandleShape()
                  : this._syncFillerShape(),
                this.zoomOption.realtime && this._syncData(),
                this.zoomOption.showDetail)
              ) {
                var n = this._getDetail();
                (this._startShape.style.text =
                  this._startShape.highlightStyle.text =
                    n.start),
                  (this._endShape.style.text =
                    this._endShape.highlightStyle.text =
                      n.end),
                  (this._startShape.style.textPosition =
                    this._startShape.highlightStyle.textPosition),
                  (this._endShape.style.textPosition =
                    this._endShape.highlightStyle.textPosition);
              }
              return !0;
            },
            __ondragend: function () {
              this.zoomOption.showDetail &&
                ((this._startShape.style.text = this._endShape.style.text =
                  '='),
                (this._startShape.style.textPosition =
                  this._endShape.style.textPosition =
                    'inside'),
                this.zr.modShape(this._startShape.id),
                this.zr.modShape(this._endShape.id),
                this.zr.refreshNextFrame()),
                (this.isDragend = !0);
            },
            ondragend: function (t, e) {
              this.isDragend &&
                t.target &&
                (!this.zoomOption.realtime && this._syncData(),
                (e.dragOut = !0),
                (e.dragIn = !0),
                this._isSilence ||
                  this.zoomOption.realtime ||
                  this.messageCenter.dispatch(
                    r.EVENT.DATA_ZOOM,
                    null,
                    { zoom: this._zoom },
                    this.myChart,
                  ),
                (e.needRefresh = !1),
                (this.isDragend = !1));
            },
            ondataZoom: function (t, e) {
              e.needRefresh = !0;
            },
            absoluteZoom: function (t) {
              (this._zoom.start = t.start),
                (this._zoom.end = t.end),
                (this._zoom.start2 = t.start2),
                (this._zoom.end2 = t.end2),
                this._syncShape(),
                this._syncData(!0);
            },
            rectZoom: function (t) {
              if (!t)
                return (
                  (this._zoom.start = this._zoom.start2 = 0),
                  (this._zoom.end = this._zoom.end2 = 100),
                  this._syncShape(),
                  this._syncData(!0),
                  this._zoom
                );
              var e = this.component.grid.getArea(),
                i = { x: t.x, y: t.y, width: t.width, height: t.height };
              if (
                (i.width < 0 && ((i.x += i.width), (i.width = -i.width)),
                i.height < 0 && ((i.y += i.height), (i.height = -i.height)),
                i.x > e.x + e.width || i.y > e.y + e.height)
              )
                return !1;
              i.x < e.x && (i.x = e.x),
                i.x + i.width > e.x + e.width &&
                  (i.width = e.x + e.width - i.x),
                i.y + i.height > e.y + e.height &&
                  (i.height = e.y + e.height - i.y);
              var o,
                n = (i.x - e.x) / e.width,
                s = 1 - (i.x + i.width - e.x) / e.width,
                r = 1 - (i.y + i.height - e.y) / e.height,
                a = (i.y - e.y) / e.height;
              return (
                'horizontal' == this.zoomOption.orient
                  ? ((o = this._zoom.end - this._zoom.start),
                    (this._zoom.start += o * n),
                    (this._zoom.end -= o * s),
                    (o = this._zoom.end2 - this._zoom.start2),
                    (this._zoom.start2 += o * r),
                    (this._zoom.end2 -= o * a))
                  : ((o = this._zoom.end - this._zoom.start),
                    (this._zoom.start += o * r),
                    (this._zoom.end -= o * a),
                    (o = this._zoom.end2 - this._zoom.start2),
                    (this._zoom.start2 += o * n),
                    (this._zoom.end2 -= o * s)),
                this._syncShape(),
                this._syncData(!0),
                this._zoom
              );
            },
            syncBackupData: function (t) {
              for (
                var e,
                  i,
                  o = this._originalData.series,
                  n = t.series,
                  s = 0,
                  r = n.length;
                r > s;
                s++
              ) {
                (i = n[s].data || n[s].eventList),
                  (e = o[s]
                    ? Math.floor((this._zoom.start / 100) * o[s].length)
                    : 0);
                for (var a = 0, h = i.length; h > a; a++)
                  o[s] && (o[s][a + e] = i[a]);
              }
            },
            syncOption: function (t) {
              this.silence(!0),
                (this.option = t),
                (this.option.dataZoom = this.reformOption(
                  this.option.dataZoom,
                )),
                (this.zoomOption = this.option.dataZoom),
                this.myChart.canvasSupported || (this.zoomOption.realtime = !1),
                this.clear(),
                (this._location = this._getLocation()),
                (this._zoom = this._getZoom()),
                this._backupData(),
                this.option.dataZoom &&
                  this.option.dataZoom.show &&
                  this._buildShape(),
                this._syncData(),
                this.silence(!1);
            },
            silence: function (t) {
              this._isSilence = t;
            },
            getRealDataIndex: function (t, e) {
              if (
                !this._originalData ||
                (0 === this._zoom.start && 100 == this._zoom.end)
              )
                return e;
              var i = this._originalData.series;
              return i[t]
                ? Math.floor((this._zoom.start / 100) * i[t].length) + e
                : -1;
            },
            resize: function () {
              this.clear(),
                (this._location = this._getLocation()),
                (this._zoom = this._getZoom()),
                this.option.dataZoom.show && this._buildShape();
            },
          }),
          h.inherits(e, i),
          t('../component').define('dataZoom', e),
          e
        );
      },
    ),
    i('echarts/config', [], function () {
      var t = {
        CHART_TYPE_LINE: 'line',
        CHART_TYPE_BAR: 'bar',
        CHART_TYPE_SCATTER: 'scatter',
        CHART_TYPE_PIE: 'pie',
        CHART_TYPE_RADAR: 'radar',
        CHART_TYPE_VENN: 'venn',
        CHART_TYPE_TREEMAP: 'treemap',
        CHART_TYPE_TREE: 'tree',
        CHART_TYPE_MAP: 'map',
        CHART_TYPE_K: 'k',
        CHART_TYPE_ISLAND: 'island',
        CHART_TYPE_FORCE: 'force',
        CHART_TYPE_CHORD: 'chord',
        CHART_TYPE_GAUGE: 'gauge',
        CHART_TYPE_FUNNEL: 'funnel',
        CHART_TYPE_EVENTRIVER: 'eventRiver',
        CHART_TYPE_WORDCLOUD: 'wordCloud',
        CHART_TYPE_HEATMAP: 'heatmap',
        COMPONENT_TYPE_TITLE: 'title',
        COMPONENT_TYPE_LEGEND: 'legend',
        COMPONENT_TYPE_DATARANGE: 'dataRange',
        COMPONENT_TYPE_DATAVIEW: 'dataView',
        COMPONENT_TYPE_DATAZOOM: 'dataZoom',
        COMPONENT_TYPE_TOOLBOX: 'toolbox',
        COMPONENT_TYPE_TOOLTIP: 'tooltip',
        COMPONENT_TYPE_GRID: 'grid',
        COMPONENT_TYPE_AXIS: 'axis',
        COMPONENT_TYPE_POLAR: 'polar',
        COMPONENT_TYPE_X_AXIS: 'xAxis',
        COMPONENT_TYPE_Y_AXIS: 'yAxis',
        COMPONENT_TYPE_AXIS_CATEGORY: 'categoryAxis',
        COMPONENT_TYPE_AXIS_VALUE: 'valueAxis',
        COMPONENT_TYPE_TIMELINE: 'timeline',
        COMPONENT_TYPE_ROAMCONTROLLER: 'roamController',
        backgroundColor: 'rgba(0,0,0,0)',
        color: [
          '#ff7f50',
          '#87cefa',
          '#da70d6',
          '#32cd32',
          '#6495ed',
          '#ff69b4',
          '#ba55d3',
          '#cd5c5c',
          '#ffa500',
          '#40e0d0',
          '#1e90ff',
          '#ff6347',
          '#7b68ee',
          '#00fa9a',
          '#ffd700',
          '#6699FF',
          '#ff6666',
          '#3cb371',
          '#b8860b',
          '#30e0e0',
        ],
        markPoint: {
          clickable: !0,
          symbol: 'pin',
          symbolSize: 10,
          large: !1,
          effect: {
            show: !1,
            loop: !0,
            period: 15,
            type: 'scale',
            scaleSize: 2,
            bounceDistance: 10,
          },
          itemStyle: {
            normal: { borderWidth: 2, label: { show: !0, position: 'inside' } },
            emphasis: { label: { show: !0 } },
          },
        },
        markLine: {
          clickable: !0,
          symbol: ['circle', 'arrow'],
          symbolSize: [2, 4],
          smoothness: 0.2,
          precision: 2,
          effect: { show: !1, loop: !0, period: 15, scaleSize: 2 },
          bundling: { enable: !1, maxTurningAngle: 45 },
          itemStyle: {
            normal: {
              borderWidth: 1.5,
              label: { show: !0, position: 'end' },
              lineStyle: { type: 'dashed' },
            },
            emphasis: { label: { show: !1 }, lineStyle: {} },
          },
        },
        textStyle: {
          decoration: 'none',
          fontFamily: 'Arial, Verdana, sans-serif',
          fontFamily2: '微软雅黑',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
        EVENT: {
          REFRESH: 'refresh',
          RESTORE: 'restore',
          RESIZE: 'resize',
          CLICK: 'click',
          DBLCLICK: 'dblclick',
          HOVER: 'hover',
          MOUSEOUT: 'mouseout',
          DATA_CHANGED: 'dataChanged',
          DATA_ZOOM: 'dataZoom',
          DATA_RANGE: 'dataRange',
          DATA_RANGE_SELECTED: 'dataRangeSelected',
          DATA_RANGE_HOVERLINK: 'dataRangeHoverLink',
          LEGEND_SELECTED: 'legendSelected',
          LEGEND_HOVERLINK: 'legendHoverLink',
          MAP_SELECTED: 'mapSelected',
          PIE_SELECTED: 'pieSelected',
          MAGIC_TYPE_CHANGED: 'magicTypeChanged',
          DATA_VIEW_CHANGED: 'dataViewChanged',
          TIMELINE_CHANGED: 'timelineChanged',
          MAP_ROAM: 'mapRoam',
          FORCE_LAYOUT_END: 'forceLayoutEnd',
          TOOLTIP_HOVER: 'tooltipHover',
          TOOLTIP_IN_GRID: 'tooltipInGrid',
          TOOLTIP_OUT_GRID: 'tooltipOutGrid',
          ROAMCONTROLLER: 'roamController',
        },
        DRAG_ENABLE_TIME: 120,
        EFFECT_ZLEVEL: 10,
        effectBlendAlpha: 0.95,
        symbolList: [
          'circle',
          'rectangle',
          'triangle',
          'diamond',
          'emptyCircle',
          'emptyRectangle',
          'emptyTriangle',
          'emptyDiamond',
        ],
        loadingEffect: 'spin',
        loadingText: '数据读取中...',
        noDataEffect: 'bubble',
        noDataText: '暂无数据',
        calculable: !1,
        calculableColor: 'rgba(255,165,0,0.6)',
        calculableHolderColor: '#ccc',
        nameConnector: ' & ',
        valueConnector: ': ',
        animation: !0,
        addDataAnimation: !0,
        animationThreshold: 2e3,
        animationDuration: 2e3,
        animationDurationUpdate: 500,
        animationEasing: 'ExponentialOut',
      };
      return t;
    }),
    i(
      'echarts/component/dataRange',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Rectangle',
        '../util/shape/HandlePolygon',
        '../config',
        'zrender/tool/util',
        'zrender/tool/event',
        'zrender/tool/area',
        'zrender/tool/color',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s);
          var a = this;
          (a._ondrift = function (t, e) {
            return a.__ondrift(this, t, e);
          }),
            (a._ondragend = function () {
              return a.__ondragend();
            }),
            (a._dataRangeSelected = function (t) {
              return a.__dataRangeSelected(t);
            }),
            (a._dispatchHoverLink = function (t) {
              return a.__dispatchHoverLink(t);
            }),
            (a._onhoverlink = function (t) {
              return a.__onhoverlink(t);
            }),
            (this._selectedMap = {}),
            (this._range = {}),
            this.refresh(n),
            e.bind(r.EVENT.HOVER, this._onhoverlink);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Rectangle'),
          s = t('../util/shape/HandlePolygon'),
          r = t('../config');
        r.dataRange = {
          zlevel: 0,
          z: 4,
          show: !0,
          orient: 'vertical',
          x: 'left',
          y: 'bottom',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 14,
          precision: 0,
          splitNumber: 5,
          splitList: null,
          calculable: !1,
          selectedMode: !0,
          hoverLink: !0,
          realtime: !0,
          color: ['#006edd', '#e0ffff'],
          textStyle: { color: '#333' },
        };
        var a = t('zrender/tool/util'),
          h = t('zrender/tool/event'),
          l = t('zrender/tool/area'),
          d = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: r.COMPONENT_TYPE_DATARANGE,
            _textGap: 10,
            _buildShape: function () {
              if (
                ((this._itemGroupLocation = this._getItemGroupLocation()),
                this._buildBackground(),
                this._isContinuity()
                  ? this._buildGradient()
                  : this._buildItem(),
                this.dataRangeOption.show)
              )
                for (var t = 0, e = this.shapeList.length; e > t; t++)
                  this.zr.addShape(this.shapeList[t]);
              this._syncShapeFromRange();
            },
            _buildItem: function () {
              var t,
                e,
                i,
                s,
                r = this._valueTextList,
                a = r.length,
                h = this.getFont(this.dataRangeOption.textStyle),
                d = this._itemGroupLocation.x,
                c = this._itemGroupLocation.y,
                p = this.dataRangeOption.itemWidth,
                u = this.dataRangeOption.itemHeight,
                g = this.dataRangeOption.itemGap,
                f = l.getTextHeight('国', h);
              'vertical' == this.dataRangeOption.orient &&
                'right' == this.dataRangeOption.x &&
                (d =
                  this._itemGroupLocation.x +
                  this._itemGroupLocation.width -
                  p);
              var m = !0;
              this.dataRangeOption.text &&
                ((m = !1),
                this.dataRangeOption.text[0] &&
                  ((i = this._getTextShape(d, c, this.dataRangeOption.text[0])),
                  'horizontal' == this.dataRangeOption.orient
                    ? (d +=
                        l.getTextWidth(this.dataRangeOption.text[0], h) +
                        this._textGap)
                    : ((c += f + this._textGap),
                      (i.style.y += f / 2 + this._textGap),
                      (i.style.textBaseline = 'bottom')),
                  this.shapeList.push(new o(i))));
              for (var _ = 0; a > _; _++)
                (t = r[_]),
                  (s = this.getColorByIndex(_)),
                  (e = this._getItemShape(
                    d,
                    c,
                    p,
                    u,
                    this._selectedMap[_] ? s : '#ccc',
                  )),
                  (e._idx = _),
                  (e.onmousemove = this._dispatchHoverLink),
                  this.dataRangeOption.selectedMode &&
                    ((e.clickable = !0), (e.onclick = this._dataRangeSelected)),
                  this.shapeList.push(new n(e)),
                  m &&
                    ((i = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      style: {
                        x: d + p + 5,
                        y: c,
                        color: this._selectedMap[_]
                          ? this.dataRangeOption.textStyle.color
                          : '#ccc',
                        text: r[_],
                        textFont: h,
                        textBaseline: 'top',
                      },
                      highlightStyle: { brushType: 'fill' },
                    }),
                    'vertical' == this.dataRangeOption.orient &&
                      'right' == this.dataRangeOption.x &&
                      ((i.style.x -= p + 10), (i.style.textAlign = 'right')),
                    (i._idx = _),
                    (i.onmousemove = this._dispatchHoverLink),
                    this.dataRangeOption.selectedMode &&
                      ((i.clickable = !0),
                      (i.onclick = this._dataRangeSelected)),
                    this.shapeList.push(new o(i))),
                  'horizontal' == this.dataRangeOption.orient
                    ? (d +=
                        p + (m ? 5 : 0) + (m ? l.getTextWidth(t, h) : 0) + g)
                    : (c += u + g);
              !m &&
                this.dataRangeOption.text[1] &&
                ('horizontal' == this.dataRangeOption.orient
                  ? (d = d - g + this._textGap)
                  : (c = c - g + this._textGap),
                (i = this._getTextShape(d, c, this.dataRangeOption.text[1])),
                'horizontal' != this.dataRangeOption.orient &&
                  ((i.style.y -= 5), (i.style.textBaseline = 'top')),
                this.shapeList.push(new o(i)));
            },
            _buildGradient: function () {
              var e,
                i,
                s = this.getFont(this.dataRangeOption.textStyle),
                r = this._itemGroupLocation.x,
                a = this._itemGroupLocation.y,
                h = this.dataRangeOption.itemWidth,
                d = this.dataRangeOption.itemHeight,
                c = l.getTextHeight('国', s),
                p = 10,
                u = !0;
              this.dataRangeOption.text &&
                ((u = !1),
                this.dataRangeOption.text[0] &&
                  ((i = this._getTextShape(r, a, this.dataRangeOption.text[0])),
                  'horizontal' == this.dataRangeOption.orient
                    ? (r +=
                        l.getTextWidth(this.dataRangeOption.text[0], s) +
                        this._textGap)
                    : ((a += c + this._textGap),
                      (i.style.y += c / 2 + this._textGap),
                      (i.style.textBaseline = 'bottom')),
                  this.shapeList.push(new o(i))));
              for (
                var g = t('zrender/tool/color'),
                  f = 1 / (this.dataRangeOption.color.length - 1),
                  m = [],
                  _ = 0,
                  y = this.dataRangeOption.color.length;
                y > _;
                _++
              )
                m.push([_ * f, this.dataRangeOption.color[_]]);
              'horizontal' == this.dataRangeOption.orient
                ? ((e = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                      x: r,
                      y: a,
                      width: h * p,
                      height: d,
                      color: g.getLinearGradient(r, a, r + h * p, a, m),
                    },
                    hoverable: !1,
                  }),
                  (r += h * p + this._textGap))
                : ((e = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                      x: r,
                      y: a,
                      width: h,
                      height: d * p,
                      color: g.getLinearGradient(r, a, r, a + d * p, m),
                    },
                    hoverable: !1,
                  }),
                  (a += d * p + this._textGap)),
                this.shapeList.push(new n(e)),
                (this._calculableLocation = e.style),
                this.dataRangeOption.calculable &&
                  (this._buildFiller(), this._bulidMask(), this._bulidHandle()),
                this._buildIndicator(),
                !u &&
                  this.dataRangeOption.text[1] &&
                  ((i = this._getTextShape(r, a, this.dataRangeOption.text[1])),
                  this.shapeList.push(new o(i)));
            },
            _buildIndicator: function () {
              var t,
                e,
                i = this._calculableLocation.x,
                o = this._calculableLocation.y,
                n = this._calculableLocation.width,
                r = this._calculableLocation.height,
                a = 5;
              'horizontal' == this.dataRangeOption.orient
                ? 'bottom' != this.dataRangeOption.y
                  ? ((t = [
                      [i, o + r],
                      [i - a, o + r + a],
                      [i + a, o + r + a],
                    ]),
                    (e = 'bottom'))
                  : ((t = [
                      [i, o],
                      [i - a, o - a],
                      [i + a, o - a],
                    ]),
                    (e = 'top'))
                : 'right' != this.dataRangeOption.x
                ? ((t = [
                    [i + n, o],
                    [i + n + a, o - a],
                    [i + n + a, o + a],
                  ]),
                  (e = 'right'))
                : ((t = [
                    [i, o],
                    [i - a, o - a],
                    [i - a, o + a],
                  ]),
                  (e = 'left')),
                (this._indicatorShape = {
                  style: {
                    pointList: t,
                    color: '#fff',
                    __rect: {
                      x: Math.min(t[0][0], t[1][0]),
                      y: Math.min(t[0][1], t[1][1]),
                      width:
                        a *
                        ('horizontal' == this.dataRangeOption.orient ? 2 : 1),
                      height:
                        a *
                        ('horizontal' == this.dataRangeOption.orient ? 1 : 2),
                    },
                  },
                  highlightStyle: {
                    brushType: 'fill',
                    textPosition: e,
                    textColor: this.dataRangeOption.textStyle.color,
                  },
                  hoverable: !1,
                }),
                (this._indicatorShape = new s(this._indicatorShape));
            },
            _buildFiller: function () {
              (this._fillerShape = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase() + 1,
                style: {
                  x: this._calculableLocation.x,
                  y: this._calculableLocation.y,
                  width: this._calculableLocation.width,
                  height: this._calculableLocation.height,
                  color: 'rgba(255,255,255,0)',
                },
                highlightStyle: {
                  strokeColor: 'rgba(255,255,255,0.5)',
                  lineWidth: 1,
                },
                draggable: !0,
                ondrift: this._ondrift,
                ondragend: this._ondragend,
                onmousemove: this._dispatchHoverLink,
                _type: 'filler',
              }),
                (this._fillerShape = new n(this._fillerShape)),
                this.shapeList.push(this._fillerShape);
            },
            _bulidHandle: function () {
              var t,
                e,
                i,
                o,
                n,
                r,
                a,
                h,
                d = this._calculableLocation.x,
                c = this._calculableLocation.y,
                p = this._calculableLocation.width,
                u = this._calculableLocation.height,
                g = this.getFont(this.dataRangeOption.textStyle),
                f = l.getTextHeight('国', g),
                m =
                  Math.max(
                    l.getTextWidth(
                      this._textFormat(this.dataRangeOption.max),
                      g,
                    ),
                    l.getTextWidth(
                      this._textFormat(this.dataRangeOption.min),
                      g,
                    ),
                  ) + 2;
              'horizontal' == this.dataRangeOption.orient
                ? 'bottom' != this.dataRangeOption.y
                  ? ((t = [
                      [d, c],
                      [d, c + u + f],
                      [d - f, c + u + f],
                      [d - 1, c + u],
                      [d - 1, c],
                    ]),
                    (e = d - m / 2 - f),
                    (i = c + u + f / 2 + 2),
                    (o = { x: d - m - f, y: c + u, width: m + f, height: f }),
                    (n = [
                      [d + p, c],
                      [d + p, c + u + f],
                      [d + p + f, c + u + f],
                      [d + p + 1, c + u],
                      [d + p + 1, c],
                    ]),
                    (r = d + p + m / 2 + f),
                    (a = i),
                    (h = { x: d + p, y: c + u, width: m + f, height: f }))
                  : ((t = [
                      [d, c + u],
                      [d, c - f],
                      [d - f, c - f],
                      [d - 1, c],
                      [d - 1, c + u],
                    ]),
                    (e = d - m / 2 - f),
                    (i = c - f / 2 - 2),
                    (o = { x: d - m - f, y: c - f, width: m + f, height: f }),
                    (n = [
                      [d + p, c + u],
                      [d + p, c - f],
                      [d + p + f, c - f],
                      [d + p + 1, c],
                      [d + p + 1, c + u],
                    ]),
                    (r = d + p + m / 2 + f),
                    (a = i),
                    (h = { x: d + p, y: c - f, width: m + f, height: f }))
                : ((m += f),
                  'right' != this.dataRangeOption.x
                    ? ((t = [
                        [d, c],
                        [d + p + f, c],
                        [d + p + f, c - f],
                        [d + p, c - 1],
                        [d, c - 1],
                      ]),
                      (e = d + p + m / 2 + f / 2),
                      (i = c - f / 2),
                      (o = { x: d + p, y: c - f, width: m + f, height: f }),
                      (n = [
                        [d, c + u],
                        [d + p + f, c + u],
                        [d + p + f, c + f + u],
                        [d + p, c + 1 + u],
                        [d, c + u + 1],
                      ]),
                      (r = e),
                      (a = c + u + f / 2),
                      (h = { x: d + p, y: c + u, width: m + f, height: f }))
                    : ((t = [
                        [d + p, c],
                        [d - f, c],
                        [d - f, c - f],
                        [d, c - 1],
                        [d + p, c - 1],
                      ]),
                      (e = d - m / 2 - f / 2),
                      (i = c - f / 2),
                      (o = { x: d - m - f, y: c - f, width: m + f, height: f }),
                      (n = [
                        [d + p, c + u],
                        [d - f, c + u],
                        [d - f, c + f + u],
                        [d, c + 1 + u],
                        [d + p, c + u + 1],
                      ]),
                      (r = e),
                      (a = c + u + f / 2),
                      (h = {
                        x: d - m - f,
                        y: c + u,
                        width: m + f,
                        height: f,
                      }))),
                (this._startShape = {
                  style: {
                    pointList: t,
                    text: this._textFormat(this.dataRangeOption.max),
                    textX: e,
                    textY: i,
                    textFont: g,
                    color: this.getColor(this.dataRangeOption.max),
                    rect: o,
                    x: t[0][0],
                    y: t[0][1],
                    _x: t[0][0],
                    _y: t[0][1],
                  },
                }),
                (this._startShape.highlightStyle = {
                  strokeColor: this._startShape.style.color,
                  lineWidth: 1,
                }),
                (this._endShape = {
                  style: {
                    pointList: n,
                    text: this._textFormat(this.dataRangeOption.min),
                    textX: r,
                    textY: a,
                    textFont: g,
                    color: this.getColor(this.dataRangeOption.min),
                    rect: h,
                    x: n[0][0],
                    y: n[0][1],
                    _x: n[0][0],
                    _y: n[0][1],
                  },
                }),
                (this._endShape.highlightStyle = {
                  strokeColor: this._endShape.style.color,
                  lineWidth: 1,
                }),
                (this._startShape.zlevel = this._endShape.zlevel =
                  this.getZlevelBase()),
                (this._startShape.z = this._endShape.z = this.getZBase() + 1),
                (this._startShape.draggable = this._endShape.draggable = !0),
                (this._startShape.ondrift = this._endShape.ondrift =
                  this._ondrift),
                (this._startShape.ondragend = this._endShape.ondragend =
                  this._ondragend),
                (this._startShape.style.textColor =
                  this._endShape.style.textColor =
                    this.dataRangeOption.textStyle.color),
                (this._startShape.style.textAlign =
                  this._endShape.style.textAlign =
                    'center'),
                (this._startShape.style.textPosition =
                  this._endShape.style.textPosition =
                    'specific'),
                (this._startShape.style.textBaseline =
                  this._endShape.style.textBaseline =
                    'middle'),
                (this._startShape.style.width = this._endShape.style.width = 0),
                (this._startShape.style.height = this._endShape.style.height =
                  0),
                (this._startShape.style.textPosition =
                  this._endShape.style.textPosition =
                    'specific'),
                (this._startShape = new s(this._startShape)),
                (this._endShape = new s(this._endShape)),
                this.shapeList.push(this._startShape),
                this.shapeList.push(this._endShape);
            },
            _bulidMask: function () {
              var t = this._calculableLocation.x,
                e = this._calculableLocation.y,
                i = this._calculableLocation.width,
                o = this._calculableLocation.height;
              (this._startMask = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase() + 1,
                style: {
                  x: t,
                  y: e,
                  width: 'horizontal' == this.dataRangeOption.orient ? 0 : i,
                  height: 'horizontal' == this.dataRangeOption.orient ? o : 0,
                  color: '#ccc',
                },
                hoverable: !1,
              }),
                (this._endMask = {
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase() + 1,
                  style: {
                    x: 'horizontal' == this.dataRangeOption.orient ? t + i : t,
                    y: 'horizontal' == this.dataRangeOption.orient ? e : e + o,
                    width: 'horizontal' == this.dataRangeOption.orient ? 0 : i,
                    height: 'horizontal' == this.dataRangeOption.orient ? o : 0,
                    color: '#ccc',
                  },
                  hoverable: !1,
                }),
                (this._startMask = new n(this._startMask)),
                (this._endMask = new n(this._endMask)),
                this.shapeList.push(this._startMask),
                this.shapeList.push(this._endMask);
            },
            _buildBackground: function () {
              var t = this.reformCssArray(this.dataRangeOption.padding);
              this.shapeList.push(
                new n({
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  hoverable: !1,
                  style: {
                    x: this._itemGroupLocation.x - t[3],
                    y: this._itemGroupLocation.y - t[0],
                    width: this._itemGroupLocation.width + t[3] + t[1],
                    height: this._itemGroupLocation.height + t[0] + t[2],
                    brushType:
                      0 === this.dataRangeOption.borderWidth ? 'fill' : 'both',
                    color: this.dataRangeOption.backgroundColor,
                    strokeColor: this.dataRangeOption.borderColor,
                    lineWidth: this.dataRangeOption.borderWidth,
                  },
                }),
              );
            },
            _getItemGroupLocation: function () {
              var t = this._valueTextList,
                e = t.length,
                i = this.dataRangeOption.itemGap,
                o = this.dataRangeOption.itemWidth,
                n = this.dataRangeOption.itemHeight,
                s = 0,
                r = 0,
                a = this.getFont(this.dataRangeOption.textStyle),
                h = l.getTextHeight('国', a),
                d = 10;
              if ('horizontal' == this.dataRangeOption.orient) {
                if (this.dataRangeOption.text || this._isContinuity())
                  s =
                    (this._isContinuity() ? o * d + i : e * (o + i)) +
                    (this.dataRangeOption.text &&
                    'undefined' != typeof this.dataRangeOption.text[0]
                      ? l.getTextWidth(this.dataRangeOption.text[0], a) +
                        this._textGap
                      : 0) +
                    (this.dataRangeOption.text &&
                    'undefined' != typeof this.dataRangeOption.text[1]
                      ? l.getTextWidth(this.dataRangeOption.text[1], a) +
                        this._textGap
                      : 0);
                else {
                  o += 5;
                  for (var c = 0; e > c; c++)
                    s += o + l.getTextWidth(t[c], a) + i;
                }
                (s -= i), (r = Math.max(h, n));
              } else {
                var p;
                if (this.dataRangeOption.text || this._isContinuity())
                  (r =
                    (this._isContinuity() ? n * d + i : e * (n + i)) +
                    (this.dataRangeOption.text &&
                    'undefined' != typeof this.dataRangeOption.text[0]
                      ? this._textGap + h
                      : 0) +
                    (this.dataRangeOption.text &&
                    'undefined' != typeof this.dataRangeOption.text[1]
                      ? this._textGap + h
                      : 0)),
                    (p = Math.max(
                      l.getTextWidth(
                        (this.dataRangeOption.text &&
                          this.dataRangeOption.text[0]) ||
                          '',
                        a,
                      ),
                      l.getTextWidth(
                        (this.dataRangeOption.text &&
                          this.dataRangeOption.text[1]) ||
                          '',
                        a,
                      ),
                    )),
                    (s = Math.max(o, p));
                else {
                  (r = (n + i) * e), (o += 5), (p = 0);
                  for (var c = 0; e > c; c++)
                    p = Math.max(p, l.getTextWidth(t[c], a));
                  s = o + p;
                }
                r -= i;
              }
              var u,
                g = this.reformCssArray(this.dataRangeOption.padding),
                f = this.zr.getWidth();
              switch (this.dataRangeOption.x) {
                case 'center':
                  u = Math.floor((f - s) / 2);
                  break;
                case 'left':
                  u = g[3] + this.dataRangeOption.borderWidth;
                  break;
                case 'right':
                  u = f - s - g[1] - this.dataRangeOption.borderWidth;
                  break;
                default:
                  (u = this.parsePercent(this.dataRangeOption.x, f)),
                    (u = isNaN(u) ? 0 : u);
              }
              var m,
                _ = this.zr.getHeight();
              switch (this.dataRangeOption.y) {
                case 'top':
                  m = g[0] + this.dataRangeOption.borderWidth;
                  break;
                case 'bottom':
                  m = _ - r - g[2] - this.dataRangeOption.borderWidth;
                  break;
                case 'center':
                  m = Math.floor((_ - r) / 2);
                  break;
                default:
                  (m = this.parsePercent(this.dataRangeOption.y, _)),
                    (m = isNaN(m) ? 0 : m);
              }
              if (this.dataRangeOption.calculable) {
                var y =
                  Math.max(
                    l.getTextWidth(this.dataRangeOption.max, a),
                    l.getTextWidth(this.dataRangeOption.min, a),
                  ) + h;
                'horizontal' == this.dataRangeOption.orient
                  ? (y > u && (u = y), u + s + y > f && (u -= y))
                  : (h > m && (m = h), m + r + h > _ && (m -= h));
              }
              return { x: u, y: m, width: s, height: r };
            },
            _getTextShape: function (t, e, i) {
              return {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                style: {
                  x:
                    'horizontal' == this.dataRangeOption.orient
                      ? t
                      : this._itemGroupLocation.x +
                        this._itemGroupLocation.width / 2,
                  y:
                    'horizontal' == this.dataRangeOption.orient
                      ? this._itemGroupLocation.y +
                        this._itemGroupLocation.height / 2
                      : e,
                  color: this.dataRangeOption.textStyle.color,
                  text: i,
                  textFont: this.getFont(this.dataRangeOption.textStyle),
                  textBaseline:
                    'horizontal' == this.dataRangeOption.orient
                      ? 'middle'
                      : 'top',
                  textAlign:
                    'horizontal' == this.dataRangeOption.orient
                      ? 'left'
                      : 'center',
                },
                hoverable: !1,
              };
            },
            _getItemShape: function (t, e, i, o, n) {
              return {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                style: { x: t, y: e + 1, width: i, height: o - 2, color: n },
                highlightStyle: { strokeColor: n, lineWidth: 1 },
              };
            },
            __ondrift: function (t, e, i) {
              var o = this._calculableLocation.x,
                n = this._calculableLocation.y,
                s = this._calculableLocation.width,
                r = this._calculableLocation.height;
              return (
                'horizontal' == this.dataRangeOption.orient
                  ? t.style.x + e <= o
                    ? (t.style.x = o)
                    : t.style.x + e + t.style.width >= o + s
                    ? (t.style.x = o + s - t.style.width)
                    : (t.style.x += e)
                  : t.style.y + i <= n
                  ? (t.style.y = n)
                  : t.style.y + i + t.style.height >= n + r
                  ? (t.style.y = n + r - t.style.height)
                  : (t.style.y += i),
                'filler' == t._type
                  ? this._syncHandleShape()
                  : this._syncFillerShape(t),
                this.dataRangeOption.realtime && this._dispatchDataRange(),
                !0
              );
            },
            __ondragend: function () {
              this.isDragend = !0;
            },
            ondragend: function (t, e) {
              this.isDragend &&
                t.target &&
                ((e.dragOut = !0),
                (e.dragIn = !0),
                this.dataRangeOption.realtime || this._dispatchDataRange(),
                (e.needRefresh = !1),
                (this.isDragend = !1));
            },
            _syncShapeFromRange: function () {
              var t = this.dataRangeOption.range || {},
                e = t.start,
                i = t.end;
              if (
                (e > i && (e = [i, (i = e)][0]),
                (this._range.end =
                  null != e
                    ? e
                    : null != this._range.end
                    ? this._range.end
                    : 0),
                (this._range.start =
                  null != i
                    ? i
                    : null != this._range.start
                    ? this._range.start
                    : 100),
                100 != this._range.start || 0 !== this._range.end)
              ) {
                if ('horizontal' == this.dataRangeOption.orient) {
                  var o = this._fillerShape.style.width;
                  (this._fillerShape.style.x +=
                    (o * (100 - this._range.start)) / 100),
                    (this._fillerShape.style.width =
                      (o * (this._range.start - this._range.end)) / 100);
                } else {
                  var n = this._fillerShape.style.height;
                  (this._fillerShape.style.y +=
                    (n * (100 - this._range.start)) / 100),
                    (this._fillerShape.style.height =
                      (n * (this._range.start - this._range.end)) / 100);
                }
                this.zr.modShape(this._fillerShape.id), this._syncHandleShape();
              }
            },
            _syncHandleShape: function () {
              var t = this._calculableLocation.x,
                e = this._calculableLocation.y,
                i = this._calculableLocation.width,
                o = this._calculableLocation.height;
              'horizontal' == this.dataRangeOption.orient
                ? ((this._startShape.style.x = this._fillerShape.style.x),
                  (this._startMask.style.width = this._startShape.style.x - t),
                  (this._endShape.style.x =
                    this._fillerShape.style.x + this._fillerShape.style.width),
                  (this._endMask.style.x = this._endShape.style.x),
                  (this._endMask.style.width = t + i - this._endShape.style.x),
                  (this._range.start = Math.ceil(
                    100 - ((this._startShape.style.x - t) / i) * 100,
                  )),
                  (this._range.end = Math.floor(
                    100 - ((this._endShape.style.x - t) / i) * 100,
                  )))
                : ((this._startShape.style.y = this._fillerShape.style.y),
                  (this._startMask.style.height = this._startShape.style.y - e),
                  (this._endShape.style.y =
                    this._fillerShape.style.y + this._fillerShape.style.height),
                  (this._endMask.style.y = this._endShape.style.y),
                  (this._endMask.style.height = e + o - this._endShape.style.y),
                  (this._range.start = Math.ceil(
                    100 - ((this._startShape.style.y - e) / o) * 100,
                  )),
                  (this._range.end = Math.floor(
                    100 - ((this._endShape.style.y - e) / o) * 100,
                  ))),
                this._syncShape();
            },
            _syncFillerShape: function (t) {
              var e,
                i,
                o = this._calculableLocation.x,
                n = this._calculableLocation.y,
                s = this._calculableLocation.width,
                r = this._calculableLocation.height;
              'horizontal' == this.dataRangeOption.orient
                ? ((e = this._startShape.style.x),
                  (i = this._endShape.style.x),
                  t.id == this._startShape.id && e >= i
                    ? ((i = e), (this._endShape.style.x = e))
                    : t.id == this._endShape.id &&
                      e >= i &&
                      ((e = i), (this._startShape.style.x = e)),
                  (this._fillerShape.style.x = e),
                  (this._fillerShape.style.width = i - e),
                  (this._startMask.style.width = e - o),
                  (this._endMask.style.x = i),
                  (this._endMask.style.width = o + s - i),
                  (this._range.start = Math.ceil(100 - ((e - o) / s) * 100)),
                  (this._range.end = Math.floor(100 - ((i - o) / s) * 100)))
                : ((e = this._startShape.style.y),
                  (i = this._endShape.style.y),
                  t.id == this._startShape.id && e >= i
                    ? ((i = e), (this._endShape.style.y = e))
                    : t.id == this._endShape.id &&
                      e >= i &&
                      ((e = i), (this._startShape.style.y = e)),
                  (this._fillerShape.style.y = e),
                  (this._fillerShape.style.height = i - e),
                  (this._startMask.style.height = e - n),
                  (this._endMask.style.y = i),
                  (this._endMask.style.height = n + r - i),
                  (this._range.start = Math.ceil(100 - ((e - n) / r) * 100)),
                  (this._range.end = Math.floor(100 - ((i - n) / r) * 100))),
                this._syncShape();
            },
            _syncShape: function () {
              (this._startShape.position = [
                this._startShape.style.x - this._startShape.style._x,
                this._startShape.style.y - this._startShape.style._y,
              ]),
                (this._startShape.style.text = this._textFormat(
                  this._gap * this._range.start + this.dataRangeOption.min,
                )),
                (this._startShape.style.color =
                  this._startShape.highlightStyle.strokeColor =
                    this.getColor(
                      this._gap * this._range.start + this.dataRangeOption.min,
                    )),
                (this._endShape.position = [
                  this._endShape.style.x - this._endShape.style._x,
                  this._endShape.style.y - this._endShape.style._y,
                ]),
                (this._endShape.style.text = this._textFormat(
                  this._gap * this._range.end + this.dataRangeOption.min,
                )),
                (this._endShape.style.color =
                  this._endShape.highlightStyle.strokeColor =
                    this.getColor(
                      this._gap * this._range.end + this.dataRangeOption.min,
                    )),
                this.zr.modShape(this._startShape.id),
                this.zr.modShape(this._endShape.id),
                this.zr.modShape(this._startMask.id),
                this.zr.modShape(this._endMask.id),
                this.zr.modShape(this._fillerShape.id),
                this.zr.refreshNextFrame();
            },
            _dispatchDataRange: function () {
              this.messageCenter.dispatch(
                r.EVENT.DATA_RANGE,
                null,
                { range: { start: this._range.end, end: this._range.start } },
                this.myChart,
              );
            },
            __dataRangeSelected: function (t) {
              if ('single' === this.dataRangeOption.selectedMode)
                for (var e in this._selectedMap) this._selectedMap[e] = !1;
              var i = t.target._idx;
              this._selectedMap[i] = !this._selectedMap[i];
              var o, n;
              this._useCustomizedSplit()
                ? ((o = this._splitList[i].max), (n = this._splitList[i].min))
                : ((o =
                    (this._colorList.length - i) * this._gap +
                    this.dataRangeOption.min),
                  (n = o - this._gap)),
                this.messageCenter.dispatch(
                  r.EVENT.DATA_RANGE_SELECTED,
                  t.event,
                  {
                    selected: this._selectedMap,
                    target: i,
                    valueMax: o,
                    valueMin: n,
                  },
                  this.myChart,
                ),
                this.messageCenter.dispatch(
                  r.EVENT.REFRESH,
                  null,
                  null,
                  this.myChart,
                );
            },
            __dispatchHoverLink: function (t) {
              var e, i;
              if (this.dataRangeOption.calculable) {
                var o,
                  n = this.dataRangeOption.max - this.dataRangeOption.min;
                (o =
                  'horizontal' == this.dataRangeOption.orient
                    ? (1 -
                        (h.getX(t.event) - this._calculableLocation.x) /
                          this._calculableLocation.width) *
                      n
                    : (1 -
                        (h.getY(t.event) - this._calculableLocation.y) /
                          this._calculableLocation.height) *
                      n),
                  (e = o - 0.05 * n),
                  (i = o + 0.05 * n);
              } else if (this._useCustomizedSplit()) {
                var s = t.target._idx;
                (i = this._splitList[s].max), (e = this._splitList[s].min);
              } else {
                var s = t.target._idx;
                (i =
                  (this._colorList.length - s) * this._gap +
                  this.dataRangeOption.min),
                  (e = i - this._gap);
              }
              this.messageCenter.dispatch(
                r.EVENT.DATA_RANGE_HOVERLINK,
                t.event,
                { valueMin: e, valueMax: i },
                this.myChart,
              );
            },
            __onhoverlink: function (t) {
              if (
                this.dataRangeOption.show &&
                this.dataRangeOption.hoverLink &&
                this._indicatorShape &&
                t &&
                null != t.seriesIndex &&
                null != t.dataIndex
              ) {
                var e = t.value;
                if ('' === e || isNaN(e)) return;
                e < this.dataRangeOption.min
                  ? (e = this.dataRangeOption.min)
                  : e > this.dataRangeOption.max &&
                    (e = this.dataRangeOption.max),
                  (this._indicatorShape.position =
                    'horizontal' == this.dataRangeOption.orient
                      ? [
                          ((this.dataRangeOption.max - e) /
                            (this.dataRangeOption.max -
                              this.dataRangeOption.min)) *
                            this._calculableLocation.width,
                          0,
                        ]
                      : [
                          0,
                          ((this.dataRangeOption.max - e) /
                            (this.dataRangeOption.max -
                              this.dataRangeOption.min)) *
                            this._calculableLocation.height,
                        ]),
                  (this._indicatorShape.style.text = this._textFormat(t.value)),
                  (this._indicatorShape.style.color = this.getColor(e)),
                  this.zr.addHoverShape(this._indicatorShape);
              }
            },
            _textFormat: function (t, e) {
              var i = this.dataRangeOption;
              if (
                (t !== -Number.MAX_VALUE && (t = (+t).toFixed(i.precision)),
                null != e &&
                  e !== Number.MAX_VALUE &&
                  (e = (+e).toFixed(i.precision)),
                i.formatter)
              ) {
                if ('string' == typeof i.formatter)
                  return i.formatter
                    .replace('{value}', t === -Number.MAX_VALUE ? 'min' : t)
                    .replace('{value2}', e === Number.MAX_VALUE ? 'max' : e);
                if ('function' == typeof i.formatter)
                  return i.formatter.call(this.myChart, t, e);
              }
              return null == e
                ? t
                : t === -Number.MAX_VALUE
                ? '< ' + e
                : e === Number.MAX_VALUE
                ? '> ' + t
                : t + ' - ' + e;
            },
            _isContinuity: function () {
              var t = this.dataRangeOption;
              return (
                !(t.splitList ? t.splitList.length > 0 : t.splitNumber > 0) ||
                t.calculable
              );
            },
            _useCustomizedSplit: function () {
              var t = this.dataRangeOption;
              return t.splitList && t.splitList.length > 0;
            },
            _buildColorList: function (t) {
              if (
                ((this._colorList = d.getGradientColors(
                  this.dataRangeOption.color,
                  Math.max(
                    (t - this.dataRangeOption.color.length) /
                      (this.dataRangeOption.color.length - 1),
                    0,
                  ) + 1,
                )),
                this._colorList.length > t)
              ) {
                for (
                  var e = this._colorList.length,
                    i = [this._colorList[0]],
                    o = e / (t - 1),
                    n = 1;
                  t - 1 > n;
                  n++
                )
                  i.push(this._colorList[Math.floor(n * o)]);
                i.push(this._colorList[e - 1]), (this._colorList = i);
              }
              if (this._useCustomizedSplit())
                for (var s = this._splitList, n = 0, e = s.length; e > n; n++)
                  s[n].color && (this._colorList[n] = s[n].color);
            },
            _buildGap: function (t) {
              if (!this._useCustomizedSplit()) {
                var e = this.dataRangeOption.precision;
                for (
                  this._gap =
                    (this.dataRangeOption.max - this.dataRangeOption.min) / t;
                  this._gap.toFixed(e) - 0 != this._gap && 5 > e;

                )
                  e++;
                (this.dataRangeOption.precision = e),
                  (this._gap =
                    (
                      (this.dataRangeOption.max - this.dataRangeOption.min) /
                      t
                    ).toFixed(e) - 0);
              }
            },
            _buildDataList: function (t) {
              for (
                var e = (this._valueTextList = []),
                  i = this.dataRangeOption,
                  o = this._useCustomizedSplit(),
                  n = 0;
                t > n;
                n++
              ) {
                this._selectedMap[n] = !0;
                var s = '';
                if (o) {
                  var r = this._splitList[t - 1 - n];
                  s =
                    null != r.label
                      ? r.label
                      : null != r.single
                      ? this._textFormat(r.single)
                      : this._textFormat(r.min, r.max);
                } else
                  s = this._textFormat(
                    n * this._gap + i.min,
                    (n + 1) * this._gap + i.min,
                  );
                e.unshift(s);
              }
            },
            _buildSplitList: function () {
              if (this._useCustomizedSplit())
                for (
                  var t = this.dataRangeOption.splitList,
                    e = (this._splitList = []),
                    i = 0,
                    o = t.length;
                  o > i;
                  i++
                ) {
                  var n = t[i];
                  if (!n || (null == n.start && null == n.end))
                    throw new Error('Empty item exists in splitList!');
                  var s = { label: n.label, color: n.color };
                  (s.min = n.start),
                    (s.max = n.end),
                    s.min > s.max && (s.min = [s.max, (s.max = s.min)][0]),
                    s.min === s.max && (s.single = s.max),
                    null == s.min && (s.min = -Number.MAX_VALUE),
                    null == s.max && (s.max = Number.MAX_VALUE),
                    e.push(s);
                }
            },
            refresh: function (t) {
              if (t) {
                (this.option = t),
                  (this.option.dataRange = this.reformOption(
                    this.option.dataRange,
                  ));
                var e = (this.dataRangeOption = this.option.dataRange);
                if (
                  !this._useCustomizedSplit() &&
                  (null == e.min || null == e.max)
                )
                  throw new Error(
                    'option.dataRange.min or option.dataRange.max has not been defined.',
                  );
                this.myChart.canvasSupported || (e.realtime = !1);
                var i = this._isContinuity()
                  ? 100
                  : this._useCustomizedSplit()
                  ? e.splitList.length
                  : e.splitNumber;
                this._buildSplitList(),
                  this._buildColorList(i),
                  this._buildGap(i),
                  this._buildDataList(i);
              }
              this.clear(), this._buildShape();
            },
            getColor: function (t) {
              if (isNaN(t)) return null;
              var e;
              if (this._useCustomizedSplit()) {
                for (var i = this._splitList, o = 0, n = i.length; n > o; o++)
                  if (i[o].min <= t && i[o].max >= t) {
                    e = o;
                    break;
                  }
              } else {
                if (this.dataRangeOption.min == this.dataRangeOption.max)
                  return this._colorList[0];
                if (
                  (t < this.dataRangeOption.min
                    ? (t = this.dataRangeOption.min)
                    : t > this.dataRangeOption.max &&
                      (t = this.dataRangeOption.max),
                  this.dataRangeOption.calculable &&
                    (t -
                      (this._gap * this._range.start +
                        this.dataRangeOption.min) >
                      5e-5 ||
                      t -
                        (this._gap * this._range.end +
                          this.dataRangeOption.min) <
                        -5e-5))
                )
                  return null;
                (e =
                  this._colorList.length -
                  Math.ceil(
                    ((t - this.dataRangeOption.min) /
                      (this.dataRangeOption.max - this.dataRangeOption.min)) *
                      this._colorList.length,
                  )),
                  e == this._colorList.length && e--;
              }
              return this._selectedMap[e] ? this._colorList[e] : null;
            },
            getColorByIndex: function (t) {
              return (
                t >= this._colorList.length
                  ? (t = this._colorList.length - 1)
                  : 0 > t && (t = 0),
                this._colorList[t]
              );
            },
            onbeforDispose: function () {
              this.messageCenter.unbind(r.EVENT.HOVER, this._onhoverlink);
            },
          }),
          a.inherits(e, i),
          t('../component').define('dataRange', e),
          e
        );
      },
    ),
    i('zrender/tool/util', ['require', '../dep/excanvas'], function (t) {
      function e(t) {
        return t && 1 === t.nodeType && 'string' == typeof t.nodeName;
      }
      function i(t) {
        if ('object' == typeof t && null !== t) {
          var o = t;
          if (t instanceof Array) {
            o = [];
            for (var n = 0, s = t.length; s > n; n++) o[n] = i(t[n]);
          } else if (!_[y.call(t)] && !e(t)) {
            o = {};
            for (var r in t) t.hasOwnProperty(r) && (o[r] = i(t[r]));
          }
          return o;
        }
        return t;
      }
      function o(t, i, o, s) {
        if (i.hasOwnProperty(o)) {
          var r = t[o];
          'object' != typeof r || _[y.call(r)] || e(r)
            ? (!s && o in t) || (t[o] = i[o])
            : n(t[o], i[o], s);
        }
      }
      function n(t, e, i) {
        for (var n in e) o(t, e, n, i);
        return t;
      }
      function s() {
        if (!p)
          if ((t('../dep/excanvas'), window.G_vmlCanvasManager)) {
            var e = document.createElement('div');
            (e.style.position = 'absolute'),
              (e.style.top = '-1000px'),
              document.body.appendChild(e),
              (p = G_vmlCanvasManager.initElement(e).getContext('2d'));
          } else p = document.createElement('canvas').getContext('2d');
        return p;
      }
      function r(t, e) {
        if (t.indexOf) return t.indexOf(e);
        for (var i = 0, o = t.length; o > i; i++) if (t[i] === e) return i;
        return -1;
      }
      function a(t, e) {
        function i() {}
        var o = t.prototype;
        (i.prototype = e.prototype), (t.prototype = new i());
        for (var n in o) t.prototype[n] = o[n];
        t.constructor = t;
      }
      function h(t, e, i) {
        if (t && e)
          if (t.forEach && t.forEach === g) t.forEach(e, i);
          else if (t.length === +t.length)
            for (var o = 0, n = t.length; n > o; o++) e.call(i, t[o], o, t);
          else for (var s in t) t.hasOwnProperty(s) && e.call(i, t[s], s, t);
      }
      function l(t, e, i) {
        if (t && e) {
          if (t.map && t.map === f) return t.map(e, i);
          for (var o = [], n = 0, s = t.length; s > n; n++)
            o.push(e.call(i, t[n], n, t));
          return o;
        }
      }
      function d(t, e, i) {
        if (t && e) {
          if (t.filter && t.filter === m) return t.filter(e, i);
          for (var o = [], n = 0, s = t.length; s > n; n++)
            e.call(i, t[n], n, t) && o.push(t[n]);
          return o;
        }
      }
      function c(t, e) {
        return function () {
          t.apply(e, arguments);
        };
      }
      var p,
        u = Array.prototype,
        g = u.forEach,
        f = u.map,
        m = u.filter,
        _ = {
          '[object Function]': 1,
          '[object RegExp]': 1,
          '[object Date]': 1,
          '[object Error]': 1,
          '[object CanvasGradient]': 1,
        },
        y = Object.prototype.toString;
      return {
        inherits: a,
        clone: i,
        merge: n,
        getContext: s,
        indexOf: r,
        each: h,
        map: l,
        filter: d,
        bind: c,
      };
    }),
    i('echarts/chart', [], function () {
      var t = {},
        e = {};
      return (
        (t.define = function (i, o) {
          return (e[i] = o), t;
        }),
        (t.get = function (t) {
          return e[t];
        }),
        t
      );
    }),
    i('zrender/tool/color', ['require', '../tool/util'], function (t) {
      function e(t) {
        W = t;
      }
      function i() {
        W = X;
      }
      function o(t, e) {
        return (t = 0 | t), (e = e || W), e[t % e.length];
      }
      function n(t) {
        G = t;
      }
      function s() {
        q = G;
      }
      function r() {
        return G;
      }
      function a(t, e, i, o, n, s, r) {
        F || (F = Y.getContext());
        for (
          var a = F.createRadialGradient(t, e, i, o, n, s), h = 0, l = r.length;
          l > h;
          h++
        )
          a.addColorStop(r[h][0], r[h][1]);
        return (a.__nonRecursion = !0), a;
      }
      function h(t, e, i, o, n) {
        F || (F = Y.getContext());
        for (
          var s = F.createLinearGradient(t, e, i, o), r = 0, a = n.length;
          a > r;
          r++
        )
          s.addColorStop(n[r][0], n[r][1]);
        return (s.__nonRecursion = !0), s;
      }
      function l(t, e, i) {
        (t = g(t)), (e = g(e)), (t = A(t)), (e = A(e));
        for (
          var o = [],
            n = (e[0] - t[0]) / i,
            s = (e[1] - t[1]) / i,
            r = (e[2] - t[2]) / i,
            a = (e[3] - t[3]) / i,
            h = 0,
            l = t[0],
            d = t[1],
            p = t[2],
            u = t[3];
          i > h;
          h++
        )
          (o[h] = c(
            [
              I(Math.floor(l), [0, 255]),
              I(Math.floor(d), [0, 255]),
              I(Math.floor(p), [0, 255]),
              u.toFixed(4) - 0,
            ],
            'rgba',
          )),
            (l += n),
            (d += s),
            (p += r),
            (u += a);
        return (
          (l = e[0]),
          (d = e[1]),
          (p = e[2]),
          (u = e[3]),
          (o[h] = c([l, d, p, u], 'rgba')),
          o
        );
      }
      function d(t, e) {
        var i = [],
          o = t.length;
        if ((void 0 === e && (e = 20), 1 === o)) i = l(t[0], t[0], e);
        else if (o > 1)
          for (var n = 0, s = o - 1; s > n; n++) {
            var r = l(t[n], t[n + 1], e);
            s - 1 > n && r.pop(), (i = i.concat(r));
          }
        return i;
      }
      function c(t, e) {
        if (((e = e || 'rgb'), t && (3 === t.length || 4 === t.length))) {
          if (
            ((t = O(t, function (t) {
              return t > 1 ? Math.ceil(t) : t;
            })),
            e.indexOf('hex') > -1)
          )
            return (
              '#' +
              ((1 << 24) + (t[0] << 16) + (t[1] << 8) + +t[2])
                .toString(16)
                .slice(1)
            );
          if (e.indexOf('hs') > -1) {
            var i = O(t.slice(1, 3), function (t) {
              return t + '%';
            });
            (t[1] = i[0]), (t[2] = i[1]);
          }
          return e.indexOf('a') > -1
            ? (3 === t.length && t.push(1),
              (t[3] = I(t[3], [0, 1])),
              e + '(' + t.slice(0, 4).join(',') + ')')
            : e + '(' + t.slice(0, 3).join(',') + ')';
        }
      }
      function p(t) {
        (t = z(t)), t.indexOf('rgba') < 0 && (t = g(t));
        var e = [],
          i = 0;
        return (
          t.replace(/[\d.]+/g, function (t) {
            (t = 3 > i ? 0 | t : +t), (e[i++] = t);
          }),
          e
        );
      }
      function u(t, e) {
        if (!P(t)) return t;
        var i = A(t),
          o = i[3];
        return (
          'undefined' == typeof o && (o = 1),
          t.indexOf('hsb') > -1
            ? (i = R(i))
            : t.indexOf('hsl') > -1 && (i = D(i)),
          e.indexOf('hsb') > -1 || e.indexOf('hsv') > -1
            ? (i = B(i))
            : e.indexOf('hsl') > -1 && (i = N(i)),
          (i[3] = o),
          c(i, e)
        );
      }
      function g(t) {
        return u(t, 'rgba');
      }
      function f(t) {
        return u(t, 'rgb');
      }
      function m(t) {
        return u(t, 'hex');
      }
      function _(t) {
        return u(t, 'hsva');
      }
      function y(t) {
        return u(t, 'hsv');
      }
      function x(t) {
        return u(t, 'hsba');
      }
      function v(t) {
        return u(t, 'hsb');
      }
      function b(t) {
        return u(t, 'hsla');
      }
      function S(t) {
        return u(t, 'hsl');
      }
      function T(t) {
        for (var e in Z) if (m(Z[e]) === m(t)) return e;
        return null;
      }
      function z(t) {
        return String(t).replace(/\s+/g, '');
      }
      function C(t) {
        if (
          (Z[t] && (t = Z[t]),
          (t = z(t)),
          (t = t.replace(/hsv/i, 'hsb')),
          /^#[\da-f]{3}$/i.test(t))
        ) {
          t = parseInt(t.slice(1), 16);
          var e = (3840 & t) << 8,
            i = (240 & t) << 4,
            o = 15 & t;
          t =
            '#' +
            ((1 << 24) + (e << 4) + e + (i << 4) + i + (o << 4) + o)
              .toString(16)
              .slice(1);
        }
        return t;
      }
      function L(t, e) {
        if (!P(t)) return t;
        var i = e > 0 ? 1 : -1;
        'undefined' == typeof e && (e = 0),
          (e = Math.abs(e) > 1 ? 1 : Math.abs(e)),
          (t = f(t));
        for (var o = A(t), n = 0; 3 > n; n++)
          o[n] = 1 === i ? (o[n] * (1 - e)) | 0 : ((255 - o[n]) * e + o[n]) | 0;
        return 'rgb(' + o.join(',') + ')';
      }
      function w(t) {
        if (!P(t)) return t;
        var e = A(g(t));
        return (
          (e = O(e, function (t) {
            return 255 - t;
          })),
          c(e, 'rgb')
        );
      }
      function E(t, e, i) {
        if (!P(t) || !P(e)) return t;
        'undefined' == typeof i && (i = 0.5), (i = 1 - I(i, [0, 1]));
        for (
          var o = 2 * i - 1,
            n = A(g(t)),
            s = A(g(e)),
            r = n[3] - s[3],
            a = ((o * r === -1 ? o : (o + r) / (1 + o * r)) + 1) / 2,
            h = 1 - a,
            l = [],
            d = 0;
          3 > d;
          d++
        )
          l[d] = n[d] * a + s[d] * h;
        var p = n[3] * i + s[3] * (1 - i);
        return (
          (p = Math.max(0, Math.min(1, p))),
          1 === n[3] && 1 === s[3] ? c(l, 'rgb') : ((l[3] = p), c(l, 'rgba'))
        );
      }
      function M() {
        return '#' + (Math.random().toString(16) + '0000').slice(2, 8);
      }
      function A(t) {
        t = C(t);
        var e = t.match(V);
        if (null === e) throw new Error('The color format error');
        var i,
          o,
          n,
          s = [];
        if (e[2])
          (i = e[2].replace('#', '').split('')),
            (n = [i[0] + i[1], i[2] + i[3], i[4] + i[5]]),
            (s = O(n, function (t) {
              return I(parseInt(t, 16), [0, 255]);
            }));
        else if (e[4]) {
          var r = e[4].split(',');
          (o = r[3]),
            (n = r.slice(0, 3)),
            (s = O(n, function (t) {
              return (
                (t = Math.floor(
                  t.indexOf('%') > 0 ? 2.55 * parseInt(t, 0) : t,
                )),
                I(t, [0, 255])
              );
            })),
            'undefined' != typeof o && s.push(I(parseFloat(o), [0, 1]));
        } else if (e[5] || e[6]) {
          var a = (e[5] || e[6]).split(','),
            h = parseInt(a[0], 0) / 360,
            l = a[1],
            d = a[2];
          (o = a[3]),
            (s = O([l, d], function (t) {
              return I(parseFloat(t) / 100, [0, 1]);
            })),
            s.unshift(h),
            'undefined' != typeof o && s.push(I(parseFloat(o), [0, 1]));
        }
        return s;
      }
      function k(t, e) {
        if (!P(t)) return t;
        null === e && (e = 1);
        var i = A(g(t));
        return (i[3] = I(Number(e).toFixed(4), [0, 1])), c(i, 'rgba');
      }
      function O(t, e) {
        if ('function' != typeof e) throw new TypeError();
        for (var i = t ? t.length : 0, o = 0; i > o; o++) t[o] = e(t[o]);
        return t;
      }
      function I(t, e) {
        return t <= e[0] ? (t = e[0]) : t >= e[1] && (t = e[1]), t;
      }
      function P(t) {
        return t instanceof Array || 'string' == typeof t;
      }
      function R(t) {
        var e,
          i,
          o,
          n = t[0],
          s = t[1],
          r = t[2];
        if (0 === s) (e = 255 * r), (i = 255 * r), (o = 255 * r);
        else {
          var a = 6 * n;
          6 === a && (a = 0);
          var h = 0 | a,
            l = r * (1 - s),
            d = r * (1 - s * (a - h)),
            c = r * (1 - s * (1 - (a - h))),
            p = 0,
            u = 0,
            g = 0;
          0 === h
            ? ((p = r), (u = c), (g = l))
            : 1 === h
            ? ((p = d), (u = r), (g = l))
            : 2 === h
            ? ((p = l), (u = r), (g = c))
            : 3 === h
            ? ((p = l), (u = d), (g = r))
            : 4 === h
            ? ((p = c), (u = l), (g = r))
            : ((p = r), (u = l), (g = d)),
            (e = 255 * p),
            (i = 255 * u),
            (o = 255 * g);
        }
        return [e, i, o];
      }
      function D(t) {
        var e,
          i,
          o,
          n = t[0],
          s = t[1],
          r = t[2];
        if (0 === s) (e = 255 * r), (i = 255 * r), (o = 255 * r);
        else {
          var a;
          a = 0.5 > r ? r * (1 + s) : r + s - s * r;
          var h = 2 * r - a;
          (e = 255 * H(h, a, n + 1 / 3)),
            (i = 255 * H(h, a, n)),
            (o = 255 * H(h, a, n - 1 / 3));
        }
        return [e, i, o];
      }
      function H(t, e, i) {
        return (
          0 > i && (i += 1),
          i > 1 && (i -= 1),
          1 > 6 * i
            ? t + 6 * (e - t) * i
            : 1 > 2 * i
            ? e
            : 2 > 3 * i
            ? t + (e - t) * (2 / 3 - i) * 6
            : t
        );
      }
      function B(t) {
        var e,
          i,
          o = t[0] / 255,
          n = t[1] / 255,
          s = t[2] / 255,
          r = Math.min(o, n, s),
          a = Math.max(o, n, s),
          h = a - r,
          l = a;
        if (0 === h) (e = 0), (i = 0);
        else {
          i = h / a;
          var d = ((a - o) / 6 + h / 2) / h,
            c = ((a - n) / 6 + h / 2) / h,
            p = ((a - s) / 6 + h / 2) / h;
          o === a
            ? (e = p - c)
            : n === a
            ? (e = 1 / 3 + d - p)
            : s === a && (e = 2 / 3 + c - d),
            0 > e && (e += 1),
            e > 1 && (e -= 1);
        }
        return (e = 360 * e), (i = 100 * i), (l = 100 * l), [e, i, l];
      }
      function N(t) {
        var e,
          i,
          o = t[0] / 255,
          n = t[1] / 255,
          s = t[2] / 255,
          r = Math.min(o, n, s),
          a = Math.max(o, n, s),
          h = a - r,
          l = (a + r) / 2;
        if (0 === h) (e = 0), (i = 0);
        else {
          i = 0.5 > l ? h / (a + r) : h / (2 - a - r);
          var d = ((a - o) / 6 + h / 2) / h,
            c = ((a - n) / 6 + h / 2) / h,
            p = ((a - s) / 6 + h / 2) / h;
          o === a
            ? (e = p - c)
            : n === a
            ? (e = 1 / 3 + d - p)
            : s === a && (e = 2 / 3 + c - d),
            0 > e && (e += 1),
            e > 1 && (e -= 1);
        }
        return (e = 360 * e), (i = 100 * i), (l = 100 * l), [e, i, l];
      }
      var F,
        Y = t('../tool/util'),
        W = [
          '#ff9277',
          ' #dddd00',
          ' #ffc877',
          ' #bbe3ff',
          ' #d5ffbb',
          '#bbbbff',
          ' #ddb000',
          ' #b0dd00',
          ' #e2bbff',
          ' #ffbbe3',
          '#ff7777',
          ' #ff9900',
          ' #83dd00',
          ' #77e3ff',
          ' #778fff',
          '#c877ff',
          ' #ff77ab',
          ' #ff6600',
          ' #aa8800',
          ' #77c7ff',
          '#ad77ff',
          ' #ff77ff',
          ' #dd0083',
          ' #777700',
          ' #00aa00',
          '#0088aa',
          ' #8400dd',
          ' #aa0088',
          ' #dd0000',
          ' #772e00',
        ],
        X = W,
        G = 'rgba(255,255,0,0.5)',
        q = G,
        V =
          /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        Z = {
          aliceblue: '#f0f8ff',
          antiquewhite: '#faebd7',
          aqua: '#0ff',
          aquamarine: '#7fffd4',
          azure: '#f0ffff',
          beige: '#f5f5dc',
          bisque: '#ffe4c4',
          black: '#000',
          blanchedalmond: '#ffebcd',
          blue: '#00f',
          blueviolet: '#8a2be2',
          brown: '#a52a2a',
          burlywood: '#deb887',
          cadetblue: '#5f9ea0',
          chartreuse: '#7fff00',
          chocolate: '#d2691e',
          coral: '#ff7f50',
          cornflowerblue: '#6495ed',
          cornsilk: '#fff8dc',
          crimson: '#dc143c',
          cyan: '#0ff',
          darkblue: '#00008b',
          darkcyan: '#008b8b',
          darkgoldenrod: '#b8860b',
          darkgray: '#a9a9a9',
          darkgrey: '#a9a9a9',
          darkgreen: '#006400',
          darkkhaki: '#bdb76b',
          darkmagenta: '#8b008b',
          darkolivegreen: '#556b2f',
          darkorange: '#ff8c00',
          darkorchid: '#9932cc',
          darkred: '#8b0000',
          darksalmon: '#e9967a',
          darkseagreen: '#8fbc8f',
          darkslateblue: '#483d8b',
          darkslategray: '#2f4f4f',
          darkslategrey: '#2f4f4f',
          darkturquoise: '#00ced1',
          darkviolet: '#9400d3',
          deeppink: '#ff1493',
          deepskyblue: '#00bfff',
          dimgray: '#696969',
          dimgrey: '#696969',
          dodgerblue: '#1e90ff',
          firebrick: '#b22222',
          floralwhite: '#fffaf0',
          forestgreen: '#228b22',
          fuchsia: '#f0f',
          gainsboro: '#dcdcdc',
          ghostwhite: '#f8f8ff',
          gold: '#ffd700',
          goldenrod: '#daa520',
          gray: '#808080',
          grey: '#808080',
          green: '#008000',
          greenyellow: '#adff2f',
          honeydew: '#f0fff0',
          hotpink: '#ff69b4',
          indianred: '#cd5c5c',
          indigo: '#4b0082',
          ivory: '#fffff0',
          khaki: '#f0e68c',
          lavender: '#e6e6fa',
          lavenderblush: '#fff0f5',
          lawngreen: '#7cfc00',
          lemonchiffon: '#fffacd',
          lightblue: '#add8e6',
          lightcoral: '#f08080',
          lightcyan: '#e0ffff',
          lightgoldenrodyellow: '#fafad2',
          lightgray: '#d3d3d3',
          lightgrey: '#d3d3d3',
          lightgreen: '#90ee90',
          lightpink: '#ffb6c1',
          lightsalmon: '#ffa07a',
          lightseagreen: '#20b2aa',
          lightskyblue: '#87cefa',
          lightslategray: '#789',
          lightslategrey: '#789',
          lightsteelblue: '#b0c4de',
          lightyellow: '#ffffe0',
          lime: '#0f0',
          limegreen: '#32cd32',
          linen: '#faf0e6',
          magenta: '#f0f',
          maroon: '#800000',
          mediumaquamarine: '#66cdaa',
          mediumblue: '#0000cd',
          mediumorchid: '#ba55d3',
          mediumpurple: '#9370d8',
          mediumseagreen: '#3cb371',
          mediumslateblue: '#7b68ee',
          mediumspringgreen: '#00fa9a',
          mediumturquoise: '#48d1cc',
          mediumvioletred: '#c71585',
          midnightblue: '#191970',
          mintcream: '#f5fffa',
          mistyrose: '#ffe4e1',
          moccasin: '#ffe4b5',
          navajowhite: '#ffdead',
          navy: '#000080',
          oldlace: '#fdf5e6',
          olive: '#808000',
          olivedrab: '#6b8e23',
          orange: '#ffa500',
          orangered: '#ff4500',
          orchid: '#da70d6',
          palegoldenrod: '#eee8aa',
          palegreen: '#98fb98',
          paleturquoise: '#afeeee',
          palevioletred: '#d87093',
          papayawhip: '#ffefd5',
          peachpuff: '#ffdab9',
          peru: '#cd853f',
          pink: '#ffc0cb',
          plum: '#dda0dd',
          powderblue: '#b0e0e6',
          purple: '#800080',
          red: '#f00',
          rosybrown: '#bc8f8f',
          royalblue: '#4169e1',
          saddlebrown: '#8b4513',
          salmon: '#fa8072',
          sandybrown: '#f4a460',
          seagreen: '#2e8b57',
          seashell: '#fff5ee',
          sienna: '#a0522d',
          silver: '#c0c0c0',
          skyblue: '#87ceeb',
          slateblue: '#6a5acd',
          slategray: '#708090',
          slategrey: '#708090',
          snow: '#fffafa',
          springgreen: '#00ff7f',
          steelblue: '#4682b4',
          tan: '#d2b48c',
          teal: '#008080',
          thistle: '#d8bfd8',
          tomato: '#ff6347',
          turquoise: '#40e0d0',
          violet: '#ee82ee',
          wheat: '#f5deb3',
          white: '#fff',
          whitesmoke: '#f5f5f5',
          yellow: '#ff0',
          yellowgreen: '#9acd32',
        };
      return {
        customPalette: e,
        resetPalette: i,
        getColor: o,
        getHighlightColor: r,
        customHighlight: n,
        resetHighlight: s,
        getRadialGradient: a,
        getLinearGradient: h,
        getGradientColors: d,
        getStepColors: l,
        reverse: w,
        mix: E,
        lift: L,
        trim: z,
        random: M,
        toRGB: f,
        toRGBA: g,
        toHex: m,
        toHSL: S,
        toHSLA: b,
        toHSB: v,
        toHSBA: x,
        toHSV: y,
        toHSVA: _,
        toName: T,
        toColor: c,
        toArray: p,
        alpha: k,
        getData: A,
      };
    }),
    i(
      'echarts/util/shape/GaugePointer',
      ['require', 'zrender/shape/Base', 'zrender/tool/util', './normalIsCover'],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: 'gauge-pointer',
            buildPath: function (t, e) {
              var i = e.r,
                o = e.width,
                n = e.angle,
                s = e.x - Math.cos(n) * o * (o >= i / 3 ? 1 : 2),
                r = e.y + Math.sin(n) * o * (o >= i / 3 ? 1 : 2);
              (n = e.angle - Math.PI / 2),
                t.moveTo(s, r),
                t.lineTo(e.x + Math.cos(n) * o, e.y - Math.sin(n) * o),
                t.lineTo(
                  e.x + Math.cos(e.angle) * i,
                  e.y - Math.sin(e.angle) * i,
                ),
                t.lineTo(e.x - Math.cos(n) * o, e.y + Math.sin(n) * o),
                t.lineTo(s, r);
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e = 2 * t.width,
                i = t.x,
                o = t.y,
                n = i + Math.cos(t.angle) * t.r,
                s = o - Math.sin(t.angle) * t.r;
              return (
                (t.__rect = {
                  x: Math.min(i, n) - e,
                  y: Math.min(o, s) - e,
                  width: Math.abs(i - n) + e,
                  height: Math.abs(o - s) + e,
                }),
                t.__rect
              );
            },
            isCover: t('./normalIsCover'),
          }),
          o.inherits(e, i),
          e
        );
      },
    ),
    i(
      'zrender/shape/Text',
      ['require', '../tool/area', './Base', '../tool/util'],
      function (t) {
        var e = t('../tool/area'),
          i = t('./Base'),
          o = function (t) {
            i.call(this, t);
          };
        return (
          (o.prototype = {
            type: 'text',
            brush: function (t, i) {
              var o = this.style;
              if (
                (i &&
                  (o = this.getHighlightStyle(o, this.highlightStyle || {})),
                'undefined' != typeof o.text && o.text !== !1)
              ) {
                t.save(),
                  this.doClip(t),
                  this.setContext(t, o),
                  this.setTransform(t),
                  o.textFont && (t.font = o.textFont),
                  (t.textAlign = o.textAlign || 'start'),
                  (t.textBaseline = o.textBaseline || 'middle');
                var n,
                  s = (o.text + '').split('\n'),
                  r = e.getTextHeight('国', o.textFont),
                  a = this.getRect(o),
                  h = o.x;
                n =
                  'top' == o.textBaseline
                    ? a.y
                    : 'bottom' == o.textBaseline
                    ? a.y + r
                    : a.y + r / 2;
                for (var l = 0, d = s.length; d > l; l++) {
                  if (o.maxWidth)
                    switch (o.brushType) {
                      case 'fill':
                        t.fillText(s[l], h, n, o.maxWidth);
                        break;
                      case 'stroke':
                        t.strokeText(s[l], h, n, o.maxWidth);
                        break;
                      case 'both':
                        t.fillText(s[l], h, n, o.maxWidth),
                          t.strokeText(s[l], h, n, o.maxWidth);
                        break;
                      default:
                        t.fillText(s[l], h, n, o.maxWidth);
                    }
                  else
                    switch (o.brushType) {
                      case 'fill':
                        t.fillText(s[l], h, n);
                        break;
                      case 'stroke':
                        t.strokeText(s[l], h, n);
                        break;
                      case 'both':
                        t.fillText(s[l], h, n), t.strokeText(s[l], h, n);
                        break;
                      default:
                        t.fillText(s[l], h, n);
                    }
                  n += r;
                }
                t.restore();
              }
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var i = e.getTextWidth(t.text, t.textFont),
                o = e.getTextHeight(t.text, t.textFont),
                n = t.x;
              'end' == t.textAlign || 'right' == t.textAlign
                ? (n -= i)
                : 'center' == t.textAlign && (n -= i / 2);
              var s;
              return (
                (s =
                  'top' == t.textBaseline
                    ? t.y
                    : 'bottom' == t.textBaseline
                    ? t.y - o
                    : t.y - o / 2),
                (t.__rect = { x: n, y: s, width: i, height: o }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(o, i),
          o
        );
      },
    ),
    i(
      'zrender/shape/Line',
      ['require', './Base', './util/dashedLineTo', '../tool/util'],
      function (t) {
        var e = t('./Base'),
          i = t('./util/dashedLineTo'),
          o = function (t) {
            (this.brushTypeOnly = 'stroke'),
              (this.textPosition = 'end'),
              e.call(this, t);
          };
        return (
          (o.prototype = {
            type: 'line',
            buildPath: function (t, e) {
              if (e.lineType && 'solid' != e.lineType) {
                if ('dashed' == e.lineType || 'dotted' == e.lineType) {
                  var o = (e.lineWidth || 1) * ('dashed' == e.lineType ? 5 : 1);
                  i(t, e.xStart, e.yStart, e.xEnd, e.yEnd, o);
                }
              } else t.moveTo(e.xStart, e.yStart), t.lineTo(e.xEnd, e.yEnd);
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e = t.lineWidth || 1;
              return (
                (t.__rect = {
                  x: Math.min(t.xStart, t.xEnd) - e,
                  y: Math.min(t.yStart, t.yEnd) - e,
                  width: Math.abs(t.xStart - t.xEnd) + e,
                  height: Math.abs(t.yStart - t.yEnd) + e,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(o, e),
          o
        );
      },
    ),
    i(
      'zrender/shape/Rectangle',
      ['require', './Base', '../tool/util'],
      function (t) {
        var e = t('./Base'),
          i = function (t) {
            e.call(this, t);
          };
        return (
          (i.prototype = {
            type: 'rectangle',
            _buildRadiusPath: function (t, e) {
              var i,
                o,
                n,
                s,
                r = e.x,
                a = e.y,
                h = e.width,
                l = e.height,
                d = e.radius;
              'number' == typeof d
                ? (i = o = n = s = d)
                : d instanceof Array
                ? 1 === d.length
                  ? (i = o = n = s = d[0])
                  : 2 === d.length
                  ? ((i = n = d[0]), (o = s = d[1]))
                  : 3 === d.length
                  ? ((i = d[0]), (o = s = d[1]), (n = d[2]))
                  : ((i = d[0]), (o = d[1]), (n = d[2]), (s = d[3]))
                : (i = o = n = s = 0);
              var c;
              i + o > h && ((c = i + o), (i *= h / c), (o *= h / c)),
                n + s > h && ((c = n + s), (n *= h / c), (s *= h / c)),
                o + n > l && ((c = o + n), (o *= l / c), (n *= l / c)),
                i + s > l && ((c = i + s), (i *= l / c), (s *= l / c)),
                t.moveTo(r + i, a),
                t.lineTo(r + h - o, a),
                0 !== o && t.quadraticCurveTo(r + h, a, r + h, a + o),
                t.lineTo(r + h, a + l - n),
                0 !== n && t.quadraticCurveTo(r + h, a + l, r + h - n, a + l),
                t.lineTo(r + s, a + l),
                0 !== s && t.quadraticCurveTo(r, a + l, r, a + l - s),
                t.lineTo(r, a + i),
                0 !== i && t.quadraticCurveTo(r, a, r + i, a);
            },
            buildPath: function (t, e) {
              e.radius
                ? this._buildRadiusPath(t, e)
                : (t.moveTo(e.x, e.y),
                  t.lineTo(e.x + e.width, e.y),
                  t.lineTo(e.x + e.width, e.y + e.height),
                  t.lineTo(e.x, e.y + e.height),
                  t.lineTo(e.x, e.y)),
                t.closePath();
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e;
              return (
                (e =
                  'stroke' == t.brushType || 'fill' == t.brushType
                    ? t.lineWidth || 1
                    : 0),
                (t.__rect = {
                  x: Math.round(t.x - e / 2),
                  y: Math.round(t.y - e / 2),
                  width: t.width + e,
                  height: t.height + e,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(i, e),
          i
        );
      },
    ),
    i(
      'zrender/shape/Circle',
      ['require', './Base', '../tool/util'],
      function (t) {
        'use strict';
        var e = t('./Base'),
          i = function (t) {
            e.call(this, t);
          };
        return (
          (i.prototype = {
            type: 'circle',
            buildPath: function (t, e) {
              t.moveTo(e.x + e.r, e.y),
                t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !0);
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e;
              return (
                (e =
                  'stroke' == t.brushType || 'fill' == t.brushType
                    ? t.lineWidth || 1
                    : 0),
                (t.__rect = {
                  x: Math.round(t.x - t.r - e / 2),
                  y: Math.round(t.y - t.r - e / 2),
                  width: 2 * t.r + e,
                  height: 2 * t.r + e,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(i, e),
          i
        );
      },
    ),
    i(
      'zrender/shape/Sector',
      [
        'require',
        '../tool/math',
        '../tool/computeBoundingBox',
        '../tool/vector',
        './Base',
        '../tool/util',
      ],
      function (t) {
        var e = t('../tool/math'),
          i = t('../tool/computeBoundingBox'),
          o = t('../tool/vector'),
          n = t('./Base'),
          s = o.create(),
          r = o.create(),
          a = o.create(),
          h = o.create(),
          l = function (t) {
            n.call(this, t);
          };
        return (
          (l.prototype = {
            type: 'sector',
            buildPath: function (t, i) {
              var o = i.x,
                n = i.y,
                s = i.r0 || 0,
                r = i.r,
                a = i.startAngle,
                h = i.endAngle,
                l = i.clockWise || !1;
              (a = e.degreeToRadian(a)),
                (h = e.degreeToRadian(h)),
                l || ((a = -a), (h = -h));
              var d = e.cos(a),
                c = e.sin(a);
              t.moveTo(d * s + o, c * s + n),
                t.lineTo(d * r + o, c * r + n),
                t.arc(o, n, r, a, h, !l),
                t.lineTo(e.cos(h) * s + o, e.sin(h) * s + n),
                0 !== s && t.arc(o, n, s, h, a, l),
                t.closePath();
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var n = t.x,
                l = t.y,
                d = t.r0 || 0,
                c = t.r,
                p = e.degreeToRadian(t.startAngle),
                u = e.degreeToRadian(t.endAngle),
                g = t.clockWise;
              return (
                g || ((p = -p), (u = -u)),
                d > 1
                  ? i.arc(n, l, d, p, u, !g, s, a)
                  : ((s[0] = a[0] = n), (s[1] = a[1] = l)),
                i.arc(n, l, c, p, u, !g, r, h),
                o.min(s, s, r),
                o.max(a, a, h),
                (t.__rect = {
                  x: s[0],
                  y: s[1],
                  width: a[0] - s[0],
                  height: a[1] - s[1],
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(l, n),
          l
        );
      },
    ),
    i('echarts/util/ecData', [], function () {
      function t(t, e, i, o, n, s, r, a) {
        var h;
        return (
          'undefined' != typeof o && (h = null == o.value ? o : o.value),
          (t._echartsData = {
            _series: e,
            _seriesIndex: i,
            _data: o,
            _dataIndex: n,
            _name: s,
            _value: h,
            _special: r,
            _special2: a,
          }),
          t._echartsData
        );
      }
      function e(t, e) {
        var i = t._echartsData;
        if (!e) return i;
        switch (e) {
          case 'series':
          case 'seriesIndex':
          case 'data':
          case 'dataIndex':
          case 'name':
          case 'value':
          case 'special':
          case 'special2':
            return i && i['_' + e];
        }
        return null;
      }
      function i(t, e, i) {
        switch (((t._echartsData = t._echartsData || {}), e)) {
          case 'series':
          case 'seriesIndex':
          case 'data':
          case 'dataIndex':
          case 'name':
          case 'value':
          case 'special':
          case 'special2':
            t._echartsData['_' + e] = i;
        }
      }
      function o(t, e) {
        e._echartsData = {
          _series: t._echartsData._series,
          _seriesIndex: t._echartsData._seriesIndex,
          _data: t._echartsData._data,
          _dataIndex: t._echartsData._dataIndex,
          _name: t._echartsData._name,
          _value: t._echartsData._value,
          _special: t._echartsData._special,
          _special2: t._echartsData._special2,
        };
      }
      return { pack: t, set: i, get: e, clone: o };
    }),
    i('echarts/util/accMath', [], function () {
      function t(t, e) {
        var i = t.toString(),
          o = e.toString(),
          n = 0;
        try {
          n = o.split('.')[1].length;
        } catch (s) {}
        try {
          n -= i.split('.')[1].length;
        } catch (s) {}
        return (
          ((i.replace('.', '') - 0) / (o.replace('.', '') - 0)) *
          Math.pow(10, n)
        );
      }
      function e(t, e) {
        var i = t.toString(),
          o = e.toString(),
          n = 0;
        try {
          n += i.split('.')[1].length;
        } catch (s) {}
        try {
          n += o.split('.')[1].length;
        } catch (s) {}
        return (
          ((i.replace('.', '') - 0) * (o.replace('.', '') - 0)) /
          Math.pow(10, n)
        );
      }
      function i(t, e) {
        var i = 0,
          o = 0;
        try {
          i = t.toString().split('.')[1].length;
        } catch (n) {}
        try {
          o = e.toString().split('.')[1].length;
        } catch (n) {}
        var s = Math.pow(10, Math.max(i, o));
        return (Math.round(t * s) + Math.round(e * s)) / s;
      }
      function o(t, e) {
        return i(t, -e);
      }
      return { accDiv: t, accMul: e, accAdd: i, accSub: o };
    }),
    i(
      'zrender/shape/Polyline',
      [
        'require',
        './Base',
        './util/smoothSpline',
        './util/smoothBezier',
        './util/dashedLineTo',
        './Polygon',
        '../tool/util',
      ],
      function (t) {
        var e = t('./Base'),
          i = t('./util/smoothSpline'),
          o = t('./util/smoothBezier'),
          n = t('./util/dashedLineTo'),
          s = function (t) {
            (this.brushTypeOnly = 'stroke'),
              (this.textPosition = 'end'),
              e.call(this, t);
          };
        return (
          (s.prototype = {
            type: 'polyline',
            buildPath: function (t, e) {
              var o = e.pointList;
              if (!(o.length < 2)) {
                var s = Math.min(
                  e.pointList.length,
                  Math.round(e.pointListLength || e.pointList.length),
                );
                if (e.smooth && 'spline' !== e.smooth) {
                  e.controlPointList || this.updateControlPoints(e);
                  var r = e.controlPointList;
                  t.moveTo(o[0][0], o[0][1]);
                  for (var a, h, l, d = 0; s - 1 > d; d++)
                    (a = r[2 * d]),
                      (h = r[2 * d + 1]),
                      (l = o[d + 1]),
                      t.bezierCurveTo(a[0], a[1], h[0], h[1], l[0], l[1]);
                } else if (
                  ('spline' === e.smooth && ((o = i(o)), (s = o.length)),
                  e.lineType && 'solid' != e.lineType)
                ) {
                  if ('dashed' == e.lineType || 'dotted' == e.lineType) {
                    var c =
                      (e.lineWidth || 1) * ('dashed' == e.lineType ? 5 : 1);
                    t.moveTo(o[0][0], o[0][1]);
                    for (var d = 1; s > d; d++)
                      n(t, o[d - 1][0], o[d - 1][1], o[d][0], o[d][1], c);
                  }
                } else {
                  t.moveTo(o[0][0], o[0][1]);
                  for (var d = 1; s > d; d++) t.lineTo(o[d][0], o[d][1]);
                }
              }
            },
            updateControlPoints: function (t) {
              t.controlPointList = o(
                t.pointList,
                t.smooth,
                !1,
                t.smoothConstraint,
              );
            },
            getRect: function (e) {
              return t('./Polygon').prototype.getRect(e);
            },
          }),
          t('../tool/util').inherits(s, e),
          s
        );
      },
    ),
    i(
      'echarts/util/shape/Icon',
      [
        'require',
        'zrender/tool/util',
        'zrender/shape/Star',
        'zrender/shape/Heart',
        'zrender/shape/Droplet',
        'zrender/shape/Image',
        'zrender/shape/Base',
      ],
      function (t) {
        function e(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i, o + e.height),
            t.lineTo(i + 5 * n, o + 14 * s),
            t.lineTo(i + e.width, o + 3 * s),
            t.lineTo(i + 13 * n, o),
            t.lineTo(i + 2 * n, o + 11 * s),
            t.lineTo(i, o + e.height),
            t.moveTo(i + 6 * n, o + 10 * s),
            t.lineTo(i + 14 * n, o + 2 * s),
            t.moveTo(i + 10 * n, o + 13 * s),
            t.lineTo(i + e.width, o + 13 * s),
            t.moveTo(i + 13 * n, o + 10 * s),
            t.lineTo(i + 13 * n, o + e.height);
        }
        function i(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i, o + e.height),
            t.lineTo(i + 5 * n, o + 14 * s),
            t.lineTo(i + e.width, o + 3 * s),
            t.lineTo(i + 13 * n, o),
            t.lineTo(i + 2 * n, o + 11 * s),
            t.lineTo(i, o + e.height),
            t.moveTo(i + 6 * n, o + 10 * s),
            t.lineTo(i + 14 * n, o + 2 * s),
            t.moveTo(i + 10 * n, o + 13 * s),
            t.lineTo(i + e.width, o + 13 * s);
        }
        function o(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i + 4 * n, o + 15 * s),
            t.lineTo(i + 9 * n, o + 13 * s),
            t.lineTo(i + 14 * n, o + 8 * s),
            t.lineTo(i + 11 * n, o + 5 * s),
            t.lineTo(i + 6 * n, o + 10 * s),
            t.lineTo(i + 4 * n, o + 15 * s),
            t.moveTo(i + 5 * n, o),
            t.lineTo(i + 11 * n, o),
            t.moveTo(i + 5 * n, o + s),
            t.lineTo(i + 11 * n, o + s),
            t.moveTo(i, o + 2 * s),
            t.lineTo(i + e.width, o + 2 * s),
            t.moveTo(i, o + 5 * s),
            t.lineTo(i + 3 * n, o + e.height),
            t.lineTo(i + 13 * n, o + e.height),
            t.lineTo(i + e.width, o + 5 * s);
        }
        function n(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i, o + 3 * s),
            t.lineTo(i + 6 * n, o + 3 * s),
            t.moveTo(i + 3 * n, o),
            t.lineTo(i + 3 * n, o + 6 * s),
            t.moveTo(i + 3 * n, o + 8 * s),
            t.lineTo(i + 3 * n, o + e.height),
            t.lineTo(i + e.width, o + e.height),
            t.lineTo(i + e.width, o + 3 * s),
            t.lineTo(i + 8 * n, o + 3 * s);
        }
        function s(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i + 6 * n, o),
            t.lineTo(i + 2 * n, o + 3 * s),
            t.lineTo(i + 6 * n, o + 6 * s),
            t.moveTo(i + 2 * n, o + 3 * s),
            t.lineTo(i + 14 * n, o + 3 * s),
            t.lineTo(i + 14 * n, o + 11 * s),
            t.moveTo(i + 2 * n, o + 5 * s),
            t.lineTo(i + 2 * n, o + 13 * s),
            t.lineTo(i + 14 * n, o + 13 * s),
            t.moveTo(i + 10 * n, o + 10 * s),
            t.lineTo(i + 14 * n, o + 13 * s),
            t.lineTo(i + 10 * n, o + e.height);
        }
        function r(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16,
            r = e.width / 2;
          (t.lineWidth = 1.5),
            t.arc(i + r, o + r, r - n, 0, (2 * Math.PI) / 3),
            t.moveTo(i + 3 * n, o + e.height),
            t.lineTo(i + 0 * n, o + 12 * s),
            t.lineTo(i + 5 * n, o + 11 * s),
            t.moveTo(i, o + 8 * s),
            t.arc(i + r, o + r, r - n, Math.PI, (5 * Math.PI) / 3),
            t.moveTo(i + 13 * n, o),
            t.lineTo(i + e.width, o + 4 * s),
            t.lineTo(i + 11 * n, o + 5 * s);
        }
        function a(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i, o),
            t.lineTo(i, o + e.height),
            t.lineTo(i + e.width, o + e.height),
            t.moveTo(i + 2 * n, o + 14 * s),
            t.lineTo(i + 7 * n, o + 6 * s),
            t.lineTo(i + 11 * n, o + 11 * s),
            t.lineTo(i + 15 * n, o + 2 * s);
        }
        function h(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i, o),
            t.lineTo(i, o + e.height),
            t.lineTo(i + e.width, o + e.height),
            t.moveTo(i + 3 * n, o + 14 * s),
            t.lineTo(i + 3 * n, o + 6 * s),
            t.lineTo(i + 4 * n, o + 6 * s),
            t.lineTo(i + 4 * n, o + 14 * s),
            t.moveTo(i + 7 * n, o + 14 * s),
            t.lineTo(i + 7 * n, o + 2 * s),
            t.lineTo(i + 8 * n, o + 2 * s),
            t.lineTo(i + 8 * n, o + 14 * s),
            t.moveTo(i + 11 * n, o + 14 * s),
            t.lineTo(i + 11 * n, o + 9 * s),
            t.lineTo(i + 12 * n, o + 9 * s),
            t.lineTo(i + 12 * n, o + 14 * s);
        }
        function l(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width - 2,
            s = e.height - 2,
            r = Math.min(n, s) / 2;
          (o += 2),
            t.moveTo(i + r + 3, o + r - 3),
            t.arc(i + r + 3, o + r - 3, r - 1, 0, -Math.PI / 2, !0),
            t.lineTo(i + r + 3, o + r - 3),
            t.moveTo(i + r, o),
            t.lineTo(i + r, o + r),
            t.arc(i + r, o + r, r, -Math.PI / 2, 2 * Math.PI, !0),
            t.lineTo(i + r, o + r),
            (t.lineWidth = 1.5);
        }
        function d(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          (o -= s),
            t.moveTo(i + 1 * n, o + 2 * s),
            t.lineTo(i + 15 * n, o + 2 * s),
            t.lineTo(i + 14 * n, o + 3 * s),
            t.lineTo(i + 2 * n, o + 3 * s),
            t.moveTo(i + 3 * n, o + 6 * s),
            t.lineTo(i + 13 * n, o + 6 * s),
            t.lineTo(i + 12 * n, o + 7 * s),
            t.lineTo(i + 4 * n, o + 7 * s),
            t.moveTo(i + 5 * n, o + 10 * s),
            t.lineTo(i + 11 * n, o + 10 * s),
            t.lineTo(i + 10 * n, o + 11 * s),
            t.lineTo(i + 6 * n, o + 11 * s),
            t.moveTo(i + 7 * n, o + 14 * s),
            t.lineTo(i + 9 * n, o + 14 * s),
            t.lineTo(i + 8 * n, o + 15 * s),
            t.lineTo(i + 7 * n, o + 15 * s);
        }
        function c(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width,
            s = e.height,
            r = n / 16,
            a = s / 16,
            h = 2 * Math.min(r, a);
          t.moveTo(i + r + h, o + a + h),
            t.arc(i + r, o + a, h, Math.PI / 4, 3 * Math.PI),
            t.lineTo(i + 7 * r - h, o + 6 * a - h),
            t.arc(i + 7 * r, o + 6 * a, h, (Math.PI / 4) * 5, 4 * Math.PI),
            t.arc(i + 7 * r, o + 6 * a, h / 2, (Math.PI / 4) * 5, 4 * Math.PI),
            t.moveTo(i + 7 * r - h / 2, o + 6 * a + h),
            t.lineTo(i + r + h, o + 14 * a - h),
            t.arc(i + r, o + 14 * a, h, -Math.PI / 4, 2 * Math.PI),
            t.moveTo(i + 7 * r + h / 2, o + 6 * a),
            t.lineTo(i + 14 * r - h, o + 10 * a - h / 2),
            t.moveTo(i + 16 * r, o + 10 * a),
            t.arc(i + 14 * r, o + 10 * a, h, 0, 3 * Math.PI),
            (t.lineWidth = 1.5);
        }
        function p(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width,
            s = e.height,
            r = Math.min(n, s) / 2;
          t.moveTo(i + n, o + s / 2),
            t.arc(i + r, o + r, r, 0, 2 * Math.PI),
            t.arc(i + r, o, r, Math.PI / 4, (Math.PI / 5) * 4),
            t.arc(i, o + r, r, -Math.PI / 3, Math.PI / 3),
            t.arc(i + n, o + s, r, Math.PI, (Math.PI / 2) * 3),
            (t.lineWidth = 1.5);
        }
        function u(t, e) {
          for (
            var i = e.x,
              o = e.y,
              n = e.width,
              s = e.height,
              r = Math.round(s / 3),
              a = Math.round((r - 2) / 2),
              h = 3;
            h--;

          )
            t.rect(i, o + r * h + a, n, 2);
        }
        function g(t, e) {
          for (
            var i = e.x,
              o = e.y,
              n = e.width,
              s = e.height,
              r = Math.round(n / 3),
              a = Math.round((r - 2) / 2),
              h = 3;
            h--;

          )
            t.rect(i + r * h + a, o, 2, s);
        }
        function f(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16;
          t.moveTo(i + n, o),
            t.lineTo(i + n, o + e.height),
            t.lineTo(i + 15 * n, o + e.height),
            t.lineTo(i + 15 * n, o),
            t.lineTo(i + n, o),
            t.moveTo(i + 3 * n, o + 3 * n),
            t.lineTo(i + 13 * n, o + 3 * n),
            t.moveTo(i + 3 * n, o + 6 * n),
            t.lineTo(i + 13 * n, o + 6 * n),
            t.moveTo(i + 3 * n, o + 9 * n),
            t.lineTo(i + 13 * n, o + 9 * n),
            t.moveTo(i + 3 * n, o + 12 * n),
            t.lineTo(i + 9 * n, o + 12 * n);
        }
        function m(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16,
            s = e.height / 16;
          t.moveTo(i, o),
            t.lineTo(i, o + e.height),
            t.lineTo(i + e.width, o + e.height),
            t.lineTo(i + e.width, o),
            t.lineTo(i, o),
            t.moveTo(i + 4 * n, o),
            t.lineTo(i + 4 * n, o + 8 * s),
            t.lineTo(i + 12 * n, o + 8 * s),
            t.lineTo(i + 12 * n, o),
            t.moveTo(i + 6 * n, o + 11 * s),
            t.lineTo(i + 6 * n, o + 13 * s),
            t.lineTo(i + 10 * n, o + 13 * s),
            t.lineTo(i + 10 * n, o + 11 * s),
            t.lineTo(i + 6 * n, o + 11 * s);
        }
        function _(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width,
            s = e.height;
          t.moveTo(i, o + s / 2),
            t.lineTo(i + n, o + s / 2),
            t.moveTo(i + n / 2, o),
            t.lineTo(i + n / 2, o + s);
        }
        function y(t, e) {
          var i = e.width / 2,
            o = e.height / 2,
            n = Math.min(i, o);
          t.moveTo(e.x + i + n, e.y + o),
            t.arc(e.x + i, e.y + o, n, 0, 2 * Math.PI),
            t.closePath();
        }
        function x(t, e) {
          t.rect(e.x, e.y, e.width, e.height), t.closePath();
        }
        function v(t, e) {
          var i = e.width / 2,
            o = e.height / 2,
            n = e.x + i,
            s = e.y + o,
            r = Math.min(i, o);
          t.moveTo(n, s - r),
            t.lineTo(n + r, s + r),
            t.lineTo(n - r, s + r),
            t.lineTo(n, s - r),
            t.closePath();
        }
        function b(t, e) {
          var i = e.width / 2,
            o = e.height / 2,
            n = e.x + i,
            s = e.y + o,
            r = Math.min(i, o);
          t.moveTo(n, s - r),
            t.lineTo(n + r, s),
            t.lineTo(n, s + r),
            t.lineTo(n - r, s),
            t.lineTo(n, s - r),
            t.closePath();
        }
        function S(t, e) {
          var i = e.x,
            o = e.y,
            n = e.width / 16;
          t.moveTo(i + 8 * n, o),
            t.lineTo(i + n, o + e.height),
            t.lineTo(i + 8 * n, o + (e.height / 4) * 3),
            t.lineTo(i + 15 * n, o + e.height),
            t.lineTo(i + 8 * n, o),
            t.closePath();
        }
        function T(e, i) {
          var o = t('zrender/shape/Star'),
            n = i.width / 2,
            s = i.height / 2;
          o.prototype.buildPath(e, {
            x: i.x + n,
            y: i.y + s,
            r: Math.min(n, s),
            n: i.n || 5,
          });
        }
        function z(e, i) {
          var o = t('zrender/shape/Heart');
          o.prototype.buildPath(e, {
            x: i.x + i.width / 2,
            y: i.y + 0.2 * i.height,
            a: i.width / 2,
            b: 0.8 * i.height,
          });
        }
        function C(e, i) {
          var o = t('zrender/shape/Droplet');
          o.prototype.buildPath(e, {
            x: i.x + 0.5 * i.width,
            y: i.y + 0.5 * i.height,
            a: 0.5 * i.width,
            b: 0.8 * i.height,
          });
        }
        function L(t, e) {
          var i = e.x,
            o = e.y - (e.height / 2) * 1.5,
            n = e.width / 2,
            s = e.height / 2,
            r = Math.min(n, s);
          t.arc(i + n, o + s, r, (Math.PI / 5) * 4, Math.PI / 5),
            t.lineTo(i + n, o + s + 1.5 * r),
            t.closePath();
        }
        function w(e, i, o) {
          var n = t('zrender/shape/Image');
          this._imageShape = this._imageShape || new n({ style: {} });
          for (var s in i) this._imageShape.style[s] = i[s];
          this._imageShape.brush(e, !1, o);
        }
        function E(t) {
          A.call(this, t);
        }
        var M = t('zrender/tool/util'),
          A = t('zrender/shape/Base');
        return (
          (E.prototype = {
            type: 'icon',
            iconLibrary: {
              mark: e,
              markUndo: i,
              markClear: o,
              dataZoom: n,
              dataZoomReset: s,
              restore: r,
              lineChart: a,
              barChart: h,
              pieChart: l,
              funnelChart: d,
              forceChart: c,
              chordChart: p,
              stackChart: u,
              tiledChart: g,
              dataView: f,
              saveAsImage: m,
              cross: _,
              circle: y,
              rectangle: x,
              triangle: v,
              diamond: b,
              arrow: S,
              star: T,
              heart: z,
              droplet: C,
              pin: L,
              image: w,
            },
            brush: function (e, i, o) {
              var n = i ? this.highlightStyle : this.style;
              n = n || {};
              var s = n.iconType || this.style.iconType;
              if ('image' === s) {
                var r = t('zrender/shape/Image');
                r.prototype.brush.call(this, e, i, o);
              } else {
                var n = this.beforeBrush(e, i);
                switch ((e.beginPath(), this.buildPath(e, n, o), n.brushType)) {
                  case 'both':
                    e.fill();
                  case 'stroke':
                    n.lineWidth > 0 && e.stroke();
                    break;
                  default:
                    e.fill();
                }
                this.drawText(e, n, this.style), this.afterBrush(e);
              }
            },
            buildPath: function (t, e, i) {
              this.iconLibrary[e.iconType]
                ? this.iconLibrary[e.iconType].call(this, t, e, i)
                : (t.moveTo(e.x, e.y),
                  t.lineTo(e.x + e.width, e.y),
                  t.lineTo(e.x + e.width, e.y + e.height),
                  t.lineTo(e.x, e.y + e.height),
                  t.lineTo(e.x, e.y),
                  t.closePath());
            },
            getRect: function (t) {
              return t.__rect
                ? t.__rect
                : ((t.__rect = {
                    x: Math.round(t.x),
                    y: Math.round(
                      t.y - ('pin' == t.iconType ? (t.height / 2) * 1.5 : 0),
                    ),
                    width: t.width,
                    height: t.height * ('pin' === t.iconType ? 1.25 : 1),
                  }),
                  t.__rect);
            },
            isCover: function (t, e) {
              var i = this.transformCoordToLocal(t, e);
              (t = i[0]), (e = i[1]);
              var o = this.style.__rect;
              o || (o = this.style.__rect = this.getRect(this.style));
              var n = o.height < 8 || o.width < 8 ? 4 : 0;
              return (
                t >= o.x - n &&
                t <= o.x + o.width + n &&
                e >= o.y - n &&
                e <= o.y + o.height + n
              );
            },
          }),
          M.inherits(E, A),
          E
        );
      },
    ),
    i(
      'echarts/util/shape/HalfSmoothPolygon',
      [
        'require',
        'zrender/shape/Base',
        'zrender/shape/util/smoothBezier',
        'zrender/tool/util',
        'zrender/shape/Polygon',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('zrender/shape/util/smoothBezier'),
          n = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: 'half-smooth-polygon',
            buildPath: function (e, i) {
              var n = i.pointList;
              if (!(n.length < 2))
                if (i.smooth) {
                  var s = o(n.slice(0, -2), i.smooth, !1, i.smoothConstraint);
                  e.moveTo(n[0][0], n[0][1]);
                  for (var r, a, h, l = n.length, d = 0; l - 3 > d; d++)
                    (r = s[2 * d]),
                      (a = s[2 * d + 1]),
                      (h = n[d + 1]),
                      e.bezierCurveTo(r[0], r[1], a[0], a[1], h[0], h[1]);
                  e.lineTo(n[l - 2][0], n[l - 2][1]),
                    e.lineTo(n[l - 1][0], n[l - 1][1]),
                    e.lineTo(n[0][0], n[0][1]);
                } else t('zrender/shape/Polygon').prototype.buildPath(e, i);
            },
          }),
          n.inherits(e, i),
          e
        );
      },
    ),
    i(
      'zrender/shape/Ring',
      ['require', './Base', '../tool/util'],
      function (t) {
        var e = t('./Base'),
          i = function (t) {
            e.call(this, t);
          };
        return (
          (i.prototype = {
            type: 'ring',
            buildPath: function (t, e) {
              t.arc(e.x, e.y, e.r, 0, 2 * Math.PI, !1),
                t.moveTo(e.x + e.r0, e.y),
                t.arc(e.x, e.y, e.r0, 0, 2 * Math.PI, !0);
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e;
              return (
                (e =
                  'stroke' == t.brushType || 'fill' == t.brushType
                    ? t.lineWidth || 1
                    : 0),
                (t.__rect = {
                  x: Math.round(t.x - t.r - e / 2),
                  y: Math.round(t.y - t.r - e / 2),
                  width: 2 * t.r + e,
                  height: 2 * t.r + e,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(i, e),
          i
        );
      },
    ),
    i('zrender/tool/math', [], function () {
      function t(t, e) {
        return Math.sin(e ? t * n : t);
      }
      function e(t, e) {
        return Math.cos(e ? t * n : t);
      }
      function i(t) {
        return t * n;
      }
      function o(t) {
        return t / n;
      }
      var n = Math.PI / 180;
      return { sin: t, cos: e, degreeToRadian: i, radianToDegree: o };
    }),
    i(
      'zrender/shape/Polygon',
      [
        'require',
        './Base',
        './util/smoothSpline',
        './util/smoothBezier',
        './util/dashedLineTo',
        '../tool/util',
      ],
      function (t) {
        var e = t('./Base'),
          i = t('./util/smoothSpline'),
          o = t('./util/smoothBezier'),
          n = t('./util/dashedLineTo'),
          s = function (t) {
            e.call(this, t);
          };
        return (
          (s.prototype = {
            type: 'polygon',
            buildPath: function (t, e) {
              var s = e.pointList;
              if (!(s.length < 2)) {
                if (e.smooth && 'spline' !== e.smooth) {
                  var r = o(s, e.smooth, !0, e.smoothConstraint);
                  t.moveTo(s[0][0], s[0][1]);
                  for (var a, h, l, d = s.length, c = 0; d > c; c++)
                    (a = r[2 * c]),
                      (h = r[2 * c + 1]),
                      (l = s[(c + 1) % d]),
                      t.bezierCurveTo(a[0], a[1], h[0], h[1], l[0], l[1]);
                } else if (
                  ('spline' === e.smooth && (s = i(s, !0)),
                  e.lineType && 'solid' != e.lineType)
                ) {
                  if ('dashed' == e.lineType || 'dotted' == e.lineType) {
                    var p =
                      e._dashLength ||
                      (e.lineWidth || 1) * ('dashed' == e.lineType ? 5 : 1);
                    (e._dashLength = p), t.moveTo(s[0][0], s[0][1]);
                    for (var c = 1, u = s.length; u > c; c++)
                      n(t, s[c - 1][0], s[c - 1][1], s[c][0], s[c][1], p);
                    n(
                      t,
                      s[s.length - 1][0],
                      s[s.length - 1][1],
                      s[0][0],
                      s[0][1],
                      p,
                    );
                  }
                } else {
                  t.moveTo(s[0][0], s[0][1]);
                  for (var c = 1, u = s.length; u > c; c++)
                    t.lineTo(s[c][0], s[c][1]);
                  t.lineTo(s[0][0], s[0][1]);
                }
                t.closePath();
              }
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              for (
                var e = Number.MAX_VALUE,
                  i = Number.MIN_VALUE,
                  o = Number.MAX_VALUE,
                  n = Number.MIN_VALUE,
                  s = t.pointList,
                  r = 0,
                  a = s.length;
                a > r;
                r++
              )
                s[r][0] < e && (e = s[r][0]),
                  s[r][0] > i && (i = s[r][0]),
                  s[r][1] < o && (o = s[r][1]),
                  s[r][1] > n && (n = s[r][1]);
              var h;
              return (
                (h =
                  'stroke' == t.brushType || 'fill' == t.brushType
                    ? t.lineWidth || 1
                    : 0),
                (t.__rect = {
                  x: Math.round(e - h / 2),
                  y: Math.round(o - h / 2),
                  width: i - e + h,
                  height: n - o + h,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(s, e),
          s
        );
      },
    ),
    i('echarts/util/number', [], function () {
      function t(t) {
        return t.replace(/^\s+/, '').replace(/\s+$/, '');
      }
      function e(e, i) {
        return 'string' == typeof e
          ? t(e).match(/%$/)
            ? (parseFloat(e) / 100) * i
            : parseFloat(e)
          : e;
      }
      function i(t, i) {
        return [e(i[0], t.getWidth()), e(i[1], t.getHeight())];
      }
      function o(t, i) {
        i instanceof Array || (i = [0, i]);
        var o = Math.min(t.getWidth(), t.getHeight()) / 2;
        return [e(i[0], o), e(i[1], o)];
      }
      function n(t) {
        return isNaN(t)
          ? '-'
          : ((t = (t + '').split('.')),
            t[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,') +
              (t.length > 1 ? '.' + t[1] : ''));
      }
      function s(t) {
        for (var e = 1, i = 0; Math.round(t * e) / e !== t; ) (e *= 10), i++;
        return i;
      }
      return {
        parsePercent: e,
        parseCenter: i,
        parseRadius: o,
        addCommas: n,
        getPrecision: s,
      };
    }),
    i('zrender/tool/area', ['require', './util', './curve'], function (t) {
      'use strict';
      function e(t) {
        return (t %= O), 0 > t && (t += O), t;
      }
      function i(t, e, i, s) {
        if (!e || !t) return !1;
        var r = t.type;
        z = z || C.getContext();
        var a = o(t, e, i, s);
        if ('undefined' != typeof a) return a;
        if (t.buildPath && z.isPointInPath) return n(t, z, e, i, s);
        switch (r) {
          case 'ellipse':
            return !0;
          case 'trochoid':
            var h = 'out' == e.location ? e.r1 + e.r2 + e.d : e.r1 - e.r2 + e.d;
            return u(e, i, s, h);
          case 'rose':
            return u(e, i, s, e.maxr);
          default:
            return !1;
        }
      }
      function o(t, e, i, o) {
        var n = t.type;
        switch (n) {
          case 'bezier-curve':
            return 'undefined' == typeof e.cpX2
              ? h(
                  e.xStart,
                  e.yStart,
                  e.cpX1,
                  e.cpY1,
                  e.xEnd,
                  e.yEnd,
                  e.lineWidth,
                  i,
                  o,
                )
              : a(
                  e.xStart,
                  e.yStart,
                  e.cpX1,
                  e.cpY1,
                  e.cpX2,
                  e.cpY2,
                  e.xEnd,
                  e.yEnd,
                  e.lineWidth,
                  i,
                  o,
                );
          case 'line':
            return r(e.xStart, e.yStart, e.xEnd, e.yEnd, e.lineWidth, i, o);
          case 'polyline':
            return d(e.pointList, e.lineWidth, i, o);
          case 'ring':
            return c(e.x, e.y, e.r0, e.r, i, o);
          case 'circle':
            return u(e.x, e.y, e.r, i, o);
          case 'sector':
            var s = (e.startAngle * Math.PI) / 180,
              l = (e.endAngle * Math.PI) / 180;
            return (
              e.clockWise || ((s = -s), (l = -l)),
              g(e.x, e.y, e.r0, e.r, s, l, !e.clockWise, i, o)
            );
          case 'path':
            return (
              e.pathArray &&
              b(e.pathArray, Math.max(e.lineWidth, 5), e.brushType, i, o)
            );
          case 'polygon':
          case 'star':
          case 'isogon':
            return f(e.pointList, i, o);
          case 'text':
            var m = e.__rect || t.getRect(e);
            return p(m.x, m.y, m.width, m.height, i, o);
          case 'rectangle':
          case 'image':
            return p(e.x, e.y, e.width, e.height, i, o);
        }
      }
      function n(t, e, i, o, n) {
        return (
          e.beginPath(), t.buildPath(e, i), e.closePath(), e.isPointInPath(o, n)
        );
      }
      function s(t, e, o, n) {
        return !i(t, e, o, n);
      }
      function r(t, e, i, o, n, s, r) {
        if (0 === n) return !1;
        var a = Math.max(n, 5),
          h = 0,
          l = t;
        if (
          (r > e + a && r > o + a) ||
          (e - a > r && o - a > r) ||
          (s > t + a && s > i + a) ||
          (t - a > s && i - a > s)
        )
          return !1;
        if (t === i) return Math.abs(s - t) <= a / 2;
        (h = (e - o) / (t - i)), (l = (t * o - i * e) / (t - i));
        var d = h * s - r + l,
          c = (d * d) / (h * h + 1);
        return ((a / 2) * a) / 2 >= c;
      }
      function a(t, e, i, o, n, s, r, a, h, l, d) {
        if (0 === h) return !1;
        var c = Math.max(h, 5);
        if (
          (d > e + c && d > o + c && d > s + c && d > a + c) ||
          (e - c > d && o - c > d && s - c > d && a - c > d) ||
          (l > t + c && l > i + c && l > n + c && l > r + c) ||
          (t - c > l && i - c > l && n - c > l && r - c > l)
        )
          return !1;
        var p = L.cubicProjectPoint(t, e, i, o, n, s, r, a, l, d, null);
        return c / 2 >= p;
      }
      function h(t, e, i, o, n, s, r, a, h) {
        if (0 === r) return !1;
        var l = Math.max(r, 5);
        if (
          (h > e + l && h > o + l && h > s + l) ||
          (e - l > h && o - l > h && s - l > h) ||
          (a > t + l && a > i + l && a > n + l) ||
          (t - l > a && i - l > a && n - l > a)
        )
          return !1;
        var d = L.quadraticProjectPoint(t, e, i, o, n, s, a, h, null);
        return l / 2 >= d;
      }
      function l(t, i, o, n, s, r, a, h, l) {
        if (0 === a) return !1;
        var d = Math.max(a, 5);
        (h -= t), (l -= i);
        var c = Math.sqrt(h * h + l * l);
        if (c - d > o || o > c + d) return !1;
        if (Math.abs(n - s) >= O) return !0;
        if (r) {
          var p = n;
          (n = e(s)), (s = e(p));
        } else (n = e(n)), (s = e(s));
        n > s && (s += O);
        var u = Math.atan2(l, h);
        return (
          0 > u && (u += O), (u >= n && s >= u) || (u + O >= n && s >= u + O)
        );
      }
      function d(t, e, i, o) {
        for (var e = Math.max(e, 10), n = 0, s = t.length - 1; s > n; n++) {
          var a = t[n][0],
            h = t[n][1],
            l = t[n + 1][0],
            d = t[n + 1][1];
          if (r(a, h, l, d, e, i, o)) return !0;
        }
        return !1;
      }
      function c(t, e, i, o, n, s) {
        var r = (n - t) * (n - t) + (s - e) * (s - e);
        return o * o > r && r > i * i;
      }
      function p(t, e, i, o, n, s) {
        return n >= t && t + i >= n && s >= e && e + o >= s;
      }
      function u(t, e, i, o, n) {
        return i * i > (o - t) * (o - t) + (n - e) * (n - e);
      }
      function g(t, e, i, o, n, s, r, a, h) {
        return l(t, e, (i + o) / 2, n, s, r, o - i, a, h);
      }
      function f(t, e, i) {
        for (var o = t.length, n = 0, s = 0, r = o - 1; o > s; s++) {
          var a = t[r][0],
            h = t[r][1],
            l = t[s][0],
            d = t[s][1];
          (n += m(a, h, l, d, e, i)), (r = s);
        }
        return 0 !== n;
      }
      function m(t, e, i, o, n, s) {
        if ((s > e && s > o) || (e > s && o > s)) return 0;
        if (o == e) return 0;
        var r = e > o ? 1 : -1,
          a = (s - e) / (o - e),
          h = a * (i - t) + t;
        return h > n ? r : 0;
      }
      function _() {
        var t = P[0];
        (P[0] = P[1]), (P[1] = t);
      }
      function y(t, e, i, o, n, s, r, a, h, l) {
        if (
          (l > e && l > o && l > s && l > a) ||
          (e > l && o > l && s > l && a > l)
        )
          return 0;
        var d = L.cubicRootAt(e, o, s, a, l, I);
        if (0 === d) return 0;
        for (var c, p, u = 0, g = -1, f = 0; d > f; f++) {
          var m = I[f],
            y = L.cubicAt(t, i, n, r, m);
          h > y ||
            (0 > g &&
              ((g = L.cubicExtrema(e, o, s, a, P)),
              P[1] < P[0] && g > 1 && _(),
              (c = L.cubicAt(e, o, s, a, P[0])),
              g > 1 && (p = L.cubicAt(e, o, s, a, P[1]))),
            (u +=
              2 == g
                ? m < P[0]
                  ? e > c
                    ? 1
                    : -1
                  : m < P[1]
                  ? c > p
                    ? 1
                    : -1
                  : p > a
                  ? 1
                  : -1
                : m < P[0]
                ? e > c
                  ? 1
                  : -1
                : c > a
                ? 1
                : -1));
        }
        return u;
      }
      function x(t, e, i, o, n, s, r, a) {
        if ((a > e && a > o && a > s) || (e > a && o > a && s > a)) return 0;
        var h = L.quadraticRootAt(e, o, s, a, I);
        if (0 === h) return 0;
        var l = L.quadraticExtremum(e, o, s);
        if (l >= 0 && 1 >= l) {
          for (var d = 0, c = L.quadraticAt(e, o, s, l), p = 0; h > p; p++) {
            var u = L.quadraticAt(t, i, n, I[p]);
            r > u || (d += I[p] < l ? (e > c ? 1 : -1) : c > s ? 1 : -1);
          }
          return d;
        }
        var u = L.quadraticAt(t, i, n, I[0]);
        return r > u ? 0 : e > s ? 1 : -1;
      }
      function v(t, i, o, n, s, r, a, h) {
        if (((h -= i), h > o || -o > h)) return 0;
        var l = Math.sqrt(o * o - h * h);
        if (((I[0] = -l), (I[1] = l), Math.abs(n - s) >= O)) {
          (n = 0), (s = O);
          var d = r ? 1 : -1;
          return a >= I[0] + t && a <= I[1] + t ? d : 0;
        }
        if (r) {
          var l = n;
          (n = e(s)), (s = e(l));
        } else (n = e(n)), (s = e(s));
        n > s && (s += O);
        for (var c = 0, p = 0; 2 > p; p++) {
          var u = I[p];
          if (u + t > a) {
            var g = Math.atan2(h, u),
              d = r ? 1 : -1;
            0 > g && (g = O + g),
              ((g >= n && s >= g) || (g + O >= n && s >= g + O)) &&
                (g > Math.PI / 2 && g < 1.5 * Math.PI && (d = -d), (c += d));
          }
        }
        return c;
      }
      function b(t, e, i, o, n) {
        var s = 0,
          d = 0,
          c = 0,
          p = 0,
          u = 0,
          g = !0,
          f = !0;
        i = i || 'fill';
        for (
          var _ = 'stroke' === i || 'both' === i,
            b = 'fill' === i || 'both' === i,
            S = 0;
          S < t.length;
          S++
        ) {
          var T = t[S],
            z = T.points;
          if (g || 'M' === T.command) {
            if (S > 0 && (b && (s += m(d, c, p, u, o, n)), 0 !== s)) return !0;
            (p = z[z.length - 2]),
              (u = z[z.length - 1]),
              (g = !1),
              f && 'A' !== T.command && ((f = !1), (d = p), (c = u));
          }
          switch (T.command) {
            case 'M':
              (d = z[0]), (c = z[1]);
              break;
            case 'L':
              if (_ && r(d, c, z[0], z[1], e, o, n)) return !0;
              b && (s += m(d, c, z[0], z[1], o, n)), (d = z[0]), (c = z[1]);
              break;
            case 'C':
              if (_ && a(d, c, z[0], z[1], z[2], z[3], z[4], z[5], e, o, n))
                return !0;
              b && (s += y(d, c, z[0], z[1], z[2], z[3], z[4], z[5], o, n)),
                (d = z[4]),
                (c = z[5]);
              break;
            case 'Q':
              if (_ && h(d, c, z[0], z[1], z[2], z[3], e, o, n)) return !0;
              b && (s += x(d, c, z[0], z[1], z[2], z[3], o, n)),
                (d = z[2]),
                (c = z[3]);
              break;
            case 'A':
              var C = z[0],
                L = z[1],
                w = z[2],
                E = z[3],
                M = z[4],
                A = z[5],
                k = Math.cos(M) * w + C,
                O = Math.sin(M) * E + L;
              f ? ((f = !1), (p = k), (u = O)) : (s += m(d, c, k, O));
              var I = ((o - C) * E) / w + C;
              if (_ && l(C, L, E, M, M + A, 1 - z[7], e, I, n)) return !0;
              b && (s += v(C, L, E, M, M + A, 1 - z[7], I, n)),
                (d = Math.cos(M + A) * w + C),
                (c = Math.sin(M + A) * E + L);
              break;
            case 'z':
              if (_ && r(d, c, p, u, e, o, n)) return !0;
              g = !0;
          }
        }
        return b && (s += m(d, c, p, u, o, n)), 0 !== s;
      }
      function S(t, e) {
        var i = t + ':' + e;
        if (w[i]) return w[i];
        (z = z || C.getContext()),
          z.save(),
          e && (z.font = e),
          (t = (t + '').split('\n'));
        for (var o = 0, n = 0, s = t.length; s > n; n++)
          o = Math.max(z.measureText(t[n]).width, o);
        return z.restore(), (w[i] = o), ++M > k && ((M = 0), (w = {})), o;
      }
      function T(t, e) {
        var i = t + ':' + e;
        if (E[i]) return E[i];
        (z = z || C.getContext()),
          z.save(),
          e && (z.font = e),
          (t = (t + '').split('\n'));
        var o = (z.measureText('国').width + 2) * t.length;
        return z.restore(), (E[i] = o), ++A > k && ((A = 0), (E = {})), o;
      }
      var z,
        C = t('./util'),
        L = t('./curve'),
        w = {},
        E = {},
        M = 0,
        A = 0,
        k = 5e3,
        O = 2 * Math.PI,
        I = [-1, -1, -1],
        P = [-1, -1];
      return {
        isInside: i,
        isOutside: s,
        getTextWidth: S,
        getTextHeight: T,
        isInsidePath: b,
        isInsidePolygon: f,
        isInsideSector: g,
        isInsideCircle: u,
        isInsideLine: r,
        isInsideRect: p,
        isInsidePolyline: d,
        isInsideCubicStroke: a,
        isInsideQuadraticStroke: h,
      };
    }),
    i(
      'echarts/chart/base',
      [
        'require',
        'zrender/shape/Image',
        '../util/shape/Icon',
        '../util/shape/MarkLine',
        '../util/shape/Symbol',
        'zrender/shape/Polyline',
        'zrender/shape/ShapeBundle',
        '../config',
        '../util/ecData',
        '../util/ecAnimation',
        '../util/ecEffect',
        '../util/accMath',
        '../component/base',
        '../layout/EdgeBundling',
        'zrender/tool/util',
        'zrender/tool/area',
      ],
      function (t) {
        function e(t) {
          return null != t.x && null != t.y;
        }
        function i(t, e, i, o, n) {
          g.call(this, t, e, i, o, n);
          var s = this;
          (this.selectedMap = {}),
            (this.lastShapeList = []),
            (this.shapeHandler = {
              onclick: function () {
                s.isClick = !0;
              },
              ondragover: function (t) {
                var e = t.target;
                e.highlightStyle = e.highlightStyle || {};
                var i = e.highlightStyle,
                  o = i.brushTyep,
                  n = i.strokeColor,
                  r = i.lineWidth;
                (i.brushType = 'stroke'),
                  (i.strokeColor =
                    s.ecTheme.calculableColor || l.calculableColor),
                  (i.lineWidth = 'icon' === e.type ? 30 : 10),
                  s.zr.addHoverShape(e),
                  setTimeout(function () {
                    i &&
                      ((i.brushType = o),
                      (i.strokeColor = n),
                      (i.lineWidth = r));
                  }, 20);
              },
              ondrop: function (t) {
                null != d.get(t.dragged, 'data') && (s.isDrop = !0);
              },
              ondragend: function () {
                s.isDragend = !0;
              },
            });
        }
        var o = t('zrender/shape/Image'),
          n = t('../util/shape/Icon'),
          s = t('../util/shape/MarkLine'),
          r = t('../util/shape/Symbol'),
          a = t('zrender/shape/Polyline'),
          h = t('zrender/shape/ShapeBundle'),
          l = t('../config'),
          d = t('../util/ecData'),
          c = t('../util/ecAnimation'),
          p = t('../util/ecEffect'),
          u = t('../util/accMath'),
          g = t('../component/base'),
          f = t('../layout/EdgeBundling'),
          m = t('zrender/tool/util'),
          _ = t('zrender/tool/area');
        return (
          (i.prototype = {
            setCalculable: function (t) {
              return (
                (t.dragEnableTime =
                  this.ecTheme.DRAG_ENABLE_TIME || l.DRAG_ENABLE_TIME),
                (t.ondragover = this.shapeHandler.ondragover),
                (t.ondragend = this.shapeHandler.ondragend),
                (t.ondrop = this.shapeHandler.ondrop),
                t
              );
            },
            ondrop: function (t, e) {
              if (this.isDrop && t.target && !e.dragIn) {
                var i,
                  o = t.target,
                  n = t.dragged,
                  s = d.get(o, 'seriesIndex'),
                  r = d.get(o, 'dataIndex'),
                  a = this.series,
                  h = this.component.legend;
                if (-1 === r) {
                  if (d.get(n, 'seriesIndex') == s)
                    return (
                      (e.dragOut = e.dragIn = e.needRefresh = !0),
                      void (this.isDrop = !1)
                    );
                  (i = { value: d.get(n, 'value'), name: d.get(n, 'name') }),
                    this.type === l.CHART_TYPE_PIE &&
                      i.value < 0 &&
                      (i.value = 0);
                  for (
                    var c = !1, p = a[s].data, g = 0, f = p.length;
                    f > g;
                    g++
                  )
                    p[g].name === i.name &&
                      '-' === p[g].value &&
                      ((a[s].data[g].value = i.value), (c = !0));
                  !c && a[s].data.push(i),
                    h && h.add(i.name, n.style.color || n.style.strokeColor);
                } else
                  (i = a[s].data[r] || '-'),
                    null != i.value
                      ? ((a[s].data[r].value =
                          '-' != i.value
                            ? u.accAdd(a[s].data[r].value, d.get(n, 'value'))
                            : d.get(n, 'value')),
                        (this.type === l.CHART_TYPE_FUNNEL ||
                          this.type === l.CHART_TYPE_PIE) &&
                          (h &&
                            1 === h.getRelatedAmount(i.name) &&
                            this.component.legend.del(i.name),
                          (i.name +=
                            this.option.nameConnector + d.get(n, 'name')),
                          h &&
                            h.add(
                              i.name,
                              n.style.color || n.style.strokeColor,
                            )))
                      : (a[s].data[r] =
                          '-' != i
                            ? u.accAdd(a[s].data[r], d.get(n, 'value'))
                            : d.get(n, 'value'));
                (e.dragIn = e.dragIn || !0), (this.isDrop = !1);
                var m = this;
                setTimeout(function () {
                  m.zr.trigger('mousemove', t.event);
                }, 300);
              }
            },
            ondragend: function (t, e) {
              if (this.isDragend && t.target && !e.dragOut) {
                var i = t.target,
                  o = d.get(i, 'seriesIndex'),
                  n = d.get(i, 'dataIndex'),
                  s = this.series;
                if (null != s[o].data[n].value) {
                  s[o].data[n].value = '-';
                  var r = s[o].data[n].name,
                    a = this.component.legend;
                  a && 0 === a.getRelatedAmount(r) && a.del(r);
                } else s[o].data[n] = '-';
                (e.dragOut = !0), (e.needRefresh = !0), (this.isDragend = !1);
              }
            },
            onlegendSelected: function (t, e) {
              var i = t.selected;
              for (var o in this.selectedMap)
                this.selectedMap[o] != i[o] && (e.needRefresh = !0),
                  (this.selectedMap[o] = i[o]);
            },
            _buildPosition: function () {
              (this._symbol = this.option.symbolList),
                (this._sIndex2ShapeMap = {}),
                (this._sIndex2ColorMap = {}),
                (this.selectedMap = {}),
                (this.xMarkMap = {});
              for (
                var t,
                  e,
                  i,
                  o,
                  n = this.series,
                  s = { top: [], bottom: [], left: [], right: [], other: [] },
                  r = 0,
                  a = n.length;
                a > r;
                r++
              )
                n[r].type === this.type &&
                  ((n[r] = this.reformOption(n[r])),
                  (this.legendHoverLink =
                    n[r].legendHoverLink || this.legendHoverLink),
                  (t = n[r].xAxisIndex),
                  (e = n[r].yAxisIndex),
                  (i = this.component.xAxis.getAxis(t)),
                  (o = this.component.yAxis.getAxis(e)),
                  i.type === l.COMPONENT_TYPE_AXIS_CATEGORY
                    ? s[i.getPosition()].push(r)
                    : o.type === l.COMPONENT_TYPE_AXIS_CATEGORY
                    ? s[o.getPosition()].push(r)
                    : s.other.push(r));
              for (var h in s)
                s[h].length > 0 && this._buildSinglePosition(h, s[h]);
              this.addShapeList();
            },
            _buildSinglePosition: function (t, e) {
              var i = this._mapData(e),
                o = i.locationMap,
                n = i.maxDataLength;
              if (0 !== n && 0 !== o.length) {
                switch (t) {
                  case 'bottom':
                  case 'top':
                    this._buildHorizontal(e, n, o, this.xMarkMap);
                    break;
                  case 'left':
                  case 'right':
                    this._buildVertical(e, n, o, this.xMarkMap);
                    break;
                  case 'other':
                    this._buildOther(e, n, o, this.xMarkMap);
                }
                for (var s = 0, r = e.length; r > s; s++) this.buildMark(e[s]);
              }
            },
            _mapData: function (t) {
              for (
                var e,
                  i,
                  o,
                  n,
                  s = this.series,
                  r = 0,
                  a = {},
                  h = '__kener__stack__',
                  d = this.component.legend,
                  c = [],
                  p = 0,
                  u = 0,
                  g = t.length;
                g > u;
                u++
              ) {
                if (
                  ((e = s[t[u]]),
                  (o = e.name),
                  (this._sIndex2ShapeMap[t[u]] =
                    this._sIndex2ShapeMap[t[u]] ||
                    this.query(e, 'symbol') ||
                    this._symbol[u % this._symbol.length]),
                  d)
                ) {
                  if (
                    ((this.selectedMap[o] = d.isSelected(o)),
                    (this._sIndex2ColorMap[t[u]] = d.getColor(o)),
                    (n = d.getItemShape(o)))
                  ) {
                    var f = n.style;
                    if (this.type == l.CHART_TYPE_LINE)
                      (f.iconType = 'legendLineIcon'),
                        (f.symbol = this._sIndex2ShapeMap[t[u]]);
                    else if (e.itemStyle.normal.barBorderWidth > 0) {
                      var m = n.highlightStyle;
                      (f.brushType = 'both'),
                        (f.x += 1),
                        (f.y += 1),
                        (f.width -= 2),
                        (f.height -= 2),
                        (f.strokeColor = m.strokeColor =
                          e.itemStyle.normal.barBorderColor),
                        (m.lineWidth = 3);
                    }
                    d.setItemShape(o, n);
                  }
                } else
                  (this.selectedMap[o] = !0),
                    (this._sIndex2ColorMap[t[u]] = this.zr.getColor(t[u]));
                this.selectedMap[o] &&
                  ((i = e.stack || h + t[u]),
                  null == a[i]
                    ? ((a[i] = r), (c[r] = [t[u]]), r++)
                    : c[a[i]].push(t[u])),
                  (p = Math.max(p, e.data.length));
              }
              return { locationMap: c, maxDataLength: p };
            },
            _calculMarkMapXY: function (t, e, i) {
              for (var o = this.series, n = 0, s = e.length; s > n; n++)
                for (var r = 0, a = e[n].length; a > r; r++) {
                  var h = e[n][r],
                    l = 'xy' == i ? 0 : '',
                    d = this.component.grid,
                    c = t[h];
                  if ('-1' != i.indexOf('x')) {
                    c['counter' + l] > 0 &&
                      (c['average' + l] = c['sum' + l] / c['counter' + l]);
                    var p = this.component.xAxis
                      .getAxis(o[h].xAxisIndex || 0)
                      .getCoord(c['average' + l]);
                    (c['averageLine' + l] = [
                      [p, d.getYend()],
                      [p, d.getY()],
                    ]),
                      (c['minLine' + l] = [
                        [c['minX' + l], d.getYend()],
                        [c['minX' + l], d.getY()],
                      ]),
                      (c['maxLine' + l] = [
                        [c['maxX' + l], d.getYend()],
                        [c['maxX' + l], d.getY()],
                      ]),
                      (c.isHorizontal = !1);
                  }
                  if (((l = 'xy' == i ? 1 : ''), '-1' != i.indexOf('y'))) {
                    c['counter' + l] > 0 &&
                      (c['average' + l] = c['sum' + l] / c['counter' + l]);
                    var u = this.component.yAxis
                      .getAxis(o[h].yAxisIndex || 0)
                      .getCoord(c['average' + l]);
                    (c['averageLine' + l] = [
                      [d.getX(), u],
                      [d.getXend(), u],
                    ]),
                      (c['minLine' + l] = [
                        [d.getX(), c['minY' + l]],
                        [d.getXend(), c['minY' + l]],
                      ]),
                      (c['maxLine' + l] = [
                        [d.getX(), c['maxY' + l]],
                        [d.getXend(), c['maxY' + l]],
                      ]),
                      (c.isHorizontal = !0);
                  }
                }
            },
            addLabel: function (t, e, i, o, n) {
              var s = [i, e],
                r = this.deepMerge(s, 'itemStyle.normal.label'),
                a = this.deepMerge(s, 'itemStyle.emphasis.label'),
                h = r.textStyle || {},
                l = a.textStyle || {};
              if (r.show) {
                var d = t.style;
                (d.text = this._getLabelText(e, i, o, 'normal')),
                  (d.textPosition =
                    null == r.position
                      ? 'horizontal' === n
                        ? 'right'
                        : 'top'
                      : r.position),
                  (d.textColor = h.color),
                  (d.textFont = this.getFont(h)),
                  (d.textAlign = h.align),
                  (d.textBaseline = h.baseline);
              }
              if (a.show) {
                var c = t.highlightStyle;
                (c.text = this._getLabelText(e, i, o, 'emphasis')),
                  (c.textPosition = r.show
                    ? t.style.textPosition
                    : null == a.position
                    ? 'horizontal' === n
                      ? 'right'
                      : 'top'
                    : a.position),
                  (c.textColor = l.color),
                  (c.textFont = this.getFont(l)),
                  (c.textAlign = l.align),
                  (c.textBaseline = l.baseline);
              }
              return t;
            },
            _getLabelText: function (t, e, i, o) {
              var n = this.deepQuery(
                [e, t],
                'itemStyle.' + o + '.label.formatter',
              );
              n ||
                'emphasis' !== o ||
                (n = this.deepQuery(
                  [e, t],
                  'itemStyle.normal.label.formatter',
                ));
              var s = this.getDataFromOption(e, '-');
              return n
                ? 'function' == typeof n
                  ? n.call(this.myChart, {
                      seriesName: t.name,
                      series: t,
                      name: i,
                      value: s,
                      data: e,
                      status: o,
                    })
                  : 'string' == typeof n
                  ? (n = n
                      .replace('{a}', '{a0}')
                      .replace('{b}', '{b0}')
                      .replace('{c}', '{c0}')
                      .replace('{a0}', t.name)
                      .replace('{b0}', i)
                      .replace('{c0}', this.numAddCommas(s)))
                  : void 0
                : s instanceof Array
                ? null != s[2]
                  ? this.numAddCommas(s[2])
                  : s[0] + ' , ' + s[1]
                : this.numAddCommas(s);
            },
            buildMark: function (t) {
              var e = this.series[t];
              this.selectedMap[e.name] &&
                (e.markLine && this._buildMarkLine(t),
                e.markPoint && this._buildMarkPoint(t));
            },
            _buildMarkPoint: function (t) {
              for (
                var e,
                  i,
                  o = (this.markAttachStyle || {})[t],
                  n = this.series[t],
                  s = m.clone(n.markPoint),
                  r = 0,
                  a = s.data.length;
                a > r;
                r++
              )
                (e = s.data[r]),
                  (i = this.getMarkCoord(t, e)),
                  (e.x = null != e.x ? e.x : i[0]),
                  (e.y = null != e.y ? e.y : i[1]),
                  !e.type ||
                    ('max' !== e.type && 'min' !== e.type) ||
                    ((e.value = i[3]),
                    (e.name = e.name || e.type),
                    (e.symbolSize =
                      e.symbolSize ||
                      _.getTextWidth(i[3], this.getFont()) / 2 + 5));
              for (
                var h = this._markPoint(t, s), r = 0, a = h.length;
                a > r;
                r++
              ) {
                var d = h[r];
                (d.zlevel = n.zlevel), (d.z = n.z + 1);
                for (var c in o) d[c] = m.clone(o[c]);
                this.shapeList.push(d);
              }
              if (
                this.type === l.CHART_TYPE_FORCE ||
                this.type === l.CHART_TYPE_CHORD
              )
                for (var r = 0, a = h.length; a > r; r++)
                  this.zr.addShape(h[r]);
            },
            _buildMarkLine: function (t) {
              for (
                var e,
                  i = (this.markAttachStyle || {})[t],
                  o = this.series[t],
                  n = m.clone(o.markLine),
                  s = 0,
                  r = n.data.length;
                r > s;
                s++
              ) {
                var a = n.data[s];
                !a.type ||
                ('max' !== a.type && 'min' !== a.type && 'average' !== a.type)
                  ? (e = [
                      this.getMarkCoord(t, a[0]),
                      this.getMarkCoord(t, a[1]),
                    ])
                  : ((e = this.getMarkCoord(t, a)),
                    (n.data[s] = [m.clone(a), {}]),
                    (n.data[s][0].name = a.name || a.type),
                    (n.data[s][0].value =
                      'average' !== a.type
                        ? e[3]
                        : +e[3].toFixed(
                            null != n.precision
                              ? n.precision
                              : this.deepQuery(
                                  [this.ecTheme, l],
                                  'markLine.precision',
                                ),
                          )),
                    (e = e[2]),
                    (a = [{}, {}])),
                  null != e &&
                    null != e[0] &&
                    null != e[1] &&
                    ((n.data[s][0].x = null != a[0].x ? a[0].x : e[0][0]),
                    (n.data[s][0].y = null != a[0].y ? a[0].y : e[0][1]),
                    (n.data[s][1].x = null != a[1].x ? a[1].x : e[1][0]),
                    (n.data[s][1].y = null != a[1].y ? a[1].y : e[1][1]));
              }
              var d = this._markLine(t, n),
                c = n.large;
              if (c) {
                var p = new h({ style: { shapeList: d } }),
                  u = d[0];
                if (u) {
                  m.merge(p.style, u.style),
                    m.merge((p.highlightStyle = {}), u.highlightStyle),
                    (p.style.brushType = 'stroke'),
                    (p.zlevel = o.zlevel),
                    (p.z = o.z + 1),
                    (p.hoverable = !1);
                  for (var g in i) p[g] = m.clone(i[g]);
                }
                this.shapeList.push(p),
                  this.zr.addShape(p),
                  (p._mark = 'largeLine');
                var f = n.effect;
                f.show && (p.effect = f);
              } else {
                for (var s = 0, r = d.length; r > s; s++) {
                  var _ = d[s];
                  (_.zlevel = o.zlevel), (_.z = o.z + 1);
                  for (var g in i) _[g] = m.clone(i[g]);
                  this.shapeList.push(_);
                }
                if (
                  this.type === l.CHART_TYPE_FORCE ||
                  this.type === l.CHART_TYPE_CHORD
                )
                  for (var s = 0, r = d.length; r > s; s++)
                    this.zr.addShape(d[s]);
              }
            },
            _markPoint: function (t, e) {
              var i = this.series[t],
                o = this.component;
              m.merge(
                m.merge(e, m.clone(this.ecTheme.markPoint || {})),
                m.clone(l.markPoint),
              ),
                (e.name = i.name);
              var n,
                s,
                r,
                a,
                h,
                c,
                p,
                u = [],
                g = e.data,
                f = o.dataRange,
                _ = o.legend,
                y = this.zr.getWidth(),
                x = this.zr.getHeight();
              if (e.large)
                (n = this.getLargeMarkPointShape(t, e)),
                  (n._mark = 'largePoint'),
                  n && u.push(n);
              else
                for (var v = 0, b = g.length; b > v; v++)
                  null != g[v].x &&
                    null != g[v].y &&
                    ((r = null != g[v].value ? g[v].value : ''),
                    _ && (s = _.getColor(i.name)),
                    (f &&
                      ((s = isNaN(r) ? s : f.getColor(r)),
                      (a = [g[v], e]),
                      (h = this.deepQuery(a, 'itemStyle.normal.color') || s),
                      (c = this.deepQuery(a, 'itemStyle.emphasis.color') || h),
                      null == h && null == c)) ||
                      ((s = null == s ? this.zr.getColor(t) : s),
                      (g[v].tooltip = g[v].tooltip ||
                        e.tooltip || { trigger: 'item' }),
                      (g[v].name = null != g[v].name ? g[v].name : ''),
                      (g[v].value = r),
                      (n = this.getSymbolShape(
                        e,
                        t,
                        g[v],
                        v,
                        g[v].name,
                        this.parsePercent(g[v].x, y),
                        this.parsePercent(g[v].y, x),
                        'pin',
                        s,
                        'rgba(0,0,0,0)',
                        'horizontal',
                      )),
                      (n._mark = 'point'),
                      (p = this.deepMerge([g[v], e], 'effect')),
                      p.show && (n.effect = p),
                      i.type === l.CHART_TYPE_MAP &&
                        (n._geo = this.getMarkGeo(g[v])),
                      d.pack(n, i, t, g[v], v, g[v].name, r),
                      u.push(n)));
              return u;
            },
            _markLine: (function () {
              function t(t, e) {
                t[e] =
                  t[e] instanceof Array
                    ? t[e].length > 1
                      ? t[e]
                      : [t[e][0], t[e][0]]
                    : [t[e], t[e]];
              }
              return function (i, o) {
                var n = this.series[i],
                  s = this.component,
                  r = s.dataRange,
                  a = s.legend;
                m.merge(
                  m.merge(o, m.clone(this.ecTheme.markLine || {})),
                  m.clone(l.markLine),
                );
                var h = a ? a.getColor(n.name) : this.zr.getColor(i);
                t(o, 'symbol'), t(o, 'symbolSize'), t(o, 'symbolRotate');
                for (
                  var c = o.data,
                    p = [],
                    u = this.zr.getWidth(),
                    g = this.zr.getHeight(),
                    _ = 0;
                  _ < c.length;
                  _++
                ) {
                  var y = c[_];
                  if (e(y[0]) && e(y[1])) {
                    var x = this.deepMerge(y),
                      v = [x, o],
                      b = h,
                      S = null != x.value ? x.value : '';
                    if (r) {
                      b = isNaN(S) ? b : r.getColor(S);
                      var T = this.deepQuery(v, 'itemStyle.normal.color') || b,
                        z = this.deepQuery(v, 'itemStyle.emphasis.color') || T;
                      if (null == T && null == z) continue;
                    }
                    (y[0].tooltip = x.tooltip ||
                      o.tooltip || { trigger: 'item' }),
                      (y[0].name = y[0].name || ''),
                      (y[1].name = y[1].name || ''),
                      (y[0].value = S),
                      p.push({
                        points: [
                          [
                            this.parsePercent(y[0].x, u),
                            this.parsePercent(y[0].y, g),
                          ],
                          [
                            this.parsePercent(y[1].x, u),
                            this.parsePercent(y[1].y, g),
                          ],
                        ],
                        rawData: y,
                        color: b,
                      });
                  }
                }
                var C = this.query(o, 'bundling.enable');
                if (C) {
                  var L = new f();
                  (L.maxTurningAngle =
                    (this.query(o, 'bundling.maxTurningAngle') / 180) *
                    Math.PI),
                    (p = L.run(p));
                }
                o.name = n.name;
                for (var w = [], _ = 0, E = p.length; E > _; _++) {
                  var M = p[_],
                    A = M.rawEdge || M,
                    y = A.rawData,
                    S = null != y.value ? y.value : '',
                    k = this.getMarkLineShape(o, i, y, _, M.points, C, A.color);
                  k._mark = 'line';
                  var O = this.deepMerge([y[0], y[1], o], 'effect');
                  O.show && ((k.effect = O), (k.effect.large = o.large)),
                    n.type === l.CHART_TYPE_MAP &&
                      (k._geo = [this.getMarkGeo(y[0]), this.getMarkGeo(y[1])]),
                    d.pack(
                      k,
                      n,
                      i,
                      y[0],
                      _,
                      y[0].name + ('' !== y[1].name ? ' > ' + y[1].name : ''),
                      S,
                    ),
                    w.push(k);
                }
                return w;
              };
            })(),
            getMarkCoord: function () {
              return [0, 0];
            },
            getSymbolShape: function (t, e, i, s, r, a, h, l, c, p, u) {
              var g = [i, t],
                f = this.getDataFromOption(i, '-');
              l = this.deepQuery(g, 'symbol') || l;
              var m = this.deepQuery(g, 'symbolSize');
              (m = 'function' == typeof m ? m(f) : m),
                'number' == typeof m && (m = [m, m]);
              var _ = this.deepQuery(g, 'symbolRotate'),
                y = this.deepMerge(g, 'itemStyle.normal'),
                x = this.deepMerge(g, 'itemStyle.emphasis'),
                v =
                  null != y.borderWidth
                    ? y.borderWidth
                    : y.lineStyle && y.lineStyle.width;
              null == v && (v = l.match('empty') ? 2 : 0);
              var b =
                null != x.borderWidth
                  ? x.borderWidth
                  : x.lineStyle && x.lineStyle.width;
              null == b && (b = v + 2);
              var S = this.getItemStyleColor(y.color, e, s, i),
                T = this.getItemStyleColor(x.color, e, s, i),
                z = m[0],
                C = m[1],
                L = new n({
                  style: {
                    iconType: l.replace('empty', '').toLowerCase(),
                    x: a - z,
                    y: h - C,
                    width: 2 * z,
                    height: 2 * C,
                    brushType: 'both',
                    color: l.match('empty') ? p : S || c,
                    strokeColor: y.borderColor || S || c,
                    lineWidth: v,
                  },
                  highlightStyle: {
                    color: l.match('empty') ? p : T || S || c,
                    strokeColor: x.borderColor || y.borderColor || T || S || c,
                    lineWidth: b,
                  },
                  clickable: this.deepQuery(g, 'clickable'),
                });
              return (
                l.match('image') &&
                  ((L.style.image = l.replace(new RegExp('^image:\\/\\/'), '')),
                  (L = new o({
                    style: L.style,
                    highlightStyle: L.highlightStyle,
                    clickable: this.deepQuery(g, 'clickable'),
                  }))),
                null != _ && (L.rotation = [(_ * Math.PI) / 180, a, h]),
                l.match('star') &&
                  ((L.style.iconType = 'star'),
                  (L.style.n =
                    l.replace('empty', '').replace('star', '') - 0 || 5)),
                'none' === l && ((L.invisible = !0), (L.hoverable = !1)),
                (L = this.addLabel(L, t, i, r, u)),
                l.match('empty') &&
                  (null == L.style.textColor &&
                    (L.style.textColor = L.style.strokeColor),
                  null == L.highlightStyle.textColor &&
                    (L.highlightStyle.textColor =
                      L.highlightStyle.strokeColor)),
                d.pack(L, t, e, i, s, r),
                (L._x = a),
                (L._y = h),
                (L._dataIndex = s),
                (L._seriesIndex = e),
                L
              );
            },
            getMarkLineShape: function (t, e, i, o, n, r, h) {
              var l = null != i[0].value ? i[0].value : '-',
                d = null != i[1].value ? i[1].value : '-',
                c = [i[0].symbol || t.symbol[0], i[1].symbol || t.symbol[1]],
                p = [
                  i[0].symbolSize || t.symbolSize[0],
                  i[1].symbolSize || t.symbolSize[1],
                ];
              (p[0] = 'function' == typeof p[0] ? p[0](l) : p[0]),
                (p[1] = 'function' == typeof p[1] ? p[1](d) : p[1]);
              var u = [
                  this.query(i[0], 'symbolRotate') || t.symbolRotate[0],
                  this.query(i[1], 'symbolRotate') || t.symbolRotate[1],
                ],
                g = [i[0], i[1], t],
                f = this.deepMerge(g, 'itemStyle.normal');
              f.color = this.getItemStyleColor(f.color, e, o, i);
              var m = this.deepMerge(g, 'itemStyle.emphasis');
              m.color = this.getItemStyleColor(m.color, e, o, i);
              var _ = f.lineStyle,
                y = m.lineStyle,
                x = _.width;
              null == x && (x = f.borderWidth);
              var v = y.width;
              null == v && (v = null != m.borderWidth ? m.borderWidth : x + 2);
              var b = this.deepQuery(g, 'smoothness');
              this.deepQuery(g, 'smooth') || (b = 0);
              var S = r ? a : s,
                T = new S({
                  style: {
                    symbol: c,
                    symbolSize: p,
                    symbolRotate: u,
                    brushType: 'both',
                    lineType: _.type,
                    shadowColor:
                      _.shadowColor || _.color || f.borderColor || f.color || h,
                    shadowBlur: _.shadowBlur,
                    shadowOffsetX: _.shadowOffsetX,
                    shadowOffsetY: _.shadowOffsetY,
                    color: f.color || h,
                    strokeColor: _.color || f.borderColor || f.color || h,
                    lineWidth: x,
                    symbolBorderColor: f.borderColor || f.color || h,
                    symbolBorder: f.borderWidth,
                  },
                  highlightStyle: {
                    shadowColor: y.shadowColor,
                    shadowBlur: y.shadowBlur,
                    shadowOffsetX: y.shadowOffsetX,
                    shadowOffsetY: y.shadowOffsetY,
                    color: m.color || f.color || h,
                    strokeColor:
                      y.color ||
                      _.color ||
                      m.borderColor ||
                      f.borderColor ||
                      m.color ||
                      f.color ||
                      h,
                    lineWidth: v,
                    symbolBorderColor:
                      m.borderColor || f.borderColor || m.color || f.color || h,
                    symbolBorder:
                      null == m.borderWidth ? f.borderWidth + 2 : m.borderWidth,
                  },
                  clickable: this.deepQuery(g, 'clickable'),
                }),
                z = T.style;
              return (
                r
                  ? ((z.pointList = n), (z.smooth = b))
                  : ((z.xStart = n[0][0]),
                    (z.yStart = n[0][1]),
                    (z.xEnd = n[1][0]),
                    (z.yEnd = n[1][1]),
                    (z.curveness = b),
                    T.updatePoints(T.style)),
                (T = this.addLabel(T, t, i[0], i[0].name + ' : ' + i[1].name))
              );
            },
            getLargeMarkPointShape: function (t, e) {
              var i,
                o,
                n,
                s,
                a,
                h,
                l = this.series[t],
                d = this.component,
                c = e.data,
                p = d.dataRange,
                u = d.legend,
                g = [c[0], e];
              if (
                (u && (o = u.getColor(l.name)),
                !p ||
                  ((n = null != c[0].value ? c[0].value : ''),
                  (o = isNaN(n) ? o : p.getColor(n)),
                  (s = this.deepQuery(g, 'itemStyle.normal.color') || o),
                  (a = this.deepQuery(g, 'itemStyle.emphasis.color') || s),
                  null != s || null != a))
              ) {
                o = this.deepMerge(g, 'itemStyle.normal').color || o;
                var f = this.deepQuery(g, 'symbol') || 'circle';
                (f = f.replace('empty', '').replace(/\d/g, '')),
                  (h = this.deepMerge([c[0], e], 'effect'));
                var m = window.devicePixelRatio || 1;
                return (
                  (i = new r({
                    style: {
                      pointList: c,
                      color: o,
                      strokeColor: o,
                      shadowColor: h.shadowColor || o,
                      shadowBlur: (null != h.shadowBlur ? h.shadowBlur : 8) * m,
                      size: this.deepQuery(g, 'symbolSize'),
                      iconType: f,
                      brushType: 'fill',
                      lineWidth: 1,
                    },
                    draggable: !1,
                    hoverable: !1,
                  })),
                  h.show && (i.effect = h),
                  i
                );
              }
            },
            backupShapeList: function () {
              this.shapeList && this.shapeList.length > 0
                ? ((this.lastShapeList = this.shapeList), (this.shapeList = []))
                : (this.lastShapeList = []);
            },
            addShapeList: function () {
              var t,
                e,
                i =
                  this.option.animationThreshold /
                  (this.canvasSupported ? 2 : 4),
                o = this.lastShapeList,
                n = this.shapeList,
                s = o.length > 0,
                r = s
                  ? this.query(this.option, 'animationDurationUpdate')
                  : this.query(this.option, 'animationDuration'),
                a = this.query(this.option, 'animationEasing'),
                h = {},
                d = {};
              if (
                this.option.animation &&
                !this.option.renderAsImage &&
                n.length < i &&
                !this.motionlessOnce
              ) {
                for (var c = 0, p = o.length; p > c; c++)
                  (e = this._getAnimationKey(o[c])),
                    e.match('undefined')
                      ? this.zr.delShape(o[c].id)
                      : ((e += o[c].type),
                        h[e] ? this.zr.delShape(o[c].id) : (h[e] = o[c]));
                for (var c = 0, p = n.length; p > c; c++)
                  (e = this._getAnimationKey(n[c])),
                    e.match('undefined')
                      ? this.zr.addShape(n[c])
                      : ((e += n[c].type), (d[e] = n[c]));
                for (e in h) d[e] || this.zr.delShape(h[e].id);
                for (e in d)
                  h[e]
                    ? (this.zr.delShape(h[e].id),
                      this._animateMod(h[e], d[e], r, a, 0, s))
                    : ((t =
                        (this.type != l.CHART_TYPE_LINE &&
                          this.type != l.CHART_TYPE_RADAR) ||
                        0 === e.indexOf('icon')
                          ? 0
                          : r / 2),
                      this._animateMod(!1, d[e], r, a, t, s));
                this.zr.refresh(), this.animationEffect();
              } else {
                (this.motionlessOnce = !1), this.zr.delShape(o);
                for (var c = 0, p = n.length; p > c; c++)
                  this.zr.addShape(n[c]);
              }
            },
            _getAnimationKey: function (t) {
              return this.type != l.CHART_TYPE_MAP &&
                this.type != l.CHART_TYPE_TREEMAP &&
                this.type != l.CHART_TYPE_VENN &&
                this.type != l.CHART_TYPE_TREE
                ? d.get(t, 'seriesIndex') +
                    '_' +
                    d.get(t, 'dataIndex') +
                    (t._mark ? t._mark : '') +
                    (this.type === l.CHART_TYPE_RADAR
                      ? d.get(t, 'special')
                      : '')
                : d.get(t, 'seriesIndex') +
                    '_' +
                    d.get(t, 'dataIndex') +
                    (t._mark ? t._mark : 'undefined');
            },
            _animateMod: function (t, e, i, o, n, s) {
              switch (e.type) {
                case 'polyline':
                case 'half-smooth-polygon':
                  c.pointList(this.zr, t, e, i, o);
                  break;
                case 'rectangle':
                  c.rectangle(this.zr, t, e, i, o);
                  break;
                case 'image':
                case 'icon':
                  c.icon(this.zr, t, e, i, o, n);
                  break;
                case 'candle':
                  s ? this.zr.addShape(e) : c.candle(this.zr, t, e, i, o);
                  break;
                case 'ring':
                case 'sector':
                case 'circle':
                  s
                    ? 'sector' === e.type
                      ? c.sector(this.zr, t, e, i, o)
                      : this.zr.addShape(e)
                    : c.ring(
                        this.zr,
                        t,
                        e,
                        i + ((d.get(e, 'dataIndex') || 0) % 20) * 100,
                        o,
                      );
                  break;
                case 'text':
                  c.text(this.zr, t, e, i, o);
                  break;
                case 'polygon':
                  s
                    ? c.pointList(this.zr, t, e, i, o)
                    : c.polygon(this.zr, t, e, i, o);
                  break;
                case 'ribbon':
                  c.ribbon(this.zr, t, e, i, o);
                  break;
                case 'gauge-pointer':
                  c.gaugePointer(this.zr, t, e, i, o);
                  break;
                case 'mark-line':
                  c.markline(this.zr, t, e, i, o);
                  break;
                case 'bezier-curve':
                case 'line':
                  c.line(this.zr, t, e, i, o);
                  break;
                default:
                  this.zr.addShape(e);
              }
            },
            animationMark: function (t, e, i) {
              for (var i = i || this.shapeList, o = 0, n = i.length; n > o; o++)
                i[o]._mark && this._animateMod(!1, i[o], t, e, 0, !0);
              this.animationEffect(i);
            },
            animationEffect: function (t) {
              if (
                (!t && this.clearEffectShape(),
                (t = t || this.shapeList),
                null != t)
              ) {
                var e = l.EFFECT_ZLEVEL;
                this.canvasSupported &&
                  this.zr.modLayer(e, {
                    motionBlur: !0,
                    lastFrameAlpha:
                      this.option.effectBlendAlpha || l.effectBlendAlpha,
                  });
                for (var i, o = 0, n = t.length; n > o; o++)
                  (i = t[o]),
                    i._mark &&
                      i.effect &&
                      i.effect.show &&
                      p[i._mark] &&
                      (p[i._mark](this.zr, this.effectList, i, e),
                      (this.effectList[this.effectList.length - 1]._mark =
                        i._mark));
              }
            },
            clearEffectShape: function (t) {
              var e = this.effectList;
              if (this.zr && e && e.length > 0) {
                t && this.zr.modLayer(l.EFFECT_ZLEVEL, { motionBlur: !1 }),
                  this.zr.delShape(e);
                for (var i = 0; i < e.length; i++)
                  e[i].effectAnimator && e[i].effectAnimator.stop();
              }
              this.effectList = [];
            },
            addMark: function (t, e, i) {
              var o = this.series[t];
              if (this.selectedMap[o.name]) {
                var n = this.query(this.option, 'animationDurationUpdate'),
                  s = this.query(this.option, 'animationEasing'),
                  r = o[i].data,
                  a = this.shapeList.length;
                if (
                  ((o[i].data = e.data),
                  this['_build' + i.replace('m', 'M')](t),
                  this.option.animation && !this.option.renderAsImage)
                )
                  this.animationMark(n, s, this.shapeList.slice(a));
                else {
                  for (var h = a, l = this.shapeList.length; l > h; h++)
                    this.zr.addShape(this.shapeList[h]);
                  this.zr.refreshNextFrame();
                }
                o[i].data = r;
              }
            },
            delMark: function (t, e, i) {
              i = i.replace('mark', '').replace('large', '').toLowerCase();
              var o = this.series[t];
              if (this.selectedMap[o.name]) {
                for (
                  var n = !1, s = [this.shapeList, this.effectList], r = 2;
                  r--;

                )
                  for (var a = 0, h = s[r].length; h > a; a++)
                    if (
                      s[r][a]._mark == i &&
                      d.get(s[r][a], 'seriesIndex') == t &&
                      d.get(s[r][a], 'name') == e
                    ) {
                      this.zr.delShape(s[r][a].id), s[r].splice(a, 1), (n = !0);
                      break;
                    }
                n && this.zr.refreshNextFrame();
              }
            },
          }),
          m.inherits(i, g),
          i
        );
      },
    ),
    i('zrender/tool/event', ['require', '../mixin/Eventful'], function (t) {
      'use strict';
      function e(t) {
        return (
          ('undefined' != typeof t.zrenderX && t.zrenderX) ||
          ('undefined' != typeof t.offsetX && t.offsetX) ||
          ('undefined' != typeof t.layerX && t.layerX) ||
          ('undefined' != typeof t.clientX && t.clientX)
        );
      }
      function i(t) {
        return (
          ('undefined' != typeof t.zrenderY && t.zrenderY) ||
          ('undefined' != typeof t.offsetY && t.offsetY) ||
          ('undefined' != typeof t.layerY && t.layerY) ||
          ('undefined' != typeof t.clientY && t.clientY)
        );
      }
      function o(t) {
        return (
          ('undefined' != typeof t.zrenderDelta && t.zrenderDelta) ||
          ('undefined' != typeof t.wheelDelta && t.wheelDelta) ||
          ('undefined' != typeof t.detail && -t.detail)
        );
      }
      var n = t('../mixin/Eventful'),
        s =
          'function' == typeof window.addEventListener
            ? function (t) {
                t.preventDefault(), t.stopPropagation(), (t.cancelBubble = !0);
              }
            : function (t) {
                (t.returnValue = !1), (t.cancelBubble = !0);
              };
      return { getX: e, getY: i, getDelta: o, stop: s, Dispatcher: n };
    }),
    i('zrender/tool/env', [], function () {
      function t(t) {
        var e = (this.os = {}),
          i = (this.browser = {}),
          o = t.match(/Web[kK]it[\/]{0,1}([\d.]+)/),
          n = t.match(/(Android);?[\s\/]+([\d.]+)?/),
          s = t.match(/(iPad).*OS\s([\d_]+)/),
          r = t.match(/(iPod)(.*OS\s([\d_]+))?/),
          a = !s && t.match(/(iPhone\sOS)\s([\d_]+)/),
          h = t.match(/(webOS|hpwOS)[\s\/]([\d.]+)/),
          l = h && t.match(/TouchPad/),
          d = t.match(/Kindle\/([\d.]+)/),
          c = t.match(/Silk\/([\d._]+)/),
          p = t.match(/(BlackBerry).*Version\/([\d.]+)/),
          u = t.match(/(BB10).*Version\/([\d.]+)/),
          g = t.match(/(RIM\sTablet\sOS)\s([\d.]+)/),
          f = t.match(/PlayBook/),
          m = t.match(/Chrome\/([\d.]+)/) || t.match(/CriOS\/([\d.]+)/),
          _ = t.match(/Firefox\/([\d.]+)/),
          y = t.match(/MSIE ([\d.]+)/),
          x = o && t.match(/Mobile\//) && !m,
          v = t.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/) && !m,
          y = t.match(/MSIE\s([\d.]+)/);
        return (
          (i.webkit = !!o) && (i.version = o[1]),
          n && ((e.android = !0), (e.version = n[2])),
          a &&
            !r &&
            ((e.ios = e.iphone = !0), (e.version = a[2].replace(/_/g, '.'))),
          s && ((e.ios = e.ipad = !0), (e.version = s[2].replace(/_/g, '.'))),
          r &&
            ((e.ios = e.ipod = !0),
            (e.version = r[3] ? r[3].replace(/_/g, '.') : null)),
          h && ((e.webos = !0), (e.version = h[2])),
          l && (e.touchpad = !0),
          p && ((e.blackberry = !0), (e.version = p[2])),
          u && ((e.bb10 = !0), (e.version = u[2])),
          g && ((e.rimtabletos = !0), (e.version = g[2])),
          f && (i.playbook = !0),
          d && ((e.kindle = !0), (e.version = d[1])),
          c && ((i.silk = !0), (i.version = c[1])),
          !c && e.android && t.match(/Kindle Fire/) && (i.silk = !0),
          m && ((i.chrome = !0), (i.version = m[1])),
          _ && ((i.firefox = !0), (i.version = _[1])),
          y && ((i.ie = !0), (i.version = y[1])),
          x && (t.match(/Safari/) || e.ios) && (i.safari = !0),
          v && (i.webview = !0),
          y && ((i.ie = !0), (i.version = y[1])),
          (e.tablet = !!(
            s ||
            f ||
            (n && !t.match(/Mobile/)) ||
            (_ && t.match(/Tablet/)) ||
            (y && !t.match(/Phone/) && t.match(/Touch/))
          )),
          (e.phone = !(
            e.tablet ||
            e.ipod ||
            !(
              n ||
              a ||
              h ||
              p ||
              u ||
              (m && t.match(/Android/)) ||
              (m && t.match(/CriOS\/([\d.]+)/)) ||
              (_ && t.match(/Mobile/)) ||
              (y && t.match(/Touch/))
            )
          )),
          {
            browser: i,
            os: e,
            canvasSupported: document.createElement('canvas').getContext
              ? !0
              : !1,
          }
        );
      }
      return t(navigator.userAgent);
    }),
    i(
      'zrender/zrender',
      [
        'require',
        './dep/excanvas',
        './tool/util',
        './tool/log',
        './tool/guid',
        './Handler',
        './Painter',
        './Storage',
        './animation/Animation',
        './tool/env',
      ],
      function (t) {
        function e(t) {
          return function () {
            t._needsRefreshNextFrame && t.refresh();
          };
        }
        t('./dep/excanvas');
        var i = t('./tool/util'),
          o = t('./tool/log'),
          n = t('./tool/guid'),
          s = t('./Handler'),
          r = t('./Painter'),
          a = t('./Storage'),
          h = t('./animation/Animation'),
          l = {},
          d = {};
        (d.version = '2.1.1'),
          (d.init = function (t) {
            var e = new c(n(), t);
            return (l[e.id] = e), e;
          }),
          (d.dispose = function (t) {
            if (t) t.dispose();
            else {
              for (var e in l) l[e].dispose();
              l = {};
            }
            return d;
          }),
          (d.getInstance = function (t) {
            return l[t];
          }),
          (d.delInstance = function (t) {
            return delete l[t], d;
          });
        var c = function (i, o) {
          (this.id = i),
            (this.env = t('./tool/env')),
            (this.storage = new a()),
            (this.painter = new r(o, this.storage)),
            (this.handler = new s(o, this.storage, this.painter)),
            (this.animation = new h({ stage: { update: e(this) } })),
            this.animation.start();
          var n = this;
          (this.painter.refreshNextFrame = function () {
            n.refreshNextFrame();
          }),
            (this._needsRefreshNextFrame = !1);
          var n = this,
            l = this.storage,
            d = l.delFromMap;
          l.delFromMap = function (t) {
            var e = l.get(t);
            n.stopAnimation(e), d.call(l, t);
          };
        };
        return (
          (c.prototype.getId = function () {
            return this.id;
          }),
          (c.prototype.addShape = function (t) {
            return this.addElement(t), this;
          }),
          (c.prototype.addGroup = function (t) {
            return this.addElement(t), this;
          }),
          (c.prototype.delShape = function (t) {
            return this.delElement(t), this;
          }),
          (c.prototype.delGroup = function (t) {
            return this.delElement(t), this;
          }),
          (c.prototype.modShape = function (t, e) {
            return this.modElement(t, e), this;
          }),
          (c.prototype.modGroup = function (t, e) {
            return this.modElement(t, e), this;
          }),
          (c.prototype.addElement = function (t) {
            return (
              this.storage.addRoot(t), (this._needsRefreshNextFrame = !0), this
            );
          }),
          (c.prototype.delElement = function (t) {
            return (
              this.storage.delRoot(t), (this._needsRefreshNextFrame = !0), this
            );
          }),
          (c.prototype.modElement = function (t, e) {
            return (
              this.storage.mod(t, e), (this._needsRefreshNextFrame = !0), this
            );
          }),
          (c.prototype.modLayer = function (t, e) {
            return (
              this.painter.modLayer(t, e),
              (this._needsRefreshNextFrame = !0),
              this
            );
          }),
          (c.prototype.addHoverShape = function (t) {
            return this.storage.addHover(t), this;
          }),
          (c.prototype.render = function (t) {
            return (
              this.painter.render(t), (this._needsRefreshNextFrame = !1), this
            );
          }),
          (c.prototype.refresh = function (t) {
            return (
              this.painter.refresh(t), (this._needsRefreshNextFrame = !1), this
            );
          }),
          (c.prototype.refreshNextFrame = function () {
            return (this._needsRefreshNextFrame = !0), this;
          }),
          (c.prototype.refreshHover = function (t) {
            return this.painter.refreshHover(t), this;
          }),
          (c.prototype.refreshShapes = function (t, e) {
            return this.painter.refreshShapes(t, e), this;
          }),
          (c.prototype.resize = function () {
            return this.painter.resize(), this;
          }),
          (c.prototype.animate = function (t, e, n) {
            var s = this;
            if (('string' == typeof t && (t = this.storage.get(t)), t)) {
              var r;
              if (e) {
                for (
                  var a = e.split('.'), h = t, l = 0, d = a.length;
                  d > l;
                  l++
                )
                  h && (h = h[a[l]]);
                h && (r = h);
              } else r = t;
              if (!r)
                return void o(
                  'Property "' + e + '" is not existed in element ' + t.id,
                );
              null == t.__animators && (t.__animators = []);
              var c = t.__animators,
                p = this.animation
                  .animate(r, { loop: n })
                  .during(function () {
                    s.modShape(t);
                  })
                  .done(function () {
                    var e = i.indexOf(t.__animators, p);
                    e >= 0 && c.splice(e, 1);
                  });
              return c.push(p), p;
            }
            o('Element not existed');
          }),
          (c.prototype.stopAnimation = function (t) {
            if (t.__animators) {
              for (var e = t.__animators, i = e.length, o = 0; i > o; o++)
                e[o].stop();
              e.length = 0;
            }
            return this;
          }),
          (c.prototype.clearAnimation = function () {
            return this.animation.clear(), this;
          }),
          (c.prototype.showLoading = function (t) {
            return this.painter.showLoading(t), this;
          }),
          (c.prototype.hideLoading = function () {
            return this.painter.hideLoading(), this;
          }),
          (c.prototype.getWidth = function () {
            return this.painter.getWidth();
          }),
          (c.prototype.getHeight = function () {
            return this.painter.getHeight();
          }),
          (c.prototype.toDataURL = function (t, e, i) {
            return this.painter.toDataURL(t, e, i);
          }),
          (c.prototype.shapeToImage = function (t, e, i) {
            var o = n();
            return this.painter.shapeToImage(o, t, e, i);
          }),
          (c.prototype.on = function (t, e, i) {
            return this.handler.on(t, e, i), this;
          }),
          (c.prototype.un = function (t, e) {
            return this.handler.un(t, e), this;
          }),
          (c.prototype.trigger = function (t, e) {
            return this.handler.trigger(t, e), this;
          }),
          (c.prototype.clear = function () {
            return this.storage.delRoot(), this.painter.clear(), this;
          }),
          (c.prototype.dispose = function () {
            this.animation.stop(),
              this.clear(),
              this.storage.dispose(),
              this.painter.dispose(),
              this.handler.dispose(),
              (this.animation =
                this.storage =
                this.painter =
                this.handler =
                  null),
              d.delInstance(this.id);
          }),
          d
        );
      },
    ),
    i('zrender/config', [], function () {
      var t = {
        EVENT: {
          RESIZE: 'resize',
          CLICK: 'click',
          DBLCLICK: 'dblclick',
          MOUSEWHEEL: 'mousewheel',
          MOUSEMOVE: 'mousemove',
          MOUSEOVER: 'mouseover',
          MOUSEOUT: 'mouseout',
          MOUSEDOWN: 'mousedown',
          MOUSEUP: 'mouseup',
          GLOBALOUT: 'globalout',
          DRAGSTART: 'dragstart',
          DRAGEND: 'dragend',
          DRAGENTER: 'dragenter',
          DRAGOVER: 'dragover',
          DRAGLEAVE: 'dragleave',
          DROP: 'drop',
          touchClickDelay: 300,
        },
        elementClassName: 'zr-element',
        catchBrushException: !1,
        debugMode: 0,
        devicePixelRatio: Math.max(window.devicePixelRatio || 1, 1),
      };
      return t;
    }),
    i(
      'echarts/chart/island',
      [
        'require',
        './base',
        'zrender/shape/Circle',
        '../config',
        '../util/ecData',
        'zrender/tool/util',
        'zrender/tool/event',
        'zrender/tool/color',
        '../util/accMath',
        '../chart',
      ],
      function (t) {
        function e(t, e, o, n, r) {
          i.call(this, t, e, o, n, r),
            this._nameConnector,
            this._valueConnector,
            (this._zrHeight = this.zr.getHeight()),
            (this._zrWidth = this.zr.getWidth());
          var h = this;
          h.shapeHandler.onmousewheel = function (t) {
            var e = t.target,
              i = t.event,
              o = a.getDelta(i);
            (o = o > 0 ? -1 : 1),
              (e.style.r -= o),
              (e.style.r = e.style.r < 5 ? 5 : e.style.r);
            var n = s.get(e, 'value'),
              r = n * h.option.island.calculateStep;
            n = r > 1 ? Math.round(n - r * o) : +(n - r * o).toFixed(2);
            var l = s.get(e, 'name');
            (e.style.text = l + ':' + n),
              s.set(e, 'value', n),
              s.set(e, 'name', l),
              h.zr.modShape(e.id),
              h.zr.refreshNextFrame(),
              a.stop(i);
          };
        }
        var i = t('./base'),
          o = t('zrender/shape/Circle'),
          n = t('../config');
        n.island = { zlevel: 0, z: 5, r: 15, calculateStep: 0.1 };
        var s = t('../util/ecData'),
          r = t('zrender/tool/util'),
          a = t('zrender/tool/event');
        return (
          (e.prototype = {
            type: n.CHART_TYPE_ISLAND,
            _combine: function (e, i) {
              var o = t('zrender/tool/color'),
                n = t('../util/accMath'),
                r = n.accAdd(s.get(e, 'value'), s.get(i, 'value')),
                a = s.get(e, 'name') + this._nameConnector + s.get(i, 'name');
              (e.style.text = a + this._valueConnector + r),
                s.set(e, 'value', r),
                s.set(e, 'name', a),
                (e.style.r = this.option.island.r),
                (e.style.color = o.mix(e.style.color, i.style.color));
            },
            refresh: function (t) {
              t &&
                ((t.island = this.reformOption(t.island)),
                (this.option = t),
                (this._nameConnector = this.option.nameConnector),
                (this._valueConnector = this.option.valueConnector));
            },
            getOption: function () {
              return this.option;
            },
            resize: function () {
              var t = this.zr.getWidth(),
                e = this.zr.getHeight(),
                i = t / (this._zrWidth || t),
                o = e / (this._zrHeight || e);
              if (1 !== i || 1 !== o) {
                (this._zrWidth = t), (this._zrHeight = e);
                for (var n = 0, s = this.shapeList.length; s > n; n++)
                  this.zr.modShape(this.shapeList[n].id, {
                    style: {
                      x: Math.round(this.shapeList[n].style.x * i),
                      y: Math.round(this.shapeList[n].style.y * o),
                    },
                  });
              }
            },
            add: function (t) {
              var e = s.get(t, 'name'),
                i = s.get(t, 'value'),
                n = null != s.get(t, 'series') ? s.get(t, 'series').name : '',
                r = this.getFont(this.option.island.textStyle),
                a = this.option.island,
                h = {
                  zlevel: a.zlevel,
                  z: a.z,
                  style: {
                    x: t.style.x,
                    y: t.style.y,
                    r: this.option.island.r,
                    color: t.style.color || t.style.strokeColor,
                    text: e + this._valueConnector + i,
                    textFont: r,
                  },
                  draggable: !0,
                  hoverable: !0,
                  onmousewheel: this.shapeHandler.onmousewheel,
                  _type: 'island',
                };
              '#fff' === h.style.color && (h.style.color = t.style.strokeColor),
                this.setCalculable(h),
                (h.dragEnableTime = 0),
                s.pack(h, { name: n }, -1, i, -1, e),
                (h = new o(h)),
                this.shapeList.push(h),
                this.zr.addShape(h);
            },
            del: function (t) {
              this.zr.delShape(t.id);
              for (var e = [], i = 0, o = this.shapeList.length; o > i; i++)
                this.shapeList[i].id != t.id && e.push(this.shapeList[i]);
              this.shapeList = e;
            },
            ondrop: function (t, e) {
              if (this.isDrop && t.target) {
                var i = t.target,
                  o = t.dragged;
                this._combine(i, o),
                  this.zr.modShape(i.id),
                  (e.dragIn = !0),
                  (this.isDrop = !1);
              }
            },
            ondragend: function (t, e) {
              var i = t.target;
              this.isDragend
                ? e.dragIn && (this.del(i), (e.needRefresh = !0))
                : e.dragIn ||
                  ((i.style.x = a.getX(t.event)),
                  (i.style.y = a.getY(t.event)),
                  this.add(i),
                  (e.needRefresh = !0)),
                (this.isDragend = !1);
            },
          }),
          r.inherits(e, i),
          t('../chart').define('island', e),
          e
        );
      },
    ),
    i('echarts/component', [], function () {
      var t = {},
        e = {};
      return (
        (t.define = function (i, o) {
          return (e[i] = o), t;
        }),
        (t.get = function (t) {
          return e[t];
        }),
        t
      );
    }),
    i(
      'echarts/component/title',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Rectangle',
        '../config',
        'zrender/tool/util',
        'zrender/tool/area',
        'zrender/tool/color',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s), this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Rectangle'),
          s = t('../config');
        s.title = {
          zlevel: 0,
          z: 6,
          show: !0,
          text: '',
          subtext: '',
          x: 'left',
          y: 'top',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 5,
          textStyle: { fontSize: 18, fontWeight: 'bolder', color: '#333' },
          subtextStyle: { color: '#aaa' },
        };
        var r = t('zrender/tool/util'),
          a = t('zrender/tool/area'),
          h = t('zrender/tool/color');
        return (
          (e.prototype = {
            type: s.COMPONENT_TYPE_TITLE,
            _buildShape: function () {
              if (this.titleOption.show) {
                (this._itemGroupLocation = this._getItemGroupLocation()),
                  this._buildBackground(),
                  this._buildItem();
                for (var t = 0, e = this.shapeList.length; e > t; t++)
                  this.zr.addShape(this.shapeList[t]);
              }
            },
            _buildItem: function () {
              var t = this.titleOption.text,
                e = this.titleOption.link,
                i = this.titleOption.target,
                n = this.titleOption.subtext,
                s = this.titleOption.sublink,
                r = this.titleOption.subtarget,
                a = this.getFont(this.titleOption.textStyle),
                l = this.getFont(this.titleOption.subtextStyle),
                d = this._itemGroupLocation.x,
                c = this._itemGroupLocation.y,
                p = this._itemGroupLocation.width,
                u = this._itemGroupLocation.height,
                g = {
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  style: {
                    y: c,
                    color: this.titleOption.textStyle.color,
                    text: t,
                    textFont: a,
                    textBaseline: 'top',
                  },
                  highlightStyle: {
                    color: h.lift(this.titleOption.textStyle.color, 1),
                    brushType: 'fill',
                  },
                  hoverable: !1,
                };
              e &&
                ((g.hoverable = !0),
                (g.clickable = !0),
                (g.onclick = function () {
                  i && 'self' == i ? (window.location = e) : window.open(e);
                }));
              var f = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                style: {
                  y: c + u,
                  color: this.titleOption.subtextStyle.color,
                  text: n,
                  textFont: l,
                  textBaseline: 'bottom',
                },
                highlightStyle: {
                  color: h.lift(this.titleOption.subtextStyle.color, 1),
                  brushType: 'fill',
                },
                hoverable: !1,
              };
              switch (
                (s &&
                  ((f.hoverable = !0),
                  (f.clickable = !0),
                  (f.onclick = function () {
                    r && 'self' == r ? (window.location = s) : window.open(s);
                  })),
                this.titleOption.x)
              ) {
                case 'center':
                  (g.style.x = f.style.x = d + p / 2),
                    (g.style.textAlign = f.style.textAlign = 'center');
                  break;
                case 'left':
                  (g.style.x = f.style.x = d),
                    (g.style.textAlign = f.style.textAlign = 'left');
                  break;
                case 'right':
                  (g.style.x = f.style.x = d + p),
                    (g.style.textAlign = f.style.textAlign = 'right');
                  break;
                default:
                  (d = this.titleOption.x - 0),
                    (d = isNaN(d) ? 0 : d),
                    (g.style.x = f.style.x = d);
              }
              this.titleOption.textAlign &&
                (g.style.textAlign = f.style.textAlign =
                  this.titleOption.textAlign),
                this.shapeList.push(new o(g)),
                '' !== n && this.shapeList.push(new o(f));
            },
            _buildBackground: function () {
              var t = this.reformCssArray(this.titleOption.padding);
              this.shapeList.push(
                new n({
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  hoverable: !1,
                  style: {
                    x: this._itemGroupLocation.x - t[3],
                    y: this._itemGroupLocation.y - t[0],
                    width: this._itemGroupLocation.width + t[3] + t[1],
                    height: this._itemGroupLocation.height + t[0] + t[2],
                    brushType:
                      0 === this.titleOption.borderWidth ? 'fill' : 'both',
                    color: this.titleOption.backgroundColor,
                    strokeColor: this.titleOption.borderColor,
                    lineWidth: this.titleOption.borderWidth,
                  },
                }),
              );
            },
            _getItemGroupLocation: function () {
              var t,
                e = this.reformCssArray(this.titleOption.padding),
                i = this.titleOption.text,
                o = this.titleOption.subtext,
                n = this.getFont(this.titleOption.textStyle),
                s = this.getFont(this.titleOption.subtextStyle),
                r = Math.max(a.getTextWidth(i, n), a.getTextWidth(o, s)),
                h =
                  a.getTextHeight(i, n) +
                  ('' === o
                    ? 0
                    : this.titleOption.itemGap + a.getTextHeight(o, s)),
                l = this.zr.getWidth();
              switch (this.titleOption.x) {
                case 'center':
                  t = Math.floor((l - r) / 2);
                  break;
                case 'left':
                  t = e[3] + this.titleOption.borderWidth;
                  break;
                case 'right':
                  t = l - r - e[1] - this.titleOption.borderWidth;
                  break;
                default:
                  (t = this.titleOption.x - 0), (t = isNaN(t) ? 0 : t);
              }
              var d,
                c = this.zr.getHeight();
              switch (this.titleOption.y) {
                case 'top':
                  d = e[0] + this.titleOption.borderWidth;
                  break;
                case 'bottom':
                  d = c - h - e[2] - this.titleOption.borderWidth;
                  break;
                case 'center':
                  d = Math.floor((c - h) / 2);
                  break;
                default:
                  (d = this.titleOption.y - 0), (d = isNaN(d) ? 0 : d);
              }
              return { x: t, y: d, width: r, height: h };
            },
            refresh: function (t) {
              t &&
                ((this.option = t),
                (this.option.title = this.reformOption(this.option.title)),
                (this.titleOption = this.option.title),
                (this.titleOption.textStyle = this.getTextStyle(
                  this.titleOption.textStyle,
                )),
                (this.titleOption.subtextStyle = this.getTextStyle(
                  this.titleOption.subtextStyle,
                ))),
                this.clear(),
                this._buildShape();
            },
          }),
          r.inherits(e, i),
          t('../component').define('title', e),
          e
        );
      },
    ),
    i(
      'echarts/component/legend',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Rectangle',
        'zrender/shape/Sector',
        '../util/shape/Icon',
        '../util/shape/Candle',
        '../config',
        'zrender/tool/util',
        'zrender/tool/area',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          if (!this.query(n, 'legend.data'))
            return void console.error(
              'option.legend.data has not been defined.',
            );
          i.call(this, t, e, o, n, s);
          var r = this;
          (r._legendSelected = function (t) {
            r.__legendSelected(t);
          }),
            (r._dispatchHoverLink = function (t) {
              return r.__dispatchHoverLink(t);
            }),
            (this._colorIndex = 0),
            (this._colorMap = {}),
            (this._selectedMap = {}),
            (this._hasDataMap = {}),
            this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Rectangle'),
          s = t('zrender/shape/Sector'),
          r = t('../util/shape/Icon'),
          a = t('../util/shape/Candle'),
          h = t('../config');
        h.legend = {
          zlevel: 0,
          z: 4,
          show: !0,
          orient: 'horizontal',
          x: 'center',
          y: 'top',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 10,
          itemWidth: 20,
          itemHeight: 14,
          textStyle: { color: '#333' },
          selectedMode: !0,
        };
        var l = t('zrender/tool/util'),
          d = t('zrender/tool/area');
        e.prototype = {
          type: h.COMPONENT_TYPE_LEGEND,
          _buildShape: function () {
            if (this.legendOption.show) {
              (this._itemGroupLocation = this._getItemGroupLocation()),
                this._buildBackground(),
                this._buildItem();
              for (var t = 0, e = this.shapeList.length; e > t; t++)
                this.zr.addShape(this.shapeList[t]);
            }
          },
          _buildItem: function () {
            var t,
              e,
              i,
              n,
              s,
              a,
              h,
              c,
              p = this.legendOption.data,
              u = p.length,
              g = this.legendOption.textStyle,
              f = this.zr.getWidth(),
              m = this.zr.getHeight(),
              _ = this._itemGroupLocation.x,
              y = this._itemGroupLocation.y,
              x = this.legendOption.itemWidth,
              v = this.legendOption.itemHeight,
              b = this.legendOption.itemGap;
            'vertical' === this.legendOption.orient &&
              'right' === this.legendOption.x &&
              (_ =
                this._itemGroupLocation.x + this._itemGroupLocation.width - x);
            for (var S = 0; u > S; S++)
              (s = l.merge(p[S].textStyle || {}, g)),
                (a = this.getFont(s)),
                (t = this._getName(p[S])),
                (h = this._getFormatterName(t)),
                '' !== t
                  ? ((e = p[S].icon || this._getSomethingByName(t).type),
                    (c = this.getColor(t)),
                    'horizontal' === this.legendOption.orient
                      ? 200 > f - _ &&
                        x +
                          5 +
                          d.getTextWidth(h, a) +
                          (S === u - 1 || '' === p[S + 1] ? 0 : b) >=
                          f - _ &&
                        ((_ = this._itemGroupLocation.x), (y += v + b))
                      : 200 > m - y &&
                        v + (S === u - 1 || '' === p[S + 1] ? 0 : b) >= m - y &&
                        ('right' === this.legendOption.x
                          ? (_ -= this._itemGroupLocation.maxWidth + b)
                          : (_ += this._itemGroupLocation.maxWidth + b),
                        (y = this._itemGroupLocation.y)),
                    (i = this._getItemShapeByType(
                      _,
                      y,
                      x,
                      v,
                      this._selectedMap[t] && this._hasDataMap[t] ? c : '#ccc',
                      e,
                      c,
                    )),
                    (i._name = t),
                    (i = new r(i)),
                    (n = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      style: {
                        x: _ + x + 5,
                        y: y + v / 2,
                        color: this._selectedMap[t]
                          ? 'auto' === s.color
                            ? c
                            : s.color
                          : '#ccc',
                        text: h,
                        textFont: a,
                        textBaseline: 'middle',
                      },
                      highlightStyle: { color: c, brushType: 'fill' },
                      hoverable: !!this.legendOption.selectedMode,
                      clickable: !!this.legendOption.selectedMode,
                    }),
                    'vertical' === this.legendOption.orient &&
                      'right' === this.legendOption.x &&
                      ((n.style.x -= x + 10), (n.style.textAlign = 'right')),
                    (n._name = t),
                    (n = new o(n)),
                    this.legendOption.selectedMode &&
                      ((i.onclick = n.onclick = this._legendSelected),
                      (i.onmouseover = n.onmouseover = this._dispatchHoverLink),
                      (i.hoverConnect = n.id),
                      (n.hoverConnect = i.id)),
                    this.shapeList.push(i),
                    this.shapeList.push(n),
                    'horizontal' === this.legendOption.orient
                      ? (_ += x + 5 + d.getTextWidth(h, a) + b)
                      : (y += v + b))
                  : 'horizontal' === this.legendOption.orient
                  ? ((_ = this._itemGroupLocation.x), (y += v + b))
                  : ('right' === this.legendOption.x
                      ? (_ -= this._itemGroupLocation.maxWidth + b)
                      : (_ += this._itemGroupLocation.maxWidth + b),
                    (y = this._itemGroupLocation.y));
            'horizontal' === this.legendOption.orient &&
              'center' === this.legendOption.x &&
              y != this._itemGroupLocation.y &&
              this._mLineOptimize();
          },
          _getName: function (t) {
            return 'undefined' != typeof t.name ? t.name : t;
          },
          _getFormatterName: function (t) {
            var e,
              i = this.legendOption.formatter;
            return (e =
              'function' == typeof i
                ? i.call(this.myChart, t)
                : 'string' == typeof i
                ? i.replace('{name}', t)
                : t);
          },
          _getFormatterNameFromData: function (t) {
            var e = this._getName(t);
            return this._getFormatterName(e);
          },
          _mLineOptimize: function () {
            for (
              var t = [],
                e = this._itemGroupLocation.x,
                i = 2,
                o = this.shapeList.length;
              o > i;
              i++
            )
              this.shapeList[i].style.x === e
                ? t.push(
                    (this._itemGroupLocation.width -
                      (this.shapeList[i - 1].style.x +
                        d.getTextWidth(
                          this.shapeList[i - 1].style.text,
                          this.shapeList[i - 1].style.textFont,
                        ) -
                        e)) /
                      2,
                  )
                : i === o - 1 &&
                  t.push(
                    (this._itemGroupLocation.width -
                      (this.shapeList[i].style.x +
                        d.getTextWidth(
                          this.shapeList[i].style.text,
                          this.shapeList[i].style.textFont,
                        ) -
                        e)) /
                      2,
                  );
            for (var n = -1, i = 1, o = this.shapeList.length; o > i; i++)
              this.shapeList[i].style.x === e && n++,
                0 !== t[n] && (this.shapeList[i].style.x += t[n]);
          },
          _buildBackground: function () {
            var t = this.reformCssArray(this.legendOption.padding);
            this.shapeList.push(
              new n({
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                hoverable: !1,
                style: {
                  x: this._itemGroupLocation.x - t[3],
                  y: this._itemGroupLocation.y - t[0],
                  width: this._itemGroupLocation.width + t[3] + t[1],
                  height: this._itemGroupLocation.height + t[0] + t[2],
                  brushType:
                    0 === this.legendOption.borderWidth ? 'fill' : 'both',
                  color: this.legendOption.backgroundColor,
                  strokeColor: this.legendOption.borderColor,
                  lineWidth: this.legendOption.borderWidth,
                },
              }),
            );
          },
          _getItemGroupLocation: function () {
            var t = this.legendOption.data,
              e = t.length,
              i = this.legendOption.itemGap,
              o = this.legendOption.itemWidth + 5,
              n = this.legendOption.itemHeight,
              s = this.legendOption.textStyle,
              r = this.getFont(s),
              a = 0,
              h = 0,
              c = this.reformCssArray(this.legendOption.padding),
              p = this.zr.getWidth() - c[1] - c[3],
              u = this.zr.getHeight() - c[0] - c[2],
              g = 0,
              f = 0;
            if ('horizontal' === this.legendOption.orient) {
              h = n;
              for (var m = 0; e > m; m++)
                if ('' !== this._getName(t[m])) {
                  var _ = d.getTextWidth(
                    this._getFormatterNameFromData(t[m]),
                    t[m].textStyle
                      ? this.getFont(l.merge(t[m].textStyle || {}, s))
                      : r,
                  );
                  g + o + _ + i > p
                    ? ((g -= i), (a = Math.max(a, g)), (h += n + i), (g = 0))
                    : ((g += o + _ + i), (a = Math.max(a, g - i)));
                } else (g -= i), (a = Math.max(a, g)), (h += n + i), (g = 0);
            } else {
              for (var m = 0; e > m; m++)
                f = Math.max(
                  f,
                  d.getTextWidth(
                    this._getFormatterNameFromData(t[m]),
                    t[m].textStyle
                      ? this.getFont(l.merge(t[m].textStyle || {}, s))
                      : r,
                  ),
                );
              (f += o), (a = f);
              for (var m = 0; e > m; m++)
                '' !== this._getName(t[m])
                  ? g + n + i > u
                    ? ((a += f + i), (g -= i), (h = Math.max(h, g)), (g = 0))
                    : ((g += n + i), (h = Math.max(h, g - i)))
                  : ((a += f + i), (g -= i), (h = Math.max(h, g)), (g = 0));
            }
            (p = this.zr.getWidth()), (u = this.zr.getHeight());
            var y;
            switch (this.legendOption.x) {
              case 'center':
                y = Math.floor((p - a) / 2);
                break;
              case 'left':
                y = c[3] + this.legendOption.borderWidth;
                break;
              case 'right':
                y = p - a - c[1] - c[3] - 2 * this.legendOption.borderWidth;
                break;
              default:
                y = this.parsePercent(this.legendOption.x, p);
            }
            var x;
            switch (this.legendOption.y) {
              case 'top':
                x = c[0] + this.legendOption.borderWidth;
                break;
              case 'bottom':
                x = u - h - c[0] - c[2] - 2 * this.legendOption.borderWidth;
                break;
              case 'center':
                x = Math.floor((u - h) / 2);
                break;
              default:
                x = this.parsePercent(this.legendOption.y, u);
            }
            return { x: y, y: x, width: a, height: h, maxWidth: f };
          },
          _getSomethingByName: function (t) {
            for (
              var e, i = this.option.series, o = 0, n = i.length;
              n > o;
              o++
            ) {
              if (i[o].name === t)
                return {
                  type: i[o].type,
                  series: i[o],
                  seriesIndex: o,
                  data: null,
                  dataIndex: -1,
                };
              if (
                i[o].type === h.CHART_TYPE_PIE ||
                i[o].type === h.CHART_TYPE_RADAR ||
                i[o].type === h.CHART_TYPE_CHORD ||
                i[o].type === h.CHART_TYPE_FORCE ||
                i[o].type === h.CHART_TYPE_FUNNEL ||
                i[o].type === h.CHART_TYPE_TREEMAP
              ) {
                e = i[o].categories || i[o].data || i[o].nodes;
                for (var s = 0, r = e.length; r > s; s++)
                  if (e[s].name === t)
                    return {
                      type: i[o].type,
                      series: i[o],
                      seriesIndex: o,
                      data: e[s],
                      dataIndex: s,
                    };
              }
            }
            return {
              type: 'bar',
              series: null,
              seriesIndex: -1,
              data: null,
              dataIndex: -1,
            };
          },
          _getItemShapeByType: function (t, e, i, o, n, s, r) {
            var a,
              l = '#ccc' === n ? r : n,
              d = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                style: {
                  iconType: 'legendicon' + s,
                  x: t,
                  y: e,
                  width: i,
                  height: o,
                  color: n,
                  strokeColor: n,
                  lineWidth: 2,
                },
                highlightStyle: { color: l, strokeColor: l, lineWidth: 1 },
                hoverable: this.legendOption.selectedMode,
                clickable: this.legendOption.selectedMode,
              };
            if (s.match('image')) {
              var a = s.replace(new RegExp('^image:\\/\\/'), '');
              s = 'image';
            }
            switch (s) {
              case 'line':
                (d.style.brushType = 'stroke'),
                  (d.highlightStyle.lineWidth = 3);
                break;
              case 'radar':
              case 'venn':
              case 'tree':
              case 'treemap':
              case 'scatter':
                d.highlightStyle.lineWidth = 3;
                break;
              case 'k':
                (d.style.brushType = 'both'),
                  (d.highlightStyle.lineWidth = 3),
                  (d.highlightStyle.color = d.style.color =
                    this.deepQuery(
                      [this.ecTheme, h],
                      'k.itemStyle.normal.color',
                    ) || '#fff'),
                  (d.style.strokeColor =
                    '#ccc' != n
                      ? this.deepQuery(
                          [this.ecTheme, h],
                          'k.itemStyle.normal.lineStyle.color',
                        ) || '#ff3200'
                      : n);
                break;
              case 'image':
                (d.style.iconType = 'image'),
                  (d.style.image = a),
                  '#ccc' === n && (d.style.opacity = 0.5);
            }
            return d;
          },
          __legendSelected: function (t) {
            var e = t.target._name;
            if ('single' === this.legendOption.selectedMode)
              for (var i in this._selectedMap) this._selectedMap[i] = !1;
            (this._selectedMap[e] = !this._selectedMap[e]),
              this.messageCenter.dispatch(
                h.EVENT.LEGEND_SELECTED,
                t.event,
                { selected: this._selectedMap, target: e },
                this.myChart,
              );
          },
          __dispatchHoverLink: function (t) {
            this.messageCenter.dispatch(
              h.EVENT.LEGEND_HOVERLINK,
              t.event,
              { target: t.target._name },
              this.myChart,
            );
          },
          refresh: function (t) {
            if (t) {
              (this.option = t || this.option),
                (this.option.legend = this.reformOption(this.option.legend)),
                (this.legendOption = this.option.legend);
              var e,
                i,
                o,
                n,
                s = this.legendOption.data || [];
              if (this.legendOption.selected)
                for (var r in this.legendOption.selected)
                  this._selectedMap[r] =
                    'undefined' != typeof this._selectedMap[r]
                      ? this._selectedMap[r]
                      : this.legendOption.selected[r];
              for (var a = 0, l = s.length; l > a; a++)
                (e = this._getName(s[a])),
                  '' !== e &&
                    ((i = this._getSomethingByName(e)),
                    i.series
                      ? ((this._hasDataMap[e] = !0),
                        (n =
                          !i.data ||
                          (i.type !== h.CHART_TYPE_PIE &&
                            i.type !== h.CHART_TYPE_FORCE &&
                            i.type !== h.CHART_TYPE_FUNNEL)
                            ? [i.series]
                            : [i.data, i.series]),
                        (o = this.getItemStyleColor(
                          this.deepQuery(n, 'itemStyle.normal.color'),
                          i.seriesIndex,
                          i.dataIndex,
                          i.data,
                        )),
                        o && i.type != h.CHART_TYPE_K && this.setColor(e, o),
                        (this._selectedMap[e] =
                          null != this._selectedMap[e]
                            ? this._selectedMap[e]
                            : !0))
                      : (this._hasDataMap[e] = !1));
            }
            this.clear(), this._buildShape();
          },
          getRelatedAmount: function (t) {
            for (
              var e, i = 0, o = this.option.series, n = 0, s = o.length;
              s > n;
              n++
            )
              if (
                (o[n].name === t && i++,
                o[n].type === h.CHART_TYPE_PIE ||
                  o[n].type === h.CHART_TYPE_RADAR ||
                  o[n].type === h.CHART_TYPE_CHORD ||
                  o[n].type === h.CHART_TYPE_FORCE ||
                  o[n].type === h.CHART_TYPE_FUNNEL)
              ) {
                e =
                  o[n].type != h.CHART_TYPE_FORCE ? o[n].data : o[n].categories;
                for (var r = 0, a = e.length; a > r; r++)
                  e[r].name === t && '-' != e[r].value && i++;
              }
            return i;
          },
          setColor: function (t, e) {
            this._colorMap[t] = e;
          },
          getColor: function (t) {
            return (
              this._colorMap[t] ||
                (this._colorMap[t] = this.zr.getColor(this._colorIndex++)),
              this._colorMap[t]
            );
          },
          hasColor: function (t) {
            return this._colorMap[t] ? this._colorMap[t] : !1;
          },
          add: function (t, e) {
            for (
              var i = this.legendOption.data, o = 0, n = i.length;
              n > o;
              o++
            )
              if (this._getName(i[o]) === t) return;
            this.legendOption.data.push(t),
              this.setColor(t, e),
              (this._selectedMap[t] = !0),
              (this._hasDataMap[t] = !0);
          },
          del: function (t) {
            for (
              var e = this.legendOption.data, i = 0, o = e.length;
              o > i;
              i++
            )
              if (this._getName(e[i]) === t)
                return this.legendOption.data.splice(i, 1);
          },
          getItemShape: function (t) {
            if (null != t)
              for (var e, i = 0, o = this.shapeList.length; o > i; i++)
                if (
                  ((e = this.shapeList[i]), e._name === t && 'text' != e.type)
                )
                  return e;
          },
          setItemShape: function (t, e) {
            for (var i, o = 0, n = this.shapeList.length; n > o; o++)
              (i = this.shapeList[o]),
                i._name === t &&
                  'text' != i.type &&
                  (this._selectedMap[t] ||
                    ((e.style.color = '#ccc'), (e.style.strokeColor = '#ccc')),
                  this.zr.modShape(i.id, e));
          },
          isSelected: function (t) {
            return 'undefined' != typeof this._selectedMap[t]
              ? this._selectedMap[t]
              : !0;
          },
          getSelectedMap: function () {
            return this._selectedMap;
          },
          setSelected: function (t, e) {
            if ('single' === this.legendOption.selectedMode)
              for (var i in this._selectedMap) this._selectedMap[i] = !1;
            (this._selectedMap[t] = e),
              this.messageCenter.dispatch(
                h.EVENT.LEGEND_SELECTED,
                null,
                { selected: this._selectedMap, target: t },
                this.myChart,
              );
          },
          onlegendSelected: function (t, e) {
            var i = t.selected;
            for (var o in i)
              this._selectedMap[o] != i[o] && (e.needRefresh = !0),
                (this._selectedMap[o] = i[o]);
          },
        };
        var c = {
          line: function (t, e) {
            var i = e.height / 2;
            t.moveTo(e.x, e.y + i), t.lineTo(e.x + e.width, e.y + i);
          },
          pie: function (t, e) {
            var i = e.x,
              o = e.y,
              n = e.width,
              r = e.height;
            s.prototype.buildPath(t, {
              x: i + n / 2,
              y: o + r + 2,
              r: r,
              r0: 6,
              startAngle: 45,
              endAngle: 135,
            });
          },
          eventRiver: function (t, e) {
            var i = e.x,
              o = e.y,
              n = e.width,
              s = e.height;
            t.moveTo(i, o + s),
              t.bezierCurveTo(i + n, o + s, i, o + 4, i + n, o + 4),
              t.lineTo(i + n, o),
              t.bezierCurveTo(i, o, i + n, o + s - 4, i, o + s - 4),
              t.lineTo(i, o + s);
          },
          k: function (t, e) {
            var i = e.x,
              o = e.y,
              n = e.width,
              s = e.height;
            a.prototype.buildPath(t, {
              x: i + n / 2,
              y: [o + 1, o + 1, o + s - 6, o + s],
              width: n - 6,
            });
          },
          bar: function (t, e) {
            var i = e.x,
              o = e.y + 1,
              n = e.width,
              s = e.height - 2,
              r = 3;
            t.moveTo(i + r, o),
              t.lineTo(i + n - r, o),
              t.quadraticCurveTo(i + n, o, i + n, o + r),
              t.lineTo(i + n, o + s - r),
              t.quadraticCurveTo(i + n, o + s, i + n - r, o + s),
              t.lineTo(i + r, o + s),
              t.quadraticCurveTo(i, o + s, i, o + s - r),
              t.lineTo(i, o + r),
              t.quadraticCurveTo(i, o, i + r, o);
          },
          force: function (t, e) {
            r.prototype.iconLibrary.circle(t, e);
          },
          radar: function (t, e) {
            var i = 6,
              o = e.x + e.width / 2,
              n = e.y + e.height / 2,
              s = e.height / 2,
              r = (2 * Math.PI) / i,
              a = -Math.PI / 2,
              h = o + s * Math.cos(a),
              l = n + s * Math.sin(a);
            t.moveTo(h, l), (a += r);
            for (var d = 0, c = i - 1; c > d; d++)
              t.lineTo(o + s * Math.cos(a), n + s * Math.sin(a)), (a += r);
            t.lineTo(h, l);
          },
        };
        (c.chord = c.pie), (c.map = c.bar);
        for (var p in c) r.prototype.iconLibrary['legendicon' + p] = c[p];
        return l.inherits(e, i), t('../component').define('legend', e), e;
      },
    ),
    i(
      'echarts/component/timeline',
      [
        'require',
        './base',
        'zrender/shape/Rectangle',
        '../util/shape/Icon',
        '../util/shape/Chain',
        '../config',
        'zrender/tool/util',
        'zrender/tool/area',
        'zrender/tool/event',
        '../component',
      ],
      function (t) {
        function e(t, e, i, n, s) {
          o.call(this, t, e, i, n, s);
          var r = this;
          if (
            ((r._onclick = function (t) {
              return r.__onclick(t);
            }),
            (r._ondrift = function (t, e) {
              return r.__ondrift(this, t, e);
            }),
            (r._ondragend = function () {
              return r.__ondragend();
            }),
            (r._setCurrentOption = function () {
              var t = r.timelineOption;
              r.currentIndex %= t.data.length;
              var e = r.options[r.currentIndex] || {};
              r.myChart._setOption(e, t.notMerge, !0),
                r.messageCenter.dispatch(
                  a.EVENT.TIMELINE_CHANGED,
                  null,
                  {
                    currentIndex: r.currentIndex,
                    data:
                      null != t.data[r.currentIndex].name
                        ? t.data[r.currentIndex].name
                        : t.data[r.currentIndex],
                  },
                  r.myChart,
                );
            }),
            (r._onFrame = function () {
              r._setCurrentOption(),
                r._syncHandleShape(),
                r.timelineOption.autoPlay &&
                  (r.playTicket = setTimeout(function () {
                    return (
                      (r.currentIndex += 1),
                      !r.timelineOption.loop &&
                      r.currentIndex >= r.timelineOption.data.length
                        ? ((r.currentIndex = r.timelineOption.data.length - 1),
                          void r.stop())
                        : void r._onFrame()
                    );
                  }, r.timelineOption.playInterval));
            }),
            this.setTheme(!1),
            (this.options = this.option.options),
            (this.currentIndex =
              this.timelineOption.currentIndex %
              this.timelineOption.data.length),
            this.timelineOption.notMerge ||
              0 === this.currentIndex ||
              (this.options[this.currentIndex] = h.merge(
                this.options[this.currentIndex],
                this.options[0],
              )),
            this.timelineOption.show &&
              (this._buildShape(), this._syncHandleShape()),
            this._setCurrentOption(),
            this.timelineOption.autoPlay)
          ) {
            var r = this;
            this.playTicket = setTimeout(
              function () {
                r.play();
              },
              null != this.ecTheme.animationDuration
                ? this.ecTheme.animationDuration
                : a.animationDuration,
            );
          }
        }
        function i(t, e) {
          var i = 2,
            o = e.x + i,
            n = e.y + i + 2,
            r = e.width - i,
            a = e.height - i,
            h = e.symbol;
          if ('last' === h)
            t.moveTo(o + r - 2, n + a / 3),
              t.lineTo(o + r - 2, n),
              t.lineTo(o + 2, n + a / 2),
              t.lineTo(o + r - 2, n + a),
              t.lineTo(o + r - 2, n + (a / 3) * 2),
              t.moveTo(o, n),
              t.lineTo(o, n);
          else if ('next' === h)
            t.moveTo(o + 2, n + a / 3),
              t.lineTo(o + 2, n),
              t.lineTo(o + r - 2, n + a / 2),
              t.lineTo(o + 2, n + a),
              t.lineTo(o + 2, n + (a / 3) * 2),
              t.moveTo(o, n),
              t.lineTo(o, n);
          else if ('play' === h)
            if ('stop' === e.status)
              t.moveTo(o + 2, n),
                t.lineTo(o + r - 2, n + a / 2),
                t.lineTo(o + 2, n + a),
                t.lineTo(o + 2, n);
            else {
              var l = 'both' === e.brushType ? 2 : 3;
              t.rect(o + 2, n, l, a), t.rect(o + r - l - 2, n, l, a);
            }
          else if (h.match('image')) {
            var d = '';
            (d = h.replace(new RegExp('^image:\\/\\/'), '')),
              (h = s.prototype.iconLibrary.image),
              h(t, { x: o, y: n, width: r, height: a, image: d });
          }
        }
        var o = t('./base'),
          n = t('zrender/shape/Rectangle'),
          s = t('../util/shape/Icon'),
          r = t('../util/shape/Chain'),
          a = t('../config');
        a.timeline = {
          zlevel: 0,
          z: 4,
          show: !0,
          type: 'time',
          notMerge: !1,
          realtime: !0,
          x: 80,
          x2: 80,
          y2: 0,
          height: 50,
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          controlPosition: 'left',
          autoPlay: !1,
          loop: !0,
          playInterval: 2e3,
          lineStyle: { width: 1, color: '#666', type: 'dashed' },
          label: {
            show: !0,
            interval: 'auto',
            rotate: 0,
            textStyle: { color: '#333' },
          },
          checkpointStyle: {
            symbol: 'auto',
            symbolSize: 'auto',
            color: 'auto',
            borderColor: 'auto',
            borderWidth: 'auto',
            label: { show: !1, textStyle: { color: 'auto' } },
          },
          controlStyle: {
            itemSize: 15,
            itemGap: 5,
            normal: { color: '#333' },
            emphasis: { color: '#1e90ff' },
          },
          symbol: 'emptyDiamond',
          symbolSize: 4,
          currentIndex: 0,
        };
        var h = t('zrender/tool/util'),
          l = t('zrender/tool/area'),
          d = t('zrender/tool/event');
        return (
          (e.prototype = {
            type: a.COMPONENT_TYPE_TIMELINE,
            _buildShape: function () {
              if (
                ((this._location = this._getLocation()),
                this._buildBackground(),
                this._buildControl(),
                (this._chainPoint = this._getChainPoint()),
                this.timelineOption.label.show)
              )
                for (
                  var t = this._getInterval(),
                    e = 0,
                    i = this._chainPoint.length;
                  i > e;
                  e += t
                )
                  this._chainPoint[e].showLabel = !0;
              this._buildChain(), this._buildHandle();
              for (var e = 0, o = this.shapeList.length; o > e; e++)
                this.zr.addShape(this.shapeList[e]);
            },
            _getLocation: function () {
              var t,
                e = this.timelineOption,
                i = this.reformCssArray(this.timelineOption.padding),
                o = this.zr.getWidth(),
                n = this.parsePercent(e.x, o),
                s = this.parsePercent(e.x2, o);
              null == e.width
                ? ((t = o - n - s), (s = o - s))
                : ((t = this.parsePercent(e.width, o)), (s = n + t));
              var r,
                a,
                h = this.zr.getHeight(),
                l = this.parsePercent(e.height, h);
              return (
                null != e.y
                  ? ((r = this.parsePercent(e.y, h)), (a = r + l))
                  : ((a = h - this.parsePercent(e.y2, h)), (r = a - l)),
                {
                  x: n + i[3],
                  y: r + i[0],
                  x2: s - i[1],
                  y2: a - i[2],
                  width: t - i[1] - i[3],
                  height: l - i[0] - i[2],
                }
              );
            },
            _getReformedLabel: function (t) {
              var e = this.timelineOption,
                i = null != e.data[t].name ? e.data[t].name : e.data[t],
                o = e.data[t].formatter || e.label.formatter;
              return (
                o &&
                  ('function' == typeof o
                    ? (i = o.call(this.myChart, i))
                    : 'string' == typeof o && (i = o.replace('{value}', i))),
                i
              );
            },
            _getInterval: function () {
              var t = this._chainPoint,
                e = this.timelineOption,
                i = e.label.interval;
              if ('auto' === i) {
                var o = e.label.textStyle.fontSize,
                  n = e.data,
                  s = e.data.length;
                if (s > 3) {
                  var r,
                    a,
                    h = !1;
                  for (i = 0; !h && s > i; ) {
                    i++, (h = !0);
                    for (var d = i; s > d; d += i) {
                      if (((r = t[d].x - t[d - i].x), 0 !== e.label.rotate))
                        a = o;
                      else if (n[d].textStyle)
                        a = l.getTextWidth(t[d].name, t[d].textFont);
                      else {
                        var c = t[d].name + '',
                          p = (c.match(/\w/g) || '').length,
                          u = c.length - p;
                        a = (p * o * 2) / 3 + u * o;
                      }
                      if (a > r) {
                        h = !1;
                        break;
                      }
                    }
                  }
                } else i = 1;
              } else i = i - 0 + 1;
              return i;
            },
            _getChainPoint: function () {
              function t(t) {
                return null != l[t].name ? l[t].name : l[t] + '';
              }
              var e,
                i = this.timelineOption,
                o = i.symbol.toLowerCase(),
                n = i.symbolSize,
                s = i.label.rotate,
                r = i.label.textStyle,
                a = this.getFont(r),
                l = i.data,
                d = this._location.x,
                c = this._location.y + (this._location.height / 4) * 3,
                p = this._location.x2 - this._location.x,
                u = l.length,
                g = [];
              if (u > 1) {
                var f = p / u;
                if (
                  ((f = f > 50 ? 50 : 20 > f ? 5 : f),
                  (p -= 2 * f),
                  'number' === i.type)
                )
                  for (var m = 0; u > m; m++) g.push(d + f + (p / (u - 1)) * m);
                else {
                  (g[0] = new Date(t(0).replace(/-/g, '/'))),
                    (g[u - 1] = new Date(t(u - 1).replace(/-/g, '/')) - g[0]);
                  for (var m = 1; u > m; m++)
                    g[m] =
                      d +
                      f +
                      (p * (new Date(t(m).replace(/-/g, '/')) - g[0])) /
                        g[u - 1];
                  g[0] = d + f;
                }
              } else g.push(d + p / 2);
              for (var _, y, x, v, b, S = [], m = 0; u > m; m++)
                (d = g[m]),
                  (_ = (l[m].symbol && l[m].symbol.toLowerCase()) || o),
                  _.match('empty')
                    ? ((_ = _.replace('empty', '')), (x = !0))
                    : (x = !1),
                  _.match('star') &&
                    ((y = _.replace('star', '') - 0 || 5), (_ = 'star')),
                  (e = l[m].textStyle ? h.merge(l[m].textStyle || {}, r) : r),
                  (v = e.align || 'center'),
                  s
                    ? ((v = s > 0 ? 'right' : 'left'),
                      (b = [(s * Math.PI) / 180, d, c - 5]))
                    : (b = !1),
                  S.push({
                    x: d,
                    n: y,
                    isEmpty: x,
                    symbol: _,
                    symbolSize: l[m].symbolSize || n,
                    color: l[m].color,
                    borderColor: l[m].borderColor,
                    borderWidth: l[m].borderWidth,
                    name: this._getReformedLabel(m),
                    textColor: e.color,
                    textAlign: v,
                    textBaseline: e.baseline || 'middle',
                    textX: d,
                    textY: c - (s ? 5 : 0),
                    textFont: l[m].textStyle ? this.getFont(e) : a,
                    rotation: b,
                    showLabel: !1,
                  });
              return S;
            },
            _buildBackground: function () {
              var t = this.timelineOption,
                e = this.reformCssArray(this.timelineOption.padding),
                i = this._location.width,
                o = this._location.height;
              (0 !== t.borderWidth ||
                'rgba(0,0,0,0)' != t.backgroundColor.replace(/\s/g, '')) &&
                this.shapeList.push(
                  new n({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    hoverable: !1,
                    style: {
                      x: this._location.x - e[3],
                      y: this._location.y - e[0],
                      width: i + e[1] + e[3],
                      height: o + e[0] + e[2],
                      brushType: 0 === t.borderWidth ? 'fill' : 'both',
                      color: t.backgroundColor,
                      strokeColor: t.borderColor,
                      lineWidth: t.borderWidth,
                    },
                  }),
                );
            },
            _buildControl: function () {
              var t = this,
                e = this.timelineOption,
                i = e.lineStyle,
                o = e.controlStyle;
              if ('none' !== e.controlPosition) {
                var n,
                  r = o.itemSize,
                  a = o.itemGap;
                'left' === e.controlPosition
                  ? ((n = this._location.x), (this._location.x += 3 * (r + a)))
                  : ((n = this._location.x2 - (3 * (r + a) - a)),
                    (this._location.x2 -= 3 * (r + a)));
                var l = this._location.y,
                  d = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 1,
                    style: {
                      iconType: 'timelineControl',
                      symbol: 'last',
                      x: n,
                      y: l,
                      width: r,
                      height: r,
                      brushType: 'stroke',
                      color: o.normal.color,
                      strokeColor: o.normal.color,
                      lineWidth: i.width,
                    },
                    highlightStyle: {
                      color: o.emphasis.color,
                      strokeColor: o.emphasis.color,
                      lineWidth: i.width + 1,
                    },
                    clickable: !0,
                  };
                (this._ctrLastShape = new s(d)),
                  (this._ctrLastShape.onclick = function () {
                    t.last();
                  }),
                  this.shapeList.push(this._ctrLastShape),
                  (n += r + a),
                  (this._ctrPlayShape = new s(h.clone(d))),
                  (this._ctrPlayShape.style.brushType = 'fill'),
                  (this._ctrPlayShape.style.symbol = 'play'),
                  (this._ctrPlayShape.style.status = this.timelineOption
                    .autoPlay
                    ? 'playing'
                    : 'stop'),
                  (this._ctrPlayShape.style.x = n),
                  (this._ctrPlayShape.onclick = function () {
                    'stop' === t._ctrPlayShape.style.status
                      ? t.play()
                      : t.stop();
                  }),
                  this.shapeList.push(this._ctrPlayShape),
                  (n += r + a),
                  (this._ctrNextShape = new s(h.clone(d))),
                  (this._ctrNextShape.style.symbol = 'next'),
                  (this._ctrNextShape.style.x = n),
                  (this._ctrNextShape.onclick = function () {
                    t.next();
                  }),
                  this.shapeList.push(this._ctrNextShape);
              }
            },
            _buildChain: function () {
              var t = this.timelineOption,
                e = t.lineStyle;
              (this._timelineShae = {
                zlevel: this.getZlevelBase(),
                z: this.getZBase(),
                style: {
                  x: this._location.x,
                  y: this.subPixelOptimize(this._location.y, e.width),
                  width: this._location.x2 - this._location.x,
                  height: this._location.height,
                  chainPoint: this._chainPoint,
                  brushType: 'both',
                  strokeColor: e.color,
                  lineWidth: e.width,
                  lineType: e.type,
                },
                hoverable: !1,
                clickable: !0,
                onclick: this._onclick,
              }),
                (this._timelineShae = new r(this._timelineShae)),
                this.shapeList.push(this._timelineShae);
            },
            _buildHandle: function () {
              var t = this._chainPoint[this.currentIndex],
                e = t.symbolSize + 1;
              (e = 5 > e ? 5 : e),
                (this._handleShape = {
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase() + 1,
                  hoverable: !1,
                  draggable: !0,
                  style: {
                    iconType: 'diamond',
                    n: t.n,
                    x: t.x - e,
                    y: this._location.y + this._location.height / 4 - e,
                    width: 2 * e,
                    height: 2 * e,
                    brushType: 'both',
                    textPosition: 'specific',
                    textX: t.x,
                    textY: this._location.y - this._location.height / 4,
                    textAlign: 'center',
                    textBaseline: 'middle',
                  },
                  highlightStyle: {},
                  ondrift: this._ondrift,
                  ondragend: this._ondragend,
                }),
                (this._handleShape = new s(this._handleShape)),
                this.shapeList.push(this._handleShape);
            },
            _syncHandleShape: function () {
              if (this.timelineOption.show) {
                var t = this.timelineOption,
                  e = t.checkpointStyle,
                  i = this._chainPoint[this.currentIndex];
                (this._handleShape.style.text = e.label.show ? i.name : ''),
                  (this._handleShape.style.textFont = i.textFont),
                  (this._handleShape.style.n = i.n),
                  'auto' === e.symbol
                    ? (this._handleShape.style.iconType =
                        'none' != i.symbol ? i.symbol : 'diamond')
                    : ((this._handleShape.style.iconType = e.symbol),
                      e.symbol.match('star') &&
                        ((this._handleShape.style.n =
                          e.symbol.replace('star', '') - 0 || 5),
                        (this._handleShape.style.iconType = 'star')));
                var o;
                'auto' === e.symbolSize
                  ? ((o = i.symbolSize + 2), (o = 5 > o ? 5 : o))
                  : (o = e.symbolSize - 0),
                  (this._handleShape.style.color =
                    'auto' === e.color
                      ? i.color
                        ? i.color
                        : t.controlStyle.emphasis.color
                      : e.color),
                  (this._handleShape.style.textColor =
                    'auto' === e.label.textStyle.color
                      ? this._handleShape.style.color
                      : e.label.textStyle.color),
                  (this._handleShape.highlightStyle.strokeColor =
                    this._handleShape.style.strokeColor =
                      'auto' === e.borderColor
                        ? i.borderColor
                          ? i.borderColor
                          : '#fff'
                        : e.borderColor),
                  (this._handleShape.style.lineWidth =
                    'auto' === e.borderWidth
                      ? i.borderWidth
                        ? i.borderWidth
                        : 0
                      : e.borderWidth - 0),
                  (this._handleShape.highlightStyle.lineWidth =
                    this._handleShape.style.lineWidth + 1),
                  this.zr
                    .animate(this._handleShape.id, 'style')
                    .when(500, {
                      x: i.x - o,
                      textX: i.x,
                      y: this._location.y + this._location.height / 4 - o,
                      width: 2 * o,
                      height: 2 * o,
                    })
                    .start('ExponentialOut');
              }
            },
            _findChainIndex: function (t) {
              var e = this._chainPoint,
                i = e.length;
              if (t <= e[0].x) return 0;
              if (t >= e[i - 1].x) return i - 1;
              for (var o = 0; i - 1 > o; o++)
                if (t >= e[o].x && t <= e[o + 1].x)
                  return Math.abs(t - e[o].x) < Math.abs(t - e[o + 1].x)
                    ? o
                    : o + 1;
            },
            __onclick: function (t) {
              var e = d.getX(t.event),
                i = this._findChainIndex(e);
              return i === this.currentIndex
                ? !0
                : ((this.currentIndex = i),
                  this.timelineOption.autoPlay && this.stop(),
                  clearTimeout(this.playTicket),
                  void this._onFrame());
            },
            __ondrift: function (t, e) {
              this.timelineOption.autoPlay && this.stop();
              var i,
                o = this._chainPoint,
                n = o.length;
              t.style.x + e <= o[0].x - o[0].symbolSize
                ? ((t.style.x = o[0].x - o[0].symbolSize), (i = 0))
                : t.style.x + e >= o[n - 1].x - o[n - 1].symbolSize
                ? ((t.style.x = o[n - 1].x - o[n - 1].symbolSize), (i = n - 1))
                : ((t.style.x += e), (i = this._findChainIndex(t.style.x)));
              var s = o[i],
                r = s.symbolSize + 2;
              if (
                ((t.style.iconType = s.symbol),
                (t.style.n = s.n),
                (t.style.textX = t.style.x + r / 2),
                (t.style.y = this._location.y + this._location.height / 4 - r),
                (t.style.width = 2 * r),
                (t.style.height = 2 * r),
                (t.style.text = s.name),
                i === this.currentIndex)
              )
                return !0;
              if (((this.currentIndex = i), this.timelineOption.realtime)) {
                clearTimeout(this.playTicket);
                var a = this;
                this.playTicket = setTimeout(function () {
                  a._setCurrentOption();
                }, 200);
              }
              return !0;
            },
            __ondragend: function () {
              this.isDragend = !0;
            },
            ondragend: function (t, e) {
              this.isDragend &&
                t.target &&
                (!this.timelineOption.realtime && this._setCurrentOption(),
                (e.dragOut = !0),
                (e.dragIn = !0),
                (e.needRefresh = !1),
                (this.isDragend = !1),
                this._syncHandleShape());
            },
            last: function () {
              return (
                this.timelineOption.autoPlay && this.stop(),
                (this.currentIndex -= 1),
                this.currentIndex < 0 &&
                  (this.currentIndex = this.timelineOption.data.length - 1),
                this._onFrame(),
                this.currentIndex
              );
            },
            next: function () {
              return (
                this.timelineOption.autoPlay && this.stop(),
                (this.currentIndex += 1),
                this.currentIndex >= this.timelineOption.data.length &&
                  (this.currentIndex = 0),
                this._onFrame(),
                this.currentIndex
              );
            },
            play: function (t, e) {
              return (
                this._ctrPlayShape &&
                  'playing' != this._ctrPlayShape.style.status &&
                  ((this._ctrPlayShape.style.status = 'playing'),
                  this.zr.modShape(this._ctrPlayShape.id),
                  this.zr.refreshNextFrame()),
                (this.timelineOption.autoPlay = null != e ? e : !0),
                this.timelineOption.autoPlay || clearTimeout(this.playTicket),
                (this.currentIndex = null != t ? t : this.currentIndex + 1),
                this.currentIndex >= this.timelineOption.data.length &&
                  (this.currentIndex = 0),
                this._onFrame(),
                this.currentIndex
              );
            },
            stop: function () {
              return (
                this._ctrPlayShape &&
                  'stop' != this._ctrPlayShape.style.status &&
                  ((this._ctrPlayShape.style.status = 'stop'),
                  this.zr.modShape(this._ctrPlayShape.id),
                  this.zr.refreshNextFrame()),
                (this.timelineOption.autoPlay = !1),
                clearTimeout(this.playTicket),
                this.currentIndex
              );
            },
            resize: function () {
              this.timelineOption.show &&
                (this.clear(), this._buildShape(), this._syncHandleShape());
            },
            setTheme: function (t) {
              (this.timelineOption = this.reformOption(
                h.clone(this.option.timeline),
              )),
                (this.timelineOption.label.textStyle = this.getTextStyle(
                  this.timelineOption.label.textStyle,
                )),
                (this.timelineOption.checkpointStyle.label.textStyle =
                  this.getTextStyle(
                    this.timelineOption.checkpointStyle.label.textStyle,
                  )),
                this.myChart.canvasSupported ||
                  (this.timelineOption.realtime = !1),
                this.timelineOption.show &&
                  t &&
                  (this.clear(), this._buildShape(), this._syncHandleShape());
            },
            onbeforDispose: function () {
              clearTimeout(this.playTicket);
            },
          }),
          (s.prototype.iconLibrary.timelineControl = i),
          h.inherits(e, o),
          t('../component').define('timeline', e),
          e
        );
      },
    ),
    i(
      'zrender/shape/Image',
      ['require', './Base', '../tool/util'],
      function (t) {
        var e = t('./Base'),
          i = function (t) {
            e.call(this, t);
          };
        return (
          (i.prototype = {
            type: 'image',
            brush: function (t, e, i) {
              var o = this.style || {};
              e && (o = this.getHighlightStyle(o, this.highlightStyle || {}));
              var n = o.image,
                s = this;
              if (
                (this._imageCache || (this._imageCache = {}),
                'string' == typeof n)
              ) {
                var r = n;
                this._imageCache[r]
                  ? (n = this._imageCache[r])
                  : ((n = new Image()),
                    (n.onload = function () {
                      (n.onload = null), s.modSelf(), i();
                    }),
                    (n.src = r),
                    (this._imageCache[r] = n));
              }
              if (n) {
                if ('IMG' == n.nodeName.toUpperCase())
                  if (window.ActiveXObject) {
                    if ('complete' != n.readyState) return;
                  } else if (!n.complete) return;
                var a = o.width || n.width,
                  h = o.height || n.height,
                  l = o.x,
                  d = o.y;
                if (!n.width || !n.height) return;
                if (
                  (t.save(),
                  this.doClip(t),
                  this.setContext(t, o),
                  this.setTransform(t),
                  o.sWidth && o.sHeight)
                ) {
                  var c = o.sx || 0,
                    p = o.sy || 0;
                  t.drawImage(n, c, p, o.sWidth, o.sHeight, l, d, a, h);
                } else if (o.sx && o.sy) {
                  var c = o.sx,
                    p = o.sy,
                    u = a - c,
                    g = h - p;
                  t.drawImage(n, c, p, u, g, l, d, a, h);
                } else t.drawImage(n, l, d, a, h);
                o.width || (o.width = a),
                  o.height || (o.height = h),
                  this.style.width || (this.style.width = a),
                  this.style.height || (this.style.height = h),
                  this.drawText(t, o, this.style),
                  t.restore();
              }
            },
            getRect: function (t) {
              return { x: t.x, y: t.y, width: t.width, height: t.height };
            },
            clearCache: function () {
              this._imageCache = {};
            },
          }),
          t('../tool/util').inherits(i, e),
          i
        );
      },
    ),
    i(
      'echarts/component/tooltip',
      [
        'require',
        './base',
        '../util/shape/Cross',
        'zrender/shape/Line',
        'zrender/shape/Rectangle',
        '../config',
        '../util/ecData',
        'zrender/config',
        'zrender/tool/event',
        'zrender/tool/area',
        'zrender/tool/color',
        'zrender/tool/util',
        'zrender/shape/Base',
        '../component',
      ],
      function (t) {
        function e(t, e, s, r, a) {
          i.call(this, t, e, s, r, a), (this.dom = a.dom);
          var h = this;
          (h._onmousemove = function (t) {
            return h.__onmousemove(t);
          }),
            (h._onglobalout = function (t) {
              return h.__onglobalout(t);
            }),
            this.zr.on(l.EVENT.MOUSEMOVE, h._onmousemove),
            this.zr.on(l.EVENT.GLOBALOUT, h._onglobalout),
            (h._hide = function (t) {
              return h.__hide(t);
            }),
            (h._tryShow = function (t) {
              return h.__tryShow(t);
            }),
            (h._refixed = function (t) {
              return h.__refixed(t);
            }),
            (h._setContent = function (t, e) {
              return h.__setContent(t, e);
            }),
            (this._tDom = this._tDom || document.createElement('div')),
            (this._tDom.onselectstart = function () {
              return !1;
            }),
            (this._tDom.onmouseover = function () {
              h._mousein = !0;
            }),
            (this._tDom.onmouseout = function () {
              h._mousein = !1;
            }),
            (this._tDom.className = 'echarts-tooltip'),
            (this._tDom.style.position = 'absolute'),
            (this.hasAppend = !1),
            this._axisLineShape && this.zr.delShape(this._axisLineShape.id),
            (this._axisLineShape = new n({
              zlevel: this.getZlevelBase(),
              z: this.getZBase(),
              invisible: !0,
              hoverable: !1,
            })),
            this.shapeList.push(this._axisLineShape),
            this.zr.addShape(this._axisLineShape),
            this._axisShadowShape && this.zr.delShape(this._axisShadowShape.id),
            (this._axisShadowShape = new n({
              zlevel: this.getZlevelBase(),
              z: 1,
              invisible: !0,
              hoverable: !1,
            })),
            this.shapeList.push(this._axisShadowShape),
            this.zr.addShape(this._axisShadowShape),
            this._axisCrossShape && this.zr.delShape(this._axisCrossShape.id),
            (this._axisCrossShape = new o({
              zlevel: this.getZlevelBase(),
              z: this.getZBase(),
              invisible: !0,
              hoverable: !1,
            })),
            this.shapeList.push(this._axisCrossShape),
            this.zr.addShape(this._axisCrossShape),
            (this.showing = !1),
            this.refresh(r);
        }
        var i = t('./base'),
          o = t('../util/shape/Cross'),
          n = t('zrender/shape/Line'),
          s = t('zrender/shape/Rectangle'),
          r = new s({}),
          a = t('../config');
        a.tooltip = {
          zlevel: 1,
          z: 8,
          show: !0,
          showContent: !0,
          trigger: 'item',
          islandFormatter: '{a} <br/>{b} : {c}',
          showDelay: 20,
          hideDelay: 100,
          transitionDuration: 0.4,
          enterable: !1,
          backgroundColor: 'rgba(0,0,0,0.7)',
          borderColor: '#333',
          borderRadius: 4,
          borderWidth: 0,
          padding: 5,
          axisPointer: {
            type: 'line',
            lineStyle: { color: '#48b', width: 2, type: 'solid' },
            crossStyle: { color: '#1e90ff', width: 1, type: 'dashed' },
            shadowStyle: {
              color: 'rgba(150,150,150,0.3)',
              width: 'auto',
              type: 'default',
            },
          },
          textStyle: { color: '#fff' },
        };
        var h = t('../util/ecData'),
          l = t('zrender/config'),
          d = t('zrender/tool/event'),
          c = t('zrender/tool/area'),
          p = t('zrender/tool/color'),
          u = t('zrender/tool/util'),
          g = t('zrender/shape/Base');
        return (
          (e.prototype = {
            type: a.COMPONENT_TYPE_TOOLTIP,
            _gCssText:
              'position:absolute;display:block;border-style:solid;white-space:nowrap;',
            _style: function (t) {
              if (!t) return '';
              var e = [];
              if (t.transitionDuration) {
                var i =
                  'left ' +
                  t.transitionDuration +
                  's,top ' +
                  t.transitionDuration +
                  's';
                e.push('transition:' + i),
                  e.push('-moz-transition:' + i),
                  e.push('-webkit-transition:' + i),
                  e.push('-o-transition:' + i);
              }
              t.backgroundColor &&
                (e.push('background-Color:' + p.toHex(t.backgroundColor)),
                e.push('filter:alpha(opacity=70)'),
                e.push('background-Color:' + t.backgroundColor)),
                null != t.borderWidth &&
                  e.push('border-width:' + t.borderWidth + 'px'),
                null != t.borderColor &&
                  e.push('border-color:' + t.borderColor),
                null != t.borderRadius &&
                  (e.push('border-radius:' + t.borderRadius + 'px'),
                  e.push('-moz-border-radius:' + t.borderRadius + 'px'),
                  e.push('-webkit-border-radius:' + t.borderRadius + 'px'),
                  e.push('-o-border-radius:' + t.borderRadius + 'px'));
              var o = t.textStyle;
              o &&
                (o.color && e.push('color:' + o.color),
                o.decoration && e.push('text-decoration:' + o.decoration),
                o.align && e.push('text-align:' + o.align),
                o.fontFamily && e.push('font-family:' + o.fontFamily),
                o.fontSize && e.push('font-size:' + o.fontSize + 'px'),
                o.fontSize &&
                  e.push(
                    'line-height:' + Math.round((3 * o.fontSize) / 2) + 'px',
                  ),
                o.fontStyle && e.push('font-style:' + o.fontStyle),
                o.fontWeight && e.push('font-weight:' + o.fontWeight));
              var n = t.padding;
              return (
                null != n &&
                  ((n = this.reformCssArray(n)),
                  e.push(
                    'padding:' +
                      n[0] +
                      'px ' +
                      n[1] +
                      'px ' +
                      n[2] +
                      'px ' +
                      n[3] +
                      'px',
                  )),
                (e = e.join(';') + ';')
              );
            },
            __hide: function () {
              (this._lastDataIndex = -1),
                (this._lastSeriesIndex = -1),
                (this._lastItemTriggerId = -1),
                this._tDom && (this._tDom.style.display = 'none');
              var t = !1;
              this._axisLineShape.invisible ||
                ((this._axisLineShape.invisible = !0),
                this.zr.modShape(this._axisLineShape.id),
                (t = !0)),
                this._axisShadowShape.invisible ||
                  ((this._axisShadowShape.invisible = !0),
                  this.zr.modShape(this._axisShadowShape.id),
                  (t = !0)),
                this._axisCrossShape.invisible ||
                  ((this._axisCrossShape.invisible = !0),
                  this.zr.modShape(this._axisCrossShape.id),
                  (t = !0)),
                this._lastTipShape &&
                  this._lastTipShape.tipShape.length > 0 &&
                  (this.zr.delShape(this._lastTipShape.tipShape),
                  (this._lastTipShape = !1),
                  (this.shapeList.length = 2)),
                t && this.zr.refreshNextFrame(),
                (this.showing = !1);
            },
            _show: function (t, e, i, o) {
              var n = this._tDom.offsetHeight,
                s = this._tDom.offsetWidth;
              t &&
                ('function' == typeof t && (t = t([e, i])),
                t instanceof Array && ((e = t[0]), (i = t[1]))),
                e + s > this._zrWidth && (e -= s + 40),
                i + n > this._zrHeight && (i -= n - 20),
                20 > i && (i = 0),
                (this._tDom.style.cssText =
                  this._gCssText +
                  this._defaultCssText +
                  (o ? o : '') +
                  'left:' +
                  e +
                  'px;top:' +
                  i +
                  'px;'),
                (10 > n || 10 > s) && setTimeout(this._refixed, 20),
                (this.showing = !0);
            },
            __refixed: function () {
              if (this._tDom) {
                var t = '',
                  e = this._tDom.offsetHeight,
                  i = this._tDom.offsetWidth;
                this._tDom.offsetLeft + i > this._zrWidth &&
                  (t += 'left:' + (this._zrWidth - i - 20) + 'px;'),
                  this._tDom.offsetTop + e > this._zrHeight &&
                    (t += 'top:' + (this._zrHeight - e - 10) + 'px;'),
                  '' !== t && (this._tDom.style.cssText += t);
              }
            },
            __tryShow: function () {
              var t, e;
              if (this._curTarget) {
                if (
                  'island' === this._curTarget._type &&
                  this.option.tooltip.show
                )
                  return void this._showItemTrigger();
                var i = h.get(this._curTarget, 'series'),
                  o = h.get(this._curTarget, 'data');
                (t = this.deepQuery([o, i, this.option], 'tooltip.show')),
                  null != i && null != o && t
                    ? ((e = this.deepQuery(
                        [o, i, this.option],
                        'tooltip.trigger',
                      )),
                      'axis' === e
                        ? this._showAxisTrigger(
                            i.xAxisIndex,
                            i.yAxisIndex,
                            h.get(this._curTarget, 'dataIndex'),
                          )
                        : this._showItemTrigger())
                    : (clearTimeout(this._hidingTicket),
                      clearTimeout(this._showingTicket),
                      (this._hidingTicket = setTimeout(
                        this._hide,
                        this._hideDelay,
                      )));
              } else this._findPolarTrigger() || this._findAxisTrigger();
            },
            _findAxisTrigger: function () {
              if (!this.component.xAxis || !this.component.yAxis)
                return void (this._hidingTicket = setTimeout(
                  this._hide,
                  this._hideDelay,
                ));
              for (
                var t, e, i = this.option.series, o = 0, n = i.length;
                n > o;
                o++
              )
                if (
                  'axis' ===
                  this.deepQuery([i[o], this.option], 'tooltip.trigger')
                )
                  return (
                    (t = i[o].xAxisIndex || 0),
                    (e = i[o].yAxisIndex || 0),
                    this.component.xAxis.getAxis(t) &&
                    this.component.xAxis.getAxis(t).type ===
                      a.COMPONENT_TYPE_AXIS_CATEGORY
                      ? void this._showAxisTrigger(
                          t,
                          e,
                          this._getNearestDataIndex(
                            'x',
                            this.component.xAxis.getAxis(t),
                          ),
                        )
                      : this.component.yAxis.getAxis(e) &&
                        this.component.yAxis.getAxis(e).type ===
                          a.COMPONENT_TYPE_AXIS_CATEGORY
                      ? void this._showAxisTrigger(
                          t,
                          e,
                          this._getNearestDataIndex(
                            'y',
                            this.component.yAxis.getAxis(e),
                          ),
                        )
                      : void this._showAxisTrigger(t, e, -1)
                  );
              'cross' === this.option.tooltip.axisPointer.type &&
                this._showAxisTrigger(-1, -1, -1);
            },
            _findPolarTrigger: function () {
              if (!this.component.polar) return !1;
              var t,
                e = d.getX(this._event),
                i = d.getY(this._event),
                o = this.component.polar.getNearestIndex([e, i]);
              return (
                o ? ((t = o.valueIndex), (o = o.polarIndex)) : (o = -1),
                -1 != o ? this._showPolarTrigger(o, t) : !1
              );
            },
            _getNearestDataIndex: function (t, e) {
              var i = -1,
                o = d.getX(this._event),
                n = d.getY(this._event);
              if ('x' === t) {
                for (
                  var s,
                    r,
                    a = this.component.grid.getXend(),
                    h = e.getCoordByIndex(i);
                  a > h && ((r = h), o >= h);

                )
                  (s = h), (h = e.getCoordByIndex(++i));
                return (
                  0 >= i
                    ? (i = 0)
                    : r - o >= o - s
                    ? (i -= 1)
                    : null == e.getNameByIndex(i) && (i -= 1),
                  i
                );
              }
              for (
                var l,
                  c,
                  p = this.component.grid.getY(),
                  h = e.getCoordByIndex(i);
                h > p && ((l = h), h >= n);

              )
                (c = h), (h = e.getCoordByIndex(++i));
              return (
                0 >= i
                  ? (i = 0)
                  : n - l >= c - n
                  ? (i -= 1)
                  : null == e.getNameByIndex(i) && (i -= 1),
                i
              );
            },
            _showAxisTrigger: function (t, e, i) {
              if (
                (!this._event.connectTrigger &&
                  this.messageCenter.dispatch(
                    a.EVENT.TOOLTIP_IN_GRID,
                    this._event,
                    null,
                    this.myChart,
                  ),
                null == this.component.xAxis ||
                  null == this.component.yAxis ||
                  null == t ||
                  null == e)
              )
                return (
                  clearTimeout(this._hidingTicket),
                  clearTimeout(this._showingTicket),
                  void (this._hidingTicket = setTimeout(
                    this._hide,
                    this._hideDelay,
                  ))
                );
              var o,
                n,
                s,
                r,
                h = this.option.series,
                l = [],
                c = [],
                p = '';
              if ('axis' === this.option.tooltip.trigger) {
                if (!this.option.tooltip.show) return;
                (n = this.option.tooltip.formatter),
                  (s = this.option.tooltip.position);
              }
              var u,
                g,
                f =
                  -1 != t &&
                  this.component.xAxis.getAxis(t).type ===
                    a.COMPONENT_TYPE_AXIS_CATEGORY
                    ? 'xAxis'
                    : -1 != e &&
                      this.component.yAxis.getAxis(e).type ===
                        a.COMPONENT_TYPE_AXIS_CATEGORY
                    ? 'yAxis'
                    : !1;
              if (f) {
                var m = 'xAxis' == f ? t : e;
                o = this.component[f].getAxis(m);
                for (var _ = 0, y = h.length; y > _; _++)
                  this._isSelected(h[_].name) &&
                    h[_][f + 'Index'] === m &&
                    'axis' ===
                      this.deepQuery([h[_], this.option], 'tooltip.trigger') &&
                    ((r = this.query(h[_], 'tooltip.showContent') || r),
                    (n = this.query(h[_], 'tooltip.formatter') || n),
                    (s = this.query(h[_], 'tooltip.position') || s),
                    (p += this._style(this.query(h[_], 'tooltip'))),
                    null != h[_].stack && 'xAxis' == f
                      ? (l.unshift(h[_]), c.unshift(_))
                      : (l.push(h[_]), c.push(_)));
                this.messageCenter.dispatch(
                  a.EVENT.TOOLTIP_HOVER,
                  this._event,
                  { seriesIndex: c, dataIndex: i },
                  this.myChart,
                );
                var x;
                'xAxis' == f
                  ? ((u = this.subPixelOptimize(
                      o.getCoordByIndex(i),
                      this._axisLineWidth,
                    )),
                    (g = d.getY(this._event)),
                    (x = [
                      u,
                      this.component.grid.getY(),
                      u,
                      this.component.grid.getYend(),
                    ]))
                  : ((u = d.getX(this._event)),
                    (g = this.subPixelOptimize(
                      o.getCoordByIndex(i),
                      this._axisLineWidth,
                    )),
                    (x = [
                      this.component.grid.getX(),
                      g,
                      this.component.grid.getXend(),
                      g,
                    ])),
                  this._styleAxisPointer(
                    l,
                    x[0],
                    x[1],
                    x[2],
                    x[3],
                    o.getGap(),
                    u,
                    g,
                  );
              } else
                (u = d.getX(this._event)),
                  (g = d.getY(this._event)),
                  this._styleAxisPointer(
                    h,
                    this.component.grid.getX(),
                    g,
                    this.component.grid.getXend(),
                    g,
                    0,
                    u,
                    g,
                  ),
                  i >= 0
                    ? this._showItemTrigger(!0)
                    : (clearTimeout(this._hidingTicket),
                      clearTimeout(this._showingTicket),
                      (this._tDom.style.display = 'none'));
              if (l.length > 0) {
                if (
                  ((this._lastItemTriggerId = -1),
                  this._lastDataIndex != i || this._lastSeriesIndex != c[0])
                ) {
                  (this._lastDataIndex = i), (this._lastSeriesIndex = c[0]);
                  var v, b;
                  if ('function' == typeof n) {
                    for (var S = [], _ = 0, y = l.length; y > _; _++)
                      (v = l[_].data[i]),
                        (b = this.getDataFromOption(v, '-')),
                        S.push({
                          seriesIndex: c[_],
                          seriesName: l[_].name || '',
                          series: l[_],
                          dataIndex: i,
                          data: v,
                          name: o.getNameByIndex(i),
                          value: b,
                          0: l[_].name || '',
                          1: o.getNameByIndex(i),
                          2: b,
                          3: v,
                        });
                    (this._curTicket = 'axis:' + i),
                      (this._tDom.innerHTML = n.call(
                        this.myChart,
                        S,
                        this._curTicket,
                        this._setContent,
                      ));
                  } else if ('string' == typeof n) {
                    (this._curTicket = 0 / 0),
                      (n = n
                        .replace('{a}', '{a0}')
                        .replace('{b}', '{b0}')
                        .replace('{c}', '{c0}'));
                    for (var _ = 0, y = l.length; y > _; _++)
                      (n = n.replace(
                        '{a' + _ + '}',
                        this._encodeHTML(l[_].name || ''),
                      )),
                        (n = n.replace(
                          '{b' + _ + '}',
                          this._encodeHTML(o.getNameByIndex(i)),
                        )),
                        (v = l[_].data[i]),
                        (v = this.getDataFromOption(v, '-')),
                        (n = n.replace(
                          '{c' + _ + '}',
                          v instanceof Array ? v : this.numAddCommas(v),
                        ));
                    this._tDom.innerHTML = n;
                  } else {
                    (this._curTicket = 0 / 0),
                      (n = this._encodeHTML(o.getNameByIndex(i)));
                    for (var _ = 0, y = l.length; y > _; _++)
                      (n +=
                        '<br/>' + this._encodeHTML(l[_].name || '') + ' : '),
                        (v = l[_].data[i]),
                        (v = this.getDataFromOption(v, '-')),
                        (n += v instanceof Array ? v : this.numAddCommas(v));
                    this._tDom.innerHTML = n;
                  }
                }
                if (r === !1 || !this.option.tooltip.showContent) return;
                this.hasAppend ||
                  ((this._tDom.style.left = this._zrWidth / 2 + 'px'),
                  (this._tDom.style.top = this._zrHeight / 2 + 'px'),
                  this.dom.firstChild.appendChild(this._tDom),
                  (this.hasAppend = !0)),
                  this._show(s, u + 10, g + 10, p);
              }
            },
            _showPolarTrigger: function (t, e) {
              if (
                null == this.component.polar ||
                null == t ||
                null == e ||
                0 > e
              )
                return !1;
              var i,
                o,
                n,
                s = this.option.series,
                r = [],
                a = [],
                h = '';
              if ('axis' === this.option.tooltip.trigger) {
                if (!this.option.tooltip.show) return !1;
                (i = this.option.tooltip.formatter),
                  (o = this.option.tooltip.position);
              }
              for (
                var l = this.option.polar[t].indicator[e].text,
                  c = 0,
                  p = s.length;
                p > c;
                c++
              )
                this._isSelected(s[c].name) &&
                  s[c].polarIndex === t &&
                  'axis' ===
                    this.deepQuery([s[c], this.option], 'tooltip.trigger') &&
                  ((n = this.query(s[c], 'tooltip.showContent') || n),
                  (i = this.query(s[c], 'tooltip.formatter') || i),
                  (o = this.query(s[c], 'tooltip.position') || o),
                  (h += this._style(this.query(s[c], 'tooltip'))),
                  r.push(s[c]),
                  a.push(c));
              if (r.length > 0) {
                for (var u, g, f, m = [], c = 0, p = r.length; p > c; c++) {
                  u = r[c].data;
                  for (var _ = 0, y = u.length; y > _; _++)
                    (g = u[_]),
                      this._isSelected(g.name) &&
                        ((g =
                          null != g
                            ? g
                            : { name: '', value: { dataIndex: '-' } }),
                        (f = this.getDataFromOption(g.value[e])),
                        m.push({
                          seriesIndex: a[c],
                          seriesName: r[c].name || '',
                          series: r[c],
                          dataIndex: e,
                          data: g,
                          name: g.name,
                          indicator: l,
                          value: f,
                          0: r[c].name || '',
                          1: g.name,
                          2: f,
                          3: l,
                        }));
                }
                if (m.length <= 0) return;
                if (
                  ((this._lastItemTriggerId = -1),
                  this._lastDataIndex != e || this._lastSeriesIndex != a[0])
                )
                  if (
                    ((this._lastDataIndex = e),
                    (this._lastSeriesIndex = a[0]),
                    'function' == typeof i)
                  )
                    (this._curTicket = 'axis:' + e),
                      (this._tDom.innerHTML = i.call(
                        this.myChart,
                        m,
                        this._curTicket,
                        this._setContent,
                      ));
                  else if ('string' == typeof i) {
                    i = i
                      .replace('{a}', '{a0}')
                      .replace('{b}', '{b0}')
                      .replace('{c}', '{c0}')
                      .replace('{d}', '{d0}');
                    for (var c = 0, p = m.length; p > c; c++)
                      (i = i.replace(
                        '{a' + c + '}',
                        this._encodeHTML(m[c].seriesName),
                      )),
                        (i = i.replace(
                          '{b' + c + '}',
                          this._encodeHTML(m[c].name),
                        )),
                        (i = i.replace(
                          '{c' + c + '}',
                          this.numAddCommas(m[c].value),
                        )),
                        (i = i.replace(
                          '{d' + c + '}',
                          this._encodeHTML(m[c].indicator),
                        ));
                    this._tDom.innerHTML = i;
                  } else {
                    i =
                      this._encodeHTML(m[0].name) +
                      '<br/>' +
                      this._encodeHTML(m[0].indicator) +
                      ' : ' +
                      this.numAddCommas(m[0].value);
                    for (var c = 1, p = m.length; p > c; c++)
                      (i += '<br/>' + this._encodeHTML(m[c].name) + '<br/>'),
                        (i +=
                          this._encodeHTML(m[c].indicator) +
                          ' : ' +
                          this.numAddCommas(m[c].value));
                    this._tDom.innerHTML = i;
                  }
                if (n === !1 || !this.option.tooltip.showContent) return;
                return (
                  this.hasAppend ||
                    ((this._tDom.style.left = this._zrWidth / 2 + 'px'),
                    (this._tDom.style.top = this._zrHeight / 2 + 'px'),
                    this.dom.firstChild.appendChild(this._tDom),
                    (this.hasAppend = !0)),
                  this._show(o, d.getX(this._event), d.getY(this._event), h),
                  !0
                );
              }
            },
            _showItemTrigger: function (t) {
              if (this._curTarget) {
                var e,
                  i,
                  o,
                  n = h.get(this._curTarget, 'series'),
                  s = h.get(this._curTarget, 'seriesIndex'),
                  r = h.get(this._curTarget, 'data'),
                  l = h.get(this._curTarget, 'dataIndex'),
                  c = h.get(this._curTarget, 'name'),
                  p = h.get(this._curTarget, 'value'),
                  u = h.get(this._curTarget, 'special'),
                  g = h.get(this._curTarget, 'special2'),
                  f = [r, n, this.option],
                  m = '';
                if ('island' != this._curTarget._type) {
                  var _ = t ? 'axis' : 'item';
                  this.option.tooltip.trigger === _ &&
                    ((e = this.option.tooltip.formatter),
                    (i = this.option.tooltip.position)),
                    this.query(n, 'tooltip.trigger') === _ &&
                      ((o = this.query(n, 'tooltip.showContent') || o),
                      (e = this.query(n, 'tooltip.formatter') || e),
                      (i = this.query(n, 'tooltip.position') || i),
                      (m += this._style(this.query(n, 'tooltip')))),
                    (o = this.query(r, 'tooltip.showContent') || o),
                    (e = this.query(r, 'tooltip.formatter') || e),
                    (i = this.query(r, 'tooltip.position') || i),
                    (m += this._style(this.query(r, 'tooltip')));
                } else
                  (this._lastItemTriggerId = 0 / 0),
                    (o = this.deepQuery(f, 'tooltip.showContent')),
                    (e = this.deepQuery(f, 'tooltip.islandFormatter')),
                    (i = this.deepQuery(f, 'tooltip.islandPosition'));
                (this._lastDataIndex = -1),
                  (this._lastSeriesIndex = -1),
                  this._lastItemTriggerId !== this._curTarget.id &&
                    ((this._lastItemTriggerId = this._curTarget.id),
                    'function' == typeof e
                      ? ((this._curTicket = (n.name || '') + ':' + l),
                        (this._tDom.innerHTML = e.call(
                          this.myChart,
                          {
                            seriesIndex: s,
                            seriesName: n.name || '',
                            series: n,
                            dataIndex: l,
                            data: r,
                            name: c,
                            value: p,
                            percent: u,
                            indicator: u,
                            value2: g,
                            indicator2: g,
                            0: n.name || '',
                            1: c,
                            2: p,
                            3: u,
                            4: g,
                            5: r,
                            6: s,
                            7: l,
                          },
                          this._curTicket,
                          this._setContent,
                        )))
                      : 'string' == typeof e
                      ? ((this._curTicket = 0 / 0),
                        (e = e
                          .replace('{a}', '{a0}')
                          .replace('{b}', '{b0}')
                          .replace('{c}', '{c0}')),
                        (e = e
                          .replace('{a0}', this._encodeHTML(n.name || ''))
                          .replace('{b0}', this._encodeHTML(c))
                          .replace(
                            '{c0}',
                            p instanceof Array ? p : this.numAddCommas(p),
                          )),
                        (e = e.replace('{d}', '{d0}').replace('{d0}', u || '')),
                        (e = e
                          .replace('{e}', '{e0}')
                          .replace(
                            '{e0}',
                            h.get(this._curTarget, 'special2') || '',
                          )),
                        (this._tDom.innerHTML = e))
                      : ((this._curTicket = 0 / 0),
                        (this._tDom.innerHTML =
                          n.type === a.CHART_TYPE_RADAR && u
                            ? this._itemFormatter.radar.call(this, n, c, p, u)
                            : n.type === a.CHART_TYPE_EVENTRIVER
                            ? this._itemFormatter.eventRiver.call(
                                this,
                                n,
                                c,
                                p,
                                r,
                              )
                            : '' +
                              (null != n.name
                                ? this._encodeHTML(n.name) + '<br/>'
                                : '') +
                              ('' === c ? '' : this._encodeHTML(c) + ' : ') +
                              (p instanceof Array
                                ? p
                                : this.numAddCommas(p)))));
                var y = d.getX(this._event),
                  x = d.getY(this._event);
                this.deepQuery(f, 'tooltip.axisPointer.show') &&
                this.component.grid
                  ? this._styleAxisPointer(
                      [n],
                      this.component.grid.getX(),
                      x,
                      this.component.grid.getXend(),
                      x,
                      0,
                      y,
                      x,
                    )
                  : this._hide(),
                  o !== !1 &&
                    this.option.tooltip.showContent &&
                    (this.hasAppend ||
                      ((this._tDom.style.left = this._zrWidth / 2 + 'px'),
                      (this._tDom.style.top = this._zrHeight / 2 + 'px'),
                      this.dom.firstChild.appendChild(this._tDom),
                      (this.hasAppend = !0)),
                    this._show(i, y + 20, x - 20, m));
              }
            },
            _itemFormatter: {
              radar: function (t, e, i, o) {
                var n = '';
                (n += this._encodeHTML('' === e ? t.name || '' : e)),
                  (n += '' === n ? '' : '<br />');
                for (var s = 0; s < o.length; s++)
                  n +=
                    this._encodeHTML(o[s].text) +
                    ' : ' +
                    this.numAddCommas(i[s]) +
                    '<br />';
                return n;
              },
              chord: function (t, e, i, o, n) {
                if (null == n)
                  return (
                    this._encodeHTML(e) + ' (' + this.numAddCommas(i) + ')'
                  );
                var s = this._encodeHTML(e),
                  r = this._encodeHTML(o);
                return (
                  '' +
                  (null != t.name ? this._encodeHTML(t.name) + '<br/>' : '') +
                  s +
                  ' -> ' +
                  r +
                  ' (' +
                  this.numAddCommas(i) +
                  ')<br />' +
                  r +
                  ' -> ' +
                  s +
                  ' (' +
                  this.numAddCommas(n) +
                  ')'
                );
              },
              eventRiver: function (t, e, i, o) {
                var n = '';
                (n += this._encodeHTML('' === t.name ? '' : t.name + ' : ')),
                  (n += this._encodeHTML(e)),
                  (n += '' === n ? '' : '<br />'),
                  (o = o.evolution);
                for (var s = 0, r = o.length; r > s; s++)
                  (n += '<div style="padding-top:5px;">'),
                    o[s].detail &&
                      (o[s].detail.img &&
                        (n +=
                          '<img src="' +
                          o[s].detail.img +
                          '" style="float:left;width:40px;height:40px;">'),
                      (n +=
                        '<div style="margin-left:45px;">' +
                        o[s].time +
                        '<br/>'),
                      (n +=
                        '<a href="' + o[s].detail.link + '" target="_blank">'),
                      (n += o[s].detail.text + '</a></div>'),
                      (n += '</div>'));
                return n;
              },
            },
            _styleAxisPointer: function (t, e, i, o, n, s, r, a) {
              if (t.length > 0) {
                var h,
                  l,
                  d = this.option.tooltip.axisPointer,
                  c = d.type,
                  p = { line: {}, cross: {}, shadow: {} };
                for (var u in p)
                  (p[u].color = d[u + 'Style'].color),
                    (p[u].width = d[u + 'Style'].width),
                    (p[u].type = d[u + 'Style'].type);
                for (var g = 0, f = t.length; f > g; g++)
                  (h = t[g]),
                    (l = this.query(h, 'tooltip.axisPointer.type')),
                    (c = l || c),
                    l &&
                      ((p[l].color =
                        this.query(
                          h,
                          'tooltip.axisPointer.' + l + 'Style.color',
                        ) || p[l].color),
                      (p[l].width =
                        this.query(
                          h,
                          'tooltip.axisPointer.' + l + 'Style.width',
                        ) || p[l].width),
                      (p[l].type =
                        this.query(
                          h,
                          'tooltip.axisPointer.' + l + 'Style.type',
                        ) || p[l].type));
                if ('line' === c) {
                  var m = p.line.width,
                    _ = e == o;
                  (this._axisLineShape.style = {
                    xStart: _ ? this.subPixelOptimize(e, m) : e,
                    yStart: _ ? i : this.subPixelOptimize(i, m),
                    xEnd: _ ? this.subPixelOptimize(o, m) : o,
                    yEnd: _ ? n : this.subPixelOptimize(n, m),
                    strokeColor: p.line.color,
                    lineWidth: m,
                    lineType: p.line.type,
                  }),
                    (this._axisLineShape.invisible = !1),
                    this.zr.modShape(this._axisLineShape.id);
                } else if ('cross' === c) {
                  var y = p.cross.width;
                  (this._axisCrossShape.style = {
                    brushType: 'stroke',
                    rect: this.component.grid.getArea(),
                    x: this.subPixelOptimize(r, y),
                    y: this.subPixelOptimize(a, y),
                    text: (
                      '( ' +
                      this.component.xAxis.getAxis(0).getValueFromCoord(r) +
                      ' , ' +
                      this.component.yAxis.getAxis(0).getValueFromCoord(a) +
                      ' )'
                    )
                      .replace('  , ', ' ')
                      .replace(' ,  ', ' '),
                    textPosition: 'specific',
                    strokeColor: p.cross.color,
                    lineWidth: y,
                    lineType: p.cross.type,
                  }),
                    this.component.grid.getXend() - r > 100
                      ? ((this._axisCrossShape.style.textAlign = 'left'),
                        (this._axisCrossShape.style.textX = r + 10))
                      : ((this._axisCrossShape.style.textAlign = 'right'),
                        (this._axisCrossShape.style.textX = r - 10)),
                    a - this.component.grid.getY() > 50
                      ? ((this._axisCrossShape.style.textBaseline = 'bottom'),
                        (this._axisCrossShape.style.textY = a - 10))
                      : ((this._axisCrossShape.style.textBaseline = 'top'),
                        (this._axisCrossShape.style.textY = a + 10)),
                    (this._axisCrossShape.invisible = !1),
                    this.zr.modShape(this._axisCrossShape.id);
                } else
                  'shadow' === c &&
                    ((null == p.shadow.width ||
                      'auto' === p.shadow.width ||
                      isNaN(p.shadow.width)) &&
                      (p.shadow.width = s),
                    e === o
                      ? Math.abs(this.component.grid.getX() - e) < 2
                        ? ((p.shadow.width /= 2), (e = o += p.shadow.width / 2))
                        : Math.abs(this.component.grid.getXend() - e) < 2 &&
                          ((p.shadow.width /= 2), (e = o -= p.shadow.width / 2))
                      : i === n &&
                        (Math.abs(this.component.grid.getY() - i) < 2
                          ? ((p.shadow.width /= 2),
                            (i = n += p.shadow.width / 2))
                          : Math.abs(this.component.grid.getYend() - i) < 2 &&
                            ((p.shadow.width /= 2),
                            (i = n -= p.shadow.width / 2))),
                    (this._axisShadowShape.style = {
                      xStart: e,
                      yStart: i,
                      xEnd: o,
                      yEnd: n,
                      strokeColor: p.shadow.color,
                      lineWidth: p.shadow.width,
                    }),
                    (this._axisShadowShape.invisible = !1),
                    this.zr.modShape(this._axisShadowShape.id));
                this.zr.refreshNextFrame();
              }
            },
            __onmousemove: function (t) {
              if (
                (clearTimeout(this._hidingTicket),
                clearTimeout(this._showingTicket),
                !this._mousein || !this._enterable)
              ) {
                var e = t.target,
                  i = d.getX(t.event),
                  o = d.getY(t.event);
                if (e) {
                  (this._curTarget = e),
                    (this._event = t.event),
                    (this._event.zrenderX = i),
                    (this._event.zrenderY = o);
                  var n;
                  if (
                    this._needAxisTrigger &&
                    this.component.polar &&
                    -1 != (n = this.component.polar.isInside([i, o]))
                  )
                    for (
                      var s = this.option.series, h = 0, l = s.length;
                      l > h;
                      h++
                    )
                      if (
                        s[h].polarIndex === n &&
                        'axis' ===
                          this.deepQuery([s[h], this.option], 'tooltip.trigger')
                      ) {
                        this._curTarget = null;
                        break;
                      }
                  this._showingTicket = setTimeout(
                    this._tryShow,
                    this._showDelay,
                  );
                } else
                  (this._curTarget = !1),
                    (this._event = t.event),
                    (this._event.zrenderX = i),
                    (this._event.zrenderY = o),
                    this._needAxisTrigger &&
                    this.component.grid &&
                    c.isInside(r, this.component.grid.getArea(), i, o)
                      ? (this._showingTicket = setTimeout(
                          this._tryShow,
                          this._showDelay,
                        ))
                      : this._needAxisTrigger &&
                        this.component.polar &&
                        -1 != this.component.polar.isInside([i, o])
                      ? (this._showingTicket = setTimeout(
                          this._tryShow,
                          this._showDelay,
                        ))
                      : (!this._event.connectTrigger &&
                          this.messageCenter.dispatch(
                            a.EVENT.TOOLTIP_OUT_GRID,
                            this._event,
                            null,
                            this.myChart,
                          ),
                        (this._hidingTicket = setTimeout(
                          this._hide,
                          this._hideDelay,
                        )));
              }
            },
            __onglobalout: function () {
              clearTimeout(this._hidingTicket),
                clearTimeout(this._showingTicket),
                (this._hidingTicket = setTimeout(this._hide, this._hideDelay));
            },
            __setContent: function (t, e) {
              this._tDom &&
                (t === this._curTicket && (this._tDom.innerHTML = e),
                setTimeout(this._refixed, 20));
            },
            ontooltipHover: function (t, e) {
              if (
                !this._lastTipShape ||
                (this._lastTipShape &&
                  this._lastTipShape.dataIndex != t.dataIndex)
              ) {
                this._lastTipShape &&
                  this._lastTipShape.tipShape.length > 0 &&
                  (this.zr.delShape(this._lastTipShape.tipShape),
                  (this.shapeList.length = 2));
                for (var i = 0, o = e.length; o > i; i++)
                  (e[i].zlevel = this.getZlevelBase()),
                    (e[i].z = this.getZBase()),
                    (e[i].style = g.prototype.getHighlightStyle(
                      e[i].style,
                      e[i].highlightStyle,
                    )),
                    (e[i].draggable = !1),
                    (e[i].hoverable = !1),
                    (e[i].clickable = !1),
                    (e[i].ondragend = null),
                    (e[i].ondragover = null),
                    (e[i].ondrop = null),
                    this.shapeList.push(e[i]),
                    this.zr.addShape(e[i]);
                this._lastTipShape = { dataIndex: t.dataIndex, tipShape: e };
              }
            },
            ondragend: function () {
              this._hide();
            },
            onlegendSelected: function (t) {
              this._selectedMap = t.selected;
            },
            _setSelectedMap: function () {
              this._selectedMap = this.component.legend
                ? u.clone(this.component.legend.getSelectedMap())
                : {};
            },
            _isSelected: function (t) {
              return null != this._selectedMap[t] ? this._selectedMap[t] : !0;
            },
            showTip: function (t) {
              if (t) {
                var e,
                  i = this.option.series;
                if (null != t.seriesIndex) e = t.seriesIndex;
                else
                  for (var o = t.seriesName, n = 0, s = i.length; s > n; n++)
                    if (i[n].name === o) {
                      e = n;
                      break;
                    }
                var r = i[e];
                if (null != r) {
                  var d = this.myChart.chart[r.type],
                    c =
                      'axis' ===
                      this.deepQuery([r, this.option], 'tooltip.trigger');
                  if (d)
                    if (c) {
                      var p = t.dataIndex;
                      switch (d.type) {
                        case a.CHART_TYPE_LINE:
                        case a.CHART_TYPE_BAR:
                        case a.CHART_TYPE_K:
                        case a.CHART_TYPE_RADAR:
                          if (
                            null == this.component.polar ||
                            r.data[0].value.length <= p
                          )
                            return;
                          var u = r.polarIndex || 0,
                            g = this.component.polar.getVector(u, p, 'max');
                          (this._event = { zrenderX: g[0], zrenderY: g[1] }),
                            this._showPolarTrigger(u, p);
                      }
                    } else {
                      var f,
                        m,
                        _ = d.shapeList;
                      switch (d.type) {
                        case a.CHART_TYPE_LINE:
                        case a.CHART_TYPE_BAR:
                        case a.CHART_TYPE_K:
                        case a.CHART_TYPE_TREEMAP:
                        case a.CHART_TYPE_SCATTER:
                          for (
                            var p = t.dataIndex, n = 0, s = _.length;
                            s > n;
                            n++
                          )
                            if (
                              null == _[n]._mark &&
                              h.get(_[n], 'seriesIndex') == e &&
                              h.get(_[n], 'dataIndex') == p
                            ) {
                              (this._curTarget = _[n]),
                                (f = _[n].style.x),
                                (m =
                                  d.type != a.CHART_TYPE_K
                                    ? _[n].style.y
                                    : _[n].style.y[0]);
                              break;
                            }
                          break;
                        case a.CHART_TYPE_RADAR:
                          for (
                            var p = t.dataIndex, n = 0, s = _.length;
                            s > n;
                            n++
                          )
                            if (
                              'polygon' === _[n].type &&
                              h.get(_[n], 'seriesIndex') == e &&
                              h.get(_[n], 'dataIndex') == p
                            ) {
                              this._curTarget = _[n];
                              var g = this.component.polar.getCenter(
                                r.polarIndex || 0,
                              );
                              (f = g[0]), (m = g[1]);
                              break;
                            }
                          break;
                        case a.CHART_TYPE_PIE:
                          for (var y = t.name, n = 0, s = _.length; s > n; n++)
                            if (
                              'sector' === _[n].type &&
                              h.get(_[n], 'seriesIndex') == e &&
                              h.get(_[n], 'name') == y
                            ) {
                              this._curTarget = _[n];
                              var x = this._curTarget.style,
                                v =
                                  (((x.startAngle + x.endAngle) / 2) *
                                    Math.PI) /
                                  180;
                              (f =
                                this._curTarget.style.x +
                                (Math.cos(v) * x.r) / 1.5),
                                (m =
                                  this._curTarget.style.y -
                                  (Math.sin(v) * x.r) / 1.5);
                              break;
                            }
                          break;
                        case a.CHART_TYPE_MAP:
                          for (
                            var y = t.name, b = r.mapType, n = 0, s = _.length;
                            s > n;
                            n++
                          )
                            if (
                              'text' === _[n].type &&
                              _[n]._mapType === b &&
                              _[n].style._name === y
                            ) {
                              (this._curTarget = _[n]),
                                (f =
                                  this._curTarget.style.x +
                                  this._curTarget.position[0]),
                                (m =
                                  this._curTarget.style.y +
                                  this._curTarget.position[1]);
                              break;
                            }
                          break;
                        case a.CHART_TYPE_CHORD:
                          for (var y = t.name, n = 0, s = _.length; s > n; n++)
                            if (
                              'sector' === _[n].type &&
                              h.get(_[n], 'name') == y
                            ) {
                              this._curTarget = _[n];
                              var x = this._curTarget.style,
                                v =
                                  (((x.startAngle + x.endAngle) / 2) *
                                    Math.PI) /
                                  180;
                              return (
                                (f =
                                  this._curTarget.style.x +
                                  Math.cos(v) * (x.r - 2)),
                                (m =
                                  this._curTarget.style.y -
                                  Math.sin(v) * (x.r - 2)),
                                void this.zr.trigger(l.EVENT.MOUSEMOVE, {
                                  zrenderX: f,
                                  zrenderY: m,
                                })
                              );
                            }
                          break;
                        case a.CHART_TYPE_FORCE:
                          for (var y = t.name, n = 0, s = _.length; s > n; n++)
                            if (
                              'circle' === _[n].type &&
                              h.get(_[n], 'name') == y
                            ) {
                              (this._curTarget = _[n]),
                                (f = this._curTarget.position[0]),
                                (m = this._curTarget.position[1]);
                              break;
                            }
                      }
                      null != f &&
                        null != m &&
                        ((this._event = { zrenderX: f, zrenderY: m }),
                        this.zr.addHoverShape(this._curTarget),
                        this.zr.refreshHover(),
                        this._showItemTrigger());
                    }
                }
              }
            },
            hideTip: function () {
              this._hide();
            },
            refresh: function (t) {
              if (
                ((this._zrHeight = this.zr.getHeight()),
                (this._zrWidth = this.zr.getWidth()),
                this._lastTipShape &&
                  this._lastTipShape.tipShape.length > 0 &&
                  this.zr.delShape(this._lastTipShape.tipShape),
                (this._lastTipShape = !1),
                (this.shapeList.length = 2),
                (this._lastDataIndex = -1),
                (this._lastSeriesIndex = -1),
                (this._lastItemTriggerId = -1),
                t)
              ) {
                (this.option = t),
                  (this.option.tooltip = this.reformOption(
                    this.option.tooltip,
                  )),
                  (this.option.tooltip.textStyle = u.merge(
                    this.option.tooltip.textStyle,
                    this.ecTheme.textStyle,
                  )),
                  (this._needAxisTrigger = !1),
                  'axis' === this.option.tooltip.trigger &&
                    (this._needAxisTrigger = !0);
                for (
                  var e = this.option.series, i = 0, o = e.length;
                  o > i;
                  i++
                )
                  if ('axis' === this.query(e[i], 'tooltip.trigger')) {
                    this._needAxisTrigger = !0;
                    break;
                  }
                (this._showDelay = this.option.tooltip.showDelay),
                  (this._hideDelay = this.option.tooltip.hideDelay),
                  (this._defaultCssText = this._style(this.option.tooltip)),
                  this._setSelectedMap(),
                  (this._axisLineWidth =
                    this.option.tooltip.axisPointer.lineStyle.width),
                  (this._enterable = this.option.tooltip.enterable),
                  !this._enterable &&
                    this._tDom.className.indexOf(l.elementClassName) < 0 &&
                    (this._tDom.className += ' ' + l.elementClassName);
              }
              if (this.showing) {
                var n = this;
                setTimeout(function () {
                  n.zr.trigger(l.EVENT.MOUSEMOVE, n.zr.handler._event);
                }, 50);
              }
            },
            onbeforDispose: function () {
              this._lastTipShape &&
                this._lastTipShape.tipShape.length > 0 &&
                this.zr.delShape(this._lastTipShape.tipShape),
                clearTimeout(this._hidingTicket),
                clearTimeout(this._showingTicket),
                this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove),
                this.zr.un(l.EVENT.GLOBALOUT, this._onglobalout),
                this.hasAppend &&
                  this.dom.firstChild &&
                  this.dom.firstChild.removeChild(this._tDom),
                (this._tDom = null);
            },
            _encodeHTML: function (t) {
              return String(t)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
            },
          }),
          u.inherits(e, i),
          t('../component').define('tooltip', e),
          e
        );
      },
    ),
    i(
      'zrender/loadingEffect/Bar',
      [
        'require',
        './Base',
        '../tool/util',
        '../tool/color',
        '../shape/Rectangle',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('./Base'),
          o = t('../tool/util'),
          n = t('../tool/color'),
          s = t('../shape/Rectangle');
        return (
          o.inherits(e, i),
          (e.prototype._start = function (t, e) {
            var i = o.merge(this.options, {
                textStyle: { color: '#888' },
                backgroundColor: 'rgba(250, 250, 250, 0.8)',
                effectOption: {
                  x: 0,
                  y: this.canvasHeight / 2 - 30,
                  width: this.canvasWidth,
                  height: 5,
                  brushType: 'fill',
                  timeInterval: 100,
                },
              }),
              r = this.createTextShape(i.textStyle),
              a = this.createBackgroundShape(i.backgroundColor),
              h = i.effectOption,
              l = new s({ highlightStyle: o.clone(h) });
            return (
              (l.highlightStyle.color =
                h.color ||
                n.getLinearGradient(h.x, h.y, h.x + h.width, h.y + h.height, [
                  [0, '#ff6400'],
                  [0.5, '#ffe100'],
                  [1, '#b1ff00'],
                ])),
              null != i.progress
                ? (t(a),
                  (l.highlightStyle.width =
                    this.adjust(i.progress, [0, 1]) * i.effectOption.width),
                  t(l),
                  t(r),
                  void e())
                : ((l.highlightStyle.width = 0),
                  setInterval(function () {
                    t(a),
                      l.highlightStyle.width < h.width
                        ? (l.highlightStyle.width += 8)
                        : (l.highlightStyle.width = 0),
                      t(l),
                      t(r),
                      e();
                  }, h.timeInterval))
            );
          }),
          e
        );
      },
    ),
    i(
      'zrender/loadingEffect/Bubble',
      ['require', './Base', '../tool/util', '../tool/color', '../shape/Circle'],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('./Base'),
          o = t('../tool/util'),
          n = t('../tool/color'),
          s = t('../shape/Circle');
        return (
          o.inherits(e, i),
          (e.prototype._start = function (t, e) {
            for (
              var i = o.merge(this.options, {
                  textStyle: { color: '#888' },
                  backgroundColor: 'rgba(250, 250, 250, 0.8)',
                  effect: {
                    n: 50,
                    lineWidth: 2,
                    brushType: 'stroke',
                    color: 'random',
                    timeInterval: 100,
                  },
                }),
                r = this.createTextShape(i.textStyle),
                a = this.createBackgroundShape(i.backgroundColor),
                h = i.effect,
                l = h.n,
                d = h.brushType,
                c = h.lineWidth,
                p = [],
                u = this.canvasWidth,
                g = this.canvasHeight,
                f = 0;
              l > f;
              f++
            ) {
              var m = 'random' == h.color ? n.alpha(n.random(), 0.3) : h.color;
              p[f] = new s({
                highlightStyle: {
                  x: Math.ceil(Math.random() * u),
                  y: Math.ceil(Math.random() * g),
                  r: Math.ceil(40 * Math.random()),
                  brushType: d,
                  color: m,
                  strokeColor: m,
                  lineWidth: c,
                },
                animationY: Math.ceil(20 * Math.random()),
              });
            }
            return setInterval(function () {
              t(a);
              for (var i = 0; l > i; i++) {
                var o = p[i].highlightStyle;
                o.y - p[i].animationY + o.r <= 0 &&
                  ((p[i].highlightStyle.y = g + o.r),
                  (p[i].highlightStyle.x = Math.ceil(Math.random() * u))),
                  (p[i].highlightStyle.y -= p[i].animationY),
                  t(p[i]);
              }
              t(r), e();
            }, h.timeInterval);
          }),
          e
        );
      },
    ),
    i(
      'zrender/loadingEffect/DynamicLine',
      ['require', './Base', '../tool/util', '../tool/color', '../shape/Line'],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('./Base'),
          o = t('../tool/util'),
          n = t('../tool/color'),
          s = t('../shape/Line');
        return (
          o.inherits(e, i),
          (e.prototype._start = function (t, e) {
            for (
              var i = o.merge(this.options, {
                  textStyle: { color: '#fff' },
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  effectOption: {
                    n: 30,
                    lineWidth: 1,
                    color: 'random',
                    timeInterval: 100,
                  },
                }),
                r = this.createTextShape(i.textStyle),
                a = this.createBackgroundShape(i.backgroundColor),
                h = i.effectOption,
                l = h.n,
                d = h.lineWidth,
                c = [],
                p = this.canvasWidth,
                u = this.canvasHeight,
                g = 0;
              l > g;
              g++
            ) {
              var f = -Math.ceil(1e3 * Math.random()),
                m = Math.ceil(400 * Math.random()),
                _ = Math.ceil(Math.random() * u),
                y = 'random' == h.color ? n.random() : h.color;
              c[g] = new s({
                highlightStyle: {
                  xStart: f,
                  yStart: _,
                  xEnd: f + m,
                  yEnd: _,
                  strokeColor: y,
                  lineWidth: d,
                },
                animationX: Math.ceil(100 * Math.random()),
                len: m,
              });
            }
            return setInterval(function () {
              t(a);
              for (var i = 0; l > i; i++) {
                var o = c[i].highlightStyle;
                o.xStart >= p &&
                  ((c[i].len = Math.ceil(400 * Math.random())),
                  (o.xStart = -400),
                  (o.xEnd = -400 + c[i].len),
                  (o.yStart = Math.ceil(Math.random() * u)),
                  (o.yEnd = o.yStart)),
                  (o.xStart += c[i].animationX),
                  (o.xEnd += c[i].animationX),
                  t(c[i]);
              }
              t(r), e();
            }, h.timeInterval);
          }),
          e
        );
      },
    ),
    i(
      'zrender/loadingEffect/Ring',
      [
        'require',
        './Base',
        '../tool/util',
        '../tool/color',
        '../shape/Ring',
        '../shape/Sector',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('./Base'),
          o = t('../tool/util'),
          n = t('../tool/color'),
          s = t('../shape/Ring'),
          r = t('../shape/Sector');
        return (
          o.inherits(e, i),
          (e.prototype._start = function (t, e) {
            var i = o.merge(this.options, {
                textStyle: { color: '#07a' },
                backgroundColor: 'rgba(250, 250, 250, 0.8)',
                effect: {
                  x: this.canvasWidth / 2,
                  y: this.canvasHeight / 2,
                  r0: 60,
                  r: 100,
                  color: '#bbdcff',
                  brushType: 'fill',
                  textPosition: 'inside',
                  textFont: 'normal 30px verdana',
                  textColor: 'rgba(30, 144, 255, 0.6)',
                  timeInterval: 100,
                },
              }),
              a = i.effect,
              h = i.textStyle;
            null == h.x && (h.x = a.x),
              null == h.y && (h.y = a.y + (a.r0 + a.r) / 2 - 5);
            for (
              var l = this.createTextShape(i.textStyle),
                d = this.createBackgroundShape(i.backgroundColor),
                c = a.x,
                p = a.y,
                u = a.r0 + 6,
                g = a.r - 6,
                f = a.color,
                m = n.lift(f, 0.1),
                _ = new s({ highlightStyle: o.clone(a) }),
                y = [],
                x = n.getGradientColors(['#ff6400', '#ffe100', '#97ff00'], 25),
                v = 15,
                b = 240,
                S = 0;
              16 > S;
              S++
            )
              y.push(
                new r({
                  highlightStyle: {
                    x: c,
                    y: p,
                    r0: u,
                    r: g,
                    startAngle: b - v,
                    endAngle: b,
                    brushType: 'fill',
                    color: m,
                  },
                  _color: n.getLinearGradient(
                    c + u * Math.cos(b, !0),
                    p - u * Math.sin(b, !0),
                    c + u * Math.cos(b - v, !0),
                    p - u * Math.sin(b - v, !0),
                    [
                      [0, x[2 * S]],
                      [1, x[2 * S + 1]],
                    ],
                  ),
                }),
              ),
                (b -= v);
            b = 360;
            for (var S = 0; 4 > S; S++)
              y.push(
                new r({
                  highlightStyle: {
                    x: c,
                    y: p,
                    r0: u,
                    r: g,
                    startAngle: b - v,
                    endAngle: b,
                    brushType: 'fill',
                    color: m,
                  },
                  _color: n.getLinearGradient(
                    c + u * Math.cos(b, !0),
                    p - u * Math.sin(b, !0),
                    c + u * Math.cos(b - v, !0),
                    p - u * Math.sin(b - v, !0),
                    [
                      [0, x[2 * S + 32]],
                      [1, x[2 * S + 33]],
                    ],
                  ),
                }),
              ),
                (b -= v);
            var T = 0;
            if (null != i.progress) {
              t(d),
                (T = (100 * this.adjust(i.progress, [0, 1]).toFixed(2)) / 5),
                (_.highlightStyle.text = 5 * T + '%'),
                t(_);
              for (var S = 0; 20 > S; S++)
                (y[S].highlightStyle.color = T > S ? y[S]._color : m), t(y[S]);
              return t(l), void e();
            }
            return setInterval(function () {
              t(d), (T += T >= 20 ? -20 : 1), t(_);
              for (var i = 0; 20 > i; i++)
                (y[i].highlightStyle.color = T > i ? y[i]._color : m), t(y[i]);
              t(l), e();
            }, a.timeInterval);
          }),
          e
        );
      },
    ),
    i(
      'zrender/loadingEffect/Spin',
      [
        'require',
        './Base',
        '../tool/util',
        '../tool/color',
        '../tool/area',
        '../shape/Sector',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('./Base'),
          o = t('../tool/util'),
          n = t('../tool/color'),
          s = t('../tool/area'),
          r = t('../shape/Sector');
        return (
          o.inherits(e, i),
          (e.prototype._start = function (t, e) {
            var i = o.merge(this.options, {
                textStyle: { color: '#fff', textAlign: 'start' },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              }),
              a = this.createTextShape(i.textStyle),
              h = 10,
              l = s.getTextWidth(
                a.highlightStyle.text,
                a.highlightStyle.textFont,
              ),
              d = s.getTextHeight(
                a.highlightStyle.text,
                a.highlightStyle.textFont,
              ),
              c = o.merge(this.options.effect || {}, {
                r0: 9,
                r: 15,
                n: 18,
                color: '#fff',
                timeInterval: 100,
              }),
              p = this.getLocation(
                this.options.textStyle,
                l + h + 2 * c.r,
                Math.max(2 * c.r, d),
              );
            (c.x = p.x + c.r),
              (c.y = a.highlightStyle.y = p.y + p.height / 2),
              (a.highlightStyle.x = c.x + c.r + h);
            for (
              var u = this.createBackgroundShape(i.backgroundColor),
                g = c.n,
                f = c.x,
                m = c.y,
                _ = c.r0,
                y = c.r,
                x = c.color,
                v = [],
                b = Math.round(180 / g),
                S = 0;
              g > S;
              S++
            )
              v[S] = new r({
                highlightStyle: {
                  x: f,
                  y: m,
                  r0: _,
                  r: y,
                  startAngle: b * S * 2,
                  endAngle: b * S * 2 + b,
                  color: n.alpha(x, (S + 1) / g),
                  brushType: 'fill',
                },
              });
            var T = [0, f, m];
            return setInterval(function () {
              t(u), (T[0] -= 0.3);
              for (var i = 0; g > i; i++) (v[i].rotation = T), t(v[i]);
              t(a), e();
            }, c.timeInterval);
          }),
          e
        );
      },
    ),
    i(
      'zrender/loadingEffect/Whirling',
      [
        'require',
        './Base',
        '../tool/util',
        '../tool/area',
        '../shape/Ring',
        '../shape/Droplet',
        '../shape/Circle',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('./Base'),
          o = t('../tool/util'),
          n = t('../tool/area'),
          s = t('../shape/Ring'),
          r = t('../shape/Droplet'),
          a = t('../shape/Circle');
        return (
          o.inherits(e, i),
          (e.prototype._start = function (t, e) {
            var i = o.merge(this.options, {
                textStyle: { color: '#888', textAlign: 'start' },
                backgroundColor: 'rgba(250, 250, 250, 0.8)',
              }),
              h = this.createTextShape(i.textStyle),
              l = 10,
              d = n.getTextWidth(
                h.highlightStyle.text,
                h.highlightStyle.textFont,
              ),
              c = n.getTextHeight(
                h.highlightStyle.text,
                h.highlightStyle.textFont,
              ),
              p = o.merge(this.options.effect || {}, {
                r: 18,
                colorIn: '#fff',
                colorOut: '#555',
                colorWhirl: '#6cf',
                timeInterval: 50,
              }),
              u = this.getLocation(
                this.options.textStyle,
                d + l + 2 * p.r,
                Math.max(2 * p.r, c),
              );
            (p.x = u.x + p.r),
              (p.y = h.highlightStyle.y = u.y + u.height / 2),
              (h.highlightStyle.x = p.x + p.r + l);
            var g = this.createBackgroundShape(i.backgroundColor),
              f = new r({
                highlightStyle: {
                  a: Math.round(p.r / 2),
                  b: Math.round(p.r - p.r / 6),
                  brushType: 'fill',
                  color: p.colorWhirl,
                },
              }),
              m = new a({
                highlightStyle: {
                  r: Math.round(p.r / 6),
                  brushType: 'fill',
                  color: p.colorIn,
                },
              }),
              _ = new s({
                highlightStyle: {
                  r0: Math.round(p.r - p.r / 3),
                  r: p.r,
                  brushType: 'fill',
                  color: p.colorOut,
                },
              }),
              y = [0, p.x, p.y];
            return (
              (f.highlightStyle.x =
                m.highlightStyle.x =
                _.highlightStyle.x =
                  y[1]),
              (f.highlightStyle.y =
                m.highlightStyle.y =
                _.highlightStyle.y =
                  y[2]),
              setInterval(function () {
                t(g),
                  t(_),
                  (y[0] -= 0.3),
                  (f.rotation = y),
                  t(f),
                  t(m),
                  t(h),
                  e();
              }, p.timeInterval)
            );
          }),
          e
        );
      },
    ),
    i('echarts/theme/macarons', [], function () {
      var t = {
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089',
        ],
        title: { textStyle: { fontWeight: 'normal', color: '#008acd' } },
        dataRange: { itemWidth: 15, color: ['#5ab1ef', '#e0ffff'] },
        toolbox: {
          color: ['#1e90ff', '#1e90ff', '#1e90ff', '#1e90ff'],
          effectiveColor: '#ff4500',
        },
        tooltip: {
          backgroundColor: 'rgba(50,50,50,0.5)',
          axisPointer: {
            type: 'line',
            lineStyle: { color: '#008acd' },
            crossStyle: { color: '#008acd' },
            shadowStyle: { color: 'rgba(200,200,200,0.2)' },
          },
        },
        dataZoom: {
          dataBackgroundColor: '#efefff',
          fillerColor: 'rgba(182,162,222,0.2)',
          handleColor: '#008acd',
        },
        grid: { borderColor: '#eee' },
        categoryAxis: {
          axisLine: { lineStyle: { color: '#008acd' } },
          splitLine: { lineStyle: { color: ['#eee'] } },
        },
        valueAxis: {
          axisLine: { lineStyle: { color: '#008acd' } },
          splitArea: {
            show: !0,
            areaStyle: {
              color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)'],
            },
          },
          splitLine: { lineStyle: { color: ['#eee'] } },
        },
        polar: {
          axisLine: { lineStyle: { color: '#ddd' } },
          splitArea: {
            show: !0,
            areaStyle: {
              color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)'],
            },
          },
          splitLine: { lineStyle: { color: '#ddd' } },
        },
        timeline: {
          lineStyle: { color: '#008acd' },
          controlStyle: {
            normal: { color: '#008acd' },
            emphasis: { color: '#008acd' },
          },
          symbol: 'emptyCircle',
          symbolSize: 3,
        },
        bar: {
          itemStyle: {
            normal: { barBorderRadius: 5 },
            emphasis: { barBorderRadius: 5 },
          },
        },
        line: { smooth: !0, symbol: 'emptyCircle', symbolSize: 3 },
        k: {
          itemStyle: {
            normal: {
              color: '#d87a80',
              color0: '#2ec7c9',
              lineStyle: { color: '#d87a80', color0: '#2ec7c9' },
            },
          },
        },
        scatter: { symbol: 'circle', symbolSize: 4 },
        radar: { symbol: 'emptyCircle', symbolSize: 3 },
        map: {
          itemStyle: {
            normal: {
              areaStyle: { color: '#ddd' },
              label: { textStyle: { color: '#d87a80' } },
            },
            emphasis: { areaStyle: { color: '#fe994e' } },
          },
        },
        force: { itemStyle: { normal: { linkStyle: { color: '#1e90ff' } } } },
        chord: {
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: 'rgba(128, 128, 128, 0.5)',
              chordStyle: { lineStyle: { color: 'rgba(128, 128, 128, 0.5)' } },
            },
            emphasis: {
              borderWidth: 1,
              borderColor: 'rgba(128, 128, 128, 0.5)',
              chordStyle: { lineStyle: { color: 'rgba(128, 128, 128, 0.5)' } },
            },
          },
        },
        gauge: {
          axisLine: {
            lineStyle: {
              color: [
                [0.2, '#2ec7c9'],
                [0.8, '#5ab1ef'],
                [1, '#d87a80'],
              ],
              width: 10,
            },
          },
          axisTick: {
            splitNumber: 10,
            length: 15,
            lineStyle: { color: 'auto' },
          },
          splitLine: { length: 22, lineStyle: { color: 'auto' } },
          pointer: { width: 5 },
        },
        textStyle: { fontFamily: '微软雅黑, Arial, Verdana, sans-serif' },
      };
      return t;
    }),
    i('echarts/theme/infographic', [], function () {
      var t = {
        color: [
          '#C1232B',
          '#B5C334',
          '#FCCE10',
          '#E87C25',
          '#27727B',
          '#FE8463',
          '#9BCA63',
          '#FAD860',
          '#F3A43B',
          '#60C0DD',
          '#D7504B',
          '#C6E579',
          '#F4E001',
          '#F0805A',
          '#26C0C0',
        ],
        title: { textStyle: { fontWeight: 'normal', color: '#27727B' } },
        dataRange: {
          x: 'right',
          y: 'center',
          itemWidth: 5,
          itemHeight: 25,
          color: ['#C1232B', '#FCCE10'],
        },
        toolbox: {
          color: [
            '#C1232B',
            '#B5C334',
            '#FCCE10',
            '#E87C25',
            '#27727B',
            '#FE8463',
            '#9BCA63',
            '#FAD860',
            '#F3A43B',
            '#60C0DD',
          ],
          effectiveColor: '#ff4500',
        },
        tooltip: {
          backgroundColor: 'rgba(50,50,50,0.5)',
          axisPointer: {
            type: 'line',
            lineStyle: { color: '#27727B', type: 'dashed' },
            crossStyle: { color: '#27727B' },
            shadowStyle: { color: 'rgba(200,200,200,0.3)' },
          },
        },
        dataZoom: {
          dataBackgroundColor: 'rgba(181,195,52,0.3)',
          fillerColor: 'rgba(181,195,52,0.2)',
          handleColor: '#27727B',
        },
        grid: { borderWidth: 0 },
        categoryAxis: {
          axisLine: { lineStyle: { color: '#27727B' } },
          splitLine: { show: !1 },
        },
        valueAxis: {
          axisLine: { show: !1 },
          splitArea: { show: !1 },
          splitLine: { lineStyle: { color: ['#ccc'], type: 'dashed' } },
        },
        polar: {
          axisLine: { lineStyle: { color: '#ddd' } },
          splitArea: {
            show: !0,
            areaStyle: {
              color: ['rgba(250,250,250,0.2)', 'rgba(200,200,200,0.2)'],
            },
          },
          splitLine: { lineStyle: { color: '#ddd' } },
        },
        timeline: {
          lineStyle: { color: '#27727B' },
          controlStyle: {
            normal: { color: '#27727B' },
            emphasis: { color: '#27727B' },
          },
          symbol: 'emptyCircle',
          symbolSize: 3,
        },
        line: {
          itemStyle: {
            normal: {
              borderWidth: 2,
              borderColor: '#fff',
              lineStyle: { width: 3 },
            },
            emphasis: { borderWidth: 0 },
          },
          symbol: 'circle',
          symbolSize: 3.5,
        },
        k: {
          itemStyle: {
            normal: {
              color: '#C1232B',
              color0: '#B5C334',
              lineStyle: { width: 1, color: '#C1232B', color0: '#B5C334' },
            },
          },
        },
        scatter: {
          itemStyle: {
            normal: { borderWidth: 1, borderColor: 'rgba(200,200,200,0.5)' },
            emphasis: { borderWidth: 0 },
          },
          symbol: 'star4',
          symbolSize: 4,
        },
        radar: { symbol: 'emptyCircle', symbolSize: 3 },
        map: {
          itemStyle: {
            normal: {
              areaStyle: { color: '#ddd' },
              label: { textStyle: { color: '#C1232B' } },
            },
            emphasis: {
              areaStyle: { color: '#fe994e' },
              label: { textStyle: { color: 'rgb(100,0,0)' } },
            },
          },
        },
        force: { itemStyle: { normal: { linkStyle: { color: '#27727B' } } } },
        chord: {
          itemStyle: {
            normal: {
              borderWidth: 1,
              borderColor: 'rgba(128, 128, 128, 0.5)',
              chordStyle: { lineStyle: { color: 'rgba(128, 128, 128, 0.5)' } },
            },
            emphasis: {
              borderWidth: 1,
              borderColor: 'rgba(128, 128, 128, 0.5)',
              chordStyle: { lineStyle: { color: 'rgba(128, 128, 128, 0.5)' } },
            },
          },
        },
        gauge: {
          center: ['50%', '80%'],
          radius: '100%',
          startAngle: 180,
          endAngle: 0,
          axisLine: {
            show: !0,
            lineStyle: {
              color: [
                [0.2, '#B5C334'],
                [0.8, '#27727B'],
                [1, '#C1232B'],
              ],
              width: '40%',
            },
          },
          axisTick: { splitNumber: 2, length: 5, lineStyle: { color: '#fff' } },
          axisLabel: { textStyle: { color: '#fff', fontWeight: 'bolder' } },
          splitLine: { length: '5%', lineStyle: { color: '#fff' } },
          pointer: { width: '40%', length: '80%', color: '#fff' },
          title: {
            offsetCenter: [0, -20],
            textStyle: { color: 'auto', fontSize: 20 },
          },
          detail: {
            offsetCenter: [0, 0],
            textStyle: { color: 'auto', fontSize: 40 },
          },
        },
        textStyle: { fontFamily: '微软雅黑, Arial, Verdana, sans-serif' },
      };
      return t;
    }),
    i(
      'echarts/component/toolbox',
      [
        'require',
        './base',
        'zrender/shape/Line',
        'zrender/shape/Image',
        'zrender/shape/Rectangle',
        '../util/shape/Icon',
        '../config',
        'zrender/tool/util',
        'zrender/config',
        'zrender/tool/event',
        './dataView',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s),
            (this.dom = s.dom),
            (this._magicType = {}),
            (this._magicMap = {}),
            (this._isSilence = !1),
            this._iconList,
            (this._iconShapeMap = {}),
            (this._featureTitle = {}),
            (this._featureIcon = {}),
            (this._featureColor = {}),
            (this._featureOption = {}),
            (this._enableColor = 'red'),
            (this._disableColor = '#ccc'),
            (this._markShapeList = []);
          var r = this;
          (r._onMark = function (t) {
            r.__onMark(t);
          }),
            (r._onMarkUndo = function (t) {
              r.__onMarkUndo(t);
            }),
            (r._onMarkClear = function (t) {
              r.__onMarkClear(t);
            }),
            (r._onDataZoom = function (t) {
              r.__onDataZoom(t);
            }),
            (r._onDataZoomReset = function (t) {
              r.__onDataZoomReset(t);
            }),
            (r._onDataView = function (t) {
              r.__onDataView(t);
            }),
            (r._onRestore = function (t) {
              r.__onRestore(t);
            }),
            (r._onSaveAsImage = function (t) {
              r.__onSaveAsImage(t);
            }),
            (r._onMagicType = function (t) {
              r.__onMagicType(t);
            }),
            (r._onCustomHandler = function (t) {
              r.__onCustomHandler(t);
            }),
            (r._onmousemove = function (t) {
              return r.__onmousemove(t);
            }),
            (r._onmousedown = function (t) {
              return r.__onmousedown(t);
            }),
            (r._onmouseup = function (t) {
              return r.__onmouseup(t);
            }),
            (r._onclick = function (t) {
              return r.__onclick(t);
            });
        }
        var i = t('./base'),
          o = t('zrender/shape/Line'),
          n = t('zrender/shape/Image'),
          s = t('zrender/shape/Rectangle'),
          r = t('../util/shape/Icon'),
          a = t('../config');
        a.toolbox = {
          zlevel: 0,
          z: 6,
          show: !1,
          orient: 'horizontal',
          x: 'right',
          y: 'top',
          color: ['#1e90ff', '#22bb22', '#4b0082', '#d2691e'],
          disableColor: '#ddd',
          effectiveColor: 'red',
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: '#ccc',
          borderWidth: 0,
          padding: 5,
          itemGap: 10,
          itemSize: 16,
          showTitle: !0,
          feature: {
            mark: {
              show: !1,
              title: {
                mark: '辅助线开关',
                markUndo: '删除辅助线',
                markClear: '清空辅助线',
              },
              lineStyle: { width: 1, color: '#1e90ff', type: 'dashed' },
            },
            dataZoom: {
              show: !1,
              title: { dataZoom: '区域缩放', dataZoomReset: '区域缩放后退' },
            },
            dataView: {
              show: !1,
              title: '数据视图',
              readOnly: !1,
              lang: ['数据视图', '关闭', '刷新'],
            },
            magicType: {
              show: !1,
              title: {
                line: '折线图切换',
                bar: '柱形图切换',
                stack: '堆积',
                tiled: '平铺',
                force: '力导向布局图切换',
                chord: '和弦图切换',
                pie: '饼图切换',
                funnel: '漏斗图切换',
              },
              type: [],
            },
            restore: { show: !1, title: '还原' },
            saveAsImage: {
              show: !1,
              title: '保存为图片',
              type: 'png',
              lang: ['点击保存'],
            },
          },
        };
        var h = t('zrender/tool/util'),
          l = t('zrender/config'),
          d = t('zrender/tool/event'),
          c = 'stack',
          p = 'tiled';
        return (
          (e.prototype = {
            type: a.COMPONENT_TYPE_TOOLBOX,
            _buildShape: function () {
              this._iconList = [];
              var t = this.option.toolbox;
              (this._enableColor = t.effectiveColor),
                (this._disableColor = t.disableColor);
              var e = t.feature,
                i = [];
              for (var o in e)
                if (e[o].show)
                  switch (o) {
                    case 'mark':
                      i.push({ key: o, name: 'mark' }),
                        i.push({ key: o, name: 'markUndo' }),
                        i.push({ key: o, name: 'markClear' });
                      break;
                    case 'magicType':
                      for (var n = 0, s = e[o].type.length; s > n; n++)
                        (e[o].title[e[o].type[n] + 'Chart'] =
                          e[o].title[e[o].type[n]]),
                          e[o].option &&
                            (e[o].option[e[o].type[n] + 'Chart'] =
                              e[o].option[e[o].type[n]]),
                          i.push({ key: o, name: e[o].type[n] + 'Chart' });
                      break;
                    case 'dataZoom':
                      i.push({ key: o, name: 'dataZoom' }),
                        i.push({ key: o, name: 'dataZoomReset' });
                      break;
                    case 'saveAsImage':
                      this.canvasSupported &&
                        i.push({ key: o, name: 'saveAsImage' });
                      break;
                    default:
                      i.push({ key: o, name: o });
                  }
              if (i.length > 0) {
                for (var r, o, n = 0, s = i.length; s > n; n++)
                  (r = i[n].name),
                    (o = i[n].key),
                    this._iconList.push(r),
                    (this._featureTitle[r] = e[o].title[r] || e[o].title),
                    e[o].icon &&
                      (this._featureIcon[r] = e[o].icon[r] || e[o].icon),
                    e[o].color &&
                      (this._featureColor[r] = e[o].color[r] || e[o].color),
                    e[o].option &&
                      (this._featureOption[r] = e[o].option[r] || e[o].option);
                (this._itemGroupLocation = this._getItemGroupLocation()),
                  this._buildBackground(),
                  this._buildItem();
                for (var n = 0, s = this.shapeList.length; s > n; n++)
                  this.zr.addShape(this.shapeList[n]);
                this._iconShapeMap.mark &&
                  (this._iconDisable(this._iconShapeMap.markUndo),
                  this._iconDisable(this._iconShapeMap.markClear)),
                  this._iconShapeMap.dataZoomReset &&
                    0 === this._zoomQueue.length &&
                    this._iconDisable(this._iconShapeMap.dataZoomReset);
              }
            },
            _buildItem: function () {
              var e,
                i,
                o,
                s,
                a = this.option.toolbox,
                h = this._iconList.length,
                l = this._itemGroupLocation.x,
                d = this._itemGroupLocation.y,
                c = a.itemSize,
                p = a.itemGap,
                u = a.color instanceof Array ? a.color : [a.color],
                g = this.getFont(a.textStyle);
              'horizontal' === a.orient
                ? ((i =
                    this._itemGroupLocation.y / this.zr.getHeight() < 0.5
                      ? 'bottom'
                      : 'top'),
                  (o =
                    this._itemGroupLocation.x / this.zr.getWidth() < 0.5
                      ? 'left'
                      : 'right'),
                  (s =
                    this._itemGroupLocation.y / this.zr.getHeight() < 0.5
                      ? 'top'
                      : 'bottom'))
                : (i =
                    this._itemGroupLocation.x / this.zr.getWidth() < 0.5
                      ? 'right'
                      : 'left'),
                (this._iconShapeMap = {});
              for (var f = this, m = 0; h > m; m++) {
                switch (
                  ((e = {
                    type: 'icon',
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                      x: l,
                      y: d,
                      width: c,
                      height: c,
                      iconType: this._iconList[m],
                      lineWidth: 1,
                      strokeColor:
                        this._featureColor[this._iconList[m]] ||
                        u[m % u.length],
                      brushType: 'stroke',
                    },
                    highlightStyle: {
                      lineWidth: 1,
                      text: a.showTitle
                        ? this._featureTitle[this._iconList[m]]
                        : void 0,
                      textFont: g,
                      textPosition: i,
                      strokeColor:
                        this._featureColor[this._iconList[m]] ||
                        u[m % u.length],
                    },
                    hoverable: !0,
                    clickable: !0,
                  }),
                  this._featureIcon[this._iconList[m]] &&
                    ((e.style.image = this._featureIcon[
                      this._iconList[m]
                    ].replace(new RegExp('^image:\\/\\/'), '')),
                    (e.style.opacity = 0.8),
                    (e.highlightStyle.opacity = 1),
                    (e.type = 'image')),
                  'horizontal' === a.orient &&
                    (0 === m &&
                      'left' === o &&
                      ((e.highlightStyle.textPosition = 'specific'),
                      (e.highlightStyle.textAlign = o),
                      (e.highlightStyle.textBaseline = s),
                      (e.highlightStyle.textX = l),
                      (e.highlightStyle.textY =
                        'top' === s ? d + c + 10 : d - 10)),
                    m === h - 1 &&
                      'right' === o &&
                      ((e.highlightStyle.textPosition = 'specific'),
                      (e.highlightStyle.textAlign = o),
                      (e.highlightStyle.textBaseline = s),
                      (e.highlightStyle.textX = l + c),
                      (e.highlightStyle.textY =
                        'top' === s ? d + c + 10 : d - 10))),
                  this._iconList[m])
                ) {
                  case 'mark':
                    e.onclick = f._onMark;
                    break;
                  case 'markUndo':
                    e.onclick = f._onMarkUndo;
                    break;
                  case 'markClear':
                    e.onclick = f._onMarkClear;
                    break;
                  case 'dataZoom':
                    e.onclick = f._onDataZoom;
                    break;
                  case 'dataZoomReset':
                    e.onclick = f._onDataZoomReset;
                    break;
                  case 'dataView':
                    if (!this._dataView) {
                      var _ = t('./dataView');
                      this._dataView = new _(
                        this.ecTheme,
                        this.messageCenter,
                        this.zr,
                        this.option,
                        this.myChart,
                      );
                    }
                    e.onclick = f._onDataView;
                    break;
                  case 'restore':
                    e.onclick = f._onRestore;
                    break;
                  case 'saveAsImage':
                    e.onclick = f._onSaveAsImage;
                    break;
                  default:
                    this._iconList[m].match('Chart')
                      ? ((e._name = this._iconList[m].replace('Chart', '')),
                        (e.onclick = f._onMagicType))
                      : (e.onclick = f._onCustomHandler);
                }
                'icon' === e.type
                  ? (e = new r(e))
                  : 'image' === e.type && (e = new n(e)),
                  this.shapeList.push(e),
                  (this._iconShapeMap[this._iconList[m]] = e),
                  'horizontal' === a.orient ? (l += c + p) : (d += c + p);
              }
            },
            _buildBackground: function () {
              var t = this.option.toolbox,
                e = this.reformCssArray(this.option.toolbox.padding);
              this.shapeList.push(
                new s({
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  hoverable: !1,
                  style: {
                    x: this._itemGroupLocation.x - e[3],
                    y: this._itemGroupLocation.y - e[0],
                    width: this._itemGroupLocation.width + e[3] + e[1],
                    height: this._itemGroupLocation.height + e[0] + e[2],
                    brushType: 0 === t.borderWidth ? 'fill' : 'both',
                    color: t.backgroundColor,
                    strokeColor: t.borderColor,
                    lineWidth: t.borderWidth,
                  },
                }),
              );
            },
            _getItemGroupLocation: function () {
              var t = this.option.toolbox,
                e = this.reformCssArray(this.option.toolbox.padding),
                i = this._iconList.length,
                o = t.itemGap,
                n = t.itemSize,
                s = 0,
                r = 0;
              'horizontal' === t.orient
                ? ((s = (n + o) * i - o), (r = n))
                : ((r = (n + o) * i - o), (s = n));
              var a,
                h = this.zr.getWidth();
              switch (t.x) {
                case 'center':
                  a = Math.floor((h - s) / 2);
                  break;
                case 'left':
                  a = e[3] + t.borderWidth;
                  break;
                case 'right':
                  a = h - s - e[1] - t.borderWidth;
                  break;
                default:
                  (a = t.x - 0), (a = isNaN(a) ? 0 : a);
              }
              var l,
                d = this.zr.getHeight();
              switch (t.y) {
                case 'top':
                  l = e[0] + t.borderWidth;
                  break;
                case 'bottom':
                  l = d - r - e[2] - t.borderWidth;
                  break;
                case 'center':
                  l = Math.floor((d - r) / 2);
                  break;
                default:
                  (l = t.y - 0), (l = isNaN(l) ? 0 : l);
              }
              return { x: a, y: l, width: s, height: r };
            },
            __onmousemove: function (t) {
              this._marking &&
                ((this._markShape.style.xEnd = d.getX(t.event)),
                (this._markShape.style.yEnd = d.getY(t.event)),
                this.zr.addHoverShape(this._markShape)),
                this._zooming &&
                  ((this._zoomShape.style.width =
                    d.getX(t.event) - this._zoomShape.style.x),
                  (this._zoomShape.style.height =
                    d.getY(t.event) - this._zoomShape.style.y),
                  this.zr.addHoverShape(this._zoomShape),
                  (this.dom.style.cursor = 'crosshair'),
                  d.stop(t.event)),
                this._zoomStart &&
                  'pointer' != this.dom.style.cursor &&
                  'move' != this.dom.style.cursor &&
                  (this.dom.style.cursor = 'crosshair');
            },
            __onmousedown: function (t) {
              if (!t.target) {
                this._zooming = !0;
                var e = d.getX(t.event),
                  i = d.getY(t.event),
                  o = this.option.dataZoom || {};
                return (
                  (this._zoomShape = new s({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                      x: e,
                      y: i,
                      width: 1,
                      height: 1,
                      brushType: 'both',
                    },
                    highlightStyle: {
                      lineWidth: 2,
                      color: o.fillerColor || a.dataZoom.fillerColor,
                      strokeColor: o.handleColor || a.dataZoom.handleColor,
                      brushType: 'both',
                    },
                  })),
                  this.zr.addHoverShape(this._zoomShape),
                  !0
                );
              }
            },
            __onmouseup: function () {
              if (
                !this._zoomShape ||
                Math.abs(this._zoomShape.style.width) < 10 ||
                Math.abs(this._zoomShape.style.height) < 10
              )
                return (this._zooming = !1), !0;
              if (this._zooming && this.component.dataZoom) {
                this._zooming = !1;
                var t = this.component.dataZoom.rectZoom(this._zoomShape.style);
                t &&
                  (this._zoomQueue.push({
                    start: t.start,
                    end: t.end,
                    start2: t.start2,
                    end2: t.end2,
                  }),
                  this._iconEnable(this._iconShapeMap.dataZoomReset),
                  this.zr.refreshNextFrame());
              }
              return !0;
            },
            __onclick: function (t) {
              if (!t.target)
                if (this._marking)
                  (this._marking = !1),
                    this._markShapeList.push(this._markShape),
                    this._iconEnable(this._iconShapeMap.markUndo),
                    this._iconEnable(this._iconShapeMap.markClear),
                    this.zr.addShape(this._markShape),
                    this.zr.refreshNextFrame();
                else if (this._markStart) {
                  this._marking = !0;
                  var e = d.getX(t.event),
                    i = d.getY(t.event);
                  (this._markShape = new o({
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase(),
                    style: {
                      xStart: e,
                      yStart: i,
                      xEnd: e,
                      yEnd: i,
                      lineWidth: this.query(
                        this.option,
                        'toolbox.feature.mark.lineStyle.width',
                      ),
                      strokeColor: this.query(
                        this.option,
                        'toolbox.feature.mark.lineStyle.color',
                      ),
                      lineType: this.query(
                        this.option,
                        'toolbox.feature.mark.lineStyle.type',
                      ),
                    },
                  })),
                    this.zr.addHoverShape(this._markShape);
                }
            },
            __onMark: function (t) {
              var e = t.target;
              if (this._marking || this._markStart)
                this._resetMark(), this.zr.refreshNextFrame();
              else {
                this._resetZoom(),
                  this.zr.modShape(e.id, {
                    style: { strokeColor: this._enableColor },
                  }),
                  this.zr.refreshNextFrame(),
                  (this._markStart = !0);
                var i = this;
                setTimeout(function () {
                  i.zr &&
                    i.zr.on(l.EVENT.CLICK, i._onclick) &&
                    i.zr.on(l.EVENT.MOUSEMOVE, i._onmousemove);
                }, 10);
              }
              return !0;
            },
            __onMarkUndo: function () {
              if (this._marking) this._marking = !1;
              else {
                var t = this._markShapeList.length;
                if (t >= 1) {
                  var e = this._markShapeList[t - 1];
                  this.zr.delShape(e.id),
                    this.zr.refreshNextFrame(),
                    this._markShapeList.pop(),
                    1 === t &&
                      (this._iconDisable(this._iconShapeMap.markUndo),
                      this._iconDisable(this._iconShapeMap.markClear));
                }
              }
              return !0;
            },
            __onMarkClear: function () {
              this._marking && (this._marking = !1);
              var t = this._markShapeList.length;
              if (t > 0) {
                for (; t--; ) this.zr.delShape(this._markShapeList.pop().id);
                this._iconDisable(this._iconShapeMap.markUndo),
                  this._iconDisable(this._iconShapeMap.markClear),
                  this.zr.refreshNextFrame();
              }
              return !0;
            },
            __onDataZoom: function (t) {
              var e = t.target;
              if (this._zooming || this._zoomStart)
                this._resetZoom(),
                  this.zr.refreshNextFrame(),
                  (this.dom.style.cursor = 'default');
              else {
                this._resetMark(),
                  this.zr.modShape(e.id, {
                    style: { strokeColor: this._enableColor },
                  }),
                  this.zr.refreshNextFrame(),
                  (this._zoomStart = !0);
                var i = this;
                setTimeout(function () {
                  i.zr &&
                    i.zr.on(l.EVENT.MOUSEDOWN, i._onmousedown) &&
                    i.zr.on(l.EVENT.MOUSEUP, i._onmouseup) &&
                    i.zr.on(l.EVENT.MOUSEMOVE, i._onmousemove);
                }, 10),
                  (this.dom.style.cursor = 'crosshair');
              }
              return !0;
            },
            __onDataZoomReset: function () {
              return (
                this._zooming && (this._zooming = !1),
                this._zoomQueue.pop(),
                this._zoomQueue.length > 0
                  ? this.component.dataZoom.absoluteZoom(
                      this._zoomQueue[this._zoomQueue.length - 1],
                    )
                  : (this.component.dataZoom.rectZoom(),
                    this._iconDisable(this._iconShapeMap.dataZoomReset),
                    this.zr.refreshNextFrame()),
                !0
              );
            },
            _resetMark: function () {
              (this._marking = !1),
                this._markStart &&
                  ((this._markStart = !1),
                  this._iconShapeMap.mark &&
                    this.zr.modShape(this._iconShapeMap.mark.id, {
                      style: {
                        strokeColor:
                          this._iconShapeMap.mark.highlightStyle.strokeColor,
                      },
                    }),
                  this.zr.un(l.EVENT.CLICK, this._onclick),
                  this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove));
            },
            _resetZoom: function () {
              (this._zooming = !1),
                this._zoomStart &&
                  ((this._zoomStart = !1),
                  this._iconShapeMap.dataZoom &&
                    this.zr.modShape(this._iconShapeMap.dataZoom.id, {
                      style: {
                        strokeColor:
                          this._iconShapeMap.dataZoom.highlightStyle
                            .strokeColor,
                      },
                    }),
                  this.zr.un(l.EVENT.MOUSEDOWN, this._onmousedown),
                  this.zr.un(l.EVENT.MOUSEUP, this._onmouseup),
                  this.zr.un(l.EVENT.MOUSEMOVE, this._onmousemove));
            },
            _iconDisable: function (t) {
              'image' != t.type
                ? this.zr.modShape(t.id, {
                    hoverable: !1,
                    clickable: !1,
                    style: { strokeColor: this._disableColor },
                  })
                : this.zr.modShape(t.id, {
                    hoverable: !1,
                    clickable: !1,
                    style: { opacity: 0.3 },
                  });
            },
            _iconEnable: function (t) {
              'image' != t.type
                ? this.zr.modShape(t.id, {
                    hoverable: !0,
                    clickable: !0,
                    style: { strokeColor: t.highlightStyle.strokeColor },
                  })
                : this.zr.modShape(t.id, {
                    hoverable: !0,
                    clickable: !0,
                    style: { opacity: 0.8 },
                  });
            },
            __onDataView: function () {
              return this._dataView.show(this.option), !0;
            },
            __onRestore: function () {
              return (
                this._resetMark(),
                this._resetZoom(),
                this.messageCenter.dispatch(
                  a.EVENT.RESTORE,
                  null,
                  null,
                  this.myChart,
                ),
                !0
              );
            },
            __onSaveAsImage: function () {
              var t = this.option.toolbox.feature.saveAsImage,
                e = t.type || 'png';
              'png' != e && 'jpeg' != e && (e = 'png');
              var i;
              i = this.myChart.isConnected()
                ? this.myChart.getConnectedDataURL(e)
                : this.zr.toDataURL(
                    'image/' + e,
                    this.option.backgroundColor &&
                      'rgba(0,0,0,0)' ===
                        this.option.backgroundColor.replace(' ', '')
                      ? '#fff'
                      : this.option.backgroundColor,
                  );
              var o = document.createElement('div');
              (o.id = '__echarts_download_wrap__'),
                (o.style.cssText =
                  'position:fixed;z-index:99999;display:block;top:0;left:0;background-color:rgba(33,33,33,0.5);text-align:center;width:100%;height:100%;line-height:' +
                  document.documentElement.clientHeight +
                  'px;');
              var n = document.createElement('a');
              (n.href = i),
                n.setAttribute(
                  'download',
                  (t.name
                    ? t.name
                    : this.option.title &&
                      (this.option.title.text || this.option.title.subtext)
                    ? this.option.title.text || this.option.title.subtext
                    : 'ECharts') +
                    '.' +
                    e,
                ),
                (n.innerHTML =
                  '<img style="vertical-align:middle" src="' +
                  i +
                  '" title="' +
                  (window.ActiveXObject || 'ActiveXObject' in window
                    ? '右键->图片另存为'
                    : t.lang
                    ? t.lang[0]
                    : '点击保存') +
                  '"/>'),
                o.appendChild(n),
                document.body.appendChild(o),
                (n = null),
                (o = null),
                setTimeout(function () {
                  var t = document.getElementById('__echarts_download_wrap__');
                  t &&
                    ((t.onclick = function () {
                      var t = document.getElementById(
                        '__echarts_download_wrap__',
                      );
                      (t.onclick = null),
                        (t.innerHTML = ''),
                        document.body.removeChild(t),
                        (t = null);
                    }),
                    (t = null));
                }, 500);
            },
            __onMagicType: function (t) {
              this._resetMark();
              var e = t.target._name;
              return (
                this._magicType[e] ||
                  ((this._magicType[e] = !0),
                  e === a.CHART_TYPE_LINE
                    ? (this._magicType[a.CHART_TYPE_BAR] = !1)
                    : e === a.CHART_TYPE_BAR &&
                      (this._magicType[a.CHART_TYPE_LINE] = !1),
                  e === a.CHART_TYPE_PIE
                    ? (this._magicType[a.CHART_TYPE_FUNNEL] = !1)
                    : e === a.CHART_TYPE_FUNNEL &&
                      (this._magicType[a.CHART_TYPE_PIE] = !1),
                  e === a.CHART_TYPE_FORCE
                    ? (this._magicType[a.CHART_TYPE_CHORD] = !1)
                    : e === a.CHART_TYPE_CHORD &&
                      (this._magicType[a.CHART_TYPE_FORCE] = !1),
                  e === c
                    ? (this._magicType[p] = !1)
                    : e === p && (this._magicType[c] = !1),
                  this.messageCenter.dispatch(
                    a.EVENT.MAGIC_TYPE_CHANGED,
                    t.event,
                    { magicType: this._magicType },
                    this.myChart,
                  )),
                !0
              );
            },
            setMagicType: function (t) {
              this._resetMark(),
                (this._magicType = t),
                !this._isSilence &&
                  this.messageCenter.dispatch(
                    a.EVENT.MAGIC_TYPE_CHANGED,
                    null,
                    { magicType: this._magicType },
                    this.myChart,
                  );
            },
            __onCustomHandler: function (t) {
              var e = t.target.style.iconType,
                i = this.option.toolbox.feature[e].onclick;
              'function' == typeof i && i.call(this, this.option);
            },
            reset: function (t, e) {
              if (
                (e && this.clear(),
                this.query(t, 'toolbox.show') &&
                  this.query(t, 'toolbox.feature.magicType.show'))
              ) {
                var i = t.toolbox.feature.magicType.type,
                  o = i.length;
                for (this._magicMap = {}; o--; ) this._magicMap[i[o]] = !0;
                o = t.series.length;
                for (var n, s; o--; )
                  (n = t.series[o].type),
                    this._magicMap[n] &&
                      ((s =
                        t.xAxis instanceof Array
                          ? t.xAxis[t.series[o].xAxisIndex || 0]
                          : t.xAxis),
                      s &&
                        'category' === (s.type || 'category') &&
                        (s.__boundaryGap =
                          null != s.boundaryGap ? s.boundaryGap : !0),
                      (s =
                        t.yAxis instanceof Array
                          ? t.yAxis[t.series[o].yAxisIndex || 0]
                          : t.yAxis),
                      s &&
                        'category' === s.type &&
                        (s.__boundaryGap =
                          null != s.boundaryGap ? s.boundaryGap : !0),
                      (t.series[o].__type = n),
                      (t.series[o].__itemStyle = h.clone(
                        t.series[o].itemStyle || {},
                      ))),
                    (this._magicMap[c] || this._magicMap[p]) &&
                      (t.series[o].__stack = t.series[o].stack);
              }
              this._magicType = e ? {} : this._magicType || {};
              for (var r in this._magicType)
                if (this._magicType[r]) {
                  (this.option = t), this.getMagicOption();
                  break;
                }
              var a = t.dataZoom;
              if (a && a.show) {
                var l =
                    null != a.start && a.start >= 0 && a.start <= 100
                      ? a.start
                      : 0,
                  d = null != a.end && a.end >= 0 && a.end <= 100 ? a.end : 100;
                l > d && ((l += d), (d = l - d), (l -= d)),
                  (this._zoomQueue = [
                    { start: l, end: d, start2: 0, end2: 100 },
                  ]);
              } else this._zoomQueue = [];
            },
            getMagicOption: function () {
              var t, e;
              if (
                this._magicType[a.CHART_TYPE_LINE] ||
                this._magicType[a.CHART_TYPE_BAR]
              ) {
                for (
                  var i = this._magicType[a.CHART_TYPE_LINE] ? !1 : !0,
                    o = 0,
                    n = this.option.series.length;
                  n > o;
                  o++
                )
                  (e = this.option.series[o].type),
                    (e == a.CHART_TYPE_LINE || e == a.CHART_TYPE_BAR) &&
                      ((t =
                        this.option.xAxis instanceof Array
                          ? this.option.xAxis[
                              this.option.series[o].xAxisIndex || 0
                            ]
                          : this.option.xAxis),
                      t &&
                        'category' === (t.type || 'category') &&
                        (t.boundaryGap = i ? !0 : t.__boundaryGap),
                      (t =
                        this.option.yAxis instanceof Array
                          ? this.option.yAxis[
                              this.option.series[o].yAxisIndex || 0
                            ]
                          : this.option.yAxis),
                      t &&
                        'category' === t.type &&
                        (t.boundaryGap = i ? !0 : t.__boundaryGap));
                this._defaultMagic(a.CHART_TYPE_LINE, a.CHART_TYPE_BAR);
              }
              if (
                (this._defaultMagic(a.CHART_TYPE_CHORD, a.CHART_TYPE_FORCE),
                this._defaultMagic(a.CHART_TYPE_PIE, a.CHART_TYPE_FUNNEL),
                this._magicType[c] || this._magicType[p])
              )
                for (var o = 0, n = this.option.series.length; n > o; o++)
                  this._magicType[c]
                    ? ((this.option.series[o].stack =
                        '_ECHARTS_STACK_KENER_2014_'),
                      (e = c))
                    : this._magicType[p] &&
                      ((this.option.series[o].stack = null), (e = p)),
                    this._featureOption[e + 'Chart'] &&
                      h.merge(
                        this.option.series[o],
                        this._featureOption[e + 'Chart'] || {},
                        !0,
                      );
              return this.option;
            },
            _defaultMagic: function (t, e) {
              if (this._magicType[t] || this._magicType[e])
                for (var i = 0, o = this.option.series.length; o > i; i++) {
                  var n = this.option.series[i].type;
                  (n == t || n == e) &&
                    ((this.option.series[i].type = this._magicType[t] ? t : e),
                    (this.option.series[i].itemStyle = h.clone(
                      this.option.series[i].__itemStyle,
                    )),
                    (n = this.option.series[i].type),
                    this._featureOption[n + 'Chart'] &&
                      h.merge(
                        this.option.series[i],
                        this._featureOption[n + 'Chart'] || {},
                        !0,
                      ));
                }
            },
            silence: function (t) {
              this._isSilence = t;
            },
            resize: function () {
              this._resetMark(),
                this.clear(),
                this.option &&
                  this.option.toolbox &&
                  this.option.toolbox.show &&
                  this._buildShape(),
                this._dataView && this._dataView.resize();
            },
            hideDataView: function () {
              this._dataView && this._dataView.hide();
            },
            clear: function (t) {
              this.zr &&
                (this.zr.delShape(this.shapeList),
                (this.shapeList = []),
                t ||
                  (this.zr.delShape(this._markShapeList),
                  (this._markShapeList = [])));
            },
            onbeforDispose: function () {
              this._dataView &&
                (this._dataView.dispose(), (this._dataView = null)),
                (this._markShapeList = null);
            },
            refresh: function (t) {
              t &&
                (this._resetMark(),
                this._resetZoom(),
                (t.toolbox = this.reformOption(t.toolbox)),
                (this.option = t),
                this.clear(!0),
                t.toolbox.show && this._buildShape(),
                this.hideDataView());
            },
          }),
          h.inherits(e, i),
          t('../component').define('toolbox', e),
          e
        );
      },
    ),
    i(
      'echarts/util/shape/MarkLine',
      [
        'require',
        'zrender/shape/Base',
        './Icon',
        'zrender/shape/Line',
        'zrender/shape/BezierCurve',
        'zrender/tool/area',
        'zrender/shape/util/dashedLineTo',
        'zrender/tool/util',
        'zrender/tool/curve',
      ],
      function (t) {
        function e(t) {
          i.call(this, t),
            this.style.curveness > 0 && this.updatePoints(this.style),
            this.highlightStyle.curveness > 0 &&
              this.updatePoints(this.highlightStyle);
        }
        var i = t('zrender/shape/Base'),
          o = t('./Icon'),
          n = t('zrender/shape/Line'),
          s = new n({}),
          r = t('zrender/shape/BezierCurve'),
          a = new r({}),
          h = t('zrender/tool/area'),
          l = t('zrender/shape/util/dashedLineTo'),
          d = t('zrender/tool/util'),
          c = t('zrender/tool/curve');
        return (
          (e.prototype = {
            type: 'mark-line',
            brush: function (t, e) {
              var i = this.style;
              e && (i = this.getHighlightStyle(i, this.highlightStyle || {})),
                t.save(),
                this.setContext(t, i),
                this.setTransform(t),
                t.save(),
                t.beginPath(),
                this.buildPath(t, i),
                t.stroke(),
                t.restore(),
                this.brushSymbol(t, i, 0),
                this.brushSymbol(t, i, 1),
                this.drawText(t, i, this.style),
                t.restore();
            },
            buildPath: function (t, e) {
              var i = e.lineType || 'solid';
              if ((t.moveTo(e.xStart, e.yStart), e.curveness > 0)) {
                var o = null;
                switch (i) {
                  case 'dashed':
                    o = [5, 5];
                    break;
                  case 'dotted':
                    o = [1, 1];
                }
                o && t.setLineDash && t.setLineDash(o),
                  t.quadraticCurveTo(e.cpX1, e.cpY1, e.xEnd, e.yEnd);
              } else if ('solid' == i) t.lineTo(e.xEnd, e.yEnd);
              else {
                var n = (e.lineWidth || 1) * ('dashed' == e.lineType ? 5 : 1);
                l(t, e.xStart, e.yStart, e.xEnd, e.yEnd, n);
              }
            },
            updatePoints: function (t) {
              var e = t.curveness || 0,
                i = 1,
                o = t.xStart,
                n = t.yStart,
                s = t.xEnd,
                r = t.yEnd,
                a = (o + s) / 2 - i * (n - r) * e,
                h = (n + r) / 2 - i * (s - o) * e;
              (t.cpX1 = a), (t.cpY1 = h);
            },
            brushSymbol: function (t, e, i) {
              if ('none' != e.symbol[i]) {
                t.save(),
                  t.beginPath(),
                  (t.lineWidth = e.symbolBorder),
                  (t.strokeStyle = e.symbolBorderColor);
                var n = e.symbol[i].replace('empty', '').toLowerCase();
                e.symbol[i].match('empty') && (t.fillStyle = '#fff');
                var s = e.xStart,
                  r = e.yStart,
                  a = e.xEnd,
                  h = e.yEnd,
                  l = 0 === i ? s : a,
                  d = 0 === i ? r : h,
                  p = e.curveness || 0,
                  u = null != e.symbolRotate[i] ? e.symbolRotate[i] - 0 : 0;
                if (((u = (u / 180) * Math.PI), 'arrow' == n && 0 === u))
                  if (0 === p) {
                    var g = 0 === i ? -1 : 1;
                    u = Math.PI / 2 + Math.atan2(g * (h - r), g * (a - s));
                  } else {
                    var f = e.cpX1,
                      m = e.cpY1,
                      _ = c.quadraticDerivativeAt,
                      y = _(s, f, a, i),
                      x = _(r, m, h, i);
                    u = Math.PI / 2 + Math.atan2(x, y);
                  }
                t.translate(l, d), 0 !== u && t.rotate(u);
                var v = e.symbolSize[i];
                o.prototype.buildPath(t, {
                  x: -v,
                  y: -v,
                  width: 2 * v,
                  height: 2 * v,
                  iconType: n,
                }),
                  t.closePath(),
                  t.fill(),
                  t.stroke(),
                  t.restore();
              }
            },
            getRect: function (t) {
              return t.curveness > 0 ? a.getRect(t) : s.getRect(t), t.__rect;
            },
            isCover: function (t, e) {
              var i = this.transformCoordToLocal(t, e);
              return (
                (t = i[0]),
                (e = i[1]),
                this.isCoverRect(t, e)
                  ? this.style.curveness > 0
                    ? h.isInside(a, this.style, t, e)
                    : h.isInside(s, this.style, t, e)
                  : !1
              );
            },
          }),
          d.inherits(e, i),
          e
        );
      },
    ),
    i(
      'zrender/shape/ShapeBundle',
      ['require', './Base', '../tool/util'],
      function (t) {
        var e = t('./Base'),
          i = function (t) {
            e.call(this, t);
          };
        return (
          (i.prototype = {
            constructor: i,
            type: 'shape-bundle',
            brush: function (t, e) {
              var i = this.beforeBrush(t, e);
              t.beginPath();
              for (var o = 0; o < i.shapeList.length; o++) {
                var n = i.shapeList[o],
                  s = n.style;
                e &&
                  (s = n.getHighlightStyle(
                    s,
                    n.highlightStyle || {},
                    n.brushTypeOnly,
                  )),
                  n.buildPath(t, s);
              }
              switch (i.brushType) {
                case 'both':
                  t.fill();
                case 'stroke':
                  i.lineWidth > 0 && t.stroke();
                  break;
                default:
                  t.fill();
              }
              this.drawText(t, i, this.style), this.afterBrush(t);
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              for (
                var e = 1 / 0, i = -1 / 0, o = 1 / 0, n = -1 / 0, s = 0;
                s < t.shapeList.length;
                s++
              )
                var r = t.shapeList[s],
                  a = r.getRect(r.style),
                  e = Math.min(a.x, e),
                  o = Math.min(a.y, o),
                  i = Math.max(a.x + a.width, i),
                  n = Math.max(a.y + a.height, n);
              return (
                (t.__rect = { x: e, y: o, width: i - e, height: n - o }),
                t.__rect
              );
            },
            isCover: function (t, e) {
              var i = this.transformCoordToLocal(t, e);
              if (((t = i[0]), (e = i[1]), this.isCoverRect(t, e)))
                for (var o = 0; o < this.style.shapeList.length; o++) {
                  var n = this.style.shapeList[o];
                  if (n.isCover(t, e)) return !0;
                }
              return !1;
            },
          }),
          t('../tool/util').inherits(i, e),
          i
        );
      },
    ),
    i(
      'echarts/util/ecAnimation',
      [
        'require',
        'zrender/tool/util',
        'zrender/tool/curve',
        'zrender/shape/Polygon',
      ],
      function (t) {
        function e(t, e, i, o, n) {
          var s,
            r = i.style.pointList,
            a = r.length;
          if (!e) {
            if (((s = []), 'vertical' != i._orient))
              for (var h = r[0][1], l = 0; a > l; l++) s[l] = [r[l][0], h];
            else for (var d = r[0][0], l = 0; a > l; l++) s[l] = [d, r[l][1]];
            'half-smooth-polygon' == i.type &&
              ((s[a - 1] = g.clone(r[a - 1])), (s[a - 2] = g.clone(r[a - 2]))),
              (e = { style: { pointList: s } });
          }
          s = e.style.pointList;
          var c = s.length;
          (i.style.pointList =
            c == a ? s : a > c ? s.concat(r.slice(c)) : s.slice(0, a)),
            t.addShape(i),
            (i.__animating = !0),
            t
              .animate(i.id, 'style')
              .when(o, { pointList: r })
              .during(function () {
                i.updateControlPoints && i.updateControlPoints(i.style);
              })
              .done(function () {
                i.__animating = !1;
              })
              .start(n);
        }
        function i(t, e) {
          for (var i = arguments.length, o = 2; i > o; o++) {
            var n = arguments[o];
            t.style[n] = e.style[n];
          }
        }
        function o(t, e, o, n, s) {
          var r = o.style;
          e ||
            (e = {
              position: o.position,
              style: {
                x: r.x,
                y: 'vertical' == o._orient ? r.y + r.height : r.y,
                width: 'vertical' == o._orient ? r.width : 0,
                height: 'vertical' != o._orient ? r.height : 0,
              },
            });
          var a = r.x,
            h = r.y,
            l = r.width,
            d = r.height,
            c = [o.position[0], o.position[1]];
          i(o, e, 'x', 'y', 'width', 'height'),
            (o.position = e.position),
            t.addShape(o),
            (c[0] != e.position[0] || c[1] != e.position[1]) &&
              t.animate(o.id, '').when(n, { position: c }).start(s),
            (o.__animating = !0),
            t
              .animate(o.id, 'style')
              .when(n, { x: a, y: h, width: l, height: d })
              .done(function () {
                o.__animating = !1;
              })
              .start(s);
        }
        function n(t, e, i, o, n) {
          if (!e) {
            var s = i.style.y;
            e = { style: { y: [s[0], s[0], s[0], s[0]] } };
          }
          var r = i.style.y;
          (i.style.y = e.style.y),
            t.addShape(i),
            (i.__animating = !0),
            t
              .animate(i.id, 'style')
              .when(o, { y: r })
              .done(function () {
                i.__animating = !1;
              })
              .start(n);
        }
        function s(t, e, i, o, n) {
          var s = i.style.x,
            r = i.style.y,
            a = i.style.r0,
            h = i.style.r;
          (i.__animating = !0),
            'r' != i._animationAdd
              ? ((i.style.r0 = 0),
                (i.style.r = 0),
                (i.rotation = [2 * Math.PI, s, r]),
                t.addShape(i),
                t
                  .animate(i.id, 'style')
                  .when(o, { r0: a, r: h })
                  .done(function () {
                    i.__animating = !1;
                  })
                  .start(n),
                t
                  .animate(i.id, '')
                  .when(o, { rotation: [0, s, r] })
                  .start(n))
              : ((i.style.r0 = i.style.r),
                t.addShape(i),
                t
                  .animate(i.id, 'style')
                  .when(o, { r0: a })
                  .done(function () {
                    i.__animating = !1;
                  })
                  .start(n));
        }
        function r(t, e, o, n, s) {
          e ||
            (e =
              'r' != o._animationAdd
                ? {
                    style: {
                      startAngle: o.style.startAngle,
                      endAngle: o.style.startAngle,
                    },
                  }
                : { style: { r0: o.style.r } });
          var r = o.style.startAngle,
            a = o.style.endAngle;
          i(o, e, 'startAngle', 'endAngle'),
            t.addShape(o),
            (o.__animating = !0),
            t
              .animate(o.id, 'style')
              .when(n, { startAngle: r, endAngle: a })
              .done(function () {
                o.__animating = !1;
              })
              .start(s);
        }
        function a(t, e, o, n, s) {
          e ||
            (e = {
              style: {
                x:
                  'left' == o.style.textAlign
                    ? o.style.x + 100
                    : o.style.x - 100,
                y: o.style.y,
              },
            });
          var r = o.style.x,
            a = o.style.y;
          i(o, e, 'x', 'y'),
            t.addShape(o),
            (o.__animating = !0),
            t
              .animate(o.id, 'style')
              .when(n, { x: r, y: a })
              .done(function () {
                o.__animating = !1;
              })
              .start(s);
        }
        function h(e, i, o, n, s) {
          var r = t('zrender/shape/Polygon').prototype.getRect(o.style),
            a = r.x + r.width / 2,
            h = r.y + r.height / 2;
          (o.scale = [0.1, 0.1, a, h]),
            e.addShape(o),
            (o.__animating = !0),
            e
              .animate(o.id, '')
              .when(n, { scale: [1, 1, a, h] })
              .done(function () {
                o.__animating = !1;
              })
              .start(s);
        }
        function l(t, e, o, n, s) {
          e ||
            (e = {
              style: {
                source0: 0,
                source1: o.style.source1 > 0 ? 360 : -360,
                target0: 0,
                target1: o.style.target1 > 0 ? 360 : -360,
              },
            });
          var r = o.style.source0,
            a = o.style.source1,
            h = o.style.target0,
            l = o.style.target1;
          e.style && i(o, e, 'source0', 'source1', 'target0', 'target1'),
            t.addShape(o),
            (o.__animating = !0),
            t
              .animate(o.id, 'style')
              .when(n, { source0: r, source1: a, target0: h, target1: l })
              .done(function () {
                o.__animating = !1;
              })
              .start(s);
        }
        function d(t, e, i, o, n) {
          e || (e = { style: { angle: i.style.startAngle } });
          var s = i.style.angle;
          (i.style.angle = e.style.angle),
            t.addShape(i),
            (i.__animating = !0),
            t
              .animate(i.id, 'style')
              .when(o, { angle: s })
              .done(function () {
                i.__animating = !1;
              })
              .start(n);
        }
        function c(t, e, i, n, s, r) {
          if (
            ((i.style._x = i.style.x),
            (i.style._y = i.style.y),
            (i.style._width = i.style.width),
            (i.style._height = i.style.height),
            e)
          )
            o(t, e, i, n, s);
          else {
            var a = i._x || 0,
              h = i._y || 0;
            (i.scale = [0.01, 0.01, a, h]),
              t.addShape(i),
              (i.__animating = !0),
              t
                .animate(i.id, '')
                .delay(r)
                .when(n, { scale: [1, 1, a, h] })
                .done(function () {
                  i.__animating = !1;
                })
                .start(s || 'QuinticOut');
          }
        }
        function p(t, e, o, n, s) {
          e ||
            (e = {
              style: {
                xStart: o.style.xStart,
                yStart: o.style.yStart,
                xEnd: o.style.xStart,
                yEnd: o.style.yStart,
              },
            });
          var r = o.style.xStart,
            a = o.style.xEnd,
            h = o.style.yStart,
            l = o.style.yEnd;
          i(o, e, 'xStart', 'xEnd', 'yStart', 'yEnd'),
            t.addShape(o),
            (o.__animating = !0),
            t
              .animate(o.id, 'style')
              .when(n, { xStart: r, xEnd: a, yStart: h, yEnd: l })
              .done(function () {
                o.__animating = !1;
              })
              .start(s);
        }
        function u(t, e, i, o, n) {
          (n = n || 'QuinticOut'), (i.__animating = !0), t.addShape(i);
          var s = i.style,
            r = function () {
              i.__animating = !1;
            },
            a = s.xStart,
            h = s.yStart,
            l = s.xEnd,
            d = s.yEnd;
          if (s.curveness > 0) {
            i.updatePoints(s);
            var c = { p: 0 },
              p = s.cpX1,
              u = s.cpY1,
              g = [],
              m = [],
              _ = f.quadraticSubdivide;
            t.animation
              .animate(c)
              .when(o, { p: 1 })
              .during(function () {
                _(a, p, l, c.p, g),
                  _(h, u, d, c.p, m),
                  (s.cpX1 = g[1]),
                  (s.cpY1 = m[1]),
                  (s.xEnd = g[2]),
                  (s.yEnd = m[2]),
                  t.modShape(i);
              })
              .done(r)
              .start(n);
          } else
            t.animate(i.id, 'style')
              .when(0, { xEnd: a, yEnd: h })
              .when(o, { xEnd: l, yEnd: d })
              .done(r)
              .start(n);
        }
        var g = t('zrender/tool/util'),
          f = t('zrender/tool/curve');
        return {
          pointList: e,
          rectangle: o,
          candle: n,
          ring: s,
          sector: r,
          text: a,
          polygon: h,
          ribbon: l,
          gaugePointer: d,
          icon: c,
          line: p,
          markline: u,
        };
      },
    ),
    i(
      'echarts/util/ecEffect',
      [
        'require',
        '../util/ecData',
        'zrender/shape/Circle',
        'zrender/shape/Image',
        'zrender/tool/curve',
        '../util/shape/Icon',
        '../util/shape/Symbol',
        'zrender/shape/ShapeBundle',
        'zrender/shape/Polyline',
        'zrender/tool/vector',
        'zrender/tool/env',
      ],
      function (t) {
        function e(t, e, i, o) {
          var n,
            r = i.effect,
            h = r.color || i.style.strokeColor || i.style.color,
            d = r.shadowColor || h,
            c = r.scaleSize,
            p = r.bounceDistance,
            u = 'undefined' != typeof r.shadowBlur ? r.shadowBlur : c;
          'image' !== i.type
            ? ((n = new l({
                zlevel: o,
                style: {
                  brushType: 'stroke',
                  iconType:
                    'droplet' != i.style.iconType ? i.style.iconType : 'circle',
                  x: u + 1,
                  y: u + 1,
                  n: i.style.n,
                  width: i.style._width * c,
                  height: i.style._height * c,
                  lineWidth: 1,
                  strokeColor: h,
                  shadowColor: d,
                  shadowBlur: u,
                },
                draggable: !1,
                hoverable: !1,
              })),
              'pin' == i.style.iconType &&
                (n.style.y += (n.style.height / 2) * 1.5),
              g &&
                ((n.style.image = t.shapeToImage(
                  n,
                  n.style.width + 2 * u + 2,
                  n.style.height + 2 * u + 2,
                ).style.image),
                (n = new a({
                  zlevel: n.zlevel,
                  style: n.style,
                  draggable: !1,
                  hoverable: !1,
                }))))
            : (n = new a({
                zlevel: o,
                style: i.style,
                draggable: !1,
                hoverable: !1,
              })),
            s.clone(i, n),
            (n.position = i.position),
            e.push(n),
            t.addShape(n);
          var f = 'image' !== i.type ? window.devicePixelRatio || 1 : 1,
            m = (n.style.width / f - i.style._width) / 2;
          (n.style.x = i.style._x - m),
            (n.style.y = i.style._y - m),
            'pin' == i.style.iconType &&
              (n.style.y -= (i.style.height / 2) * 1.5);
          var _ = 100 * (r.period + 10 * Math.random());
          t.modShape(i.id, { invisible: !0 });
          var y = n.style.x + n.style.width / 2 / f,
            x = n.style.y + n.style.height / 2 / f;
          'scale' === r.type
            ? (t.modShape(n.id, { scale: [0.1, 0.1, y, x] }),
              t
                .animate(n.id, '', r.loop)
                .when(_, { scale: [1, 1, y, x] })
                .done(function () {
                  (i.effect.show = !1), t.delShape(n.id);
                })
                .start())
            : t
                .animate(n.id, 'style', r.loop)
                .when(_, { y: n.style.y - p })
                .when(2 * _, { y: n.style.y })
                .done(function () {
                  (i.effect.show = !1), t.delShape(n.id);
                })
                .start();
        }
        function i(t, e, i, o) {
          var n = i.effect,
            s = n.color || i.style.strokeColor || i.style.color,
            r = n.scaleSize,
            a = n.shadowColor || s,
            h = 'undefined' != typeof n.shadowBlur ? n.shadowBlur : 2 * r,
            l = window.devicePixelRatio || 1,
            c = new d({
              zlevel: o,
              position: i.position,
              scale: i.scale,
              style: {
                pointList: i.style.pointList,
                iconType: i.style.iconType,
                color: s,
                strokeColor: s,
                shadowColor: a,
                shadowBlur: h * l,
                random: !0,
                brushType: 'fill',
                lineWidth: 1,
                size: i.style.size,
              },
              draggable: !1,
              hoverable: !1,
            });
          e.push(c), t.addShape(c), t.modShape(i.id, { invisible: !0 });
          for (
            var p = Math.round(100 * n.period), u = {}, g = {}, f = 0;
            20 > f;
            f++
          )
            (c.style['randomMap' + f] = 0),
              (u = {}),
              (u['randomMap' + f] = 100),
              (g = {}),
              (g['randomMap' + f] = 0),
              (c.style['randomMap' + f] = 100 * Math.random()),
              t
                .animate(c.id, 'style', !0)
                .when(p, u)
                .when(2 * p, g)
                .when(3 * p, u)
                .when(4 * p, u)
                .delay(Math.random() * p * f)
                .start();
        }
        function o(t, e, i, o, n) {
          var a = i.effect,
            l = i.style,
            d = a.color || l.strokeColor || l.color,
            c = a.shadowColor || l.strokeColor || d,
            f = l.lineWidth * a.scaleSize,
            m = 'undefined' != typeof a.shadowBlur ? a.shadowBlur : f,
            _ = new r({
              zlevel: o,
              style: {
                x: m,
                y: m,
                r: f,
                color: d,
                shadowColor: c,
                shadowBlur: m,
              },
              hoverable: !1,
            }),
            y = 0;
          if (g && !n) {
            var o = _.zlevel;
            (_ = t.shapeToImage(_, 2 * (f + m), 2 * (f + m))),
              (_.zlevel = o),
              (_.hoverable = !1),
              (y = m);
          }
          n ||
            (s.clone(i, _),
            (_.position = i.position),
            e.push(_),
            t.addShape(_));
          var x = function () {
            n || ((i.effect.show = !1), t.delShape(_.id)),
              (_.effectAnimator = null);
          };
          if (i instanceof p) {
            for (
              var v = [0],
                b = 0,
                S = l.pointList,
                T = l.controlPointList,
                z = 1;
              z < S.length;
              z++
            ) {
              if (T) {
                var C = T[2 * (z - 1)],
                  L = T[2 * (z - 1) + 1];
                b += u.dist(S[z - 1], C) + u.dist(C, L) + u.dist(L, S[z]);
              } else b += u.dist(S[z - 1], S[z]);
              v.push(b);
            }
            for (
              var w = { p: 0 },
                E = t.animation.animate(w, { loop: a.loop }),
                z = 0;
              z < v.length;
              z++
            )
              E.when(v[z] * a.period, { p: z });
            E.during(function () {
              var e,
                i,
                o = Math.floor(w.p);
              if (o == S.length - 1) (e = S[o][0]), (i = S[o][1]);
              else {
                var s = w.p - o,
                  r = S[o],
                  a = S[o + 1];
                if (T) {
                  var l = T[2 * o],
                    d = T[2 * o + 1];
                  (e = h.cubicAt(r[0], l[0], d[0], a[0], s)),
                    (i = h.cubicAt(r[1], l[1], d[1], a[1], s));
                } else
                  (e = (a[0] - r[0]) * s + r[0]),
                    (i = (a[1] - r[1]) * s + r[1]);
              }
              (_.style.x = e), (_.style.y = i), n || t.modShape(_);
            })
              .done(x)
              .start(),
              (E.duration = b * a.period),
              (_.effectAnimator = E);
          } else {
            var M = l.xStart - y,
              A = l.yStart - y,
              k = l.xEnd - y,
              O = l.yEnd - y;
            (_.style.x = M), (_.style.y = A);
            var I = (k - M) * (k - M) + (O - A) * (O - A),
              P = Math.round(Math.sqrt(Math.round(I * a.period * a.period)));
            if (i.style.curveness > 0) {
              var R = l.cpX1 - y,
                D = l.cpY1 - y;
              _.effectAnimator = t.animation
                .animate(_, { loop: a.loop })
                .when(P, { p: 1 })
                .during(function (e, i) {
                  (_.style.x = h.quadraticAt(M, R, k, i)),
                    (_.style.y = h.quadraticAt(A, D, O, i)),
                    n || t.modShape(_);
                })
                .done(x)
                .start();
            } else
              _.effectAnimator = t.animation
                .animate(_.style, { loop: a.loop })
                .when(P, { x: k, y: O })
                .during(function () {
                  n || t.modShape(_);
                })
                .done(x)
                .start();
            _.effectAnimator.duration = P;
          }
          return _;
        }
        function n(t, e, i, n) {
          var s = new c({ style: { shapeList: [] }, zlevel: n, hoverable: !1 }),
            r = i.style.shapeList,
            a = i.effect;
          s.position = i.position;
          for (var h = 0, l = [], d = 0; d < r.length; d++) {
            r[d].effect = a;
            var p = o(t, null, r[d], n, !0),
              u = p.effectAnimator;
            s.style.shapeList.push(p),
              u.duration > h && (h = u.duration),
              0 === d &&
                ((s.style.color = p.style.color),
                (s.style.shadowBlur = p.style.shadowBlur),
                (s.style.shadowColor = p.style.shadowColor)),
              l.push(u);
          }
          e.push(s), t.addShape(s);
          var g = function () {
            for (var t = 0; t < l.length; t++) l[t].stop();
          };
          if (h) {
            s.__dummy = 0;
            var f = t
                .animate(s.id, '', a.loop)
                .when(h, { __dummy: 1 })
                .during(function () {
                  t.modShape(s);
                })
                .done(function () {
                  (i.effect.show = !1), t.delShape(s.id);
                })
                .start(),
              m = f.stop;
            f.stop = function () {
              g(), m.call(this);
            };
          }
        }
        var s = t('../util/ecData'),
          r = t('zrender/shape/Circle'),
          a = t('zrender/shape/Image'),
          h = t('zrender/tool/curve'),
          l = t('../util/shape/Icon'),
          d = t('../util/shape/Symbol'),
          c = t('zrender/shape/ShapeBundle'),
          p = t('zrender/shape/Polyline'),
          u = t('zrender/tool/vector'),
          g = t('zrender/tool/env').canvasSupported;
        return { point: e, largePoint: i, line: o, largeLine: n };
      },
    ),
    i(
      'echarts/component/base',
      [
        'require',
        '../config',
        '../util/ecData',
        '../util/ecQuery',
        '../util/number',
        'zrender/tool/util',
        'zrender/tool/env',
      ],
      function (t) {
        function e(t, e, n, s, r) {
          (this.ecTheme = t),
            (this.messageCenter = e),
            (this.zr = n),
            (this.option = s),
            (this.series = s.series),
            (this.myChart = r),
            (this.component = r.component),
            (this.shapeList = []),
            (this.effectList = []);
          var a = this;
          (a._onlegendhoverlink = function (t) {
            if (a.legendHoverLink)
              for (var e, n = t.target, s = a.shapeList.length - 1; s >= 0; s--)
                (e =
                  a.type == i.CHART_TYPE_PIE || a.type == i.CHART_TYPE_FUNNEL
                    ? o.get(a.shapeList[s], 'name')
                    : (o.get(a.shapeList[s], 'series') || {}).name),
                  e != n ||
                    a.shapeList[s].invisible ||
                    a.shapeList[s].__animating ||
                    a.zr.addHoverShape(a.shapeList[s]);
          }),
            e && e.bind(i.EVENT.LEGEND_HOVERLINK, this._onlegendhoverlink);
        }
        var i = t('../config'),
          o = t('../util/ecData'),
          n = t('../util/ecQuery'),
          s = t('../util/number'),
          r = t('zrender/tool/util');
        return (
          (e.prototype = {
            canvasSupported: t('zrender/tool/env').canvasSupported,
            _getZ: function (t) {
              if (null != this[t]) return this[t];
              var e = this.ecTheme[this.type];
              return e && null != e[t]
                ? e[t]
                : ((e = i[this.type]), e && null != e[t] ? e[t] : 0);
            },
            getZlevelBase: function () {
              return this._getZ('zlevel');
            },
            getZBase: function () {
              return this._getZ('z');
            },
            reformOption: function (t) {
              return (
                (t = r.merge(
                  r.merge(t || {}, r.clone(this.ecTheme[this.type] || {})),
                  r.clone(i[this.type] || {}),
                )),
                (this.z = t.z),
                (this.zlevel = t.zlevel),
                t
              );
            },
            reformCssArray: function (t) {
              if (!(t instanceof Array)) return [t, t, t, t];
              switch (t.length + '') {
                case '4':
                  return t;
                case '3':
                  return [t[0], t[1], t[2], t[1]];
                case '2':
                  return [t[0], t[1], t[0], t[1]];
                case '1':
                  return [t[0], t[0], t[0], t[0]];
                case '0':
                  return [0, 0, 0, 0];
              }
            },
            getShapeById: function (t) {
              for (var e = 0, i = this.shapeList.length; i > e; e++)
                if (this.shapeList[e].id === t) return this.shapeList[e];
              return null;
            },
            getFont: function (t) {
              var e = this.getTextStyle(r.clone(t));
              return (
                e.fontStyle +
                ' ' +
                e.fontWeight +
                ' ' +
                e.fontSize +
                'px ' +
                e.fontFamily
              );
            },
            getTextStyle: function (t) {
              return r.merge(
                r.merge(t || {}, this.ecTheme.textStyle),
                i.textStyle,
              );
            },
            getItemStyleColor: function (t, e, i, o) {
              return 'function' == typeof t
                ? t.call(this.myChart, {
                    seriesIndex: e,
                    series: this.series[e],
                    dataIndex: i,
                    data: o,
                  })
                : t;
            },
            getDataFromOption: function (t, e) {
              return null != t ? (null != t.value ? t.value : t) : e;
            },
            subPixelOptimize: function (t, e) {
              return (t = e % 2 === 1 ? Math.floor(t) + 0.5 : Math.round(t));
            },
            resize: function () {
              this.refresh && this.refresh(),
                this.clearEffectShape && this.clearEffectShape(!0);
              var t = this;
              setTimeout(function () {
                t.animationEffect && t.animationEffect();
              }, 200);
            },
            clear: function () {
              this.clearEffectShape && this.clearEffectShape(),
                this.zr && this.zr.delShape(this.shapeList),
                (this.shapeList = []);
            },
            dispose: function () {
              this.onbeforDispose && this.onbeforDispose(),
                this.clear(),
                (this.shapeList = null),
                (this.effectList = null),
                this.messageCenter &&
                  this.messageCenter.unbind(
                    i.EVENT.LEGEND_HOVERLINK,
                    this._onlegendhoverlink,
                  ),
                this.onafterDispose && this.onafterDispose();
            },
            query: n.query,
            deepQuery: n.deepQuery,
            deepMerge: n.deepMerge,
            parsePercent: s.parsePercent,
            parseCenter: s.parseCenter,
            parseRadius: s.parseRadius,
            numAddCommas: s.addCommas,
            getPrecision: s.getPrecision,
          }),
          e
        );
      },
    ),
    i(
      'echarts/layout/EdgeBundling',
      ['require', '../data/KDTree', 'zrender/tool/vector'],
      function (t) {
        function e(t, e) {
          (t = t.array), (e = e.array);
          var i = e[0] - t[0],
            o = e[1] - t[1],
            n = e[2] - t[2],
            s = e[3] - t[3];
          return i * i + o * o + n * n + s * s;
        }
        function i(t) {
          (this.points = [t.mp0, t.mp1]), (this.group = t);
        }
        function o(t) {
          var e = t.points;
          e[0][1] < e[1][1] || t instanceof i
            ? ((this.array = [e[0][0], e[0][1], e[1][0], e[1][1]]),
              (this._startPoint = e[0]),
              (this._endPoint = e[1]))
            : ((this.array = [e[1][0], e[1][1], e[0][0], e[0][1]]),
              (this._startPoint = e[1]),
              (this._endPoint = e[0])),
            (this.ink = d(e[0], e[1])),
            (this.edge = t),
            (this.group = null);
        }
        function n() {
          (this.edgeList = []),
            (this.mp0 = h()),
            (this.mp1 = h()),
            (this.ink = 0);
        }
        function s() {
          (this.maxNearestEdge = 6),
            (this.maxTurningAngle = Math.PI / 4),
            (this.maxIteration = 20);
        }
        var r = t('../data/KDTree'),
          a = t('zrender/tool/vector'),
          h = a.create,
          l = a.distSquare,
          d = a.dist,
          c = a.copy,
          p = a.clone;
        return (
          (o.prototype.getStartPoint = function () {
            return this._startPoint;
          }),
          (o.prototype.getEndPoint = function () {
            return this._endPoint;
          }),
          (n.prototype.addEdge = function (t) {
            (t.group = this), this.edgeList.push(t);
          }),
          (n.prototype.removeEdge = function (t) {
            (t.group = null), this.edgeList.splice(this.edgeList.indexOf(t), 1);
          }),
          (s.prototype = {
            constructor: s,
            run: function (t) {
              function e(t, e) {
                return l(t, e) < 1e-10;
              }
              function o(t, i) {
                for (var o = [], n = 0, s = 0; s < t.length; s++)
                  (n > 0 && e(t[s], o[n - 1])) || (o[n++] = p(t[s]));
                return i[0] && !e(o[0], i[0]) && (o = o.reverse()), o;
              }
              for (var n = this._iterate(t), s = 0; s++ < this.maxIteration; ) {
                for (var r = [], a = 0; a < n.groups.length; a++)
                  r.push(new i(n.groups[a]));
                var h = this._iterate(r);
                if (h.savedInk <= 0) break;
                n = h;
              }
              var d = [],
                c = function (t, e) {
                  for (var n, s = 0; s < t.length; s++) {
                    var r = t[s];
                    if (r.edgeList[0] && r.edgeList[0].edge instanceof i) {
                      for (var a = [], h = 0; h < r.edgeList.length; h++)
                        a.push(r.edgeList[h].edge.group);
                      (n = e ? e.slice() : []),
                        n.unshift(r.mp0),
                        n.push(r.mp1),
                        c(a, n);
                    } else
                      for (var h = 0; h < r.edgeList.length; h++) {
                        var l = r.edgeList[h];
                        (n = e ? e.slice() : []),
                          n.unshift(r.mp0),
                          n.push(r.mp1),
                          n.unshift(l.getStartPoint()),
                          n.push(l.getEndPoint()),
                          d.push({
                            points: o(n, l.edge.points),
                            rawEdge: l.edge,
                          });
                      }
                  }
                };
              return c(n.groups), d;
            },
            _iterate: function (t) {
              for (var i = [], s = [], a = 0, l = 0; l < t.length; l++) {
                var d = new o(t[l]);
                i.push(d);
              }
              for (
                var p = new r(i, 4),
                  u = [],
                  g = h(),
                  f = h(),
                  m = 0,
                  _ = h(),
                  y = h(),
                  x = 0,
                  l = 0;
                l < i.length;
                l++
              ) {
                var d = i[l];
                if (!d.group) {
                  p.nearestN(d, this.maxNearestEdge, e, u);
                  for (
                    var v = 0, b = null, S = null, T = 0;
                    T < u.length;
                    T++
                  ) {
                    var z = u[T],
                      C = 0;
                    z.group
                      ? z.group !== S &&
                        ((S = z.group),
                        (m = this._calculateGroupEdgeInk(z.group, d, g, f)),
                        (C = z.group.ink + d.ink - m))
                      : ((m = this._calculateEdgeEdgeInk(d, z, g, f)),
                        (C = z.ink + d.ink - m)),
                      C > v && ((v = C), (b = z), c(y, f), c(_, g), (x = m));
                  }
                  if (b) {
                    a += v;
                    var L;
                    b.group || ((L = new n()), s.push(L), L.addEdge(b)),
                      (L = b.group),
                      c(L.mp0, _),
                      c(L.mp1, y),
                      (L.ink = x),
                      b.group.addEdge(d);
                  } else {
                    var L = new n();
                    s.push(L),
                      c(L.mp0, d.getStartPoint()),
                      c(L.mp1, d.getEndPoint()),
                      (L.ink = d.ink),
                      L.addEdge(d);
                  }
                }
              }
              return { groups: s, edges: i, savedInk: a };
            },
            _calculateEdgeEdgeInk: (function () {
              var t = [],
                e = [];
              return function (i, o, n, s) {
                (t[0] = i.getStartPoint()),
                  (t[1] = o.getStartPoint()),
                  (e[0] = i.getEndPoint()),
                  (e[1] = o.getEndPoint()),
                  this._calculateMeetPoints(t, e, n, s);
                var r =
                  d(t[0], n) + d(n, s) + d(s, e[0]) + d(t[1], n) + d(s, e[1]);
                return r;
              };
            })(),
            _calculateGroupEdgeInk: function (t, e, i, o) {
              for (var n = [], s = [], r = 0; r < t.edgeList.length; r++) {
                var a = t.edgeList[r];
                n.push(a.getStartPoint()), s.push(a.getEndPoint());
              }
              n.push(e.getStartPoint()),
                s.push(e.getEndPoint()),
                this._calculateMeetPoints(n, s, i, o);
              for (var h = d(i, o), r = 0; r < n.length; r++)
                h += d(n[r], i) + d(s[r], o);
              return h;
            },
            _calculateMeetPoints: (function () {
              var t = h(),
                e = h();
              return function (i, o, n, s) {
                a.set(t, 0, 0), a.set(e, 0, 0);
                for (var r = i.length, h = 0; r > h; h++) a.add(t, t, i[h]);
                a.scale(t, t, 1 / r), (r = o.length);
                for (var h = 0; r > h; h++) a.add(e, e, o[h]);
                a.scale(e, e, 1 / r),
                  this._limitTurningAngle(i, t, e, n),
                  this._limitTurningAngle(o, e, t, s);
              };
            })(),
            _limitTurningAngle: (function () {
              var t = h(),
                e = h(),
                i = h(),
                o = h();
              return function (n, s, r, h) {
                var c = Math.cos(this.maxTurningAngle),
                  p = Math.tan(this.maxTurningAngle);
                a.sub(t, s, r), a.normalize(t, t), a.copy(h, s);
                for (var u = 0, g = 0; g < n.length; g++) {
                  var f = n[g];
                  a.sub(e, f, s);
                  var m = a.len(e);
                  a.scale(e, e, 1 / m);
                  var _ = a.dot(e, t);
                  if (c > _) {
                    a.scaleAndAdd(i, s, t, m * _);
                    var y = d(i, f),
                      x = y / p;
                    a.scaleAndAdd(o, i, t, -x);
                    var v = l(o, s);
                    v > u && ((u = v), a.copy(h, o));
                  }
                }
              };
            })(),
          }),
          s
        );
      },
    ),
    i('zrender/dep/excanvas', ['require'], function () {
      return (
        document.createElement('canvas').getContext
          ? (G_vmlCanvasManager = !1)
          : !(function () {
              function t() {
                return this.context_ || (this.context_ = new v(this));
              }
              function e(t, e) {
                var i = F.call(arguments, 2);
                return function () {
                  return t.apply(e, i.concat(F.call(arguments)));
                };
              }
              function i(t) {
                return String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
              }
              function o(t, e, i) {
                t.namespaces[e] || t.namespaces.add(e, i, '#default#VML');
              }
              function n(t) {
                if (
                  (o(t, 'g_vml_', 'urn:schemas-microsoft-com:vml'),
                  o(t, 'g_o_', 'urn:schemas-microsoft-com:office:office'),
                  !t.styleSheets.ex_canvas_)
                ) {
                  var e = t.createStyleSheet();
                  (e.owningElement.id = 'ex_canvas_'),
                    (e.cssText =
                      'canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}');
                }
              }
              function s(t) {
                var e = t.srcElement;
                switch (t.propertyName) {
                  case 'width':
                    e.getContext().clearRect(),
                      (e.style.width = e.attributes.width.nodeValue + 'px'),
                      (e.firstChild.style.width = e.clientWidth + 'px');
                    break;
                  case 'height':
                    e.getContext().clearRect(),
                      (e.style.height = e.attributes.height.nodeValue + 'px'),
                      (e.firstChild.style.height = e.clientHeight + 'px');
                }
              }
              function r(t) {
                var e = t.srcElement;
                e.firstChild &&
                  ((e.firstChild.style.width = e.clientWidth + 'px'),
                  (e.firstChild.style.height = e.clientHeight + 'px'));
              }
              function a() {
                return [
                  [1, 0, 0],
                  [0, 1, 0],
                  [0, 0, 1],
                ];
              }
              function h(t, e) {
                for (var i = a(), o = 0; 3 > o; o++)
                  for (var n = 0; 3 > n; n++) {
                    for (var s = 0, r = 0; 3 > r; r++) s += t[o][r] * e[r][n];
                    i[o][n] = s;
                  }
                return i;
              }
              function l(t, e) {
                (e.fillStyle = t.fillStyle),
                  (e.lineCap = t.lineCap),
                  (e.lineJoin = t.lineJoin),
                  (e.lineWidth = t.lineWidth),
                  (e.miterLimit = t.miterLimit),
                  (e.shadowBlur = t.shadowBlur),
                  (e.shadowColor = t.shadowColor),
                  (e.shadowOffsetX = t.shadowOffsetX),
                  (e.shadowOffsetY = t.shadowOffsetY),
                  (e.strokeStyle = t.strokeStyle),
                  (e.globalAlpha = t.globalAlpha),
                  (e.font = t.font),
                  (e.textAlign = t.textAlign),
                  (e.textBaseline = t.textBaseline),
                  (e.scaleX_ = t.scaleX_),
                  (e.scaleY_ = t.scaleY_),
                  (e.lineScale_ = t.lineScale_);
              }
              function d(t) {
                var e = t.indexOf('(', 3),
                  i = t.indexOf(')', e + 1),
                  o = t.substring(e + 1, i).split(',');
                return (4 != o.length || 'a' != t.charAt(3)) && (o[3] = 1), o;
              }
              function c(t) {
                return parseFloat(t) / 100;
              }
              function p(t, e, i) {
                return Math.min(i, Math.max(e, t));
              }
              function u(t) {
                var e, i, o, n, s, r;
                if (
                  ((n = (parseFloat(t[0]) / 360) % 360),
                  0 > n && n++,
                  (s = p(c(t[1]), 0, 1)),
                  (r = p(c(t[2]), 0, 1)),
                  0 == s)
                )
                  e = i = o = r;
                else {
                  var a = 0.5 > r ? r * (1 + s) : r + s - r * s,
                    h = 2 * r - a;
                  (e = g(h, a, n + 1 / 3)),
                    (i = g(h, a, n)),
                    (o = g(h, a, n - 1 / 3));
                }
                return (
                  '#' +
                  W[Math.floor(255 * e)] +
                  W[Math.floor(255 * i)] +
                  W[Math.floor(255 * o)]
                );
              }
              function g(t, e, i) {
                return (
                  0 > i && i++,
                  i > 1 && i--,
                  1 > 6 * i
                    ? t + 6 * (e - t) * i
                    : 1 > 2 * i
                    ? e
                    : 2 > 3 * i
                    ? t + (e - t) * (2 / 3 - i) * 6
                    : t
                );
              }
              function f(t) {
                if (t in V) return V[t];
                var e,
                  i = 1;
                if (((t = String(t)), '#' == t.charAt(0))) e = t;
                else if (/^rgb/.test(t)) {
                  for (var o, n = d(t), e = '#', s = 0; 3 > s; s++)
                    (o =
                      -1 != n[s].indexOf('%')
                        ? Math.floor(255 * c(n[s]))
                        : +n[s]),
                      (e += W[p(o, 0, 255)]);
                  i = +n[3];
                } else if (/^hsl/.test(t)) {
                  var n = d(t);
                  (e = u(n)), (i = n[3]);
                } else e = q[t] || t;
                return (V[t] = { color: e, alpha: i });
              }
              function m(t) {
                if (U[t]) return U[t];
                var e,
                  i = document.createElement('div'),
                  o = i.style;
                try {
                  (o.font = t), (e = o.fontFamily.split(',')[0]);
                } catch (n) {}
                return (U[t] = {
                  style: o.fontStyle || Z.style,
                  variant: o.fontVariant || Z.variant,
                  weight: o.fontWeight || Z.weight,
                  size: o.fontSize || Z.size,
                  family: e || Z.family,
                });
              }
              function _(t, e) {
                var i = {};
                for (var o in t) i[o] = t[o];
                var n = parseFloat(e.currentStyle.fontSize),
                  s = parseFloat(t.size);
                return (
                  (i.size =
                    'number' == typeof t.size
                      ? t.size
                      : -1 != t.size.indexOf('px')
                      ? s
                      : -1 != t.size.indexOf('em')
                      ? n * s
                      : -1 != t.size.indexOf('%')
                      ? (n / 100) * s
                      : -1 != t.size.indexOf('pt')
                      ? s / 0.75
                      : n),
                  i
                );
              }
              function y(t) {
                return (
                  t.style +
                  ' ' +
                  t.variant +
                  ' ' +
                  t.weight +
                  ' ' +
                  t.size +
                  "px '" +
                  t.family +
                  "'"
                );
              }
              function x(t) {
                return Q[t] || 'square';
              }
              function v(t) {
                (this.m_ = a()),
                  (this.mStack_ = []),
                  (this.aStack_ = []),
                  (this.currentPath_ = []),
                  (this.strokeStyle = '#000'),
                  (this.fillStyle = '#000'),
                  (this.lineWidth = 1),
                  (this.lineJoin = 'miter'),
                  (this.lineCap = 'butt'),
                  (this.miterLimit = 1 * B),
                  (this.globalAlpha = 1),
                  (this.font = '12px 微软雅黑'),
                  (this.textAlign = 'left'),
                  (this.textBaseline = 'alphabetic'),
                  (this.canvas = t);
                var e =
                    'width:' +
                    t.clientWidth +
                    'px;height:' +
                    t.clientHeight +
                    'px;overflow:hidden;position:absolute',
                  i = t.ownerDocument.createElement('div');
                (i.style.cssText = e), t.appendChild(i);
                var o = i.cloneNode(!1);
                (o.style.backgroundColor = '#fff'),
                  (o.style.filter = 'alpha(opacity=0)'),
                  t.appendChild(o),
                  (this.element_ = i),
                  (this.scaleX_ = 1),
                  (this.scaleY_ = 1),
                  (this.lineScale_ = 1);
              }
              function b(t, e, i, o) {
                t.currentPath_.push({
                  type: 'bezierCurveTo',
                  cp1x: e.x,
                  cp1y: e.y,
                  cp2x: i.x,
                  cp2y: i.y,
                  x: o.x,
                  y: o.y,
                }),
                  (t.currentX_ = o.x),
                  (t.currentY_ = o.y);
              }
              function S(t, e) {
                var i = f(t.strokeStyle),
                  o = i.color,
                  n = i.alpha * t.globalAlpha,
                  s = t.lineScale_ * t.lineWidth;
                1 > s && (n *= s),
                  e.push(
                    '<g_vml_:stroke',
                    ' opacity="',
                    n,
                    '"',
                    ' joinstyle="',
                    t.lineJoin,
                    '"',
                    ' miterlimit="',
                    t.miterLimit,
                    '"',
                    ' endcap="',
                    x(t.lineCap),
                    '"',
                    ' weight="',
                    s,
                    'px"',
                    ' color="',
                    o,
                    '" />',
                  );
              }
              function T(t, e, i, o) {
                var n = t.fillStyle,
                  s = t.scaleX_,
                  r = t.scaleY_,
                  a = o.x - i.x,
                  h = o.y - i.y;
                if (n instanceof w) {
                  var l = 0,
                    d = { x: 0, y: 0 },
                    c = 0,
                    p = 1;
                  if ('gradient' == n.type_) {
                    var u = n.x0_ / s,
                      g = n.y0_ / r,
                      m = n.x1_ / s,
                      _ = n.y1_ / r,
                      y = z(t, u, g),
                      x = z(t, m, _),
                      v = x.x - y.x,
                      b = x.y - y.y;
                    (l = (180 * Math.atan2(v, b)) / Math.PI),
                      0 > l && (l += 360),
                      1e-6 > l && (l = 0);
                  } else {
                    var y = z(t, n.x0_, n.y0_);
                    (d = { x: (y.x - i.x) / a, y: (y.y - i.y) / h }),
                      (a /= s * B),
                      (h /= r * B);
                    var S = O.max(a, h);
                    (c = (2 * n.r0_) / S), (p = (2 * n.r1_) / S - c);
                  }
                  var T = n.colors_;
                  T.sort(function (t, e) {
                    return t.offset - e.offset;
                  });
                  for (
                    var C = T.length,
                      L = T[0].color,
                      M = T[C - 1].color,
                      A = T[0].alpha * t.globalAlpha,
                      k = T[C - 1].alpha * t.globalAlpha,
                      I = [],
                      P = 0;
                    C > P;
                    P++
                  ) {
                    var R = T[P];
                    I.push(R.offset * p + c + ' ' + R.color);
                  }
                  e.push(
                    '<g_vml_:fill type="',
                    n.type_,
                    '"',
                    ' method="none" focus="100%"',
                    ' color="',
                    L,
                    '"',
                    ' color2="',
                    M,
                    '"',
                    ' colors="',
                    I.join(','),
                    '"',
                    ' opacity="',
                    k,
                    '"',
                    ' g_o_:opacity2="',
                    A,
                    '"',
                    ' angle="',
                    l,
                    '"',
                    ' focusposition="',
                    d.x,
                    ',',
                    d.y,
                    '" />',
                  );
                } else if (n instanceof E) {
                  if (a && h) {
                    var D = -i.x,
                      H = -i.y;
                    e.push(
                      '<g_vml_:fill',
                      ' position="',
                      (D / a) * s * s,
                      ',',
                      (H / h) * r * r,
                      '"',
                      ' type="tile"',
                      ' src="',
                      n.src_,
                      '" />',
                    );
                  }
                } else {
                  var N = f(t.fillStyle),
                    F = N.color,
                    Y = N.alpha * t.globalAlpha;
                  e.push('<g_vml_:fill color="', F, '" opacity="', Y, '" />');
                }
              }
              function z(t, e, i) {
                var o = t.m_;
                return {
                  x: B * (e * o[0][0] + i * o[1][0] + o[2][0]) - N,
                  y: B * (e * o[0][1] + i * o[1][1] + o[2][1]) - N,
                };
              }
              function C(t) {
                return (
                  isFinite(t[0][0]) &&
                  isFinite(t[0][1]) &&
                  isFinite(t[1][0]) &&
                  isFinite(t[1][1]) &&
                  isFinite(t[2][0]) &&
                  isFinite(t[2][1])
                );
              }
              function L(t, e, i) {
                if (
                  C(e) &&
                  ((t.m_ = e),
                  (t.scaleX_ = Math.sqrt(
                    e[0][0] * e[0][0] + e[0][1] * e[0][1],
                  )),
                  (t.scaleY_ = Math.sqrt(
                    e[1][0] * e[1][0] + e[1][1] * e[1][1],
                  )),
                  i)
                ) {
                  var o = e[0][0] * e[1][1] - e[0][1] * e[1][0];
                  t.lineScale_ = H(D(o));
                }
              }
              function w(t) {
                (this.type_ = t),
                  (this.x0_ = 0),
                  (this.y0_ = 0),
                  (this.r0_ = 0),
                  (this.x1_ = 0),
                  (this.y1_ = 0),
                  (this.r1_ = 0),
                  (this.colors_ = []);
              }
              function E(t, e) {
                switch ((A(t), e)) {
                  case 'repeat':
                  case null:
                  case '':
                    this.repetition_ = 'repeat';
                    break;
                  case 'repeat-x':
                  case 'repeat-y':
                  case 'no-repeat':
                    this.repetition_ = e;
                    break;
                  default:
                    M('SYNTAX_ERR');
                }
                (this.src_ = t.src),
                  (this.width_ = t.width),
                  (this.height_ = t.height);
              }
              function M(t) {
                throw new k(t);
              }
              function A(t) {
                (t && 1 == t.nodeType && 'IMG' == t.tagName) ||
                  M('TYPE_MISMATCH_ERR'),
                  'complete' != t.readyState && M('INVALID_STATE_ERR');
              }
              function k(t) {
                (this.code = this[t]),
                  (this.message = t + ': DOM Exception ' + this.code);
              }
              var O = Math,
                I = O.round,
                P = O.sin,
                R = O.cos,
                D = O.abs,
                H = O.sqrt,
                B = 10,
                N = B / 2,
                F =
                  (+navigator.userAgent.match(/MSIE ([\d.]+)?/)[1],
                  Array.prototype.slice);
              n(document);
              var Y = {
                init: function (t) {
                  var i = t || document;
                  i.createElement('canvas'),
                    i.attachEvent('onreadystatechange', e(this.init_, this, i));
                },
                init_: function (t) {
                  for (
                    var e = t.getElementsByTagName('canvas'), i = 0;
                    i < e.length;
                    i++
                  )
                    this.initElement(e[i]);
                },
                initElement: function (e) {
                  if (!e.getContext) {
                    (e.getContext = t),
                      n(e.ownerDocument),
                      (e.innerHTML = ''),
                      e.attachEvent('onpropertychange', s),
                      e.attachEvent('onresize', r);
                    var i = e.attributes;
                    i.width && i.width.specified
                      ? (e.style.width = i.width.nodeValue + 'px')
                      : (e.width = e.clientWidth),
                      i.height && i.height.specified
                        ? (e.style.height = i.height.nodeValue + 'px')
                        : (e.height = e.clientHeight);
                  }
                  return e;
                },
              };
              Y.init();
              for (var W = [], X = 0; 16 > X; X++)
                for (var G = 0; 16 > G; G++)
                  W[16 * X + G] = X.toString(16) + G.toString(16);
              var q = {
                  aliceblue: '#F0F8FF',
                  antiquewhite: '#FAEBD7',
                  aquamarine: '#7FFFD4',
                  azure: '#F0FFFF',
                  beige: '#F5F5DC',
                  bisque: '#FFE4C4',
                  black: '#000000',
                  blanchedalmond: '#FFEBCD',
                  blueviolet: '#8A2BE2',
                  brown: '#A52A2A',
                  burlywood: '#DEB887',
                  cadetblue: '#5F9EA0',
                  chartreuse: '#7FFF00',
                  chocolate: '#D2691E',
                  coral: '#FF7F50',
                  cornflowerblue: '#6495ED',
                  cornsilk: '#FFF8DC',
                  crimson: '#DC143C',
                  cyan: '#00FFFF',
                  darkblue: '#00008B',
                  darkcyan: '#008B8B',
                  darkgoldenrod: '#B8860B',
                  darkgray: '#A9A9A9',
                  darkgreen: '#006400',
                  darkgrey: '#A9A9A9',
                  darkkhaki: '#BDB76B',
                  darkmagenta: '#8B008B',
                  darkolivegreen: '#556B2F',
                  darkorange: '#FF8C00',
                  darkorchid: '#9932CC',
                  darkred: '#8B0000',
                  darksalmon: '#E9967A',
                  darkseagreen: '#8FBC8F',
                  darkslateblue: '#483D8B',
                  darkslategray: '#2F4F4F',
                  darkslategrey: '#2F4F4F',
                  darkturquoise: '#00CED1',
                  darkviolet: '#9400D3',
                  deeppink: '#FF1493',
                  deepskyblue: '#00BFFF',
                  dimgray: '#696969',
                  dimgrey: '#696969',
                  dodgerblue: '#1E90FF',
                  firebrick: '#B22222',
                  floralwhite: '#FFFAF0',
                  forestgreen: '#228B22',
                  gainsboro: '#DCDCDC',
                  ghostwhite: '#F8F8FF',
                  gold: '#FFD700',
                  goldenrod: '#DAA520',
                  grey: '#808080',
                  greenyellow: '#ADFF2F',
                  honeydew: '#F0FFF0',
                  hotpink: '#FF69B4',
                  indianred: '#CD5C5C',
                  indigo: '#4B0082',
                  ivory: '#FFFFF0',
                  khaki: '#F0E68C',
                  lavender: '#E6E6FA',
                  lavenderblush: '#FFF0F5',
                  lawngreen: '#7CFC00',
                  lemonchiffon: '#FFFACD',
                  lightblue: '#ADD8E6',
                  lightcoral: '#F08080',
                  lightcyan: '#E0FFFF',
                  lightgoldenrodyellow: '#FAFAD2',
                  lightgreen: '#90EE90',
                  lightgrey: '#D3D3D3',
                  lightpink: '#FFB6C1',
                  lightsalmon: '#FFA07A',
                  lightseagreen: '#20B2AA',
                  lightskyblue: '#87CEFA',
                  lightslategray: '#778899',
                  lightslategrey: '#778899',
                  lightsteelblue: '#B0C4DE',
                  lightyellow: '#FFFFE0',
                  limegreen: '#32CD32',
                  linen: '#FAF0E6',
                  magenta: '#FF00FF',
                  mediumaquamarine: '#66CDAA',
                  mediumblue: '#0000CD',
                  mediumorchid: '#BA55D3',
                  mediumpurple: '#9370DB',
                  mediumseagreen: '#3CB371',
                  mediumslateblue: '#7B68EE',
                  mediumspringgreen: '#00FA9A',
                  mediumturquoise: '#48D1CC',
                  mediumvioletred: '#C71585',
                  midnightblue: '#191970',
                  mintcream: '#F5FFFA',
                  mistyrose: '#FFE4E1',
                  moccasin: '#FFE4B5',
                  navajowhite: '#FFDEAD',
                  oldlace: '#FDF5E6',
                  olivedrab: '#6B8E23',
                  orange: '#FFA500',
                  orangered: '#FF4500',
                  orchid: '#DA70D6',
                  palegoldenrod: '#EEE8AA',
                  palegreen: '#98FB98',
                  paleturquoise: '#AFEEEE',
                  palevioletred: '#DB7093',
                  papayawhip: '#FFEFD5',
                  peachpuff: '#FFDAB9',
                  peru: '#CD853F',
                  pink: '#FFC0CB',
                  plum: '#DDA0DD',
                  powderblue: '#B0E0E6',
                  rosybrown: '#BC8F8F',
                  royalblue: '#4169E1',
                  saddlebrown: '#8B4513',
                  salmon: '#FA8072',
                  sandybrown: '#F4A460',
                  seagreen: '#2E8B57',
                  seashell: '#FFF5EE',
                  sienna: '#A0522D',
                  skyblue: '#87CEEB',
                  slateblue: '#6A5ACD',
                  slategray: '#708090',
                  slategrey: '#708090',
                  snow: '#FFFAFA',
                  springgreen: '#00FF7F',
                  steelblue: '#4682B4',
                  tan: '#D2B48C',
                  thistle: '#D8BFD8',
                  tomato: '#FF6347',
                  turquoise: '#40E0D0',
                  violet: '#EE82EE',
                  wheat: '#F5DEB3',
                  whitesmoke: '#F5F5F5',
                  yellowgreen: '#9ACD32',
                },
                V = {},
                Z = {
                  style: 'normal',
                  variant: 'normal',
                  weight: 'normal',
                  size: 12,
                  family: '微软雅黑',
                },
                U = {},
                Q = { butt: 'flat', round: 'round' },
                j = v.prototype;
              (j.clearRect = function () {
                this.textMeasureEl_ &&
                  (this.textMeasureEl_.removeNode(!0),
                  (this.textMeasureEl_ = null)),
                  (this.element_.innerHTML = '');
              }),
                (j.beginPath = function () {
                  this.currentPath_ = [];
                }),
                (j.moveTo = function (t, e) {
                  var i = z(this, t, e);
                  this.currentPath_.push({ type: 'moveTo', x: i.x, y: i.y }),
                    (this.currentX_ = i.x),
                    (this.currentY_ = i.y);
                }),
                (j.lineTo = function (t, e) {
                  var i = z(this, t, e);
                  this.currentPath_.push({ type: 'lineTo', x: i.x, y: i.y }),
                    (this.currentX_ = i.x),
                    (this.currentY_ = i.y);
                }),
                (j.bezierCurveTo = function (t, e, i, o, n, s) {
                  var r = z(this, n, s),
                    a = z(this, t, e),
                    h = z(this, i, o);
                  b(this, a, h, r);
                }),
                (j.quadraticCurveTo = function (t, e, i, o) {
                  var n = z(this, t, e),
                    s = z(this, i, o),
                    r = {
                      x: this.currentX_ + (2 / 3) * (n.x - this.currentX_),
                      y: this.currentY_ + (2 / 3) * (n.y - this.currentY_),
                    },
                    a = {
                      x: r.x + (s.x - this.currentX_) / 3,
                      y: r.y + (s.y - this.currentY_) / 3,
                    };
                  b(this, r, a, s);
                }),
                (j.arc = function (t, e, i, o, n, s) {
                  i *= B;
                  var r = s ? 'at' : 'wa',
                    a = t + R(o) * i - N,
                    h = e + P(o) * i - N,
                    l = t + R(n) * i - N,
                    d = e + P(n) * i - N;
                  a != l || s || (a += 0.125);
                  var c = z(this, t, e),
                    p = z(this, a, h),
                    u = z(this, l, d);
                  this.currentPath_.push({
                    type: r,
                    x: c.x,
                    y: c.y,
                    radius: i,
                    xStart: p.x,
                    yStart: p.y,
                    xEnd: u.x,
                    yEnd: u.y,
                  });
                }),
                (j.rect = function (t, e, i, o) {
                  this.moveTo(t, e),
                    this.lineTo(t + i, e),
                    this.lineTo(t + i, e + o),
                    this.lineTo(t, e + o),
                    this.closePath();
                }),
                (j.strokeRect = function (t, e, i, o) {
                  var n = this.currentPath_;
                  this.beginPath(),
                    this.moveTo(t, e),
                    this.lineTo(t + i, e),
                    this.lineTo(t + i, e + o),
                    this.lineTo(t, e + o),
                    this.closePath(),
                    this.stroke(),
                    (this.currentPath_ = n);
                }),
                (j.fillRect = function (t, e, i, o) {
                  var n = this.currentPath_;
                  this.beginPath(),
                    this.moveTo(t, e),
                    this.lineTo(t + i, e),
                    this.lineTo(t + i, e + o),
                    this.lineTo(t, e + o),
                    this.closePath(),
                    this.fill(),
                    (this.currentPath_ = n);
                }),
                (j.createLinearGradient = function (t, e, i, o) {
                  var n = new w('gradient');
                  return (n.x0_ = t), (n.y0_ = e), (n.x1_ = i), (n.y1_ = o), n;
                }),
                (j.createRadialGradient = function (t, e, i, o, n, s) {
                  var r = new w('gradientradial');
                  return (
                    (r.x0_ = t),
                    (r.y0_ = e),
                    (r.r0_ = i),
                    (r.x1_ = o),
                    (r.y1_ = n),
                    (r.r1_ = s),
                    r
                  );
                }),
                (j.drawImage = function (t) {
                  var e,
                    i,
                    o,
                    n,
                    s,
                    r,
                    a,
                    h,
                    l = t.runtimeStyle.width,
                    d = t.runtimeStyle.height;
                  (t.runtimeStyle.width = 'auto'),
                    (t.runtimeStyle.height = 'auto');
                  var c = t.width,
                    p = t.height;
                  if (
                    ((t.runtimeStyle.width = l),
                    (t.runtimeStyle.height = d),
                    3 == arguments.length)
                  )
                    (e = arguments[1]),
                      (i = arguments[2]),
                      (s = r = 0),
                      (a = o = c),
                      (h = n = p);
                  else if (5 == arguments.length)
                    (e = arguments[1]),
                      (i = arguments[2]),
                      (o = arguments[3]),
                      (n = arguments[4]),
                      (s = r = 0),
                      (a = c),
                      (h = p);
                  else {
                    if (9 != arguments.length)
                      throw Error('Invalid number of arguments');
                    (s = arguments[1]),
                      (r = arguments[2]),
                      (a = arguments[3]),
                      (h = arguments[4]),
                      (e = arguments[5]),
                      (i = arguments[6]),
                      (o = arguments[7]),
                      (n = arguments[8]);
                  }
                  var u = z(this, e, i),
                    g = [],
                    f = 10,
                    m = 10,
                    _ = (x = 1);
                  if (
                    (g.push(
                      ' <g_vml_:group',
                      ' coordsize="',
                      B * f,
                      ',',
                      B * m,
                      '"',
                      ' coordorigin="0,0"',
                      ' style="width:',
                      f,
                      'px;height:',
                      m,
                      'px;position:absolute;',
                    ),
                    1 != this.m_[0][0] ||
                      this.m_[0][1] ||
                      1 != this.m_[1][1] ||
                      this.m_[1][0])
                  ) {
                    var y = [],
                      _ = this.scaleX_,
                      x = this.scaleY_;
                    y.push(
                      'M11=',
                      this.m_[0][0] / _,
                      ',',
                      'M12=',
                      this.m_[1][0] / x,
                      ',',
                      'M21=',
                      this.m_[0][1] / _,
                      ',',
                      'M22=',
                      this.m_[1][1] / x,
                      ',',
                      'Dx=',
                      I(u.x / B),
                      ',',
                      'Dy=',
                      I(u.y / B),
                      '',
                    );
                    var v = u,
                      b = z(this, e + o, i),
                      S = z(this, e, i + n),
                      T = z(this, e + o, i + n);
                    (v.x = O.max(v.x, b.x, S.x, T.x)),
                      (v.y = O.max(v.y, b.y, S.y, T.y)),
                      g.push(
                        'padding:0 ',
                        I(v.x / B),
                        'px ',
                        I(v.y / B),
                        'px 0;filter:progid:DXImageTransform.Microsoft.Matrix(',
                        y.join(''),
                        ", SizingMethod='clip');",
                      );
                  } else
                    g.push('top:', I(u.y / B), 'px;left:', I(u.x / B), 'px;');
                  g.push(' ">'),
                    (s || r) &&
                      g.push(
                        '<div style="overflow: hidden; width:',
                        Math.ceil((o + (s * o) / a) * _),
                        'px;',
                        ' height:',
                        Math.ceil((n + (r * n) / h) * x),
                        'px;',
                        ' filter:progid:DxImageTransform.Microsoft.Matrix(Dx=',
                        ((-s * o) / a) * _,
                        ',Dy=',
                        ((-r * n) / h) * x,
                        ');">',
                      ),
                    g.push(
                      '<div style="width:',
                      Math.round((_ * c * o) / a),
                      'px;',
                      ' height:',
                      Math.round((x * p * n) / h),
                      'px;',
                      ' filter:',
                    ),
                    this.globalAlpha < 1 &&
                      g.push(
                        ' progid:DXImageTransform.Microsoft.Alpha(opacity=' +
                          100 * this.globalAlpha +
                          ')',
                      ),
                    g.push(
                      ' progid:DXImageTransform.Microsoft.AlphaImageLoader(src=',
                      t.src,
                      ',sizingMethod=scale)">',
                    ),
                    (s || r) && g.push('</div>'),
                    g.push('</div></div>'),
                    this.element_.insertAdjacentHTML('BeforeEnd', g.join(''));
                }),
                (j.stroke = function (t) {
                  var e = [],
                    i = 10,
                    o = 10;
                  e.push(
                    '<g_vml_:shape',
                    ' filled="',
                    !!t,
                    '"',
                    ' style="position:absolute;width:',
                    i,
                    'px;height:',
                    o,
                    'px;"',
                    ' coordorigin="0,0"',
                    ' coordsize="',
                    B * i,
                    ',',
                    B * o,
                    '"',
                    ' stroked="',
                    !t,
                    '"',
                    ' path="',
                  );
                  for (
                    var n = { x: null, y: null },
                      s = { x: null, y: null },
                      r = 0;
                    r < this.currentPath_.length;
                    r++
                  ) {
                    var a,
                      h = this.currentPath_[r];
                    switch (h.type) {
                      case 'moveTo':
                        (a = h), e.push(' m ', I(h.x), ',', I(h.y));
                        break;
                      case 'lineTo':
                        e.push(' l ', I(h.x), ',', I(h.y));
                        break;
                      case 'close':
                        e.push(' x '), (h = null);
                        break;
                      case 'bezierCurveTo':
                        e.push(
                          ' c ',
                          I(h.cp1x),
                          ',',
                          I(h.cp1y),
                          ',',
                          I(h.cp2x),
                          ',',
                          I(h.cp2y),
                          ',',
                          I(h.x),
                          ',',
                          I(h.y),
                        );
                        break;
                      case 'at':
                      case 'wa':
                        e.push(
                          ' ',
                          h.type,
                          ' ',
                          I(h.x - this.scaleX_ * h.radius),
                          ',',
                          I(h.y - this.scaleY_ * h.radius),
                          ' ',
                          I(h.x + this.scaleX_ * h.radius),
                          ',',
                          I(h.y + this.scaleY_ * h.radius),
                          ' ',
                          I(h.xStart),
                          ',',
                          I(h.yStart),
                          ' ',
                          I(h.xEnd),
                          ',',
                          I(h.yEnd),
                        );
                    }
                    h &&
                      ((null == n.x || h.x < n.x) && (n.x = h.x),
                      (null == s.x || h.x > s.x) && (s.x = h.x),
                      (null == n.y || h.y < n.y) && (n.y = h.y),
                      (null == s.y || h.y > s.y) && (s.y = h.y));
                  }
                  e.push(' ">'),
                    t ? T(this, e, n, s) : S(this, e),
                    e.push('</g_vml_:shape>'),
                    this.element_.insertAdjacentHTML('beforeEnd', e.join(''));
                }),
                (j.fill = function () {
                  this.stroke(!0);
                }),
                (j.closePath = function () {
                  this.currentPath_.push({ type: 'close' });
                }),
                (j.save = function () {
                  var t = {};
                  l(this, t),
                    this.aStack_.push(t),
                    this.mStack_.push(this.m_),
                    (this.m_ = h(a(), this.m_));
                }),
                (j.restore = function () {
                  this.aStack_.length &&
                    (l(this.aStack_.pop(), this),
                    (this.m_ = this.mStack_.pop()));
                }),
                (j.translate = function (t, e) {
                  var i = [
                    [1, 0, 0],
                    [0, 1, 0],
                    [t, e, 1],
                  ];
                  L(this, h(i, this.m_), !1);
                }),
                (j.rotate = function (t) {
                  var e = R(t),
                    i = P(t),
                    o = [
                      [e, i, 0],
                      [-i, e, 0],
                      [0, 0, 1],
                    ];
                  L(this, h(o, this.m_), !1);
                }),
                (j.scale = function (t, e) {
                  var i = [
                    [t, 0, 0],
                    [0, e, 0],
                    [0, 0, 1],
                  ];
                  L(this, h(i, this.m_), !0);
                }),
                (j.transform = function (t, e, i, o, n, s) {
                  var r = [
                    [t, e, 0],
                    [i, o, 0],
                    [n, s, 1],
                  ];
                  L(this, h(r, this.m_), !0);
                }),
                (j.setTransform = function (t, e, i, o, n, s) {
                  var r = [
                    [t, e, 0],
                    [i, o, 0],
                    [n, s, 1],
                  ];
                  L(this, r, !0);
                }),
                (j.drawText_ = function (t, e, o, n, s) {
                  var r = this.m_,
                    a = 1e3,
                    h = 0,
                    l = a,
                    d = { x: 0, y: 0 },
                    c = [],
                    p = _(m(this.font), this.element_),
                    u = y(p),
                    g = this.element_.currentStyle,
                    f = this.textAlign.toLowerCase();
                  switch (f) {
                    case 'left':
                    case 'center':
                    case 'right':
                      break;
                    case 'end':
                      f = 'ltr' == g.direction ? 'right' : 'left';
                      break;
                    case 'start':
                      f = 'rtl' == g.direction ? 'right' : 'left';
                      break;
                    default:
                      f = 'left';
                  }
                  switch (this.textBaseline) {
                    case 'hanging':
                    case 'top':
                      d.y = p.size / 1.75;
                      break;
                    case 'middle':
                      break;
                    default:
                    case null:
                    case 'alphabetic':
                    case 'ideographic':
                    case 'bottom':
                      d.y = -p.size / 2.25;
                  }
                  switch (f) {
                    case 'right':
                      (h = a), (l = 0.05);
                      break;
                    case 'center':
                      h = l = a / 2;
                  }
                  var x = z(this, e + d.x, o + d.y);
                  c.push(
                    '<g_vml_:line from="',
                    -h,
                    ' 0" to="',
                    l,
                    ' 0.05" ',
                    ' coordsize="100 100" coordorigin="0 0"',
                    ' filled="',
                    !s,
                    '" stroked="',
                    !!s,
                    '" style="position:absolute;width:1px;height:1px;">',
                  ),
                    s
                      ? S(this, c)
                      : T(this, c, { x: -h, y: 0 }, { x: l, y: p.size });
                  var v =
                      r[0][0].toFixed(3) +
                      ',' +
                      r[1][0].toFixed(3) +
                      ',' +
                      r[0][1].toFixed(3) +
                      ',' +
                      r[1][1].toFixed(3) +
                      ',0,0',
                    b = I(x.x / B) + ',' + I(x.y / B);
                  c.push(
                    '<g_vml_:skew on="t" matrix="',
                    v,
                    '" ',
                    ' offset="',
                    b,
                    '" origin="',
                    h,
                    ' 0" />',
                    '<g_vml_:path textpathok="true" />',
                    '<g_vml_:textpath on="true" string="',
                    i(t),
                    '" style="v-text-align:',
                    f,
                    ';font:',
                    i(u),
                    '" /></g_vml_:line>',
                  ),
                    this.element_.insertAdjacentHTML('beforeEnd', c.join(''));
                }),
                (j.fillText = function (t, e, i, o) {
                  this.drawText_(t, e, i, o, !1);
                }),
                (j.strokeText = function (t, e, i, o) {
                  this.drawText_(t, e, i, o, !0);
                }),
                (j.measureText = function (t) {
                  if (!this.textMeasureEl_) {
                    var e =
                      '<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>';
                    this.element_.insertAdjacentHTML('beforeEnd', e),
                      (this.textMeasureEl_ = this.element_.lastChild);
                  }
                  var i = this.element_.ownerDocument;
                  this.textMeasureEl_.innerHTML = '';
                  try {
                    this.textMeasureEl_.style.font = this.font;
                  } catch (o) {}
                  return (
                    this.textMeasureEl_.appendChild(i.createTextNode(t)),
                    { width: this.textMeasureEl_.offsetWidth }
                  );
                }),
                (j.clip = function () {}),
                (j.arcTo = function () {}),
                (j.createPattern = function (t, e) {
                  return new E(t, e);
                }),
                (w.prototype.addColorStop = function (t, e) {
                  (e = f(e)),
                    this.colors_.push({
                      offset: t,
                      color: e.color,
                      alpha: e.alpha,
                    });
                });
              var K = (k.prototype = new Error());
              (K.INDEX_SIZE_ERR = 1),
                (K.DOMSTRING_SIZE_ERR = 2),
                (K.HIERARCHY_REQUEST_ERR = 3),
                (K.WRONG_DOCUMENT_ERR = 4),
                (K.INVALID_CHARACTER_ERR = 5),
                (K.NO_DATA_ALLOWED_ERR = 6),
                (K.NO_MODIFICATION_ALLOWED_ERR = 7),
                (K.NOT_FOUND_ERR = 8),
                (K.NOT_SUPPORTED_ERR = 9),
                (K.INUSE_ATTRIBUTE_ERR = 10),
                (K.INVALID_STATE_ERR = 11),
                (K.SYNTAX_ERR = 12),
                (K.INVALID_MODIFICATION_ERR = 13),
                (K.NAMESPACE_ERR = 14),
                (K.INVALID_ACCESS_ERR = 15),
                (K.VALIDATION_ERR = 16),
                (K.TYPE_MISMATCH_ERR = 17),
                (G_vmlCanvasManager = Y),
                (CanvasRenderingContext2D = v),
                (CanvasGradient = w),
                (CanvasPattern = E),
                (DOMException = k);
            })(),
        G_vmlCanvasManager
      );
    }),
    i(
      'zrender/shape/Base',
      [
        'require',
        '../tool/matrix',
        '../tool/guid',
        '../tool/util',
        '../tool/log',
        '../mixin/Transformable',
        '../mixin/Eventful',
        '../tool/area',
        '../tool/color',
      ],
      function (t) {
        function e(e, o, n, s, r, a, h) {
          r && (e.font = r), (e.textAlign = a), (e.textBaseline = h);
          var l = i(o, n, s, r, a, h);
          o = (o + '').split('\n');
          var d = t('../tool/area').getTextHeight('国', r);
          switch (h) {
            case 'top':
              s = l.y;
              break;
            case 'bottom':
              s = l.y + d;
              break;
            default:
              s = l.y + d / 2;
          }
          for (var c = 0, p = o.length; p > c; c++)
            e.fillText(o[c], n, s), (s += d);
        }
        function i(e, i, o, n, s, r) {
          var a = t('../tool/area'),
            h = a.getTextWidth(e, n),
            l = a.getTextHeight('国', n);
          switch (((e = (e + '').split('\n')), s)) {
            case 'end':
            case 'right':
              i -= h;
              break;
            case 'center':
              i -= h / 2;
          }
          switch (r) {
            case 'top':
              break;
            case 'bottom':
              o -= l * e.length;
              break;
            default:
              o -= (l * e.length) / 2;
          }
          return { x: i, y: o, width: h, height: l * e.length };
        }
        var o = window.G_vmlCanvasManager,
          n = t('../tool/matrix'),
          s = t('../tool/guid'),
          r = t('../tool/util'),
          a = t('../tool/log'),
          h = t('../mixin/Transformable'),
          l = t('../mixin/Eventful'),
          d = function (t) {
            (t = t || {}), (this.id = t.id || s());
            for (var e in t) this[e] = t[e];
            (this.style = this.style || {}),
              (this.highlightStyle = this.highlightStyle || null),
              (this.parent = null),
              (this.__dirty = !0),
              (this.__clipShapes = []),
              h.call(this),
              l.call(this);
          };
        (d.prototype.invisible = !1),
          (d.prototype.ignore = !1),
          (d.prototype.zlevel = 0),
          (d.prototype.draggable = !1),
          (d.prototype.clickable = !1),
          (d.prototype.hoverable = !0),
          (d.prototype.z = 0),
          (d.prototype.brush = function (t, e) {
            var i = this.beforeBrush(t, e);
            switch ((t.beginPath(), this.buildPath(t, i), i.brushType)) {
              case 'both':
                t.fill();
              case 'stroke':
                i.lineWidth > 0 && t.stroke();
                break;
              default:
                t.fill();
            }
            this.drawText(t, i, this.style), this.afterBrush(t);
          }),
          (d.prototype.beforeBrush = function (t, e) {
            var i = this.style;
            return (
              this.brushTypeOnly && (i.brushType = this.brushTypeOnly),
              e &&
                (i = this.getHighlightStyle(
                  i,
                  this.highlightStyle || {},
                  this.brushTypeOnly,
                )),
              'stroke' == this.brushTypeOnly &&
                (i.strokeColor = i.strokeColor || i.color),
              t.save(),
              this.doClip(t),
              this.setContext(t, i),
              this.setTransform(t),
              i
            );
          }),
          (d.prototype.afterBrush = function (t) {
            t.restore();
          });
        var c = [
          ['color', 'fillStyle'],
          ['strokeColor', 'strokeStyle'],
          ['opacity', 'globalAlpha'],
          ['lineCap', 'lineCap'],
          ['lineJoin', 'lineJoin'],
          ['miterLimit', 'miterLimit'],
          ['lineWidth', 'lineWidth'],
          ['shadowBlur', 'shadowBlur'],
          ['shadowColor', 'shadowColor'],
          ['shadowOffsetX', 'shadowOffsetX'],
          ['shadowOffsetY', 'shadowOffsetY'],
        ];
        d.prototype.setContext = function (t, e) {
          for (var i = 0, o = c.length; o > i; i++) {
            var n = c[i][0],
              s = e[n],
              r = c[i][1];
            'undefined' != typeof s && (t[r] = s);
          }
        };
        var p = n.create();
        return (
          (d.prototype.doClip = function (t) {
            if (this.__clipShapes && !o)
              for (var e = 0; e < this.__clipShapes.length; e++) {
                var i = this.__clipShapes[e];
                if (i.needTransform) {
                  var s = i.transform;
                  n.invert(p, s),
                    t.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
                }
                if (
                  (t.beginPath(),
                  i.buildPath(t, i.style),
                  t.clip(),
                  i.needTransform)
                ) {
                  var s = p;
                  t.transform(s[0], s[1], s[2], s[3], s[4], s[5]);
                }
              }
          }),
          (d.prototype.getHighlightStyle = function (e, i, o) {
            var n = {};
            for (var s in e) n[s] = e[s];
            var r = t('../tool/color'),
              a = r.getHighlightColor();
            'stroke' != e.brushType
              ? ((n.strokeColor = a),
                (n.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom()),
                (n.brushType = 'both'))
              : 'stroke' != o
              ? ((n.strokeColor = a),
                (n.lineWidth = (e.lineWidth || 1) + this.getHighlightZoom()))
              : (n.strokeColor =
                  i.strokeColor || r.mix(e.strokeColor, r.toRGB(a)));
            for (var s in i) 'undefined' != typeof i[s] && (n[s] = i[s]);
            return n;
          }),
          (d.prototype.getHighlightZoom = function () {
            return 'text' != this.type ? 6 : 2;
          }),
          (d.prototype.drift = function (t, e) {
            (this.position[0] += t), (this.position[1] += e);
          }),
          (d.prototype.buildPath = function () {
            a('buildPath not implemented in ' + this.type);
          }),
          (d.prototype.getRect = function () {
            a('getRect not implemented in ' + this.type);
          }),
          (d.prototype.isCover = function (e, i) {
            var o = this.transformCoordToLocal(e, i);
            return (
              (e = o[0]),
              (i = o[1]),
              this.isCoverRect(e, i)
                ? t('../tool/area').isInside(this, this.style, e, i)
                : !1
            );
          }),
          (d.prototype.isCoverRect = function (t, e) {
            var i = this.style.__rect;
            return (
              i || (i = this.style.__rect = this.getRect(this.style)),
              t >= i.x && t <= i.x + i.width && e >= i.y && e <= i.y + i.height
            );
          }),
          (d.prototype.drawText = function (t, i, o) {
            if ('undefined' != typeof i.text && i.text !== !1) {
              var n = i.textColor || i.color || i.strokeColor;
              t.fillStyle = n;
              var s,
                r,
                a,
                h,
                l = 10,
                d = i.textPosition || this.textPosition || 'top';
              switch (d) {
                case 'inside':
                case 'top':
                case 'bottom':
                case 'left':
                case 'right':
                  if (this.getRect) {
                    var c = (o || i).__rect || this.getRect(o || i);
                    switch (d) {
                      case 'inside':
                        (a = c.x + c.width / 2),
                          (h = c.y + c.height / 2),
                          (s = 'center'),
                          (r = 'middle'),
                          'stroke' != i.brushType &&
                            n == i.color &&
                            (t.fillStyle = '#fff');
                        break;
                      case 'left':
                        (a = c.x - l),
                          (h = c.y + c.height / 2),
                          (s = 'end'),
                          (r = 'middle');
                        break;
                      case 'right':
                        (a = c.x + c.width + l),
                          (h = c.y + c.height / 2),
                          (s = 'start'),
                          (r = 'middle');
                        break;
                      case 'top':
                        (a = c.x + c.width / 2),
                          (h = c.y - l),
                          (s = 'center'),
                          (r = 'bottom');
                        break;
                      case 'bottom':
                        (a = c.x + c.width / 2),
                          (h = c.y + c.height + l),
                          (s = 'center'),
                          (r = 'top');
                    }
                  }
                  break;
                case 'start':
                case 'end':
                  var p = i.pointList || [
                      [i.xStart || 0, i.yStart || 0],
                      [i.xEnd || 0, i.yEnd || 0],
                    ],
                    u = p.length;
                  if (2 > u) return;
                  var g, f, m, _;
                  switch (d) {
                    case 'start':
                      (g = p[1][0]),
                        (f = p[0][0]),
                        (m = p[1][1]),
                        (_ = p[0][1]);
                      break;
                    case 'end':
                      (g = p[u - 2][0]),
                        (f = p[u - 1][0]),
                        (m = p[u - 2][1]),
                        (_ = p[u - 1][1]);
                  }
                  (a = f), (h = _);
                  var y = (Math.atan((m - _) / (f - g)) / Math.PI) * 180;
                  0 > f - g ? (y += 180) : 0 > m - _ && (y += 360),
                    (l = 5),
                    y >= 30 && 150 >= y
                      ? ((s = 'center'), (r = 'bottom'), (h -= l))
                      : y > 150 && 210 > y
                      ? ((s = 'right'), (r = 'middle'), (a -= l))
                      : y >= 210 && 330 >= y
                      ? ((s = 'center'), (r = 'top'), (h += l))
                      : ((s = 'left'), (r = 'middle'), (a += l));
                  break;
                case 'specific':
                  (a = i.textX || 0),
                    (h = i.textY || 0),
                    (s = 'start'),
                    (r = 'middle');
              }
              null != a &&
                null != h &&
                e(
                  t,
                  i.text,
                  a,
                  h,
                  i.textFont,
                  i.textAlign || s,
                  i.textBaseline || r,
                );
            }
          }),
          (d.prototype.modSelf = function () {
            (this.__dirty = !0),
              this.style && (this.style.__rect = null),
              this.highlightStyle && (this.highlightStyle.__rect = null);
          }),
          (d.prototype.isSilent = function () {
            return !(
              this.hoverable ||
              this.draggable ||
              this.clickable ||
              this.onmousemove ||
              this.onmouseover ||
              this.onmouseout ||
              this.onmousedown ||
              this.onmouseup ||
              this.onclick ||
              this.ondragenter ||
              this.ondragover ||
              this.ondragleave ||
              this.ondrop
            );
          }),
          r.merge(d.prototype, h.prototype, !0),
          r.merge(d.prototype, l.prototype, !0),
          d
        );
      },
    ),
    i('zrender/mixin/Eventful', ['require'], function () {
      var t = function () {
        this._handlers = {};
      };
      return (
        (t.prototype.one = function (t, e, i) {
          var o = this._handlers;
          return e && t
            ? (o[t] || (o[t] = []),
              o[t].push({ h: e, one: !0, ctx: i || this }),
              this)
            : this;
        }),
        (t.prototype.bind = function (t, e, i) {
          var o = this._handlers;
          return e && t
            ? (o[t] || (o[t] = []),
              o[t].push({ h: e, one: !1, ctx: i || this }),
              this)
            : this;
        }),
        (t.prototype.unbind = function (t, e) {
          var i = this._handlers;
          if (!t) return (this._handlers = {}), this;
          if (e) {
            if (i[t]) {
              for (var o = [], n = 0, s = i[t].length; s > n; n++)
                i[t][n].h != e && o.push(i[t][n]);
              i[t] = o;
            }
            i[t] && 0 === i[t].length && delete i[t];
          } else delete i[t];
          return this;
        }),
        (t.prototype.dispatch = function (t) {
          if (this._handlers[t]) {
            var e = arguments,
              i = e.length;
            i > 3 && (e = Array.prototype.slice.call(e, 1));
            for (var o = this._handlers[t], n = o.length, s = 0; n > s; ) {
              switch (i) {
                case 1:
                  o[s].h.call(o[s].ctx);
                  break;
                case 2:
                  o[s].h.call(o[s].ctx, e[1]);
                  break;
                case 3:
                  o[s].h.call(o[s].ctx, e[1], e[2]);
                  break;
                default:
                  o[s].h.apply(o[s].ctx, e);
              }
              o[s].one ? (o.splice(s, 1), n--) : s++;
            }
          }
          return this;
        }),
        (t.prototype.dispatchWithContext = function (t) {
          if (this._handlers[t]) {
            var e = arguments,
              i = e.length;
            i > 4 && (e = Array.prototype.slice.call(e, 1, e.length - 1));
            for (
              var o = e[e.length - 1],
                n = this._handlers[t],
                s = n.length,
                r = 0;
              s > r;

            ) {
              switch (i) {
                case 1:
                  n[r].h.call(o);
                  break;
                case 2:
                  n[r].h.call(o, e[1]);
                  break;
                case 3:
                  n[r].h.call(o, e[1], e[2]);
                  break;
                default:
                  n[r].h.apply(o, e);
              }
              n[r].one ? (n.splice(r, 1), s--) : r++;
            }
          }
          return this;
        }),
        t
      );
    }),
    i('zrender/tool/matrix', [], function () {
      var t = 'undefined' == typeof Float32Array ? Array : Float32Array,
        e = {
          create: function () {
            var i = new t(6);
            return e.identity(i), i;
          },
          identity: function (t) {
            return (
              (t[0] = 1),
              (t[1] = 0),
              (t[2] = 0),
              (t[3] = 1),
              (t[4] = 0),
              (t[5] = 0),
              t
            );
          },
          copy: function (t, e) {
            return (
              (t[0] = e[0]),
              (t[1] = e[1]),
              (t[2] = e[2]),
              (t[3] = e[3]),
              (t[4] = e[4]),
              (t[5] = e[5]),
              t
            );
          },
          mul: function (t, e, i) {
            return (
              (t[0] = e[0] * i[0] + e[2] * i[1]),
              (t[1] = e[1] * i[0] + e[3] * i[1]),
              (t[2] = e[0] * i[2] + e[2] * i[3]),
              (t[3] = e[1] * i[2] + e[3] * i[3]),
              (t[4] = e[0] * i[4] + e[2] * i[5] + e[4]),
              (t[5] = e[1] * i[4] + e[3] * i[5] + e[5]),
              t
            );
          },
          translate: function (t, e, i) {
            return (
              (t[0] = e[0]),
              (t[1] = e[1]),
              (t[2] = e[2]),
              (t[3] = e[3]),
              (t[4] = e[4] + i[0]),
              (t[5] = e[5] + i[1]),
              t
            );
          },
          rotate: function (t, e, i) {
            var o = e[0],
              n = e[2],
              s = e[4],
              r = e[1],
              a = e[3],
              h = e[5],
              l = Math.sin(i),
              d = Math.cos(i);
            return (
              (t[0] = o * d + r * l),
              (t[1] = -o * l + r * d),
              (t[2] = n * d + a * l),
              (t[3] = -n * l + d * a),
              (t[4] = d * s + l * h),
              (t[5] = d * h - l * s),
              t
            );
          },
          scale: function (t, e, i) {
            var o = i[0],
              n = i[1];
            return (
              (t[0] = e[0] * o),
              (t[1] = e[1] * n),
              (t[2] = e[2] * o),
              (t[3] = e[3] * n),
              (t[4] = e[4] * o),
              (t[5] = e[5] * n),
              t
            );
          },
          invert: function (t, e) {
            var i = e[0],
              o = e[2],
              n = e[4],
              s = e[1],
              r = e[3],
              a = e[5],
              h = i * r - s * o;
            return h
              ? ((h = 1 / h),
                (t[0] = r * h),
                (t[1] = -s * h),
                (t[2] = -o * h),
                (t[3] = i * h),
                (t[4] = (o * a - r * n) * h),
                (t[5] = (s * n - i * a) * h),
                t)
              : null;
          },
        };
      return e;
    }),
    i('zrender/tool/guid', [], function () {
      var t = 2311;
      return function () {
        return 'zrender__' + t++;
      };
    }),
    i('zrender/tool/log', ['require', '../config'], function (t) {
      var e = t('../config');
      return function () {
        if (0 !== e.debugMode)
          if (1 == e.debugMode)
            for (var t in arguments) throw new Error(arguments[t]);
          else if (e.debugMode > 1)
            for (var t in arguments) console.log(arguments[t]);
      };
    }),
    i(
      'zrender/mixin/Transformable',
      ['require', '../tool/matrix', '../tool/vector'],
      function (t) {
        'use strict';
        function e(t) {
          return t > -a && a > t;
        }
        function i(t) {
          return t > a || -a > t;
        }
        var o = t('../tool/matrix'),
          n = t('../tool/vector'),
          s = [0, 0],
          r = o.translate,
          a = 5e-5,
          h = function () {
            this.position || (this.position = [0, 0]),
              'undefined' == typeof this.rotation &&
                (this.rotation = [0, 0, 0]),
              this.scale || (this.scale = [1, 1, 0, 0]),
              (this.needLocalTransform = !1),
              (this.needTransform = !1);
          };
        return (
          (h.prototype = {
            constructor: h,
            updateNeedTransform: function () {
              this.needLocalTransform =
                i(this.rotation[0]) ||
                i(this.position[0]) ||
                i(this.position[1]) ||
                i(this.scale[0] - 1) ||
                i(this.scale[1] - 1);
            },
            updateTransform: function () {
              this.updateNeedTransform();
              var t = this.parent && this.parent.needTransform;
              if (
                ((this.needTransform = this.needLocalTransform || t),
                this.needTransform)
              ) {
                var e = this.transform || o.create();
                if ((o.identity(e), this.needLocalTransform)) {
                  var n = this.scale;
                  if (i(n[0]) || i(n[1])) {
                    (s[0] = -n[2] || 0), (s[1] = -n[3] || 0);
                    var a = i(s[0]) || i(s[1]);
                    a && r(e, e, s),
                      o.scale(e, e, n),
                      a && ((s[0] = -s[0]), (s[1] = -s[1]), r(e, e, s));
                  }
                  if (this.rotation instanceof Array) {
                    if (0 !== this.rotation[0]) {
                      (s[0] = -this.rotation[1] || 0),
                        (s[1] = -this.rotation[2] || 0);
                      var a = i(s[0]) || i(s[1]);
                      a && r(e, e, s),
                        o.rotate(e, e, this.rotation[0]),
                        a && ((s[0] = -s[0]), (s[1] = -s[1]), r(e, e, s));
                    }
                  } else 0 !== this.rotation && o.rotate(e, e, this.rotation);
                  (i(this.position[0]) || i(this.position[1])) &&
                    r(e, e, this.position);
                }
                t &&
                  (this.needLocalTransform
                    ? o.mul(e, this.parent.transform, e)
                    : o.copy(e, this.parent.transform)),
                  (this.transform = e),
                  (this.invTransform = this.invTransform || o.create()),
                  o.invert(this.invTransform, e);
              }
            },
            setTransform: function (t) {
              if (this.needTransform) {
                var e = this.transform;
                t.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
              }
            },
            lookAt: (function () {
              var t = n.create();
              return function (i) {
                this.transform || (this.transform = o.create());
                var s = this.transform;
                if ((n.sub(t, i, this.position), !e(t[0]) || !e(t[1]))) {
                  n.normalize(t, t);
                  var r = this.scale;
                  (s[2] = t[0] * r[1]),
                    (s[3] = t[1] * r[1]),
                    (s[0] = t[1] * r[0]),
                    (s[1] = -t[0] * r[0]),
                    (s[4] = this.position[0]),
                    (s[5] = this.position[1]),
                    this.decomposeTransform();
                }
              };
            })(),
            decomposeTransform: function () {
              if (this.transform) {
                var t = this.transform,
                  e = t[0] * t[0] + t[1] * t[1],
                  o = this.position,
                  n = this.scale,
                  s = this.rotation;
                i(e - 1) && (e = Math.sqrt(e));
                var r = t[2] * t[2] + t[3] * t[3];
                i(r - 1) && (r = Math.sqrt(r)),
                  (o[0] = t[4]),
                  (o[1] = t[5]),
                  (n[0] = e),
                  (n[1] = r),
                  (n[2] = n[3] = 0),
                  (s[0] = Math.atan2(-t[1] / r, t[0] / e)),
                  (s[1] = s[2] = 0);
              }
            },
            transformCoordToLocal: function (t, e) {
              var i = [t, e];
              return (
                this.needTransform &&
                  this.invTransform &&
                  n.applyTransform(i, i, this.invTransform),
                i
              );
            },
          }),
          h
        );
      },
    ),
    i(
      'zrender/Painter',
      [
        'require',
        './config',
        './tool/util',
        './tool/log',
        './loadingEffect/Base',
        './Layer',
        './shape/Image',
      ],
      function (t) {
        'use strict';
        function e() {
          return !1;
        }
        function i() {}
        function o(t) {
          return t
            ? t.isBuildin
              ? !0
              : 'function' != typeof t.resize || 'function' != typeof t.refresh
              ? !1
              : !0
            : !1;
        }
        var n = t('./config'),
          s = t('./tool/util'),
          r = t('./tool/log'),
          a = t('./loadingEffect/Base'),
          h = t('./Layer'),
          l = function (t, i) {
            (this.root = t),
              (t.style['-webkit-tap-highlight-color'] = 'transparent'),
              (t.style['-webkit-user-select'] = 'none'),
              (t.style['user-select'] = 'none'),
              (t.style['-webkit-touch-callout'] = 'none'),
              (this.storage = i),
              (t.innerHTML = ''),
              (this._width = this._getWidth()),
              (this._height = this._getHeight());
            var o = document.createElement('div');
            (this._domRoot = o),
              (o.style.position = 'relative'),
              (o.style.overflow = 'hidden'),
              (o.style.width = this._width + 'px'),
              (o.style.height = this._height + 'px'),
              t.appendChild(o),
              (this._layers = {}),
              (this._zlevelList = []),
              (this._layerConfig = {}),
              (this._loadingEffect = new a({})),
              (this.shapeToImage = this._createShapeToImageProcessor()),
              (this._bgDom = document.createElement('div')),
              (this._bgDom.style.cssText = [
                'position:absolute;left:0px;top:0px;width:',
                this._width,
                'px;height:',
                this._height + 'px;',
                '-webkit-user-select:none;user-select;none;',
                '-webkit-touch-callout:none;',
              ].join('')),
              this._bgDom.setAttribute('data-zr-dom-id', 'bg'),
              (this._bgDom.className = n.elementClassName),
              o.appendChild(this._bgDom),
              (this._bgDom.onselectstart = e);
            var s = new h('_zrender_hover_', this);
            (this._layers.hover = s),
              o.appendChild(s.dom),
              s.initContext(),
              (s.dom.onselectstart = e),
              (s.dom.style['-webkit-user-select'] = 'none'),
              (s.dom.style['user-select'] = 'none'),
              (s.dom.style['-webkit-touch-callout'] = 'none'),
              (this.refreshNextFrame = null);
          };
        return (
          (l.prototype.render = function (t) {
            return (
              this.isLoading() && this.hideLoading(), this.refresh(t, !0), this
            );
          }),
          (l.prototype.refresh = function (t, e) {
            var i = this.storage.getShapeList(!0);
            this._paintList(i, e);
            for (var o = 0; o < this._zlevelList.length; o++) {
              var n = this._zlevelList[o],
                s = this._layers[n];
              !s.isBuildin && s.refresh && s.refresh();
            }
            return 'function' == typeof t && t(), this;
          }),
          (l.prototype._preProcessLayer = function (t) {
            t.unusedCount++, t.updateTransform();
          }),
          (l.prototype._postProcessLayer = function (t) {
            (t.dirty = !1), 1 == t.unusedCount && t.clear();
          }),
          (l.prototype._paintList = function (t, e) {
            'undefined' == typeof e && (e = !1), this._updateLayerStatus(t);
            var i, o, s;
            this.eachBuildinLayer(this._preProcessLayer);
            for (var a = 0, h = t.length; h > a; a++) {
              var l = t[a];
              if (
                (o !== l.zlevel &&
                  (i && (i.needTransform && s.restore(), s.flush && s.flush()),
                  (o = l.zlevel),
                  (i = this.getLayer(o)),
                  i.isBuildin ||
                    r('ZLevel ' + o + ' has been used by unkown layer ' + i.id),
                  (s = i.ctx),
                  (i.unusedCount = 0),
                  (i.dirty || e) && i.clear(),
                  i.needTransform && (s.save(), i.setTransform(s))),
                (i.dirty || e) &&
                  !l.invisible &&
                  (!l.onbrush || (l.onbrush && !l.onbrush(s, !1))))
              )
                if (n.catchBrushException)
                  try {
                    l.brush(s, !1, this.refreshNextFrame);
                  } catch (d) {
                    r(d, 'brush error of ' + l.type, l);
                  }
                else l.brush(s, !1, this.refreshNextFrame);
              l.__dirty = !1;
            }
            i && (i.needTransform && s.restore(), s.flush && s.flush()),
              this.eachBuildinLayer(this._postProcessLayer);
          }),
          (l.prototype.getLayer = function (t) {
            var e = this._layers[t];
            return (
              e ||
                ((e = new h(t, this)),
                (e.isBuildin = !0),
                this._layerConfig[t] && s.merge(e, this._layerConfig[t], !0),
                e.updateTransform(),
                this.insertLayer(t, e),
                e.initContext()),
              e
            );
          }),
          (l.prototype.insertLayer = function (t, e) {
            if (this._layers[t])
              return void r('ZLevel ' + t + ' has been used already');
            if (!o(e)) return void r('Layer of zlevel ' + t + ' is not valid');
            var i = this._zlevelList.length,
              n = null,
              s = -1;
            if (i > 0 && t > this._zlevelList[0]) {
              for (
                s = 0;
                i - 1 > s &&
                !(this._zlevelList[s] < t && this._zlevelList[s + 1] > t);
                s++
              );
              n = this._layers[this._zlevelList[s]];
            }
            this._zlevelList.splice(s + 1, 0, t);
            var a = n ? n.dom : this._bgDom;
            a.nextSibling
              ? a.parentNode.insertBefore(e.dom, a.nextSibling)
              : a.parentNode.appendChild(e.dom),
              (this._layers[t] = e);
          }),
          (l.prototype.eachLayer = function (t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
              var o = this._zlevelList[i];
              t.call(e, this._layers[o], o);
            }
          }),
          (l.prototype.eachBuildinLayer = function (t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
              var o = this._zlevelList[i],
                n = this._layers[o];
              n.isBuildin && t.call(e, n, o);
            }
          }),
          (l.prototype.eachOtherLayer = function (t, e) {
            for (var i = 0; i < this._zlevelList.length; i++) {
              var o = this._zlevelList[i],
                n = this._layers[o];
              n.isBuildin || t.call(e, n, o);
            }
          }),
          (l.prototype.getLayers = function () {
            return this._layers;
          }),
          (l.prototype._updateLayerStatus = function (t) {
            var e = this._layers,
              i = {};
            this.eachBuildinLayer(function (t, e) {
              (i[e] = t.elCount), (t.elCount = 0);
            });
            for (var o = 0, n = t.length; n > o; o++) {
              var s = t[o],
                r = s.zlevel,
                a = e[r];
              if (a) {
                if ((a.elCount++, a.dirty)) continue;
                a.dirty = s.__dirty;
              }
            }
            this.eachBuildinLayer(function (t, e) {
              i[e] !== t.elCount && (t.dirty = !0);
            });
          }),
          (l.prototype.refreshShapes = function (t, e) {
            for (var i = 0, o = t.length; o > i; i++) {
              var n = t[i];
              n.modSelf();
            }
            return this.refresh(e), this;
          }),
          (l.prototype.setLoadingEffect = function (t) {
            return (this._loadingEffect = t), this;
          }),
          (l.prototype.clear = function () {
            return this.eachBuildinLayer(this._clearLayer), this;
          }),
          (l.prototype._clearLayer = function (t) {
            t.clear();
          }),
          (l.prototype.modLayer = function (t, e) {
            if (e) {
              this._layerConfig[t]
                ? s.merge(this._layerConfig[t], e, !0)
                : (this._layerConfig[t] = e);
              var i = this._layers[t];
              i && s.merge(i, this._layerConfig[t], !0);
            }
          }),
          (l.prototype.delLayer = function (t) {
            var e = this._layers[t];
            e &&
              (this.modLayer(t, {
                position: e.position,
                rotation: e.rotation,
                scale: e.scale,
              }),
              e.dom.parentNode.removeChild(e.dom),
              delete this._layers[t],
              this._zlevelList.splice(s.indexOf(this._zlevelList, t), 1));
          }),
          (l.prototype.refreshHover = function () {
            this.clearHover();
            for (
              var t = this.storage.getHoverShapes(!0), e = 0, i = t.length;
              i > e;
              e++
            )
              this._brushHover(t[e]);
            var o = this._layers.hover.ctx;
            return o.flush && o.flush(), this.storage.delHover(), this;
          }),
          (l.prototype.clearHover = function () {
            var t = this._layers.hover;
            return t && t.clear(), this;
          }),
          (l.prototype.showLoading = function (t) {
            return (
              this._loadingEffect && this._loadingEffect.stop(),
              t && this.setLoadingEffect(t),
              this._loadingEffect.start(this),
              (this.loading = !0),
              this
            );
          }),
          (l.prototype.hideLoading = function () {
            return (
              this._loadingEffect.stop(),
              this.clearHover(),
              (this.loading = !1),
              this
            );
          }),
          (l.prototype.isLoading = function () {
            return this.loading;
          }),
          (l.prototype.resize = function () {
            var t = this._domRoot;
            t.style.display = 'none';
            var e = this._getWidth(),
              i = this._getHeight();
            if (
              ((t.style.display = ''), this._width != e || i != this._height)
            ) {
              (this._width = e),
                (this._height = i),
                (t.style.width = e + 'px'),
                (t.style.height = i + 'px');
              for (var o in this._layers) this._layers[o].resize(e, i);
              this.refresh(null, !0);
            }
            return this;
          }),
          (l.prototype.clearLayer = function (t) {
            var e = this._layers[t];
            e && e.clear();
          }),
          (l.prototype.dispose = function () {
            this.isLoading() && this.hideLoading(),
              (this.root.innerHTML = ''),
              (this.root = this.storage = this._domRoot = this._layers = null);
          }),
          (l.prototype.getDomHover = function () {
            return this._layers.hover.dom;
          }),
          (l.prototype.toDataURL = function (t, e, i) {
            if (window.G_vmlCanvasManager) return null;
            var o = new h('image', this);
            this._bgDom.appendChild(o.dom), o.initContext();
            var s = o.ctx;
            (o.clearColor = e || '#fff'), o.clear();
            var a = this;
            this.storage.iterShape(
              function (t) {
                if (
                  !t.invisible &&
                  (!t.onbrush || (t.onbrush && !t.onbrush(s, !1)))
                )
                  if (n.catchBrushException)
                    try {
                      t.brush(s, !1, a.refreshNextFrame);
                    } catch (e) {
                      r(e, 'brush error of ' + t.type, t);
                    }
                  else t.brush(s, !1, a.refreshNextFrame);
              },
              { normal: 'up', update: !0 },
            );
            var l = o.dom.toDataURL(t, i);
            return (s = null), this._bgDom.removeChild(o.dom), l;
          }),
          (l.prototype.getWidth = function () {
            return this._width;
          }),
          (l.prototype.getHeight = function () {
            return this._height;
          }),
          (l.prototype._getWidth = function () {
            var t = this.root,
              e = t.currentStyle || document.defaultView.getComputedStyle(t);
            return (
              (
                (t.clientWidth || parseInt(e.width, 10)) -
                parseInt(e.paddingLeft, 10) -
                parseInt(e.paddingRight, 10)
              ).toFixed(0) - 0
            );
          }),
          (l.prototype._getHeight = function () {
            var t = this.root,
              e = t.currentStyle || document.defaultView.getComputedStyle(t);
            return (
              (
                (t.clientHeight || parseInt(e.height, 10)) -
                parseInt(e.paddingTop, 10) -
                parseInt(e.paddingBottom, 10)
              ).toFixed(0) - 0
            );
          }),
          (l.prototype._brushHover = function (t) {
            var e = this._layers.hover.ctx;
            if (!t.onbrush || (t.onbrush && !t.onbrush(e, !0))) {
              var i = this.getLayer(t.zlevel);
              if (
                (i.needTransform && (e.save(), i.setTransform(e)),
                n.catchBrushException)
              )
                try {
                  t.brush(e, !0, this.refreshNextFrame);
                } catch (o) {
                  r(o, 'hoverBrush error of ' + t.type, t);
                }
              else t.brush(e, !0, this.refreshNextFrame);
              i.needTransform && e.restore();
            }
          }),
          (l.prototype._shapeToImage = function (e, i, o, n, s) {
            var r = document.createElement('canvas'),
              a = r.getContext('2d');
            (r.style.width = o + 'px'),
              (r.style.height = n + 'px'),
              r.setAttribute('width', o * s),
              r.setAttribute('height', n * s),
              a.clearRect(0, 0, o * s, n * s);
            var h = {
              position: i.position,
              rotation: i.rotation,
              scale: i.scale,
            };
            (i.position = [0, 0, 0]),
              (i.rotation = 0),
              (i.scale = [1, 1]),
              i && i.brush(a, !1);
            var l = t('./shape/Image'),
              d = new l({ id: e, style: { x: 0, y: 0, image: r } });
            return (
              null != h.position && (d.position = i.position = h.position),
              null != h.rotation && (d.rotation = i.rotation = h.rotation),
              null != h.scale && (d.scale = i.scale = h.scale),
              d
            );
          }),
          (l.prototype._createShapeToImageProcessor = function () {
            if (window.G_vmlCanvasManager) return i;
            var t = this;
            return function (e, i, o, s) {
              return t._shapeToImage(e, i, o, s, n.devicePixelRatio);
            };
          }),
          l
        );
      },
    ),
    i('zrender/Storage', ['require', './tool/util', './Group'], function (t) {
      'use strict';
      function e(t, e) {
        return t.zlevel == e.zlevel
          ? t.z == e.z
            ? t.__renderidx - e.__renderidx
            : t.z - e.z
          : t.zlevel - e.zlevel;
      }
      var i = t('./tool/util'),
        o = t('./Group'),
        n = { hover: !1, normal: 'down', update: !1 },
        s = function () {
          (this._elements = {}),
            (this._hoverElements = []),
            (this._roots = []),
            (this._shapeList = []),
            (this._shapeListOffset = 0);
        };
      return (
        (s.prototype.iterShape = function (t, e) {
          if ((e || (e = n), e.hover))
            for (var i = 0, o = this._hoverElements.length; o > i; i++) {
              var s = this._hoverElements[i];
              if ((s.updateTransform(), t(s))) return this;
            }
          switch ((e.update && this.updateShapeList(), e.normal)) {
            case 'down':
              for (var o = this._shapeList.length; o--; )
                if (t(this._shapeList[o])) return this;
              break;
            default:
              for (var i = 0, o = this._shapeList.length; o > i; i++)
                if (t(this._shapeList[i])) return this;
          }
          return this;
        }),
        (s.prototype.getHoverShapes = function (t) {
          for (var i = [], o = 0, n = this._hoverElements.length; n > o; o++) {
            i.push(this._hoverElements[o]);
            var s = this._hoverElements[o].hoverConnect;
            if (s) {
              var r;
              s = s instanceof Array ? s : [s];
              for (var a = 0, h = s.length; h > a; a++)
                (r = s[a].id ? s[a] : this.get(s[a])), r && i.push(r);
            }
          }
          if ((i.sort(e), t))
            for (var o = 0, n = i.length; n > o; o++) i[o].updateTransform();
          return i;
        }),
        (s.prototype.getShapeList = function (t) {
          return t && this.updateShapeList(), this._shapeList;
        }),
        (s.prototype.updateShapeList = function () {
          this._shapeListOffset = 0;
          for (var t = 0, i = this._roots.length; i > t; t++) {
            var o = this._roots[t];
            this._updateAndAddShape(o);
          }
          this._shapeList.length = this._shapeListOffset;
          for (var t = 0, i = this._shapeList.length; i > t; t++)
            this._shapeList[t].__renderidx = t;
          this._shapeList.sort(e);
        }),
        (s.prototype._updateAndAddShape = function (t, e) {
          if (!t.ignore)
            if (
              (t.updateTransform(),
              t.clipShape &&
                ((t.clipShape.parent = t),
                t.clipShape.updateTransform(),
                e
                  ? ((e = e.slice()), e.push(t.clipShape))
                  : (e = [t.clipShape])),
              'group' == t.type)
            ) {
              for (var i = 0; i < t._children.length; i++) {
                var o = t._children[i];
                (o.__dirty = t.__dirty || o.__dirty),
                  this._updateAndAddShape(o, e);
              }
              t.__dirty = !1;
            } else
              (t.__clipShapes = e),
                (this._shapeList[this._shapeListOffset++] = t);
        }),
        (s.prototype.mod = function (t, e) {
          if (
            ('string' == typeof t && (t = this._elements[t]),
            t && (t.modSelf(), e))
          )
            if (e.parent || e._storage || e.__clipShapes) {
              var o = {};
              for (var n in e)
                'parent' !== n &&
                  '_storage' !== n &&
                  '__clipShapes' !== n &&
                  e.hasOwnProperty(n) &&
                  (o[n] = e[n]);
              i.merge(t, o, !0);
            } else i.merge(t, e, !0);
          return this;
        }),
        (s.prototype.drift = function (t, e, i) {
          var o = this._elements[t];
          return (
            o &&
              ((o.needTransform = !0),
              'horizontal' === o.draggable
                ? (i = 0)
                : 'vertical' === o.draggable && (e = 0),
              (!o.ondrift || (o.ondrift && !o.ondrift(e, i))) && o.drift(e, i)),
            this
          );
        }),
        (s.prototype.addHover = function (t) {
          return t.updateNeedTransform(), this._hoverElements.push(t), this;
        }),
        (s.prototype.delHover = function () {
          return (this._hoverElements = []), this;
        }),
        (s.prototype.hasHoverShape = function () {
          return this._hoverElements.length > 0;
        }),
        (s.prototype.addRoot = function (t) {
          this._elements[t.id] ||
            (t instanceof o && t.addChildrenToStorage(this),
            this.addToMap(t),
            this._roots.push(t));
        }),
        (s.prototype.delRoot = function (t) {
          if ('undefined' == typeof t) {
            for (var e = 0; e < this._roots.length; e++) {
              var n = this._roots[e];
              n instanceof o && n.delChildrenFromStorage(this);
            }
            return (
              (this._elements = {}),
              (this._hoverElements = []),
              (this._roots = []),
              (this._shapeList = []),
              void (this._shapeListOffset = 0)
            );
          }
          if (t instanceof Array)
            for (var e = 0, s = t.length; s > e; e++) this.delRoot(t[e]);
          else {
            var r;
            r = 'string' == typeof t ? this._elements[t] : t;
            var a = i.indexOf(this._roots, r);
            a >= 0 &&
              (this.delFromMap(r.id),
              this._roots.splice(a, 1),
              r instanceof o && r.delChildrenFromStorage(this));
          }
        }),
        (s.prototype.addToMap = function (t) {
          return (
            t instanceof o && (t._storage = this),
            t.modSelf(),
            (this._elements[t.id] = t),
            this
          );
        }),
        (s.prototype.get = function (t) {
          return this._elements[t];
        }),
        (s.prototype.delFromMap = function (t) {
          var e = this._elements[t];
          return (
            e &&
              (delete this._elements[t], e instanceof o && (e._storage = null)),
            this
          );
        }),
        (s.prototype.dispose = function () {
          this._elements =
            this._renderList =
            this._roots =
            this._hoverElements =
              null;
        }),
        s
      );
    }),
    i(
      'zrender/animation/Animation',
      ['require', './Clip', '../tool/color', '../tool/util', '../tool/event'],
      function (t) {
        'use strict';
        function e(t, e) {
          return t[e];
        }
        function i(t, e, i) {
          t[e] = i;
        }
        function o(t, e, i) {
          return (e - t) * i + t;
        }
        function n(t, e, i, n, s) {
          var r = t.length;
          if (1 == s) for (var a = 0; r > a; a++) n[a] = o(t[a], e[a], i);
          else
            for (var h = t[0].length, a = 0; r > a; a++)
              for (var l = 0; h > l; l++) n[a][l] = o(t[a][l], e[a][l], i);
        }
        function s(t) {
          switch (typeof t) {
            case 'undefined':
            case 'string':
              return !1;
          }
          return 'undefined' != typeof t.length;
        }
        function r(t, e, i, o, n, s, r, h, l) {
          var d = t.length;
          if (1 == l)
            for (var c = 0; d > c; c++)
              h[c] = a(t[c], e[c], i[c], o[c], n, s, r);
          else
            for (var p = t[0].length, c = 0; d > c; c++)
              for (var u = 0; p > u; u++)
                h[c][u] = a(t[c][u], e[c][u], i[c][u], o[c][u], n, s, r);
        }
        function a(t, e, i, o, n, s, r) {
          var a = 0.5 * (i - t),
            h = 0.5 * (o - e);
          return (
            (2 * (e - i) + a + h) * r +
            (-3 * (e - i) - 2 * a - h) * s +
            a * n +
            e
          );
        }
        function h(t) {
          if (s(t)) {
            var e = t.length;
            if (s(t[0])) {
              for (var i = [], o = 0; e > o; o++) i.push(f.call(t[o]));
              return i;
            }
            return f.call(t);
          }
          return t;
        }
        function l(t) {
          return (
            (t[0] = Math.floor(t[0])),
            (t[1] = Math.floor(t[1])),
            (t[2] = Math.floor(t[2])),
            'rgba(' + t.join(',') + ')'
          );
        }
        var d = t('./Clip'),
          c = t('../tool/color'),
          p = t('../tool/util'),
          u = t('../tool/event').Dispatcher,
          g =
            window.requestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (t) {
              setTimeout(t, 16);
            },
          f = Array.prototype.slice,
          m = function (t) {
            (t = t || {}),
              (this.stage = t.stage || {}),
              (this.onframe = t.onframe || function () {}),
              (this._clips = []),
              (this._running = !1),
              (this._time = 0),
              u.call(this);
          };
        (m.prototype = {
          add: function (t) {
            this._clips.push(t);
          },
          remove: function (t) {
            if (t.__inStep) t.__needsRemove = !0;
            else {
              var e = p.indexOf(this._clips, t);
              e >= 0 && this._clips.splice(e, 1);
            }
          },
          _update: function () {
            for (
              var t = new Date().getTime(),
                e = t - this._time,
                i = this._clips,
                o = i.length,
                n = [],
                s = [],
                r = 0;
              o > r;
              r++
            ) {
              var a = i[r];
              a.__inStep = !0;
              var h = a.step(t);
              (a.__inStep = !1), h && (n.push(h), s.push(a));
            }
            for (var r = 0; o > r; )
              i[r].__needsRemove ? ((i[r] = i[o - 1]), i.pop(), o--) : r++;
            o = n.length;
            for (var r = 0; o > r; r++) s[r].fire(n[r]);
            (this._time = t),
              this.onframe(e),
              this.dispatch('frame', e),
              this.stage.update && this.stage.update();
          },
          start: function () {
            function t() {
              e._running && (g(t), e._update());
            }
            var e = this;
            (this._running = !0), (this._time = new Date().getTime()), g(t);
          },
          stop: function () {
            this._running = !1;
          },
          clear: function () {
            this._clips = [];
          },
          animate: function (t, e) {
            e = e || {};
            var i = new _(t, e.loop, e.getter, e.setter);
            return (i.animation = this), i;
          },
          constructor: m,
        }),
          p.merge(m.prototype, u.prototype, !0);
        var _ = function (t, o, n, s) {
          (this._tracks = {}),
            (this._target = t),
            (this._loop = o || !1),
            (this._getter = n || e),
            (this._setter = s || i),
            (this._clipCount = 0),
            (this._delay = 0),
            (this._doneList = []),
            (this._onframeList = []),
            (this._clipList = []);
        };
        return (
          (_.prototype = {
            when: function (t, e) {
              for (var i in e)
                this._tracks[i] ||
                  ((this._tracks[i] = []),
                  0 !== t &&
                    this._tracks[i].push({
                      time: 0,
                      value: h(this._getter(this._target, i)),
                    })),
                  this._tracks[i].push({ time: parseInt(t, 10), value: e[i] });
              return this;
            },
            during: function (t) {
              return this._onframeList.push(t), this;
            },
            start: function (t) {
              var e = this,
                i = this._setter,
                h = this._getter,
                p = 'spline' === t,
                u = function () {
                  if ((e._clipCount--, 0 === e._clipCount)) {
                    e._tracks = {};
                    for (var t = e._doneList.length, i = 0; t > i; i++)
                      e._doneList[i].call(e);
                  }
                },
                g = function (g, f) {
                  var m = g.length;
                  if (m) {
                    var _ = g[0].value,
                      y = s(_),
                      x = !1,
                      v = y && s(_[0]) ? 2 : 1;
                    g.sort(function (t, e) {
                      return t.time - e.time;
                    });
                    var b;
                    if (m) {
                      b = g[m - 1].time;
                      for (var S = [], T = [], z = 0; m > z; z++) {
                        S.push(g[z].time / b);
                        var C = g[z].value;
                        'string' == typeof C &&
                          ((C = c.toArray(C)),
                          0 === C.length &&
                            ((C[0] = C[1] = C[2] = 0), (C[3] = 1)),
                          (x = !0)),
                          T.push(C);
                      }
                      var L,
                        z,
                        w,
                        E,
                        M,
                        A,
                        k,
                        O = 0,
                        I = 0;
                      if (x) var P = [0, 0, 0, 0];
                      var R = function (t, s) {
                          if (I > s) {
                            for (
                              L = Math.min(O + 1, m - 1), z = L;
                              z >= 0 && !(S[z] <= s);
                              z--
                            );
                            z = Math.min(z, m - 2);
                          } else {
                            for (z = O; m > z && !(S[z] > s); z++);
                            z = Math.min(z - 1, m - 2);
                          }
                          (O = z), (I = s);
                          var d = S[z + 1] - S[z];
                          if (0 !== d) {
                            if (((w = (s - S[z]) / d), p))
                              if (
                                ((M = T[z]),
                                (E = T[0 === z ? z : z - 1]),
                                (A = T[z > m - 2 ? m - 1 : z + 1]),
                                (k = T[z > m - 3 ? m - 1 : z + 2]),
                                y)
                              )
                                r(E, M, A, k, w, w * w, w * w * w, h(t, f), v);
                              else {
                                var c;
                                x
                                  ? ((c = r(
                                      E,
                                      M,
                                      A,
                                      k,
                                      w,
                                      w * w,
                                      w * w * w,
                                      P,
                                      1,
                                    )),
                                    (c = l(P)))
                                  : (c = a(E, M, A, k, w, w * w, w * w * w)),
                                  i(t, f, c);
                              }
                            else if (y) n(T[z], T[z + 1], w, h(t, f), v);
                            else {
                              var c;
                              x
                                ? (n(T[z], T[z + 1], w, P, 1), (c = l(P)))
                                : (c = o(T[z], T[z + 1], w)),
                                i(t, f, c);
                            }
                            for (z = 0; z < e._onframeList.length; z++)
                              e._onframeList[z](t, s);
                          }
                        },
                        D = new d({
                          target: e._target,
                          life: b,
                          loop: e._loop,
                          delay: e._delay,
                          onframe: R,
                          ondestroy: u,
                        });
                      t && 'spline' !== t && (D.easing = t),
                        e._clipList.push(D),
                        e._clipCount++,
                        e.animation.add(D);
                    }
                  }
                };
              for (var f in this._tracks) g(this._tracks[f], f);
              return this;
            },
            stop: function () {
              for (var t = 0; t < this._clipList.length; t++) {
                var e = this._clipList[t];
                this.animation.remove(e);
              }
              this._clipList = [];
            },
            delay: function (t) {
              return (this._delay = t), this;
            },
            done: function (t) {
              return t && this._doneList.push(t), this;
            },
          }),
          m
        );
      },
    ),
    i('zrender/tool/vector', [], function () {
      var t = 'undefined' == typeof Float32Array ? Array : Float32Array,
        e = {
          create: function (e, i) {
            var o = new t(2);
            return (o[0] = e || 0), (o[1] = i || 0), o;
          },
          copy: function (t, e) {
            return (t[0] = e[0]), (t[1] = e[1]), t;
          },
          clone: function (e) {
            var i = new t(2);
            return (i[0] = e[0]), (i[1] = e[1]), i;
          },
          set: function (t, e, i) {
            return (t[0] = e), (t[1] = i), t;
          },
          add: function (t, e, i) {
            return (t[0] = e[0] + i[0]), (t[1] = e[1] + i[1]), t;
          },
          scaleAndAdd: function (t, e, i, o) {
            return (t[0] = e[0] + i[0] * o), (t[1] = e[1] + i[1] * o), t;
          },
          sub: function (t, e, i) {
            return (t[0] = e[0] - i[0]), (t[1] = e[1] - i[1]), t;
          },
          len: function (t) {
            return Math.sqrt(this.lenSquare(t));
          },
          lenSquare: function (t) {
            return t[0] * t[0] + t[1] * t[1];
          },
          mul: function (t, e, i) {
            return (t[0] = e[0] * i[0]), (t[1] = e[1] * i[1]), t;
          },
          div: function (t, e, i) {
            return (t[0] = e[0] / i[0]), (t[1] = e[1] / i[1]), t;
          },
          dot: function (t, e) {
            return t[0] * e[0] + t[1] * e[1];
          },
          scale: function (t, e, i) {
            return (t[0] = e[0] * i), (t[1] = e[1] * i), t;
          },
          normalize: function (t, i) {
            var o = e.len(i);
            return (
              0 === o
                ? ((t[0] = 0), (t[1] = 0))
                : ((t[0] = i[0] / o), (t[1] = i[1] / o)),
              t
            );
          },
          distance: function (t, e) {
            return Math.sqrt(
              (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1]),
            );
          },
          distanceSquare: function (t, e) {
            return (
              (t[0] - e[0]) * (t[0] - e[0]) + (t[1] - e[1]) * (t[1] - e[1])
            );
          },
          negate: function (t, e) {
            return (t[0] = -e[0]), (t[1] = -e[1]), t;
          },
          lerp: function (t, e, i, o) {
            return (
              (t[0] = e[0] + o * (i[0] - e[0])),
              (t[1] = e[1] + o * (i[1] - e[1])),
              t
            );
          },
          applyTransform: function (t, e, i) {
            var o = e[0],
              n = e[1];
            return (
              (t[0] = i[0] * o + i[2] * n + i[4]),
              (t[1] = i[1] * o + i[3] * n + i[5]),
              t
            );
          },
          min: function (t, e, i) {
            return (
              (t[0] = Math.min(e[0], i[0])), (t[1] = Math.min(e[1], i[1])), t
            );
          },
          max: function (t, e, i) {
            return (
              (t[0] = Math.max(e[0], i[0])), (t[1] = Math.max(e[1], i[1])), t
            );
          },
        };
      return (
        (e.length = e.len),
        (e.lengthSquare = e.lenSquare),
        (e.dist = e.distance),
        (e.distSquare = e.distanceSquare),
        e
      );
    }),
    i(
      'zrender/Handler',
      [
        'require',
        './config',
        './tool/env',
        './tool/event',
        './tool/util',
        './tool/vector',
        './tool/matrix',
        './mixin/Eventful',
      ],
      function (t) {
        'use strict';
        function e(t, e) {
          return function (i, o) {
            return t.call(e, i, o);
          };
        }
        function i(t, e) {
          return function (i, o, n) {
            return t.call(e, i, o, n);
          };
        }
        function o(t) {
          for (var i = u.length; i--; ) {
            var o = u[i];
            t['_' + o + 'Handler'] = e(f[o], t);
          }
        }
        function n(t, e, i) {
          if (
            (this._draggingTarget && this._draggingTarget.id == t.id) ||
            t.isSilent()
          )
            return !1;
          var o = this._event;
          if (t.isCover(e, i)) {
            t.hoverable && this.storage.addHover(t);
            for (var n = t.parent; n; ) {
              if (
                n.clipShape &&
                !n.clipShape.isCover(this._mouseX, this._mouseY)
              )
                return !1;
              n = n.parent;
            }
            return (
              this._lastHover != t &&
                (this._processOutShape(o),
                this._processDragLeave(o),
                (this._lastHover = t),
                this._processDragEnter(o)),
              this._processOverShape(o),
              this._processDragOver(o),
              (this._hasfound = 1),
              !0
            );
          }
          return !1;
        }
        var s = t('./config'),
          r = t('./tool/env'),
          a = t('./tool/event'),
          h = t('./tool/util'),
          l = t('./tool/vector'),
          d = t('./tool/matrix'),
          c = s.EVENT,
          p = t('./mixin/Eventful'),
          u = [
            'resize',
            'click',
            'dblclick',
            'mousewheel',
            'mousemove',
            'mouseout',
            'mouseup',
            'mousedown',
            'touchstart',
            'touchend',
            'touchmove',
          ],
          g = function (t) {
            if (window.G_vmlCanvasManager) return !0;
            t = t || window.event;
            var e = t.toElement || t.relatedTarget || t.srcElement || t.target;
            return e && e.className.match(s.elementClassName);
          },
          f = {
            resize: function (t) {
              (t = t || window.event),
                (this._lastHover = null),
                (this._isMouseDown = 0),
                this.dispatch(c.RESIZE, t);
            },
            click: function (t, e) {
              if (g(t) || e) {
                t = this._zrenderEventFixed(t);
                var i = this._lastHover;
                ((i && i.clickable) || !i) &&
                  this._clickThreshold < 5 &&
                  this._dispatchAgency(i, c.CLICK, t),
                  this._mousemoveHandler(t);
              }
            },
            dblclick: function (t, e) {
              if (g(t) || e) {
                (t = t || window.event), (t = this._zrenderEventFixed(t));
                var i = this._lastHover;
                ((i && i.clickable) || !i) &&
                  this._clickThreshold < 5 &&
                  this._dispatchAgency(i, c.DBLCLICK, t),
                  this._mousemoveHandler(t);
              }
            },
            mousewheel: function (t, e) {
              if (g(t) || e) {
                t = this._zrenderEventFixed(t);
                var i = t.wheelDelta || -t.detail,
                  o = i > 0 ? 1.1 : 1 / 1.1,
                  n = !1,
                  s = this._mouseX,
                  r = this._mouseY;
                this.painter.eachBuildinLayer(function (e) {
                  var i = e.position;
                  if (e.zoomable) {
                    e.__zoom = e.__zoom || 1;
                    var h = e.__zoom;
                    (h *= o),
                      (h = Math.max(Math.min(e.maxZoom, h), e.minZoom)),
                      (o = h / e.__zoom),
                      (e.__zoom = h),
                      (i[0] -= (s - i[0]) * (o - 1)),
                      (i[1] -= (r - i[1]) * (o - 1)),
                      (e.scale[0] *= o),
                      (e.scale[1] *= o),
                      (e.dirty = !0),
                      (n = !0),
                      a.stop(t);
                  }
                }),
                  n && this.painter.refresh(),
                  this._dispatchAgency(this._lastHover, c.MOUSEWHEEL, t),
                  this._mousemoveHandler(t);
              }
            },
            mousemove: function (t, e) {
              if ((g(t) || e) && !this.painter.isLoading()) {
                (t = this._zrenderEventFixed(t)),
                  (this._lastX = this._mouseX),
                  (this._lastY = this._mouseY),
                  (this._mouseX = a.getX(t)),
                  (this._mouseY = a.getY(t));
                var i = this._mouseX - this._lastX,
                  o = this._mouseY - this._lastY;
                this._processDragStart(t),
                  (this._hasfound = 0),
                  (this._event = t),
                  this._iterateAndFindHover(),
                  this._hasfound ||
                    ((!this._draggingTarget ||
                      (this._lastHover &&
                        this._lastHover != this._draggingTarget)) &&
                      (this._processOutShape(t), this._processDragLeave(t)),
                    (this._lastHover = null),
                    this.storage.delHover(),
                    this.painter.clearHover());
                var n = 'default';
                if (this._draggingTarget)
                  this.storage.drift(this._draggingTarget.id, i, o),
                    this._draggingTarget.modSelf(),
                    this.storage.addHover(this._draggingTarget),
                    this._clickThreshold++;
                else if (this._isMouseDown) {
                  var s = !1;
                  this.painter.eachBuildinLayer(function (t) {
                    t.panable &&
                      ((n = 'move'),
                      (t.position[0] += i),
                      (t.position[1] += o),
                      (s = !0),
                      (t.dirty = !0));
                  }),
                    s && this.painter.refresh();
                }
                this._draggingTarget ||
                (this._hasfound && this._lastHover.draggable)
                  ? (n = 'move')
                  : this._hasfound &&
                    this._lastHover.clickable &&
                    (n = 'pointer'),
                  (this.root.style.cursor = n),
                  this._dispatchAgency(this._lastHover, c.MOUSEMOVE, t),
                  (this._draggingTarget ||
                    this._hasfound ||
                    this.storage.hasHoverShape()) &&
                    this.painter.refreshHover();
              }
            },
            mouseout: function (t, e) {
              if (g(t) || e) {
                t = this._zrenderEventFixed(t);
                var i = t.toElement || t.relatedTarget;
                if (i != this.root)
                  for (; i && 9 != i.nodeType; ) {
                    if (i == this.root) return void this._mousemoveHandler(t);
                    i = i.parentNode;
                  }
                (t.zrenderX = this._lastX),
                  (t.zrenderY = this._lastY),
                  (this.root.style.cursor = 'default'),
                  (this._isMouseDown = 0),
                  this._processOutShape(t),
                  this._processDrop(t),
                  this._processDragEnd(t),
                  this.painter.isLoading() || this.painter.refreshHover(),
                  this.dispatch(c.GLOBALOUT, t);
              }
            },
            mousedown: function (t, e) {
              if (g(t) || e) {
                if (((this._clickThreshold = 0), 2 == this._lastDownButton))
                  return (
                    (this._lastDownButton = t.button),
                    void (this._mouseDownTarget = null)
                  );
                (this._lastMouseDownMoment = new Date()),
                  (t = this._zrenderEventFixed(t)),
                  (this._isMouseDown = 1),
                  (this._mouseDownTarget = this._lastHover),
                  this._dispatchAgency(this._lastHover, c.MOUSEDOWN, t),
                  (this._lastDownButton = t.button);
              }
            },
            mouseup: function (t, e) {
              (g(t) || e) &&
                ((t = this._zrenderEventFixed(t)),
                (this.root.style.cursor = 'default'),
                (this._isMouseDown = 0),
                (this._mouseDownTarget = null),
                this._dispatchAgency(this._lastHover, c.MOUSEUP, t),
                this._processDrop(t),
                this._processDragEnd(t));
            },
            touchstart: function (t, e) {
              (g(t) || e) &&
                ((t = this._zrenderEventFixed(t, !0)),
                (this._lastTouchMoment = new Date()),
                this._mobileFindFixed(t),
                this._mousedownHandler(t));
            },
            touchmove: function (t, e) {
              (g(t) || e) &&
                ((t = this._zrenderEventFixed(t, !0)),
                this._mousemoveHandler(t),
                this._isDragging && a.stop(t));
            },
            touchend: function (t, e) {
              if (g(t) || e) {
                (t = this._zrenderEventFixed(t, !0)), this._mouseupHandler(t);
                var i = new Date();
                i - this._lastTouchMoment < c.touchClickDelay &&
                  (this._mobileFindFixed(t),
                  this._clickHandler(t),
                  i - this._lastClickMoment < c.touchClickDelay / 2 &&
                    (this._dblclickHandler(t),
                    this._lastHover && this._lastHover.clickable && a.stop(t)),
                  (this._lastClickMoment = i)),
                  this.painter.clearHover();
              }
            },
          },
          m = function (t, e, s) {
            p.call(this),
              (this.root = t),
              (this.storage = e),
              (this.painter = s),
              (this._lastX = this._lastY = this._mouseX = this._mouseY = 0),
              (this._findHover = i(n, this)),
              (this._domHover = s.getDomHover()),
              o(this),
              window.addEventListener
                ? (window.addEventListener('resize', this._resizeHandler),
                  r.os.tablet || r.os.phone
                    ? (t.addEventListener(
                        'touchstart',
                        this._touchstartHandler,
                      ),
                      t.addEventListener('touchmove', this._touchmoveHandler),
                      t.addEventListener('touchend', this._touchendHandler))
                    : (t.addEventListener('click', this._clickHandler),
                      t.addEventListener('dblclick', this._dblclickHandler),
                      t.addEventListener('mousewheel', this._mousewheelHandler),
                      t.addEventListener('mousemove', this._mousemoveHandler),
                      t.addEventListener('mousedown', this._mousedownHandler),
                      t.addEventListener('mouseup', this._mouseupHandler)),
                  t.addEventListener('DOMMouseScroll', this._mousewheelHandler),
                  t.addEventListener('mouseout', this._mouseoutHandler))
                : (window.attachEvent('onresize', this._resizeHandler),
                  t.attachEvent('onclick', this._clickHandler),
                  (t.ondblclick = this._dblclickHandler),
                  t.attachEvent('onmousewheel', this._mousewheelHandler),
                  t.attachEvent('onmousemove', this._mousemoveHandler),
                  t.attachEvent('onmouseout', this._mouseoutHandler),
                  t.attachEvent('onmousedown', this._mousedownHandler),
                  t.attachEvent('onmouseup', this._mouseupHandler));
          };
        (m.prototype.on = function (t, e, i) {
          return this.bind(t, e, i), this;
        }),
          (m.prototype.un = function (t, e) {
            return this.unbind(t, e), this;
          }),
          (m.prototype.trigger = function (t, e) {
            switch (t) {
              case c.RESIZE:
              case c.CLICK:
              case c.DBLCLICK:
              case c.MOUSEWHEEL:
              case c.MOUSEMOVE:
              case c.MOUSEDOWN:
              case c.MOUSEUP:
              case c.MOUSEOUT:
                this['_' + t + 'Handler'](e, !0);
            }
          }),
          (m.prototype.dispose = function () {
            var t = this.root;
            window.removeEventListener
              ? (window.removeEventListener('resize', this._resizeHandler),
                r.os.tablet || r.os.phone
                  ? (t.removeEventListener(
                      'touchstart',
                      this._touchstartHandler,
                    ),
                    t.removeEventListener('touchmove', this._touchmoveHandler),
                    t.removeEventListener('touchend', this._touchendHandler))
                  : (t.removeEventListener('click', this._clickHandler),
                    t.removeEventListener('dblclick', this._dblclickHandler),
                    t.removeEventListener(
                      'mousewheel',
                      this._mousewheelHandler,
                    ),
                    t.removeEventListener('mousemove', this._mousemoveHandler),
                    t.removeEventListener('mousedown', this._mousedownHandler),
                    t.removeEventListener('mouseup', this._mouseupHandler)),
                t.removeEventListener(
                  'DOMMouseScroll',
                  this._mousewheelHandler,
                ),
                t.removeEventListener('mouseout', this._mouseoutHandler))
              : (window.detachEvent('onresize', this._resizeHandler),
                t.detachEvent('onclick', this._clickHandler),
                t.detachEvent('dblclick', this._dblclickHandler),
                t.detachEvent('onmousewheel', this._mousewheelHandler),
                t.detachEvent('onmousemove', this._mousemoveHandler),
                t.detachEvent('onmouseout', this._mouseoutHandler),
                t.detachEvent('onmousedown', this._mousedownHandler),
                t.detachEvent('onmouseup', this._mouseupHandler)),
              (this.root = this._domHover = this.storage = this.painter = null),
              this.un();
          }),
          (m.prototype._processDragStart = function (t) {
            var e = this._lastHover;
            if (
              this._isMouseDown &&
              e &&
              e.draggable &&
              !this._draggingTarget &&
              this._mouseDownTarget == e
            ) {
              if (
                e.dragEnableTime &&
                new Date() - this._lastMouseDownMoment < e.dragEnableTime
              )
                return;
              var i = e;
              (this._draggingTarget = i),
                (this._isDragging = 1),
                (i.invisible = !0),
                this.storage.mod(i.id),
                this._dispatchAgency(i, c.DRAGSTART, t),
                this.painter.refresh();
            }
          }),
          (m.prototype._processDragEnter = function (t) {
            this._draggingTarget &&
              this._dispatchAgency(
                this._lastHover,
                c.DRAGENTER,
                t,
                this._draggingTarget,
              );
          }),
          (m.prototype._processDragOver = function (t) {
            this._draggingTarget &&
              this._dispatchAgency(
                this._lastHover,
                c.DRAGOVER,
                t,
                this._draggingTarget,
              );
          }),
          (m.prototype._processDragLeave = function (t) {
            this._draggingTarget &&
              this._dispatchAgency(
                this._lastHover,
                c.DRAGLEAVE,
                t,
                this._draggingTarget,
              );
          }),
          (m.prototype._processDrop = function (t) {
            this._draggingTarget &&
              ((this._draggingTarget.invisible = !1),
              this.storage.mod(this._draggingTarget.id),
              this.painter.refresh(),
              this._dispatchAgency(
                this._lastHover,
                c.DROP,
                t,
                this._draggingTarget,
              ));
          }),
          (m.prototype._processDragEnd = function (t) {
            this._draggingTarget &&
              (this._dispatchAgency(this._draggingTarget, c.DRAGEND, t),
              (this._lastHover = null)),
              (this._isDragging = 0),
              (this._draggingTarget = null);
          }),
          (m.prototype._processOverShape = function (t) {
            this._dispatchAgency(this._lastHover, c.MOUSEOVER, t);
          }),
          (m.prototype._processOutShape = function (t) {
            this._dispatchAgency(this._lastHover, c.MOUSEOUT, t);
          }),
          (m.prototype._dispatchAgency = function (t, e, i, o) {
            var n = 'on' + e,
              s = { type: e, event: i, target: t, cancelBubble: !1 },
              r = t;
            for (
              o && (s.dragged = o);
              r &&
              (r[n] && (s.cancelBubble = r[n](s)),
              r.dispatch(e, s),
              (r = r.parent),
              !s.cancelBubble);

            );
            if (t) s.cancelBubble || this.dispatch(e, s);
            else if (!o) {
              var a = { type: e, event: i };
              this.dispatch(e, a),
                this.painter.eachOtherLayer(function (t) {
                  'function' == typeof t[n] && t[n](a),
                    t.dispatch && t.dispatch(e, a);
                });
            }
          }),
          (m.prototype._iterateAndFindHover = (function () {
            var t = d.create();
            return function () {
              for (
                var e,
                  i,
                  o = this.storage.getShapeList(),
                  n = [0, 0],
                  s = o.length - 1;
                s >= 0;
                s--
              ) {
                var r = o[s];
                if (
                  (e !== r.zlevel &&
                    ((i = this.painter.getLayer(r.zlevel, i)),
                    (n[0] = this._mouseX),
                    (n[1] = this._mouseY),
                    i.needTransform &&
                      (d.invert(t, i.transform), l.applyTransform(n, n, t))),
                  this._findHover(r, n[0], n[1]))
                )
                  break;
              }
            };
          })());
        var _ = [{ x: 10 }, { x: -20 }, { x: 10, y: 10 }, { y: -20 }];
        return (
          (m.prototype._mobileFindFixed = function (t) {
            (this._lastHover = null),
              (this._mouseX = t.zrenderX),
              (this._mouseY = t.zrenderY),
              (this._event = t),
              this._iterateAndFindHover();
            for (var e = 0; !this._lastHover && e < _.length; e++) {
              var i = _[e];
              i.x && (this._mouseX += i.x),
                i.y && (this._mouseY += i.y),
                this._iterateAndFindHover();
            }
            this._lastHover &&
              ((t.zrenderX = this._mouseX), (t.zrenderY = this._mouseY));
          }),
          (m.prototype._zrenderEventFixed = function (t, e) {
            if (t.zrenderFixed) return t;
            if (e) {
              var i =
                'touchend' != t.type ? t.targetTouches[0] : t.changedTouches[0];
              if (i) {
                var o = this.painter._domRoot.getBoundingClientRect();
                (t.zrenderX = i.clientX - o.left),
                  (t.zrenderY = i.clientY - o.top);
              }
            } else {
              t = t || window.event;
              var n =
                t.toElement || t.relatedTarget || t.srcElement || t.target;
              n &&
                n != this._domHover &&
                ((t.zrenderX =
                  ('undefined' != typeof t.offsetX ? t.offsetX : t.layerX) +
                  n.offsetLeft),
                (t.zrenderY =
                  ('undefined' != typeof t.offsetY ? t.offsetY : t.layerY) +
                  n.offsetTop));
            }
            return (t.zrenderFixed = 1), t;
          }),
          h.merge(m.prototype, p.prototype, !0),
          m
        );
      },
    ),
    i('zrender/tool/curve', ['require', './vector'], function (t) {
      function e(t) {
        return t > -m && m > t;
      }
      function i(t) {
        return t > m || -m > t;
      }
      function o(t, e, i, o, n) {
        var s = 1 - n;
        return s * s * (s * t + 3 * n * e) + n * n * (n * o + 3 * s * i);
      }
      function n(t, e, i, o, n) {
        var s = 1 - n;
        return 3 * (((e - t) * s + 2 * (i - e) * n) * s + (o - i) * n * n);
      }
      function s(t, i, o, n, s, r) {
        var a = n + 3 * (i - o) - t,
          h = 3 * (o - 2 * i + t),
          l = 3 * (i - t),
          d = t - s,
          c = h * h - 3 * a * l,
          p = h * l - 9 * a * d,
          u = l * l - 3 * h * d,
          g = 0;
        if (e(c) && e(p))
          if (e(h)) r[0] = 0;
          else {
            var f = -l / h;
            f >= 0 && 1 >= f && (r[g++] = f);
          }
        else {
          var m = p * p - 4 * c * u;
          if (e(m)) {
            var x = p / c,
              f = -h / a + x,
              v = -x / 2;
            f >= 0 && 1 >= f && (r[g++] = f), v >= 0 && 1 >= v && (r[g++] = v);
          } else if (m > 0) {
            var b = Math.sqrt(m),
              S = c * h + 1.5 * a * (-p + b),
              T = c * h + 1.5 * a * (-p - b);
            (S = 0 > S ? -Math.pow(-S, y) : Math.pow(S, y)),
              (T = 0 > T ? -Math.pow(-T, y) : Math.pow(T, y));
            var f = (-h - (S + T)) / (3 * a);
            f >= 0 && 1 >= f && (r[g++] = f);
          } else {
            var z = (2 * c * h - 3 * a * p) / (2 * Math.sqrt(c * c * c)),
              C = Math.acos(z) / 3,
              L = Math.sqrt(c),
              w = Math.cos(C),
              f = (-h - 2 * L * w) / (3 * a),
              v = (-h + L * (w + _ * Math.sin(C))) / (3 * a),
              E = (-h + L * (w - _ * Math.sin(C))) / (3 * a);
            f >= 0 && 1 >= f && (r[g++] = f),
              v >= 0 && 1 >= v && (r[g++] = v),
              E >= 0 && 1 >= E && (r[g++] = E);
          }
        }
        return g;
      }
      function r(t, o, n, s, r) {
        var a = 6 * n - 12 * o + 6 * t,
          h = 9 * o + 3 * s - 3 * t - 9 * n,
          l = 3 * o - 3 * t,
          d = 0;
        if (e(h)) {
          if (i(a)) {
            var c = -l / a;
            c >= 0 && 1 >= c && (r[d++] = c);
          }
        } else {
          var p = a * a - 4 * h * l;
          if (e(p)) r[0] = -a / (2 * h);
          else if (p > 0) {
            var u = Math.sqrt(p),
              c = (-a + u) / (2 * h),
              g = (-a - u) / (2 * h);
            c >= 0 && 1 >= c && (r[d++] = c), g >= 0 && 1 >= g && (r[d++] = g);
          }
        }
        return d;
      }
      function a(t, e, i, o, n, s) {
        var r = (e - t) * n + t,
          a = (i - e) * n + e,
          h = (o - i) * n + i,
          l = (a - r) * n + r,
          d = (h - a) * n + a,
          c = (d - l) * n + l;
        (s[0] = t),
          (s[1] = r),
          (s[2] = l),
          (s[3] = c),
          (s[4] = c),
          (s[5] = d),
          (s[6] = h),
          (s[7] = o);
      }
      function h(t, e, i, n, s, r, a, h, l, d, c) {
        var p,
          u = 0.005,
          g = 1 / 0;
        (x[0] = l), (x[1] = d);
        for (var _ = 0; 1 > _; _ += 0.05) {
          (v[0] = o(t, i, s, a, _)), (v[1] = o(e, n, r, h, _));
          var y = f.distSquare(x, v);
          g > y && ((p = _), (g = y));
        }
        g = 1 / 0;
        for (var S = 0; 32 > S && !(m > u); S++) {
          var T = p - u,
            z = p + u;
          (v[0] = o(t, i, s, a, T)), (v[1] = o(e, n, r, h, T));
          var y = f.distSquare(v, x);
          if (T >= 0 && g > y) (p = T), (g = y);
          else {
            (b[0] = o(t, i, s, a, z)), (b[1] = o(e, n, r, h, z));
            var C = f.distSquare(b, x);
            1 >= z && g > C ? ((p = z), (g = C)) : (u *= 0.5);
          }
        }
        return (
          c && ((c[0] = o(t, i, s, a, p)), (c[1] = o(e, n, r, h, p))),
          Math.sqrt(g)
        );
      }
      function l(t, e, i, o) {
        var n = 1 - o;
        return n * (n * t + 2 * o * e) + o * o * i;
      }
      function d(t, e, i, o) {
        return 2 * ((1 - o) * (e - t) + o * (i - e));
      }
      function c(t, o, n, s, r) {
        var a = t - 2 * o + n,
          h = 2 * (o - t),
          l = t - s,
          d = 0;
        if (e(a)) {
          if (i(h)) {
            var c = -l / h;
            c >= 0 && 1 >= c && (r[d++] = c);
          }
        } else {
          var p = h * h - 4 * a * l;
          if (e(p)) {
            var c = -h / (2 * a);
            c >= 0 && 1 >= c && (r[d++] = c);
          } else if (p > 0) {
            var u = Math.sqrt(p),
              c = (-h + u) / (2 * a),
              g = (-h - u) / (2 * a);
            c >= 0 && 1 >= c && (r[d++] = c), g >= 0 && 1 >= g && (r[d++] = g);
          }
        }
        return d;
      }
      function p(t, e, i) {
        var o = t + i - 2 * e;
        return 0 === o ? 0.5 : (t - e) / o;
      }
      function u(t, e, i, o, n) {
        var s = (e - t) * o + t,
          r = (i - e) * o + e,
          a = (r - s) * o + s;
        (n[0] = t), (n[1] = s), (n[2] = a), (n[3] = a), (n[4] = r), (n[5] = i);
      }
      function g(t, e, i, o, n, s, r, a, h) {
        var d,
          c = 0.005,
          p = 1 / 0;
        (x[0] = r), (x[1] = a);
        for (var u = 0; 1 > u; u += 0.05) {
          (v[0] = l(t, i, n, u)), (v[1] = l(e, o, s, u));
          var g = f.distSquare(x, v);
          p > g && ((d = u), (p = g));
        }
        p = 1 / 0;
        for (var _ = 0; 32 > _ && !(m > c); _++) {
          var y = d - c,
            S = d + c;
          (v[0] = l(t, i, n, y)), (v[1] = l(e, o, s, y));
          var g = f.distSquare(v, x);
          if (y >= 0 && p > g) (d = y), (p = g);
          else {
            (b[0] = l(t, i, n, S)), (b[1] = l(e, o, s, S));
            var T = f.distSquare(b, x);
            1 >= S && p > T ? ((d = S), (p = T)) : (c *= 0.5);
          }
        }
        return (
          h && ((h[0] = l(t, i, n, d)), (h[1] = l(e, o, s, d))), Math.sqrt(p)
        );
      }
      var f = t('./vector'),
        m = 1e-4,
        _ = Math.sqrt(3),
        y = 1 / 3,
        x = f.create(),
        v = f.create(),
        b = f.create();
      return {
        cubicAt: o,
        cubicDerivativeAt: n,
        cubicRootAt: s,
        cubicExtrema: r,
        cubicSubdivide: a,
        cubicProjectPoint: h,
        quadraticAt: l,
        quadraticDerivativeAt: d,
        quadraticRootAt: c,
        quadraticExtremum: p,
        quadraticSubdivide: u,
        quadraticProjectPoint: g,
      };
    }),
    i(
      'zrender/loadingEffect/Base',
      ['require', '../tool/util', '../shape/Text', '../shape/Rectangle'],
      function (t) {
        function e(t) {
          this.setOptions(t);
        }
        var i = t('../tool/util'),
          o = t('../shape/Text'),
          n = t('../shape/Rectangle'),
          s = 'Loading...',
          r = 'normal 16px Arial';
        return (
          (e.prototype.createTextShape = function (t) {
            return new o({
              highlightStyle: i.merge(
                {
                  x: this.canvasWidth / 2,
                  y: this.canvasHeight / 2,
                  text: s,
                  textAlign: 'center',
                  textBaseline: 'middle',
                  textFont: r,
                  color: '#333',
                  brushType: 'fill',
                },
                t,
                !0,
              ),
            });
          }),
          (e.prototype.createBackgroundShape = function (t) {
            return new n({
              highlightStyle: {
                x: 0,
                y: 0,
                width: this.canvasWidth,
                height: this.canvasHeight,
                brushType: 'fill',
                color: t,
              },
            });
          }),
          (e.prototype.start = function (t) {
            function e(e) {
              t.storage.addHover(e);
            }
            function i() {
              t.refreshHover();
            }
            (this.canvasWidth = t._width),
              (this.canvasHeight = t._height),
              (this.loadingTimer = this._start(e, i));
          }),
          (e.prototype._start = function () {
            return setInterval(function () {}, 1e4);
          }),
          (e.prototype.stop = function () {
            clearInterval(this.loadingTimer);
          }),
          (e.prototype.setOptions = function (t) {
            this.options = t || {};
          }),
          (e.prototype.adjust = function (t, e) {
            return t <= e[0] ? (t = e[0]) : t >= e[1] && (t = e[1]), t;
          }),
          (e.prototype.getLocation = function (t, e, i) {
            var o = null != t.x ? t.x : 'center';
            switch (o) {
              case 'center':
                o = Math.floor((this.canvasWidth - e) / 2);
                break;
              case 'left':
                o = 0;
                break;
              case 'right':
                o = this.canvasWidth - e;
            }
            var n = null != t.y ? t.y : 'center';
            switch (n) {
              case 'center':
                n = Math.floor((this.canvasHeight - i) / 2);
                break;
              case 'top':
                n = 0;
                break;
              case 'bottom':
                n = this.canvasHeight - i;
            }
            return { x: o, y: n, width: e, height: i };
          }),
          e
        );
      },
    ),
    i(
      'zrender/Layer',
      ['require', './mixin/Transformable', './tool/util', './config'],
      function (t) {
        function e() {
          return !1;
        }
        function i(t, e, i) {
          var o = document.createElement(e),
            n = i.getWidth(),
            s = i.getHeight();
          return (
            (o.style.position = 'absolute'),
            (o.style.left = 0),
            (o.style.top = 0),
            (o.style.width = n + 'px'),
            (o.style.height = s + 'px'),
            (o.width = n * r.devicePixelRatio),
            (o.height = s * r.devicePixelRatio),
            o.setAttribute('data-zr-dom-id', t),
            o
          );
        }
        var o = t('./mixin/Transformable'),
          n = t('./tool/util'),
          s = window.G_vmlCanvasManager,
          r = t('./config'),
          a = function (t, n) {
            (this.id = t),
              (this.dom = i(t, 'canvas', n)),
              (this.dom.onselectstart = e),
              (this.dom.style['-webkit-user-select'] = 'none'),
              (this.dom.style['user-select'] = 'none'),
              (this.dom.style['-webkit-touch-callout'] = 'none'),
              (this.dom.style['-webkit-tap-highlight-color'] = 'rgba(0,0,0,0)'),
              (this.dom.className = r.elementClassName),
              s && s.initElement(this.dom),
              (this.domBack = null),
              (this.ctxBack = null),
              (this.painter = n),
              (this.unusedCount = 0),
              (this.config = null),
              (this.dirty = !0),
              (this.elCount = 0),
              (this.clearColor = 0),
              (this.motionBlur = !1),
              (this.lastFrameAlpha = 0.7),
              (this.zoomable = !1),
              (this.panable = !1),
              (this.maxZoom = 1 / 0),
              (this.minZoom = 0),
              o.call(this);
          };
        return (
          (a.prototype.initContext = function () {
            this.ctx = this.dom.getContext('2d');
            var t = r.devicePixelRatio;
            1 != t && this.ctx.scale(t, t);
          }),
          (a.prototype.createBackBuffer = function () {
            if (!s) {
              (this.domBack = i('back-' + this.id, 'canvas', this.painter)),
                (this.ctxBack = this.domBack.getContext('2d'));
              var t = r.devicePixelRatio;
              1 != t && this.ctxBack.scale(t, t);
            }
          }),
          (a.prototype.resize = function (t, e) {
            var i = r.devicePixelRatio;
            (this.dom.style.width = t + 'px'),
              (this.dom.style.height = e + 'px'),
              this.dom.setAttribute('width', t * i),
              this.dom.setAttribute('height', e * i),
              1 != i && this.ctx.scale(i, i),
              this.domBack &&
                (this.domBack.setAttribute('width', t * i),
                this.domBack.setAttribute('height', e * i),
                1 != i && this.ctxBack.scale(i, i));
          }),
          (a.prototype.clear = function () {
            var t = this.dom,
              e = this.ctx,
              i = t.width,
              o = t.height,
              n = this.clearColor && !s,
              a = this.motionBlur && !s,
              h = this.lastFrameAlpha,
              l = r.devicePixelRatio;
            if (
              (a &&
                (this.domBack || this.createBackBuffer(),
                (this.ctxBack.globalCompositeOperation = 'copy'),
                this.ctxBack.drawImage(t, 0, 0, i / l, o / l)),
              e.clearRect(0, 0, i / l, o / l),
              n &&
                (e.save(),
                (e.fillStyle = this.clearColor),
                e.fillRect(0, 0, i / l, o / l),
                e.restore()),
              a)
            ) {
              var d = this.domBack;
              e.save(),
                (e.globalAlpha = h),
                e.drawImage(d, 0, 0, i / l, o / l),
                e.restore();
            }
          }),
          n.merge(a.prototype, o.prototype),
          a
        );
      },
    ),
    i(
      'zrender/shape/Star',
      ['require', '../tool/math', './Base', '../tool/util'],
      function (t) {
        var e = t('../tool/math'),
          i = e.sin,
          o = e.cos,
          n = Math.PI,
          s = t('./Base'),
          r = function (t) {
            s.call(this, t);
          };
        return (
          (r.prototype = {
            type: 'star',
            buildPath: function (t, e) {
              var s = e.n;
              if (s && !(2 > s)) {
                var r = e.x,
                  a = e.y,
                  h = e.r,
                  l = e.r0;
                null == l &&
                  (l = s > 4 ? (h * o((2 * n) / s)) / o(n / s) : h / 3);
                var d = n / s,
                  c = -n / 2,
                  p = r + h * o(c),
                  u = a + h * i(c);
                c += d;
                var g = (e.pointList = []);
                g.push([p, u]);
                for (var f, m = 0, _ = 2 * s - 1; _ > m; m++)
                  (f = m % 2 === 0 ? l : h),
                    g.push([r + f * o(c), a + f * i(c)]),
                    (c += d);
                g.push([p, u]), t.moveTo(g[0][0], g[0][1]);
                for (var m = 0; m < g.length; m++) t.lineTo(g[m][0], g[m][1]);
                t.closePath();
              }
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e;
              return (
                (e =
                  'stroke' == t.brushType || 'fill' == t.brushType
                    ? t.lineWidth || 1
                    : 0),
                (t.__rect = {
                  x: Math.round(t.x - t.r - e / 2),
                  y: Math.round(t.y - t.r - e / 2),
                  width: 2 * t.r + e,
                  height: 2 * t.r + e,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(r, s),
          r
        );
      },
    ),
    i(
      'zrender/shape/Heart',
      ['require', './Base', './util/PathProxy', '../tool/area', '../tool/util'],
      function (t) {
        'use strict';
        var e = t('./Base'),
          i = t('./util/PathProxy'),
          o = t('../tool/area'),
          n = function (t) {
            e.call(this, t), (this._pathProxy = new i());
          };
        return (
          (n.prototype = {
            type: 'heart',
            buildPath: function (t, e) {
              var o = this._pathProxy || new i();
              o.begin(t),
                o.moveTo(e.x, e.y),
                o.bezierCurveTo(
                  e.x + e.a / 2,
                  e.y - (2 * e.b) / 3,
                  e.x + 2 * e.a,
                  e.y + e.b / 3,
                  e.x,
                  e.y + e.b,
                ),
                o.bezierCurveTo(
                  e.x - 2 * e.a,
                  e.y + e.b / 3,
                  e.x - e.a / 2,
                  e.y - (2 * e.b) / 3,
                  e.x,
                  e.y,
                ),
                o.closePath();
            },
            getRect: function (t) {
              return t.__rect
                ? t.__rect
                : (this._pathProxy.isEmpty() || this.buildPath(null, t),
                  this._pathProxy.fastBoundingRect());
            },
            isCover: function (t, e) {
              var i = this.transformCoordToLocal(t, e);
              return (
                (t = i[0]),
                (e = i[1]),
                this.isCoverRect(t, e)
                  ? o.isInsidePath(
                      this._pathProxy.pathCommands,
                      this.style.lineWidth,
                      this.style.brushType,
                      t,
                      e,
                    )
                  : void 0
              );
            },
          }),
          t('../tool/util').inherits(n, e),
          n
        );
      },
    ),
    i(
      'zrender/shape/Droplet',
      ['require', './Base', './util/PathProxy', '../tool/area', '../tool/util'],
      function (t) {
        'use strict';
        var e = t('./Base'),
          i = t('./util/PathProxy'),
          o = t('../tool/area'),
          n = function (t) {
            e.call(this, t), (this._pathProxy = new i());
          };
        return (
          (n.prototype = {
            type: 'droplet',
            buildPath: function (t, e) {
              var o = this._pathProxy || new i();
              o.begin(t),
                o.moveTo(e.x, e.y + e.a),
                o.bezierCurveTo(
                  e.x + e.a,
                  e.y + e.a,
                  e.x + (3 * e.a) / 2,
                  e.y - e.a / 3,
                  e.x,
                  e.y - e.b,
                ),
                o.bezierCurveTo(
                  e.x - (3 * e.a) / 2,
                  e.y - e.a / 3,
                  e.x - e.a,
                  e.y + e.a,
                  e.x,
                  e.y + e.a,
                ),
                o.closePath();
            },
            getRect: function (t) {
              return t.__rect
                ? t.__rect
                : (this._pathProxy.isEmpty() || this.buildPath(null, t),
                  this._pathProxy.fastBoundingRect());
            },
            isCover: function (t, e) {
              var i = this.transformCoordToLocal(t, e);
              return (
                (t = i[0]),
                (e = i[1]),
                this.isCoverRect(t, e)
                  ? o.isInsidePath(
                      this._pathProxy.pathCommands,
                      this.style.lineWidth,
                      this.style.brushType,
                      t,
                      e,
                    )
                  : void 0
              );
            },
          }),
          t('../tool/util').inherits(n, e),
          n
        );
      },
    ),
    i(
      'zrender/Group',
      [
        'require',
        './tool/guid',
        './tool/util',
        './mixin/Transformable',
        './mixin/Eventful',
      ],
      function (t) {
        var e = t('./tool/guid'),
          i = t('./tool/util'),
          o = t('./mixin/Transformable'),
          n = t('./mixin/Eventful'),
          s = function (t) {
            (t = t || {}), (this.id = t.id || e());
            for (var i in t) this[i] = t[i];
            (this.type = 'group'),
              (this.clipShape = null),
              (this._children = []),
              (this._storage = null),
              (this.__dirty = !0),
              o.call(this),
              n.call(this);
          };
        return (
          (s.prototype.ignore = !1),
          (s.prototype.children = function () {
            return this._children.slice();
          }),
          (s.prototype.childAt = function (t) {
            return this._children[t];
          }),
          (s.prototype.addChild = function (t) {
            t != this &&
              t.parent != this &&
              (t.parent && t.parent.removeChild(t),
              this._children.push(t),
              (t.parent = this),
              this._storage &&
                this._storage !== t._storage &&
                (this._storage.addToMap(t),
                t instanceof s && t.addChildrenToStorage(this._storage)));
          }),
          (s.prototype.removeChild = function (t) {
            var e = i.indexOf(this._children, t);
            e >= 0 && this._children.splice(e, 1),
              (t.parent = null),
              this._storage &&
                (this._storage.delFromMap(t.id),
                t instanceof s && t.delChildrenFromStorage(this._storage));
          }),
          (s.prototype.clearChildren = function () {
            for (var t = 0; t < this._children.length; t++) {
              var e = this._children[t];
              this._storage &&
                (this._storage.delFromMap(e.id),
                e instanceof s && e.delChildrenFromStorage(this._storage));
            }
            this._children.length = 0;
          }),
          (s.prototype.eachChild = function (t, e) {
            for (var i = !!e, o = 0; o < this._children.length; o++) {
              var n = this._children[o];
              i ? t.call(e, n) : t(n);
            }
          }),
          (s.prototype.traverse = function (t, e) {
            for (var i = !!e, o = 0; o < this._children.length; o++) {
              var n = this._children[o];
              i ? t.call(e, n) : t(n), 'group' === n.type && n.traverse(t, e);
            }
          }),
          (s.prototype.addChildrenToStorage = function (t) {
            for (var e = 0; e < this._children.length; e++) {
              var i = this._children[e];
              t.addToMap(i), i instanceof s && i.addChildrenToStorage(t);
            }
          }),
          (s.prototype.delChildrenFromStorage = function (t) {
            for (var e = 0; e < this._children.length; e++) {
              var i = this._children[e];
              t.delFromMap(i.id), i instanceof s && i.delChildrenFromStorage(t);
            }
          }),
          (s.prototype.modSelf = function () {
            this.__dirty = !0;
          }),
          i.merge(s.prototype, o.prototype, !0),
          i.merge(s.prototype, n.prototype, !0),
          s
        );
      },
    ),
    i(
      'zrender/shape/util/PathProxy',
      ['require', '../../tool/vector'],
      function (t) {
        var e = t('../../tool/vector'),
          i = function (t, e) {
            (this.command = t), (this.points = e || null);
          },
          o = function () {
            (this.pathCommands = []),
              (this._ctx = null),
              (this._min = []),
              (this._max = []);
          };
        return (
          (o.prototype.fastBoundingRect = function () {
            var t = this._min,
              i = this._max;
            (t[0] = t[1] = 1 / 0), (i[0] = i[1] = -1 / 0);
            for (var o = 0; o < this.pathCommands.length; o++) {
              var n = this.pathCommands[o],
                s = n.points;
              switch (n.command) {
                case 'M':
                  e.min(t, t, s), e.max(i, i, s);
                  break;
                case 'L':
                  e.min(t, t, s), e.max(i, i, s);
                  break;
                case 'C':
                  for (var r = 0; 6 > r; r += 2)
                    (t[0] = Math.min(t[0], t[0], s[r])),
                      (t[1] = Math.min(t[1], t[1], s[r + 1])),
                      (i[0] = Math.max(i[0], i[0], s[r])),
                      (i[1] = Math.max(i[1], i[1], s[r + 1]));
                  break;
                case 'Q':
                  for (var r = 0; 4 > r; r += 2)
                    (t[0] = Math.min(t[0], t[0], s[r])),
                      (t[1] = Math.min(t[1], t[1], s[r + 1])),
                      (i[0] = Math.max(i[0], i[0], s[r])),
                      (i[1] = Math.max(i[1], i[1], s[r + 1]));
                  break;
                case 'A':
                  var a = s[0],
                    h = s[1],
                    l = s[2],
                    d = s[3];
                  (t[0] = Math.min(t[0], t[0], a - l)),
                    (t[1] = Math.min(t[1], t[1], h - d)),
                    (i[0] = Math.max(i[0], i[0], a + l)),
                    (i[1] = Math.max(i[1], i[1], h + d));
              }
            }
            return {
              x: t[0],
              y: t[1],
              width: i[0] - t[0],
              height: i[1] - t[1],
            };
          }),
          (o.prototype.begin = function (t) {
            return (
              (this._ctx = t || null), (this.pathCommands.length = 0), this
            );
          }),
          (o.prototype.moveTo = function (t, e) {
            return (
              this.pathCommands.push(new i('M', [t, e])),
              this._ctx && this._ctx.moveTo(t, e),
              this
            );
          }),
          (o.prototype.lineTo = function (t, e) {
            return (
              this.pathCommands.push(new i('L', [t, e])),
              this._ctx && this._ctx.lineTo(t, e),
              this
            );
          }),
          (o.prototype.bezierCurveTo = function (t, e, o, n, s, r) {
            return (
              this.pathCommands.push(new i('C', [t, e, o, n, s, r])),
              this._ctx && this._ctx.bezierCurveTo(t, e, o, n, s, r),
              this
            );
          }),
          (o.prototype.quadraticCurveTo = function (t, e, o, n) {
            return (
              this.pathCommands.push(new i('Q', [t, e, o, n])),
              this._ctx && this._ctx.quadraticCurveTo(t, e, o, n),
              this
            );
          }),
          (o.prototype.arc = function (t, e, o, n, s, r) {
            return (
              this.pathCommands.push(
                new i('A', [t, e, o, o, n, s - n, 0, r ? 0 : 1]),
              ),
              this._ctx && this._ctx.arc(t, e, o, n, s, r),
              this
            );
          }),
          (o.prototype.arcTo = function (t, e, i, o, n) {
            return this._ctx && this._ctx.arcTo(t, e, i, o, n), this;
          }),
          (o.prototype.rect = function (t, e, i, o) {
            return this._ctx && this._ctx.rect(t, e, i, o), this;
          }),
          (o.prototype.closePath = function () {
            return (
              this.pathCommands.push(new i('z')),
              this._ctx && this._ctx.closePath(),
              this
            );
          }),
          (o.prototype.isEmpty = function () {
            return 0 === this.pathCommands.length;
          }),
          (o.PathSegment = i),
          o
        );
      },
    ),
    i('zrender/animation/Clip', ['require', './easing'], function (t) {
      function e(t) {
        (this._targetPool = t.target || {}),
          this._targetPool instanceof Array ||
            (this._targetPool = [this._targetPool]),
          (this._life = t.life || 1e3),
          (this._delay = t.delay || 0),
          (this._startTime = new Date().getTime() + this._delay),
          (this._endTime = this._startTime + 1e3 * this._life),
          (this.loop = 'undefined' == typeof t.loop ? !1 : t.loop),
          (this.gap = t.gap || 0),
          (this.easing = t.easing || 'Linear'),
          (this.onframe = t.onframe),
          (this.ondestroy = t.ondestroy),
          (this.onrestart = t.onrestart);
      }
      var i = t('./easing');
      return (
        (e.prototype = {
          step: function (t) {
            var e = (t - this._startTime) / this._life;
            if (!(0 > e)) {
              e = Math.min(e, 1);
              var o =
                  'string' == typeof this.easing ? i[this.easing] : this.easing,
                n = 'function' == typeof o ? o(e) : e;
              return (
                this.fire('frame', n),
                1 == e
                  ? this.loop
                    ? (this.restart(), 'restart')
                    : ((this.__needsRemove = !0), 'destroy')
                  : null
              );
            }
          },
          restart: function () {
            var t = new Date().getTime(),
              e = (t - this._startTime) % this._life;
            (this._startTime = new Date().getTime() - e + this.gap),
              (this.__needsRemove = !1);
          },
          fire: function (t, e) {
            for (var i = 0, o = this._targetPool.length; o > i; i++)
              this['on' + t] && this['on' + t](this._targetPool[i], e);
          },
          constructor: e,
        }),
        e
      );
    }),
    i(
      'zrender/shape/BezierCurve',
      ['require', './Base', '../tool/util'],
      function (t) {
        'use strict';
        var e = t('./Base'),
          i = function (t) {
            (this.brushTypeOnly = 'stroke'),
              (this.textPosition = 'end'),
              e.call(this, t);
          };
        return (
          (i.prototype = {
            type: 'bezier-curve',
            buildPath: function (t, e) {
              t.moveTo(e.xStart, e.yStart),
                'undefined' != typeof e.cpX2 && 'undefined' != typeof e.cpY2
                  ? t.bezierCurveTo(
                      e.cpX1,
                      e.cpY1,
                      e.cpX2,
                      e.cpY2,
                      e.xEnd,
                      e.yEnd,
                    )
                  : t.quadraticCurveTo(e.cpX1, e.cpY1, e.xEnd, e.yEnd);
            },
            getRect: function (t) {
              if (t.__rect) return t.__rect;
              var e = Math.min(t.xStart, t.xEnd, t.cpX1),
                i = Math.min(t.yStart, t.yEnd, t.cpY1),
                o = Math.max(t.xStart, t.xEnd, t.cpX1),
                n = Math.max(t.yStart, t.yEnd, t.cpY1),
                s = t.cpX2,
                r = t.cpY2;
              'undefined' != typeof s &&
                'undefined' != typeof r &&
                ((e = Math.min(e, s)),
                (i = Math.min(i, r)),
                (o = Math.max(o, s)),
                (n = Math.max(n, r)));
              var a = t.lineWidth || 1;
              return (
                (t.__rect = {
                  x: e - a,
                  y: i - a,
                  width: o - e + a,
                  height: n - i + a,
                }),
                t.__rect
              );
            },
          }),
          t('../tool/util').inherits(i, e),
          i
        );
      },
    ),
    i('zrender/shape/util/dashedLineTo', [], function () {
      var t = [5, 5];
      return function (e, i, o, n, s, r) {
        if (e.setLineDash)
          return (
            (t[0] = t[1] = r),
            e.setLineDash(t),
            e.moveTo(i, o),
            void e.lineTo(n, s)
          );
        r = 'number' != typeof r ? 5 : r;
        var a = n - i,
          h = s - o,
          l = Math.floor(Math.sqrt(a * a + h * h) / r);
        (a /= l), (h /= l);
        for (var d = !0, c = 0; l > c; ++c)
          d ? e.moveTo(i, o) : e.lineTo(i, o), (d = !d), (i += a), (o += h);
        e.lineTo(n, s);
      };
    }),
    i('zrender/animation/easing', [], function () {
      var t = {
        Linear: function (t) {
          return t;
        },
        QuadraticIn: function (t) {
          return t * t;
        },
        QuadraticOut: function (t) {
          return t * (2 - t);
        },
        QuadraticInOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1);
        },
        CubicIn: function (t) {
          return t * t * t;
        },
        CubicOut: function (t) {
          return --t * t * t + 1;
        },
        CubicInOut: function (t) {
          return (t *= 2) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2);
        },
        QuarticIn: function (t) {
          return t * t * t * t;
        },
        QuarticOut: function (t) {
          return 1 - --t * t * t * t;
        },
        QuarticInOut: function (t) {
          return (t *= 2) < 1
            ? 0.5 * t * t * t * t
            : -0.5 * ((t -= 2) * t * t * t - 2);
        },
        QuinticIn: function (t) {
          return t * t * t * t * t;
        },
        QuinticOut: function (t) {
          return --t * t * t * t * t + 1;
        },
        QuinticInOut: function (t) {
          return (t *= 2) < 1
            ? 0.5 * t * t * t * t * t
            : 0.5 * ((t -= 2) * t * t * t * t + 2);
        },
        SinusoidalIn: function (t) {
          return 1 - Math.cos((t * Math.PI) / 2);
        },
        SinusoidalOut: function (t) {
          return Math.sin((t * Math.PI) / 2);
        },
        SinusoidalInOut: function (t) {
          return 0.5 * (1 - Math.cos(Math.PI * t));
        },
        ExponentialIn: function (t) {
          return 0 === t ? 0 : Math.pow(1024, t - 1);
        },
        ExponentialOut: function (t) {
          return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
        },
        ExponentialInOut: function (t) {
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (t *= 2) < 1
            ? 0.5 * Math.pow(1024, t - 1)
            : 0.5 * (-Math.pow(2, -10 * (t - 1)) + 2);
        },
        CircularIn: function (t) {
          return 1 - Math.sqrt(1 - t * t);
        },
        CircularOut: function (t) {
          return Math.sqrt(1 - --t * t);
        },
        CircularInOut: function (t) {
          return (t *= 2) < 1
            ? -0.5 * (Math.sqrt(1 - t * t) - 1)
            : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
        },
        ElasticIn: function (t) {
          var e,
            i = 0.1,
            o = 0.4;
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (!i || 1 > i
                ? ((i = 1), (e = o / 4))
                : (e = (o * Math.asin(1 / i)) / (2 * Math.PI)),
              -(
                i *
                Math.pow(2, 10 * (t -= 1)) *
                Math.sin((2 * (t - e) * Math.PI) / o)
              ));
        },
        ElasticOut: function (t) {
          var e,
            i = 0.1,
            o = 0.4;
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (!i || 1 > i
                ? ((i = 1), (e = o / 4))
                : (e = (o * Math.asin(1 / i)) / (2 * Math.PI)),
              i * Math.pow(2, -10 * t) * Math.sin((2 * (t - e) * Math.PI) / o) +
                1);
        },
        ElasticInOut: function (t) {
          var e,
            i = 0.1,
            o = 0.4;
          return 0 === t
            ? 0
            : 1 === t
            ? 1
            : (!i || 1 > i
                ? ((i = 1), (e = o / 4))
                : (e = (o * Math.asin(1 / i)) / (2 * Math.PI)),
              (t *= 2) < 1
                ? -0.5 *
                  i *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin((2 * (t - e) * Math.PI) / o)
                : i *
                    Math.pow(2, -10 * (t -= 1)) *
                    Math.sin((2 * (t - e) * Math.PI) / o) *
                    0.5 +
                  1);
        },
        BackIn: function (t) {
          var e = 1.70158;
          return t * t * ((e + 1) * t - e);
        },
        BackOut: function (t) {
          var e = 1.70158;
          return --t * t * ((e + 1) * t + e) + 1;
        },
        BackInOut: function (t) {
          var e = 2.5949095;
          return (t *= 2) < 1
            ? 0.5 * t * t * ((e + 1) * t - e)
            : 0.5 * ((t -= 2) * t * ((e + 1) * t + e) + 2);
        },
        BounceIn: function (e) {
          return 1 - t.BounceOut(1 - e);
        },
        BounceOut: function (t) {
          return 1 / 2.75 > t
            ? 7.5625 * t * t
            : 2 / 2.75 > t
            ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
            : 2.5 / 2.75 > t
            ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
            : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        },
        BounceInOut: function (e) {
          return 0.5 > e
            ? 0.5 * t.BounceIn(2 * e)
            : 0.5 * t.BounceOut(2 * e - 1) + 0.5;
        },
      };
      return t;
    }),
    i('echarts/util/shape/normalIsCover', [], function () {
      return function (t, e) {
        var i = this.transformCoordToLocal(t, e);
        return (t = i[0]), (e = i[1]), this.isCoverRect(t, e);
      };
    }),
    i(
      'zrender/shape/util/smoothSpline',
      ['require', '../../tool/vector'],
      function (t) {
        function e(t, e, i, o, n, s, r) {
          var a = 0.5 * (i - t),
            h = 0.5 * (o - e);
          return (
            (2 * (e - i) + a + h) * r +
            (-3 * (e - i) - 2 * a - h) * s +
            a * n +
            e
          );
        }
        var i = t('../../tool/vector');
        return function (t, o) {
          for (var n = t.length, s = [], r = 0, a = 1; n > a; a++)
            r += i.distance(t[a - 1], t[a]);
          var h = r / 5;
          h = n > h ? n : h;
          for (var a = 0; h > a; a++) {
            var l,
              d,
              c,
              p = (a / (h - 1)) * (o ? n : n - 1),
              u = Math.floor(p),
              g = p - u,
              f = t[u % n];
            o
              ? ((l = t[(u - 1 + n) % n]),
                (d = t[(u + 1) % n]),
                (c = t[(u + 2) % n]))
              : ((l = t[0 === u ? u : u - 1]),
                (d = t[u > n - 2 ? n - 1 : u + 1]),
                (c = t[u > n - 3 ? n - 1 : u + 2]));
            var m = g * g,
              _ = g * m;
            s.push([
              e(l[0], f[0], d[0], c[0], g, m, _),
              e(l[1], f[1], d[1], c[1], g, m, _),
            ]);
          }
          return s;
        };
      },
    ),
    i(
      'zrender/shape/util/smoothBezier',
      ['require', '../../tool/vector'],
      function (t) {
        var e = t('../../tool/vector');
        return function (t, i, o, n) {
          var s,
            r,
            a,
            h,
            l = [],
            d = [],
            c = [],
            p = [],
            u = !!n;
          if (u) {
            (a = [1 / 0, 1 / 0]), (h = [-1 / 0, -1 / 0]);
            for (var g = 0, f = t.length; f > g; g++)
              e.min(a, a, t[g]), e.max(h, h, t[g]);
            e.min(a, a, n[0]), e.max(h, h, n[1]);
          }
          for (var g = 0, f = t.length; f > g; g++) {
            var s,
              r,
              m = t[g];
            if (o) (s = t[g ? g - 1 : f - 1]), (r = t[(g + 1) % f]);
            else {
              if (0 === g || g === f - 1) {
                l.push(e.clone(t[g]));
                continue;
              }
              (s = t[g - 1]), (r = t[g + 1]);
            }
            e.sub(d, r, s), e.scale(d, d, i);
            var _ = e.distance(m, s),
              y = e.distance(m, r),
              x = _ + y;
            0 !== x && ((_ /= x), (y /= x)),
              e.scale(c, d, -_),
              e.scale(p, d, y);
            var v = e.add([], m, c),
              b = e.add([], m, p);
            u &&
              (e.max(v, v, a), e.min(v, v, h), e.max(b, b, a), e.min(b, b, h)),
              l.push(v),
              l.push(b);
          }
          return o && l.push(e.clone(l.shift())), l;
        };
      },
    ),
    i('echarts/util/ecQuery', ['require', 'zrender/tool/util'], function (t) {
      function e(t, e) {
        if ('undefined' != typeof t) {
          if (!e) return t;
          e = e.split('.');
          for (var i = e.length, o = 0; i > o; ) {
            if (((t = t[e[o]]), 'undefined' == typeof t)) return;
            o++;
          }
          return t;
        }
      }
      function i(t, i) {
        for (var o, n = 0, s = t.length; s > n; n++)
          if (((o = e(t[n], i)), 'undefined' != typeof o)) return o;
      }
      function o(t, i) {
        for (var o, s = t.length; s--; ) {
          var r = e(t[s], i);
          'undefined' != typeof r &&
            ('undefined' == typeof o ? (o = n.clone(r)) : n.merge(o, r, !0));
        }
        return o;
      }
      var n = t('zrender/tool/util');
      return { query: e, deepQuery: i, deepMerge: o };
    }),
    i('echarts/data/KDTree', ['require', './quickSelect'], function (t) {
      function e(t, e) {
        (this.left = null),
          (this.right = null),
          (this.axis = t),
          (this.data = e);
      }
      var i = t('./quickSelect'),
        o = function (t, e) {
          t.length &&
            (e || (e = t[0].array.length),
            (this.dimension = e),
            (this.root = this._buildTree(t, 0, t.length - 1, 0)),
            (this._stack = []),
            (this._nearstNList = []));
        };
      return (
        (o.prototype._buildTree = function (t, o, n, s) {
          if (o > n) return null;
          var r = Math.floor((o + n) / 2);
          r = i(t, o, n, r, function (t, e) {
            return t.array[s] - e.array[s];
          });
          var a = t[r],
            h = new e(s, a);
          return (
            (s = (s + 1) % this.dimension),
            n > o &&
              ((h.left = this._buildTree(t, o, r - 1, s)),
              (h.right = this._buildTree(t, r + 1, n, s))),
            h
          );
        }),
        (o.prototype.nearest = function (t, e) {
          var i = this.root,
            o = this._stack,
            n = 0,
            s = 1 / 0,
            r = null;
          for (
            i.data !== t && ((s = e(i.data, t)), (r = i)),
              t.array[i.axis] < i.data.array[i.axis]
                ? (i.right && (o[n++] = i.right), i.left && (o[n++] = i.left))
                : (i.left && (o[n++] = i.left), i.right && (o[n++] = i.right));
            n--;

          ) {
            i = o[n];
            var a = t.array[i.axis] - i.data.array[i.axis],
              h = 0 > a,
              l = !1;
            (a *= a),
              s > a &&
                ((a = e(i.data, t)),
                s > a && i.data !== t && ((s = a), (r = i)),
                (l = !0)),
              h
                ? (l && i.right && (o[n++] = i.right),
                  i.left && (o[n++] = i.left))
                : (l && i.left && (o[n++] = i.left),
                  i.right && (o[n++] = i.right));
          }
          return r.data;
        }),
        (o.prototype._addNearest = function (t, e, i) {
          for (
            var o = this._nearstNList, n = t - 1;
            n > 0 && !(e >= o[n - 1].dist);
            n--
          )
            (o[n].dist = o[n - 1].dist), (o[n].node = o[n - 1].node);
          (o[n].dist = e), (o[n].node = i);
        }),
        (o.prototype.nearestN = function (t, e, i, o) {
          if (0 >= e) return (o.length = 0), o;
          for (
            var n = this.root,
              s = this._stack,
              r = 0,
              a = this._nearstNList,
              h = 0;
            e > h;
            h++
          )
            a[h] || (a[h] = {}), (a[h].dist = 0), (a[h].node = null);
          var l = i(n.data, t),
            d = 0;
          for (
            n.data !== t && (d++, this._addNearest(d, l, n)),
              t.array[n.axis] < n.data.array[n.axis]
                ? (n.right && (s[r++] = n.right), n.left && (s[r++] = n.left))
                : (n.left && (s[r++] = n.left), n.right && (s[r++] = n.right));
            r--;

          ) {
            n = s[r];
            var l = t.array[n.axis] - n.data.array[n.axis],
              c = 0 > l,
              p = !1;
            (l *= l),
              (e > d || l < a[d - 1].dist) &&
                ((l = i(n.data, t)),
                (e > d || l < a[d - 1].dist) &&
                  n.data !== t &&
                  (e > d && d++, this._addNearest(d, l, n)),
                (p = !0)),
              c
                ? (p && n.right && (s[r++] = n.right),
                  n.left && (s[r++] = n.left))
                : (p && n.left && (s[r++] = n.left),
                  n.right && (s[r++] = n.right));
          }
          for (var h = 0; d > h; h++) o[h] = a[h].node.data;
          return (o.length = d), o;
        }),
        o
      );
    }),
    i('echarts/data/quickSelect', ['require'], function () {
      function t(t, e) {
        return t - e;
      }
      function e(t, e, i) {
        var o = t[e];
        (t[e] = t[i]), (t[i] = o);
      }
      function i(t, i, o, n, s) {
        for (var r = i; o > i; ) {
          var r = Math.round((o + i) / 2),
            a = t[r];
          e(t, r, o), (r = i);
          for (var h = i; o - 1 >= h; h++) s(a, t[h]) >= 0 && (e(t, h, r), r++);
          if ((e(t, o, r), r === n)) return r;
          n > r ? (i = r + 1) : (o = r - 1);
        }
        return i;
      }
      function o(e, o, n, s, r) {
        return (
          arguments.length <= 3 &&
            ((s = o),
            (r = 2 == arguments.length ? t : n),
            (o = 0),
            (n = e.length - 1)),
          i(e, o, n, s, r)
        );
      }
      return o;
    }),
    i(
      'echarts/component/dataView',
      ['require', './base', '../config', 'zrender/tool/util', '../component'],
      function (t) {
        function e(t, e, o, n, s) {
          i.call(this, t, e, o, n, s),
            (this.dom = s.dom),
            (this._tDom = document.createElement('div')),
            (this._textArea = document.createElement('textArea')),
            (this._buttonRefresh = document.createElement('button')),
            this._buttonRefresh.setAttribute('type', 'button'),
            (this._buttonClose = document.createElement('button')),
            this._buttonClose.setAttribute('type', 'button'),
            (this._hasShow = !1),
            (this._zrHeight = o.getHeight()),
            (this._zrWidth = o.getWidth()),
            (this._tDom.className = 'echarts-dataview'),
            this.hide(),
            this.dom.firstChild.appendChild(this._tDom),
            window.addEventListener
              ? (this._tDom.addEventListener('click', this._stop),
                this._tDom.addEventListener('mousewheel', this._stop),
                this._tDom.addEventListener('mousemove', this._stop),
                this._tDom.addEventListener('mousedown', this._stop),
                this._tDom.addEventListener('mouseup', this._stop),
                this._tDom.addEventListener('touchstart', this._stop),
                this._tDom.addEventListener('touchmove', this._stop),
                this._tDom.addEventListener('touchend', this._stop))
              : (this._tDom.attachEvent('onclick', this._stop),
                this._tDom.attachEvent('onmousewheel', this._stop),
                this._tDom.attachEvent('onmousemove', this._stop),
                this._tDom.attachEvent('onmousedown', this._stop),
                this._tDom.attachEvent('onmouseup', this._stop));
        }
        var i = t('./base'),
          o = t('../config'),
          n = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: o.COMPONENT_TYPE_DATAVIEW,
            _lang: ['Data View', 'close', 'refresh'],
            _gCssText:
              'position:absolute;display:block;overflow:hidden;transition:height 0.8s,background-color 1s;-moz-transition:height 0.8s,background-color 1s;-webkit-transition:height 0.8s,background-color 1s;-o-transition:height 0.8s,background-color 1s;z-index:1;left:0;top:0;',
            hide: function () {
              (this._sizeCssText =
                'width:' +
                this._zrWidth +
                'px;height:0px;background-color:#f0ffff;'),
                (this._tDom.style.cssText = this._gCssText + this._sizeCssText);
            },
            show: function (t) {
              this._hasShow = !0;
              var e =
                this.query(this.option, 'toolbox.feature.dataView.lang') ||
                this._lang;
              (this.option = t),
                (this._tDom.innerHTML =
                  '<p style="padding:8px 0;margin:0 0 10px 0;border-bottom:1px solid #eee">' +
                  (e[0] || this._lang[0]) +
                  '</p>');
              var i = this.query(
                this.option,
                'toolbox.feature.dataView.optionToContent',
              );
              'function' != typeof i
                ? (this._textArea.value = this._optionToContent())
                : ((this._textArea = document.createElement('div')),
                  (this._textArea.innerHTML = i(this.option))),
                (this._textArea.style.cssText =
                  'display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:' +
                  (this._zrHeight - 100) +
                  'px;'),
                this._tDom.appendChild(this._textArea),
                (this._buttonClose.style.cssText =
                  'float:right;padding:1px 6px;'),
                (this._buttonClose.innerHTML = e[1] || this._lang[1]);
              var o = this;
              (this._buttonClose.onclick = function () {
                o.hide();
              }),
                this._tDom.appendChild(this._buttonClose),
                this.query(this.option, 'toolbox.feature.dataView.readOnly') ===
                !1
                  ? ((this._buttonRefresh.style.cssText =
                      'float:right;margin-right:10px;padding:1px 6px;'),
                    (this._buttonRefresh.innerHTML = e[2] || this._lang[2]),
                    (this._buttonRefresh.onclick = function () {
                      o._save();
                    }),
                    (this._textArea.readOnly = !1),
                    (this._textArea.style.cursor = 'default'))
                  : ((this._buttonRefresh.style.cssText = 'display:none'),
                    (this._textArea.readOnly = !0),
                    (this._textArea.style.cursor = 'text')),
                this._tDom.appendChild(this._buttonRefresh),
                (this._sizeCssText =
                  'width:' +
                  this._zrWidth +
                  'px;height:' +
                  this._zrHeight +
                  'px;background-color:#fff;'),
                (this._tDom.style.cssText = this._gCssText + this._sizeCssText);
            },
            _optionToContent: function () {
              var t,
                e,
                i,
                n,
                s,
                r,
                a = [],
                h = '';
              if (this.option.xAxis)
                for (
                  a =
                    this.option.xAxis instanceof Array
                      ? this.option.xAxis
                      : [this.option.xAxis],
                    t = 0,
                    n = a.length;
                  n > t;
                  t++
                )
                  if ('category' == (a[t].type || 'category')) {
                    for (r = [], e = 0, i = a[t].data.length; i > e; e++)
                      r.push(this.getDataFromOption(a[t].data[e]));
                    h += r.join(', ') + '\n\n';
                  }
              if (this.option.yAxis)
                for (
                  a =
                    this.option.yAxis instanceof Array
                      ? this.option.yAxis
                      : [this.option.yAxis],
                    t = 0,
                    n = a.length;
                  n > t;
                  t++
                )
                  if ('category' == a[t].type) {
                    for (r = [], e = 0, i = a[t].data.length; i > e; e++)
                      r.push(this.getDataFromOption(a[t].data[e]));
                    h += r.join(', ') + '\n\n';
                  }
              var l,
                d = this.option.series;
              for (t = 0, n = d.length; n > t; t++) {
                for (r = [], e = 0, i = d[t].data.length; i > e; e++)
                  (s = d[t].data[e]),
                    (l =
                      d[t].type == o.CHART_TYPE_PIE ||
                      d[t].type == o.CHART_TYPE_MAP
                        ? (s.name || '-') + ':'
                        : ''),
                    d[t].type == o.CHART_TYPE_SCATTER &&
                      (s = this.getDataFromOption(s).join(', ')),
                    r.push(l + this.getDataFromOption(s));
                (h += (d[t].name || '-') + ' : \n'),
                  (h += r.join(
                    d[t].type == o.CHART_TYPE_SCATTER ? '\n' : ', ',
                  )),
                  (h += '\n\n');
              }
              return h;
            },
            _save: function () {
              var t = this.query(
                this.option,
                'toolbox.feature.dataView.contentToOption',
              );
              if ('function' != typeof t) {
                for (
                  var e = this._textArea.value.split('\n'),
                    i = [],
                    n = 0,
                    s = e.length;
                  s > n;
                  n++
                )
                  (e[n] = this._trim(e[n])), '' !== e[n] && i.push(e[n]);
                this._contentToOption(i);
              } else t(this._textArea, this.option);
              this.hide();
              var r = this;
              setTimeout(
                function () {
                  r.messageCenter &&
                    r.messageCenter.dispatch(
                      o.EVENT.DATA_VIEW_CHANGED,
                      null,
                      { option: r.option },
                      r.myChart,
                    );
                },
                r.canvasSupported ? 800 : 100,
              );
            },
            _contentToOption: function (t) {
              var e,
                i,
                n,
                s,
                r,
                a,
                h,
                l = [],
                d = 0;
              if (this.option.xAxis)
                for (
                  l =
                    this.option.xAxis instanceof Array
                      ? this.option.xAxis
                      : [this.option.xAxis],
                    e = 0,
                    s = l.length;
                  s > e;
                  e++
                )
                  if ('category' == (l[e].type || 'category')) {
                    for (
                      a = t[d].split(','), i = 0, n = l[e].data.length;
                      n > i;
                      i++
                    )
                      (h = this._trim(a[i] || '')),
                        (r = l[e].data[i]),
                        'undefined' != typeof l[e].data[i].value
                          ? (l[e].data[i].value = h)
                          : (l[e].data[i] = h);
                    d++;
                  }
              if (this.option.yAxis)
                for (
                  l =
                    this.option.yAxis instanceof Array
                      ? this.option.yAxis
                      : [this.option.yAxis],
                    e = 0,
                    s = l.length;
                  s > e;
                  e++
                )
                  if ('category' == l[e].type) {
                    for (
                      a = t[d].split(','), i = 0, n = l[e].data.length;
                      n > i;
                      i++
                    )
                      (h = this._trim(a[i] || '')),
                        (r = l[e].data[i]),
                        'undefined' != typeof l[e].data[i].value
                          ? (l[e].data[i].value = h)
                          : (l[e].data[i] = h);
                    d++;
                  }
              var c = this.option.series;
              for (e = 0, s = c.length; s > e; e++)
                if ((d++, c[e].type == o.CHART_TYPE_SCATTER))
                  for (var i = 0, n = c[e].data.length; n > i; i++)
                    (a = t[d]),
                      (h = a.replace(' ', '').split(',')),
                      'undefined' != typeof c[e].data[i].value
                        ? (c[e].data[i].value = h)
                        : (c[e].data[i] = h),
                      d++;
                else {
                  a = t[d].split(',');
                  for (var i = 0, n = c[e].data.length; n > i; i++)
                    (h = (a[i] || '').replace(/.*:/, '')),
                      (h = this._trim(h)),
                      (h = '-' != h && '' !== h ? h - 0 : '-'),
                      'undefined' != typeof c[e].data[i].value
                        ? (c[e].data[i].value = h)
                        : (c[e].data[i] = h);
                  d++;
                }
            },
            _trim: function (t) {
              var e = new RegExp(
                '(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)',
                'g',
              );
              return t.replace(e, '');
            },
            _stop: function (t) {
              (t = t || window.event),
                t.stopPropagation ? t.stopPropagation() : (t.cancelBubble = !0);
            },
            resize: function () {
              (this._zrHeight = this.zr.getHeight()),
                (this._zrWidth = this.zr.getWidth()),
                this._tDom.offsetHeight > 10 &&
                  ((this._sizeCssText =
                    'width:' +
                    this._zrWidth +
                    'px;height:' +
                    this._zrHeight +
                    'px;background-color:#fff;'),
                  (this._tDom.style.cssText =
                    this._gCssText + this._sizeCssText),
                  (this._textArea.style.cssText =
                    'display:block;margin:0 0 8px 0;padding:4px 6px;overflow:auto;width:100%;height:' +
                    (this._zrHeight - 100) +
                    'px;'));
            },
            dispose: function () {
              window.removeEventListener
                ? (this._tDom.removeEventListener('click', this._stop),
                  this._tDom.removeEventListener('mousewheel', this._stop),
                  this._tDom.removeEventListener('mousemove', this._stop),
                  this._tDom.removeEventListener('mousedown', this._stop),
                  this._tDom.removeEventListener('mouseup', this._stop),
                  this._tDom.removeEventListener('touchstart', this._stop),
                  this._tDom.removeEventListener('touchmove', this._stop),
                  this._tDom.removeEventListener('touchend', this._stop))
                : (this._tDom.detachEvent('onclick', this._stop),
                  this._tDom.detachEvent('onmousewheel', this._stop),
                  this._tDom.detachEvent('onmousemove', this._stop),
                  this._tDom.detachEvent('onmousedown', this._stop),
                  this._tDom.detachEvent('onmouseup', this._stop)),
                (this._buttonRefresh.onclick = null),
                (this._buttonClose.onclick = null),
                this._hasShow &&
                  (this._tDom.removeChild(this._textArea),
                  this._tDom.removeChild(this._buttonRefresh),
                  this._tDom.removeChild(this._buttonClose)),
                (this._textArea = null),
                (this._buttonRefresh = null),
                (this._buttonClose = null),
                this.dom.firstChild.removeChild(this._tDom),
                (this._tDom = null);
            },
          }),
          n.inherits(e, i),
          t('../component').define('dataView', e),
          e
        );
      },
    ),
    i(
      'echarts/component/valueAxis',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Line',
        'zrender/shape/Rectangle',
        '../config',
        '../util/date',
        'zrender/tool/util',
        '../util/smartSteps',
        '../util/accMath',
        '../util/smartLogSteps',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s, r, a) {
          if (!a || 0 === a.length)
            return void console.err('option.series.length == 0.');
          i.call(this, t, e, o, n, s),
            (this.series = a),
            (this.grid = this.component.grid);
          for (var h in r) this[h] = r[h];
          this.refresh(n, a);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Line'),
          s = t('zrender/shape/Rectangle'),
          r = t('../config');
        r.valueAxis = {
          zlevel: 0,
          z: 0,
          show: !0,
          position: 'left',
          name: '',
          nameLocation: 'end',
          nameTextStyle: {},
          boundaryGap: [0, 0],
          axisLine: {
            show: !0,
            onZero: !0,
            lineStyle: { color: '#48b', width: 2, type: 'solid' },
          },
          axisTick: {
            show: !1,
            inside: !1,
            length: 5,
            lineStyle: { color: '#333', width: 1 },
          },
          axisLabel: {
            show: !0,
            rotate: 0,
            margin: 8,
            textStyle: { color: '#333' },
          },
          splitLine: {
            show: !0,
            lineStyle: { color: ['#ccc'], width: 1, type: 'solid' },
          },
          splitArea: {
            show: !1,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
            },
          },
        };
        var a = t('../util/date'),
          h = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: r.COMPONENT_TYPE_AXIS_VALUE,
            _buildShape: function () {
              if (
                ((this._hasData = !1),
                this._calculateValue(),
                this._hasData && this.option.show)
              ) {
                this.option.splitArea.show && this._buildSplitArea(),
                  this.option.splitLine.show && this._buildSplitLine(),
                  this.option.axisLine.show && this._buildAxisLine(),
                  this.option.axisTick.show && this._buildAxisTick(),
                  this.option.axisLabel.show && this._buildAxisLabel();
                for (var t = 0, e = this.shapeList.length; e > t; t++)
                  this.zr.addShape(this.shapeList[t]);
              }
            },
            _buildAxisTick: function () {
              var t,
                e = this._valueList,
                i = this._valueList.length,
                o = this.option.axisTick,
                s = o.length,
                r = o.lineStyle.color,
                a = o.lineStyle.width;
              if (this.isHorizontal())
                for (
                  var h,
                    l =
                      'bottom' === this.option.position
                        ? o.inside
                          ? this.grid.getYend() - s - 1
                          : this.grid.getYend() + 1
                        : o.inside
                        ? this.grid.getY() + 1
                        : this.grid.getY() - s - 1,
                    d = 0;
                  i > d;
                  d++
                )
                  (h = this.subPixelOptimize(this.getCoord(e[d]), a)),
                    (t = {
                      _axisShape: 'axisTick',
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: h,
                        yStart: l,
                        xEnd: h,
                        yEnd: l + s,
                        strokeColor: r,
                        lineWidth: a,
                      },
                    }),
                    this.shapeList.push(new n(t));
              else
                for (
                  var c,
                    p =
                      'left' === this.option.position
                        ? o.inside
                          ? this.grid.getX() + 1
                          : this.grid.getX() - s - 1
                        : o.inside
                        ? this.grid.getXend() - s - 1
                        : this.grid.getXend() + 1,
                    d = 0;
                  i > d;
                  d++
                )
                  (c = this.subPixelOptimize(this.getCoord(e[d]), a)),
                    (t = {
                      _axisShape: 'axisTick',
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: p,
                        yStart: c,
                        xEnd: p + s,
                        yEnd: c,
                        strokeColor: r,
                        lineWidth: a,
                      },
                    }),
                    this.shapeList.push(new n(t));
            },
            _buildAxisLabel: function () {
              var t,
                e = this._valueList,
                i = this._valueList.length,
                n = this.option.axisLabel.rotate,
                s = this.option.axisLabel.margin,
                r = this.option.axisLabel.clickable,
                a = this.option.axisLabel.textStyle;
              if (this.isHorizontal()) {
                var h, l;
                'bottom' === this.option.position
                  ? ((h = this.grid.getYend() + s), (l = 'top'))
                  : ((h = this.grid.getY() - s), (l = 'bottom'));
                for (var d = 0; i > d; d++)
                  (t = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 3,
                    hoverable: !1,
                    style: {
                      x: this.getCoord(e[d]),
                      y: h,
                      color:
                        'function' == typeof a.color ? a.color(e[d]) : a.color,
                      text: this._valueLabel[d],
                      textFont: this.getFont(a),
                      textAlign: a.align || 'center',
                      textBaseline: a.baseline || l,
                    },
                  }),
                    n &&
                      ((t.style.textAlign =
                        n > 0
                          ? 'bottom' === this.option.position
                            ? 'right'
                            : 'left'
                          : 'bottom' === this.option.position
                          ? 'left'
                          : 'right'),
                      (t.rotation = [
                        (n * Math.PI) / 180,
                        t.style.x,
                        t.style.y,
                      ])),
                    this.shapeList.push(new o(this._axisLabelClickable(r, t)));
              } else {
                var c, p;
                'left' === this.option.position
                  ? ((c = this.grid.getX() - s), (p = 'right'))
                  : ((c = this.grid.getXend() + s), (p = 'left'));
                for (var d = 0; i > d; d++)
                  (t = {
                    zlevel: this.getZlevelBase(),
                    z: this.getZBase() + 3,
                    hoverable: !1,
                    style: {
                      x: c,
                      y: this.getCoord(e[d]),
                      color:
                        'function' == typeof a.color ? a.color(e[d]) : a.color,
                      text: this._valueLabel[d],
                      textFont: this.getFont(a),
                      textAlign: a.align || p,
                      textBaseline:
                        a.baseline ||
                        (0 === d && '' !== this.option.name
                          ? 'bottom'
                          : d === i - 1 && '' !== this.option.name
                          ? 'top'
                          : 'middle'),
                    },
                  }),
                    n &&
                      (t.rotation = [
                        (n * Math.PI) / 180,
                        t.style.x,
                        t.style.y,
                      ]),
                    this.shapeList.push(new o(this._axisLabelClickable(r, t)));
              }
            },
            _buildSplitLine: function () {
              var t,
                e = this._valueList,
                i = this._valueList.length,
                o = this.option.splitLine,
                s = o.lineStyle.type,
                r = o.lineStyle.width,
                a = o.lineStyle.color;
              a = a instanceof Array ? a : [a];
              var h = a.length;
              if (this.isHorizontal())
                for (
                  var l, d = this.grid.getY(), c = this.grid.getYend(), p = 0;
                  i > p;
                  p++
                )
                  (l = this.subPixelOptimize(this.getCoord(e[p]), r)),
                    (t = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: l,
                        yStart: d,
                        xEnd: l,
                        yEnd: c,
                        strokeColor: a[p % h],
                        lineType: s,
                        lineWidth: r,
                      },
                    }),
                    this.shapeList.push(new n(t));
              else
                for (
                  var u, g = this.grid.getX(), f = this.grid.getXend(), p = 0;
                  i > p;
                  p++
                )
                  (u = this.subPixelOptimize(this.getCoord(e[p]), r)),
                    (t = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: g,
                        yStart: u,
                        xEnd: f,
                        yEnd: u,
                        strokeColor: a[p % h],
                        lineType: s,
                        lineWidth: r,
                      },
                    }),
                    this.shapeList.push(new n(t));
            },
            _buildSplitArea: function () {
              var t,
                e = this.option.splitArea.areaStyle.color;
              if (e instanceof Array) {
                var i = e.length,
                  o = this._valueList,
                  n = this._valueList.length;
                if (this.isHorizontal())
                  for (
                    var r,
                      a = this.grid.getY(),
                      h = this.grid.getHeight(),
                      l = this.grid.getX(),
                      d = 0;
                    n >= d;
                    d++
                  )
                    (r = n > d ? this.getCoord(o[d]) : this.grid.getXend()),
                      (t = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        hoverable: !1,
                        style: {
                          x: l,
                          y: a,
                          width: r - l,
                          height: h,
                          color: e[d % i],
                        },
                      }),
                      this.shapeList.push(new s(t)),
                      (l = r);
                else
                  for (
                    var c,
                      p = this.grid.getX(),
                      u = this.grid.getWidth(),
                      g = this.grid.getYend(),
                      d = 0;
                    n >= d;
                    d++
                  )
                    (c = n > d ? this.getCoord(o[d]) : this.grid.getY()),
                      (t = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        hoverable: !1,
                        style: {
                          x: p,
                          y: c,
                          width: u,
                          height: g - c,
                          color: e[d % i],
                        },
                      }),
                      this.shapeList.push(new s(t)),
                      (g = c);
              } else
                (t = {
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  hoverable: !1,
                  style: {
                    x: this.grid.getX(),
                    y: this.grid.getY(),
                    width: this.grid.getWidth(),
                    height: this.grid.getHeight(),
                    color: e,
                  },
                }),
                  this.shapeList.push(new s(t));
            },
            _calculateValue: function () {
              if (isNaN(this.option.min - 0) || isNaN(this.option.max - 0)) {
                for (
                  var t,
                    e,
                    i = {},
                    o = this.component.legend,
                    n = 0,
                    s = this.series.length;
                  s > n;
                  n++
                )
                  !(
                    (this.series[n].type != r.CHART_TYPE_LINE &&
                      this.series[n].type != r.CHART_TYPE_BAR &&
                      this.series[n].type != r.CHART_TYPE_SCATTER &&
                      this.series[n].type != r.CHART_TYPE_K &&
                      this.series[n].type != r.CHART_TYPE_EVENTRIVER) ||
                    (o && !o.isSelected(this.series[n].name)) ||
                    ((t = this.series[n].xAxisIndex || 0),
                    (e = this.series[n].yAxisIndex || 0),
                    (this.option.xAxisIndex != t &&
                      this.option.yAxisIndex != e) ||
                      !this._calculSum(i, n))
                  );
                var a;
                for (var n in i) {
                  a = i[n];
                  for (var h = 0, l = a.length; l > h; h++)
                    if (!isNaN(a[h])) {
                      (this._hasData = !0),
                        (this._min = a[h]),
                        (this._max = a[h]);
                      break;
                    }
                  if (this._hasData) break;
                }
                for (var n in i) {
                  a = i[n];
                  for (var h = 0, l = a.length; l > h; h++)
                    isNaN(a[h]) ||
                      ((this._min = Math.min(this._min, a[h])),
                      (this._max = Math.max(this._max, a[h])));
                }
                var d =
                    'log' !== this.option.type
                      ? this.option.boundaryGap
                      : [0, 0],
                  c = Math.abs(this._max - this._min);
                (this._min = isNaN(this.option.min - 0)
                  ? this._min - Math.abs(c * d[0])
                  : this.option.min - 0),
                  (this._max = isNaN(this.option.max - 0)
                    ? this._max + Math.abs(c * d[1])
                    : this.option.max - 0),
                  this._min === this._max &&
                    (0 === this._max
                      ? (this._max = 1)
                      : this._max > 0
                      ? (this._min =
                          this._max / this.option.splitNumber != null
                            ? this.option.splitNumber
                            : 5)
                      : (this._max =
                          this._max / this.option.splitNumber != null
                            ? this.option.splitNumber
                            : 5)),
                  'time' === this.option.type
                    ? this._reformTimeValue()
                    : 'log' === this.option.type
                    ? this._reformLogValue()
                    : this._reformValue(this.option.scale);
              } else
                (this._hasData = !0),
                  (this._min = this.option.min - 0),
                  (this._max = this.option.max - 0),
                  'time' === this.option.type
                    ? this._reformTimeValue()
                    : 'log' === this.option.type
                    ? this._reformLogValue()
                    : this._customerValue();
            },
            _calculSum: function (t, e) {
              var i,
                o,
                n = this.series[e].name || 'kener';
              if (this.series[e].stack) {
                var s = '__Magic_Key_Positive__' + this.series[e].stack,
                  h = '__Magic_Key_Negative__' + this.series[e].stack;
                (t[s] = t[s] || []),
                  (t[h] = t[h] || []),
                  (t[n] = t[n] || []),
                  (o = this.series[e].data);
                for (var l = 0, d = o.length; d > l; l++)
                  (i = this.getDataFromOption(o[l])),
                    '-' !== i &&
                      ((i -= 0),
                      i >= 0
                        ? null != t[s][l]
                          ? (t[s][l] += i)
                          : (t[s][l] = i)
                        : null != t[h][l]
                        ? (t[h][l] += i)
                        : (t[h][l] = i),
                      this.option.scale && t[n].push(i));
              } else if (
                ((t[n] = t[n] || []),
                this.series[e].type != r.CHART_TYPE_EVENTRIVER)
              ) {
                o = this.series[e].data;
                for (var l = 0, d = o.length; d > l; l++)
                  (i = this.getDataFromOption(o[l])),
                    this.series[e].type === r.CHART_TYPE_K
                      ? (t[n].push(i[0]),
                        t[n].push(i[1]),
                        t[n].push(i[2]),
                        t[n].push(i[3]))
                      : i instanceof Array
                      ? (-1 != this.option.xAxisIndex &&
                          t[n].push(
                            'time' != this.option.type
                              ? i[0]
                              : a.getNewDate(i[0]),
                          ),
                        -1 != this.option.yAxisIndex &&
                          t[n].push(
                            'time' != this.option.type
                              ? i[1]
                              : a.getNewDate(i[1]),
                          ))
                      : t[n].push(i);
              } else {
                o = this.series[e].data;
                for (var l = 0, d = o.length; d > l; l++)
                  for (var c = o[l].evolution, p = 0, u = c.length; u > p; p++)
                    t[n].push(a.getNewDate(c[p].time));
              }
            },
            _reformValue: function (e) {
              var i = t('../util/smartSteps'),
                o = this.option.splitNumber;
              !e && this._min >= 0 && this._max >= 0 && (this._min = 0),
                !e && this._min <= 0 && this._max <= 0 && (this._max = 0);
              var n = i(this._min, this._max, o);
              (o = null != o ? o : n.secs),
                (this._min = n.min),
                (this._max = n.max),
                (this._valueList = n.pnts),
                this._reformLabelData();
            },
            _reformTimeValue: function () {
              var t =
                  null != this.option.splitNumber ? this.option.splitNumber : 5,
                e = a.getAutoFormatter(this._min, this._max, t),
                i = e.formatter,
                o = e.gapValue;
              this._valueList = [a.getNewDate(this._min)];
              var n;
              switch (i) {
                case 'week':
                  n = a.nextMonday(this._min);
                  break;
                case 'month':
                  n = a.nextNthOnMonth(this._min, 1);
                  break;
                case 'quarter':
                  n = a.nextNthOnQuarterYear(this._min, 1);
                  break;
                case 'half-year':
                  n = a.nextNthOnHalfYear(this._min, 1);
                  break;
                case 'year':
                  n = a.nextNthOnYear(this._min, 1);
                  break;
                default:
                  72e5 >= o
                    ? (n = (Math.floor(this._min / o) + 1) * o)
                    : ((n = a.getNewDate(this._min - -o)),
                      n.setHours(6 * Math.round(n.getHours() / 6)),
                      n.setMinutes(0),
                      n.setSeconds(0));
              }
              for (
                n - this._min < o / 2 && (n -= -o),
                  e = a.getNewDate(n),
                  t *= 1.5;
                t-- >= 0 &&
                (('month' == i ||
                  'quarter' == i ||
                  'half-year' == i ||
                  'year' == i) &&
                  e.setDate(1),
                !(this._max - e < o / 2));

              )
                this._valueList.push(e), (e = a.getNewDate(e - -o));
              this._valueList.push(a.getNewDate(this._max)),
                this._reformLabelData(
                  (function (t) {
                    return function (e) {
                      return a.format(t, e);
                    };
                  })(i),
                );
            },
            _customerValue: function () {
              var e = t('../util/accMath'),
                i =
                  null != this.option.splitNumber ? this.option.splitNumber : 5,
                o = (this._max - this._min) / i;
              this._valueList = [];
              for (var n = 0; i >= n; n++)
                this._valueList.push(e.accAdd(this._min, e.accMul(o, n)));
              this._reformLabelData();
            },
            _reformLogValue: function () {
              var e = this.option,
                i = t('../util/smartLogSteps')({
                  dataMin: this._min,
                  dataMax: this._max,
                  logPositive: e.logPositive,
                  logLabelBase: e.logLabelBase,
                  splitNumber: e.splitNumber,
                });
              (this._min = i.dataMin),
                (this._max = i.dataMax),
                (this._valueList = i.tickList),
                (this._dataMappingMethods = i.dataMappingMethods),
                this._reformLabelData(i.labelFormatter);
            },
            _reformLabelData: function (t) {
              this._valueLabel = [];
              var e = this.option.axisLabel.formatter;
              if (e)
                for (var i = 0, o = this._valueList.length; o > i; i++)
                  'function' == typeof e
                    ? this._valueLabel.push(
                        t
                          ? e.call(this.myChart, this._valueList[i], t)
                          : e.call(this.myChart, this._valueList[i]),
                      )
                    : 'string' == typeof e &&
                      this._valueLabel.push(
                        t
                          ? a.format(e, this._valueList[i])
                          : e.replace('{value}', this._valueList[i]),
                      );
              else
                for (var i = 0, o = this._valueList.length; o > i; i++)
                  this._valueLabel.push(
                    t
                      ? t(this._valueList[i])
                      : this.numAddCommas(this._valueList[i]),
                  );
            },
            getExtremum: function () {
              this._calculateValue();
              var t = this._dataMappingMethods;
              return {
                min: this._min,
                max: this._max,
                dataMappingMethods: t ? h.merge({}, t) : null,
              };
            },
            refresh: function (t, e) {
              t &&
                ((this.option = this.reformOption(t)),
                (this.option.axisLabel.textStyle = h.merge(
                  this.option.axisLabel.textStyle || {},
                  this.ecTheme.textStyle,
                )),
                (this.series = e)),
                this.zr && (this.clear(), this._buildShape());
            },
            getCoord: function (t) {
              this._dataMappingMethods &&
                (t = this._dataMappingMethods.value2Coord(t)),
                (t = t < this._min ? this._min : t),
                (t = t > this._max ? this._max : t);
              var e;
              return (e = this.isHorizontal()
                ? this.grid.getX() +
                  ((t - this._min) / (this._max - this._min)) *
                    this.grid.getWidth()
                : this.grid.getYend() -
                  ((t - this._min) / (this._max - this._min)) *
                    this.grid.getHeight());
            },
            getCoordSize: function (t) {
              return Math.abs(
                this.isHorizontal()
                  ? (t / (this._max - this._min)) * this.grid.getWidth()
                  : (t / (this._max - this._min)) * this.grid.getHeight(),
              );
            },
            getValueFromCoord: function (t) {
              var e;
              return (
                this.isHorizontal()
                  ? ((t = t < this.grid.getX() ? this.grid.getX() : t),
                    (t = t > this.grid.getXend() ? this.grid.getXend() : t),
                    (e =
                      this._min +
                      ((t - this.grid.getX()) / this.grid.getWidth()) *
                        (this._max - this._min)))
                  : ((t = t < this.grid.getY() ? this.grid.getY() : t),
                    (t = t > this.grid.getYend() ? this.grid.getYend() : t),
                    (e =
                      this._max -
                      ((t - this.grid.getY()) / this.grid.getHeight()) *
                        (this._max - this._min))),
                this._dataMappingMethods &&
                  (e = this._dataMappingMethods.coord2Value(e)),
                e.toFixed(2) - 0
              );
            },
            isMaindAxis: function (t) {
              for (var e = 0, i = this._valueList.length; i > e; e++)
                if (this._valueList[e] === t) return !0;
              return !1;
            },
          }),
          h.inherits(e, i),
          t('../component').define('valueAxis', e),
          e
        );
      },
    ),
    i(
      'zrender/tool/computeBoundingBox',
      ['require', './vector', './curve'],
      function (t) {
        function e(t, e, i) {
          if (0 !== t.length) {
            for (
              var o = t[0][0], n = t[0][0], s = t[0][1], r = t[0][1], a = 1;
              a < t.length;
              a++
            ) {
              var h = t[a];
              h[0] < o && (o = h[0]),
                h[0] > n && (n = h[0]),
                h[1] < s && (s = h[1]),
                h[1] > r && (r = h[1]);
            }
            (e[0] = o), (e[1] = s), (i[0] = n), (i[1] = r);
          }
        }
        function i(t, e, i, o, n, r) {
          var a = [];
          s.cubicExtrema(t[0], e[0], i[0], o[0], a);
          for (var h = 0; h < a.length; h++)
            a[h] = s.cubicAt(t[0], e[0], i[0], o[0], a[h]);
          var l = [];
          s.cubicExtrema(t[1], e[1], i[1], o[1], l);
          for (var h = 0; h < l.length; h++)
            l[h] = s.cubicAt(t[1], e[1], i[1], o[1], l[h]);
          a.push(t[0], o[0]), l.push(t[1], o[1]);
          var d = Math.min.apply(null, a),
            c = Math.max.apply(null, a),
            p = Math.min.apply(null, l),
            u = Math.max.apply(null, l);
          (n[0] = d), (n[1] = p), (r[0] = c), (r[1] = u);
        }
        function o(t, e, i, o, n) {
          var r = s.quadraticExtremum(t[0], e[0], i[0]),
            a = s.quadraticExtremum(t[1], e[1], i[1]);
          (r = Math.max(Math.min(r, 1), 0)), (a = Math.max(Math.min(a, 1), 0));
          var h = 1 - r,
            l = 1 - a,
            d = h * h * t[0] + 2 * h * r * e[0] + r * r * i[0],
            c = h * h * t[1] + 2 * h * r * e[1] + r * r * i[1],
            p = l * l * t[0] + 2 * l * a * e[0] + a * a * i[0],
            u = l * l * t[1] + 2 * l * a * e[1] + a * a * i[1];
          (o[0] = Math.min(t[0], i[0], d, p)),
            (o[1] = Math.min(t[1], i[1], c, u)),
            (n[0] = Math.max(t[0], i[0], d, p)),
            (n[1] = Math.max(t[1], i[1], c, u));
        }
        var n = t('./vector'),
          s = t('./curve'),
          r = n.create(),
          a = n.create(),
          h = n.create(),
          l = function (t, e, i, o, s, l, d, c) {
            if (Math.abs(o - s) >= 2 * Math.PI)
              return (
                (d[0] = t - i),
                (d[1] = e - i),
                (c[0] = t + i),
                void (c[1] = e + i)
              );
            if (
              ((r[0] = Math.cos(o) * i + t),
              (r[1] = Math.sin(o) * i + e),
              (a[0] = Math.cos(s) * i + t),
              (a[1] = Math.sin(s) * i + e),
              n.min(d, r, a),
              n.max(c, r, a),
              (o %= 2 * Math.PI),
              0 > o && (o += 2 * Math.PI),
              (s %= 2 * Math.PI),
              0 > s && (s += 2 * Math.PI),
              o > s && !l
                ? (s += 2 * Math.PI)
                : s > o && l && (o += 2 * Math.PI),
              l)
            ) {
              var p = s;
              (s = o), (o = p);
            }
            for (var u = 0; s > u; u += Math.PI / 2)
              u > o &&
                ((h[0] = Math.cos(u) * i + t),
                (h[1] = Math.sin(u) * i + e),
                n.min(d, h, d),
                n.max(c, h, c));
          };
        return (e.cubeBezier = i), (e.quadraticBezier = o), (e.arc = l), e;
      },
    ),
    i(
      'echarts/component/categoryAxis',
      [
        'require',
        './base',
        'zrender/shape/Text',
        'zrender/shape/Line',
        'zrender/shape/Rectangle',
        '../config',
        'zrender/tool/util',
        'zrender/tool/area',
        '../component',
      ],
      function (t) {
        function e(t, e, o, n, s, r) {
          if (n.data.length < 1)
            return void console.error('option.data.length < 1.');
          i.call(this, t, e, o, n, s), (this.grid = this.component.grid);
          for (var a in r) this[a] = r[a];
          this.refresh(n);
        }
        var i = t('./base'),
          o = t('zrender/shape/Text'),
          n = t('zrender/shape/Line'),
          s = t('zrender/shape/Rectangle'),
          r = t('../config');
        r.categoryAxis = {
          zlevel: 0,
          z: 0,
          show: !0,
          position: 'bottom',
          name: '',
          nameLocation: 'end',
          nameTextStyle: {},
          boundaryGap: !0,
          axisLine: {
            show: !0,
            onZero: !0,
            lineStyle: { color: '#48b', width: 2, type: 'solid' },
          },
          axisTick: {
            show: !0,
            interval: 'auto',
            inside: !1,
            length: 5,
            lineStyle: { color: '#333', width: 1 },
          },
          axisLabel: {
            show: !0,
            interval: 'auto',
            rotate: 0,
            margin: 8,
            textStyle: { color: '#333' },
          },
          splitLine: {
            show: !0,
            lineStyle: { color: ['#ccc'], width: 1, type: 'solid' },
          },
          splitArea: {
            show: !1,
            areaStyle: {
              color: ['rgba(250,250,250,0.3)', 'rgba(200,200,200,0.3)'],
            },
          },
        };
        var a = t('zrender/tool/util'),
          h = t('zrender/tool/area');
        return (
          (e.prototype = {
            type: r.COMPONENT_TYPE_AXIS_CATEGORY,
            _getReformedLabel: function (t) {
              var e = this.getDataFromOption(this.option.data[t]),
                i =
                  this.option.data[t].formatter ||
                  this.option.axisLabel.formatter;
              return (
                i &&
                  ('function' == typeof i
                    ? (e = i.call(this.myChart, e))
                    : 'string' == typeof i && (e = i.replace('{value}', e))),
                e
              );
            },
            _getInterval: function () {
              var t = this.option.axisLabel.interval;
              if ('auto' == t) {
                var e = this.option.axisLabel.textStyle.fontSize,
                  i = this.option.data,
                  o = this.option.data.length;
                if (this.isHorizontal())
                  if (o > 3) {
                    var n,
                      s,
                      r = this.getGap(),
                      l = !1,
                      d = Math.floor(0.5 / r);
                    for (
                      d = 1 > d ? 1 : d, t = Math.floor(15 / r);
                      !l && o > t;

                    ) {
                      (t += d), (l = !0), (n = Math.floor(r * t));
                      for (
                        var c = Math.floor((o - 1) / t) * t;
                        c >= 0;
                        c -= t
                      ) {
                        if (0 !== this.option.axisLabel.rotate) s = e;
                        else if (i[c].textStyle)
                          s = h.getTextWidth(
                            this._getReformedLabel(c),
                            this.getFont(
                              a.merge(
                                i[c].textStyle,
                                this.option.axisLabel.textStyle,
                              ),
                            ),
                          );
                        else {
                          var p = this._getReformedLabel(c) + '',
                            u = (p.match(/\w/g) || '').length,
                            g = p.length - u;
                          s = (u * e * 2) / 3 + g * e;
                        }
                        if (s > n) {
                          l = !1;
                          break;
                        }
                      }
                    }
                  } else t = 1;
                else if (o > 3) {
                  var r = this.getGap();
                  for (t = Math.floor(11 / r); e > r * t - 6 && o > t; ) t++;
                } else t = 1;
              } else t = 'function' == typeof t ? 1 : t - 0 + 1;
              return t;
            },
            _buildShape: function () {
              if (((this._interval = this._getInterval()), this.option.show)) {
                this.option.splitArea.show && this._buildSplitArea(),
                  this.option.splitLine.show && this._buildSplitLine(),
                  this.option.axisLine.show && this._buildAxisLine(),
                  this.option.axisTick.show && this._buildAxisTick(),
                  this.option.axisLabel.show && this._buildAxisLabel();
                for (var t = 0, e = this.shapeList.length; e > t; t++)
                  this.zr.addShape(this.shapeList[t]);
              }
            },
            _buildAxisTick: function () {
              var t,
                e = this.option.data,
                i = this.option.data.length,
                o = this.option.axisTick,
                s = o.length,
                r = o.lineStyle.color,
                a = o.lineStyle.width,
                h =
                  'function' == typeof o.interval
                    ? o.interval
                    : 'auto' == o.interval &&
                      'function' == typeof this.option.axisLabel.interval
                    ? this.option.axisLabel.interval
                    : !1,
                l = h
                  ? 1
                  : 'auto' == o.interval
                  ? this._interval
                  : o.interval - 0 + 1,
                d = o.onGap,
                c = d
                  ? this.getGap() / 2
                  : 'undefined' == typeof d && this.option.boundaryGap
                  ? this.getGap() / 2
                  : 0,
                p = c > 0 ? -l : 0;
              if (this.isHorizontal())
                for (
                  var u,
                    g =
                      'bottom' == this.option.position
                        ? o.inside
                          ? this.grid.getYend() - s - 1
                          : this.grid.getYend() + 1
                        : o.inside
                        ? this.grid.getY() + 1
                        : this.grid.getY() - s - 1,
                    f = p;
                  i > f;
                  f += l
                )
                  (!h || h(f, e[f])) &&
                    ((u = this.subPixelOptimize(
                      this.getCoordByIndex(f) + (f >= 0 ? c : 0),
                      a,
                    )),
                    (t = {
                      _axisShape: 'axisTick',
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: u,
                        yStart: g,
                        xEnd: u,
                        yEnd: g + s,
                        strokeColor: r,
                        lineWidth: a,
                      },
                    }),
                    this.shapeList.push(new n(t)));
              else
                for (
                  var m,
                    _ =
                      'left' == this.option.position
                        ? o.inside
                          ? this.grid.getX() + 1
                          : this.grid.getX() - s - 1
                        : o.inside
                        ? this.grid.getXend() - s - 1
                        : this.grid.getXend() + 1,
                    f = p;
                  i > f;
                  f += l
                )
                  (!h || h(f, e[f])) &&
                    ((m = this.subPixelOptimize(
                      this.getCoordByIndex(f) - (f >= 0 ? c : 0),
                      a,
                    )),
                    (t = {
                      _axisShape: 'axisTick',
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: _,
                        yStart: m,
                        xEnd: _ + s,
                        yEnd: m,
                        strokeColor: r,
                        lineWidth: a,
                      },
                    }),
                    this.shapeList.push(new n(t)));
            },
            _buildAxisLabel: function () {
              var t,
                e,
                i = this.option.data,
                n = this.option.data.length,
                s = this.option.axisLabel,
                r = s.rotate,
                h = s.margin,
                l = s.clickable,
                d = s.textStyle,
                c = 'function' == typeof s.interval ? s.interval : !1;
              if (this.isHorizontal()) {
                var p, u;
                'bottom' == this.option.position
                  ? ((p = this.grid.getYend() + h), (u = 'top'))
                  : ((p = this.grid.getY() - h), (u = 'bottom'));
                for (var g = 0; n > g; g += this._interval)
                  (c && !c(g, i[g])) ||
                    '' === this._getReformedLabel(g) ||
                    ((e = a.merge(i[g].textStyle || {}, d)),
                    (t = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase() + 3,
                      hoverable: !1,
                      style: {
                        x: this.getCoordByIndex(g),
                        y: p,
                        color: e.color,
                        text: this._getReformedLabel(g),
                        textFont: this.getFont(e),
                        textAlign: e.align || 'center',
                        textBaseline: e.baseline || u,
                      },
                    }),
                    r &&
                      ((t.style.textAlign =
                        r > 0
                          ? 'bottom' == this.option.position
                            ? 'right'
                            : 'left'
                          : 'bottom' == this.option.position
                          ? 'left'
                          : 'right'),
                      (t.rotation = [
                        (r * Math.PI) / 180,
                        t.style.x,
                        t.style.y,
                      ])),
                    this.shapeList.push(new o(this._axisLabelClickable(l, t))));
              } else {
                var f, m;
                'left' == this.option.position
                  ? ((f = this.grid.getX() - h), (m = 'right'))
                  : ((f = this.grid.getXend() + h), (m = 'left'));
                for (var g = 0; n > g; g += this._interval)
                  (c && !c(g, i[g])) ||
                    '' === this._getReformedLabel(g) ||
                    ((e = a.merge(i[g].textStyle || {}, d)),
                    (t = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase() + 3,
                      hoverable: !1,
                      style: {
                        x: f,
                        y: this.getCoordByIndex(g),
                        color: e.color,
                        text: this._getReformedLabel(g),
                        textFont: this.getFont(e),
                        textAlign: e.align || m,
                        textBaseline:
                          e.baseline || (0 === g && '' !== this.option.name)
                            ? 'bottom'
                            : g == n - 1 && '' !== this.option.name
                            ? 'top'
                            : 'middle',
                      },
                    }),
                    r &&
                      (t.rotation = [
                        (r * Math.PI) / 180,
                        t.style.x,
                        t.style.y,
                      ]),
                    this.shapeList.push(new o(this._axisLabelClickable(l, t))));
              }
            },
            _buildSplitLine: function () {
              var t,
                e = this.option.data,
                i = this.option.data.length,
                o = this.option.splitLine,
                s = o.lineStyle.type,
                r = o.lineStyle.width,
                a = o.lineStyle.color;
              a = a instanceof Array ? a : [a];
              var h = a.length,
                l =
                  'function' == typeof this.option.axisLabel.interval
                    ? this.option.axisLabel.interval
                    : !1,
                d = o.onGap,
                c = d
                  ? this.getGap() / 2
                  : 'undefined' == typeof d && this.option.boundaryGap
                  ? this.getGap() / 2
                  : 0;
              if (
                ((i -=
                  d || ('undefined' == typeof d && this.option.boundaryGap)
                    ? 1
                    : 0),
                this.isHorizontal())
              )
                for (
                  var p, u = this.grid.getY(), g = this.grid.getYend(), f = 0;
                  i > f;
                  f += this._interval
                )
                  (!l || l(f, e[f])) &&
                    ((p = this.subPixelOptimize(
                      this.getCoordByIndex(f) + c,
                      r,
                    )),
                    (t = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: p,
                        yStart: u,
                        xEnd: p,
                        yEnd: g,
                        strokeColor: a[(f / this._interval) % h],
                        lineType: s,
                        lineWidth: r,
                      },
                    }),
                    this.shapeList.push(new n(t)));
              else
                for (
                  var m, _ = this.grid.getX(), y = this.grid.getXend(), f = 0;
                  i > f;
                  f += this._interval
                )
                  (!l || l(f, e[f])) &&
                    ((m = this.subPixelOptimize(
                      this.getCoordByIndex(f) - c,
                      r,
                    )),
                    (t = {
                      zlevel: this.getZlevelBase(),
                      z: this.getZBase(),
                      hoverable: !1,
                      style: {
                        xStart: _,
                        yStart: m,
                        xEnd: y,
                        yEnd: m,
                        strokeColor: a[(f / this._interval) % h],
                        lineType: s,
                        lineWidth: r,
                      },
                    }),
                    this.shapeList.push(new n(t)));
            },
            _buildSplitArea: function () {
              var t,
                e = this.option.data,
                i = this.option.splitArea,
                o = i.areaStyle.color;
              if (o instanceof Array) {
                var n = o.length,
                  r = this.option.data.length,
                  a =
                    'function' == typeof this.option.axisLabel.interval
                      ? this.option.axisLabel.interval
                      : !1,
                  h = i.onGap,
                  l = h
                    ? this.getGap() / 2
                    : 'undefined' == typeof h && this.option.boundaryGap
                    ? this.getGap() / 2
                    : 0;
                if (this.isHorizontal())
                  for (
                    var d,
                      c = this.grid.getY(),
                      p = this.grid.getHeight(),
                      u = this.grid.getX(),
                      g = 0;
                    r >= g;
                    g += this._interval
                  )
                    (a && !a(g, e[g]) && r > g) ||
                      ((d =
                        r > g
                          ? this.getCoordByIndex(g) + l
                          : this.grid.getXend()),
                      (t = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        hoverable: !1,
                        style: {
                          x: u,
                          y: c,
                          width: d - u,
                          height: p,
                          color: o[(g / this._interval) % n],
                        },
                      }),
                      this.shapeList.push(new s(t)),
                      (u = d));
                else
                  for (
                    var f,
                      m = this.grid.getX(),
                      _ = this.grid.getWidth(),
                      y = this.grid.getYend(),
                      g = 0;
                    r >= g;
                    g += this._interval
                  )
                    (a && !a(g, e[g]) && r > g) ||
                      ((f =
                        r > g ? this.getCoordByIndex(g) - l : this.grid.getY()),
                      (t = {
                        zlevel: this.getZlevelBase(),
                        z: this.getZBase(),
                        hoverable: !1,
                        style: {
                          x: m,
                          y: f,
                          width: _,
                          height: y - f,
                          color: o[(g / this._interval) % n],
                        },
                      }),
                      this.shapeList.push(new s(t)),
                      (y = f));
              } else
                (t = {
                  zlevel: this.getZlevelBase(),
                  z: this.getZBase(),
                  hoverable: !1,
                  style: {
                    x: this.grid.getX(),
                    y: this.grid.getY(),
                    width: this.grid.getWidth(),
                    height: this.grid.getHeight(),
                    color: o,
                  },
                }),
                  this.shapeList.push(new s(t));
            },
            refresh: function (t) {
              t &&
                ((this.option = this.reformOption(t)),
                (this.option.axisLabel.textStyle = this.getTextStyle(
                  this.option.axisLabel.textStyle,
                ))),
                this.clear(),
                this._buildShape();
            },
            getGap: function () {
              var t = this.option.data.length,
                e = this.isHorizontal()
                  ? this.grid.getWidth()
                  : this.grid.getHeight();
              return this.option.boundaryGap ? e / t : e / (t > 1 ? t - 1 : 1);
            },
            getCoord: function (t) {
              for (
                var e = this.option.data,
                  i = e.length,
                  o = this.getGap(),
                  n = this.option.boundaryGap ? o / 2 : 0,
                  s = 0;
                i > s;
                s++
              ) {
                if (this.getDataFromOption(e[s]) == t)
                  return (n = this.isHorizontal()
                    ? this.grid.getX() + n
                    : this.grid.getYend() - n);
                n += o;
              }
            },
            getCoordByIndex: function (t) {
              if (0 > t)
                return this.isHorizontal()
                  ? this.grid.getX()
                  : this.grid.getYend();
              if (t > this.option.data.length - 1)
                return this.isHorizontal()
                  ? this.grid.getXend()
                  : this.grid.getY();
              var e = this.getGap(),
                i = this.option.boundaryGap ? e / 2 : 0;
              return (
                (i += t * e),
                (i = this.isHorizontal()
                  ? this.grid.getX() + i
                  : this.grid.getYend() - i)
              );
            },
            getNameByIndex: function (t) {
              return this.getDataFromOption(this.option.data[t]);
            },
            getIndexByName: function (t) {
              for (var e = this.option.data, i = e.length, o = 0; i > o; o++)
                if (this.getDataFromOption(e[o]) == t) return o;
              return -1;
            },
            getValueFromCoord: function () {
              return '';
            },
            isMainAxis: function (t) {
              return t % this._interval === 0;
            },
          }),
          a.inherits(e, i),
          t('../component').define('categoryAxis', e),
          e
        );
      },
    ),
    i(
      'echarts/util/shape/Cross',
      [
        'require',
        'zrender/shape/Base',
        'zrender/shape/Line',
        'zrender/tool/util',
        './normalIsCover',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('zrender/shape/Line'),
          n = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: 'cross',
            buildPath: function (t, e) {
              var i = e.rect;
              (e.xStart = i.x),
                (e.xEnd = i.x + i.width),
                (e.yStart = e.yEnd = e.y),
                o.prototype.buildPath(t, e),
                (e.xStart = e.xEnd = e.x),
                (e.yStart = i.y),
                (e.yEnd = i.y + i.height),
                o.prototype.buildPath(t, e);
            },
            getRect: function (t) {
              return t.rect;
            },
            isCover: t('./normalIsCover'),
          }),
          n.inherits(e, i),
          e
        );
      },
    ),
    i('echarts/util/date', [], function () {
      function t(t, e, i) {
        i = i > 1 ? i : 2;
        for (var o, n, s, r, a = 0, h = d.length; h > a; a++)
          if (
            ((o = d[a].value),
            (n = Math.ceil(e / o) * o - Math.floor(t / o) * o),
            Math.round(n / o) <= 1.2 * i)
          ) {
            (s = d[a].formatter), (r = d[a].value);
            break;
          }
        return (
          null == s &&
            ((s = 'year'),
            (o = 317088e5),
            (n = Math.ceil(e / o) * o - Math.floor(t / o) * o),
            (r = Math.round(n / (i - 1) / o) * o)),
          { formatter: s, gapValue: r }
        );
      }
      function e(t) {
        return 10 > t ? '0' + t : t;
      }
      function i(t, i) {
        ('week' == t ||
          'month' == t ||
          'quarter' == t ||
          'half-year' == t ||
          'year' == t) &&
          (t = 'MM - dd\nyyyy');
        var o = l(i),
          n = o.getFullYear(),
          s = o.getMonth() + 1,
          r = o.getDate(),
          a = o.getHours(),
          h = o.getMinutes(),
          d = o.getSeconds();
        return (
          (t = t.replace('MM', e(s))),
          (t = t.toLowerCase()),
          (t = t.replace('yyyy', n)),
          (t = t.replace('yy', n % 100)),
          (t = t.replace('dd', e(r))),
          (t = t.replace('d', r)),
          (t = t.replace('hh', e(a))),
          (t = t.replace('h', a)),
          (t = t.replace('mm', e(h))),
          (t = t.replace('m', h)),
          (t = t.replace('ss', e(d))),
          (t = t.replace('s', d))
        );
      }
      function o(t) {
        return (t = l(t)), t.setDate(t.getDate() + 8 - t.getDay()), t;
      }
      function n(t, e, i) {
        return (
          (t = l(t)),
          t.setMonth(Math.ceil((t.getMonth() + 1) / i) * i),
          t.setDate(e),
          t
        );
      }
      function s(t, e) {
        return n(t, e, 1);
      }
      function r(t, e) {
        return n(t, e, 3);
      }
      function a(t, e) {
        return n(t, e, 6);
      }
      function h(t, e) {
        return n(t, e, 12);
      }
      function l(t) {
        return t instanceof Date
          ? t
          : new Date('string' == typeof t ? t.replace(/-/g, '/') : t);
      }
      var d = [
        { formatter: 'hh : mm : ss', value: 1e3 },
        { formatter: 'hh : mm : ss', value: 5e3 },
        { formatter: 'hh : mm : ss', value: 1e4 },
        { formatter: 'hh : mm : ss', value: 15e3 },
        { formatter: 'hh : mm : ss', value: 3e4 },
        { formatter: 'hh : mm\nMM - dd', value: 6e4 },
        { formatter: 'hh : mm\nMM - dd', value: 3e5 },
        { formatter: 'hh : mm\nMM - dd', value: 6e5 },
        { formatter: 'hh : mm\nMM - dd', value: 9e5 },
        { formatter: 'hh : mm\nMM - dd', value: 18e5 },
        { formatter: 'hh : mm\nMM - dd', value: 36e5 },
        { formatter: 'hh : mm\nMM - dd', value: 72e5 },
        { formatter: 'hh : mm\nMM - dd', value: 216e5 },
        { formatter: 'hh : mm\nMM - dd', value: 432e5 },
        { formatter: 'MM - dd\nyyyy', value: 864e5 },
        { formatter: 'week', value: 6048e5 },
        { formatter: 'month', value: 26784e5 },
        { formatter: 'quarter', value: 8208e6 },
        { formatter: 'half-year', value: 16416e6 },
        { formatter: 'year', value: 32832e6 },
      ];
      return {
        getAutoFormatter: t,
        getNewDate: l,
        format: i,
        nextMonday: o,
        nextNthPerNmonth: n,
        nextNthOnMonth: s,
        nextNthOnQuarterYear: r,
        nextNthOnHalfYear: a,
        nextNthOnYear: h,
      };
    }),
    i('echarts/util/smartSteps', [], function () {
      function t(t) {
        return L.log(A(t)) / L.LN10;
      }
      function e(t) {
        return L.pow(10, t);
      }
      function i(t) {
        return t === E(t);
      }
      function o(t, e, o, n) {
        (x = n || {}),
          (v = x.steps || z),
          (b = x.secs || C),
          (o = w(+o || 0) % 99),
          (t = +t || 0),
          (e = +e || 0),
          (S = T = 0),
          'min' in x && ((t = +x.min || 0), (S = 1)),
          'max' in x && ((e = +x.max || 0), (T = 1)),
          t > e && (e = [t, (t = e)][0]);
        var s = e - t;
        if (S && T) return y(t, e, o);
        if ((o || 5) > s) {
          if (i(t) && i(e)) return u(t, e, o);
          if (0 === s) return g(t, e, o);
        }
        return l(t, e, o);
      }
      function n(t, i, o, n) {
        n = n || 0;
        var a = s((i - t) / o, -1),
          h = s(t, -1, 1),
          l = s(i, -1),
          d = L.min(a.e, h.e, l.e);
        0 === h.c ? (d = L.min(a.e, l.e)) : 0 === l.c && (d = L.min(a.e, h.e)),
          r(a, { c: 0, e: d }),
          r(h, a, 1),
          r(l, a),
          (n += d),
          (t = h.c),
          (i = l.c);
        for (var c = (i - t) / o, p = e(n), u = 0, g = [], f = o + 1; f--; )
          g[f] = (t + c * f) * p;
        if (0 > n) {
          (u = m(p)),
            (c = +(c * p).toFixed(u)),
            (t = +(t * p).toFixed(u)),
            (i = +(i * p).toFixed(u));
          for (var f = g.length; f--; )
            (g[f] = g[f].toFixed(u)), 0 === +g[f] && (g[f] = '0');
        } else (t *= p), (i *= p), (c *= p);
        return (
          (b = 0),
          (v = 0),
          (x = 0),
          { min: t, max: i, secs: o, step: c, fix: u, exp: n, pnts: g }
        );
      }
      function s(o, n, s) {
        (n = w(n % 10) || 2),
          0 > n &&
            (i(o)
              ? (n = ('' + A(o)).replace(/0+$/, '').length || 1)
              : ((o = o.toFixed(15).replace(/0+$/, '')),
                (n = o.replace('.', '').replace(/^[-0]+/, '').length),
                (o = +o)));
        var r = E(t(o)) - n + 1,
          a = +(o * e(-r)).toFixed(15) || 0;
        return (
          (a = s ? E(a) : M(a)),
          !a && (r = 0),
          ('' + A(a)).length > n && ((r += 1), (a /= 10)),
          { c: a, e: r }
        );
      }
      function r(t, i, o) {
        var n = i.e - t.e;
        n && ((t.e += n), (t.c *= e(-n)), (t.c = o ? E(t.c) : M(t.c)));
      }
      function a(t, e, i) {
        t.e < e.e ? r(e, t, i) : r(t, e, i);
      }
      function h(t, e) {
        (e = e || z), (t = s(t));
        for (var i = t.c, o = 0; i > e[o]; ) o++;
        if (!e[o]) for (i /= 10, t.e += 1, o = 0; i > e[o]; ) o++;
        return (t.c = e[o]), t;
      }
      function l(t, e, o) {
        var a,
          l = o || +b.slice(-1),
          g = h((e - t) / l, v),
          m = s(e - t),
          y = s(t, -1, 1),
          x = s(e, -1);
        if (
          (r(m, g),
          r(y, g, 1),
          r(x, g),
          o ? (a = c(y, x, l)) : (l = d(y, x)),
          i(t) && i(e) && t * e >= 0)
        ) {
          if (l > e - t) return u(t, e, l);
          l = p(t, e, o, y, x, l);
        }
        var z = f(t, e, y.c, x.c);
        return (
          (y.c = z[0]),
          (x.c = z[1]),
          (S || T) && _(t, e, y, x),
          n(y.c, x.c, l, x.e)
        );
      }
      function d(t, i) {
        for (var o, n, s, r, a = [], l = b.length; l--; )
          (o = b[l]),
            (n = h((i.c - t.c) / o, v)),
            (n = n.c * e(n.e)),
            (s = E(t.c / n) * n),
            (r = M(i.c / n) * n),
            (a[l] = { min: s, max: r, step: n, span: r - s });
        return (
          a.sort(function (t, e) {
            var i = t.span - e.span;
            return 0 === i && (i = t.step - e.step), i;
          }),
          (a = a[0]),
          (o = a.span / a.step),
          (t.c = a.min),
          (i.c = a.max),
          3 > o ? 2 * o : o
        );
      }
      function c(t, i, o) {
        for (var n, s, r = i.c, a = (i.c - t.c) / o - 1; r > t.c; )
          (a = h(a + 1, v)),
            (a = a.c * e(a.e)),
            (n = a * o),
            (s = M(i.c / a) * a),
            (r = s - n);
        var l = t.c - r,
          d = s - i.c,
          c = l - d;
        return (
          c > 1.1 * a && ((c = w(c / a / 2) * a), (r += c), (s += c)),
          (t.c = r),
          (i.c = s),
          a
        );
      }
      function p(t, o, n, s, r, a) {
        var h = r.c - s.c,
          l = (h / a) * e(r.e);
        if (
          !i(l) &&
          ((l = E(l)),
          (h = l * a),
          o - t > h &&
            ((l += 1),
            (h = l * a),
            !n && l * (a - 1) >= o - t && ((a -= 1), (h = l * a))),
          h >= o - t)
        ) {
          var d = h - (o - t);
          (s.c = w(t - d / 2)), (r.c = w(o + d / 2)), (s.e = 0), (r.e = 0);
        }
        return a;
      }
      function u(t, e, i) {
        if (((i = i || 5), S)) e = t + i;
        else if (T) t = e - i;
        else {
          var o = i - (e - t),
            s = w(t - o / 2),
            r = w(e + o / 2),
            a = f(t, e, s, r);
          (t = a[0]), (e = a[1]);
        }
        return n(t, e, i);
      }
      function g(t, e, i) {
        i = i || 5;
        var o = L.min(A(e / i), i) / 2.1;
        return (
          S ? (e = t + o) : T ? (t = e - o) : ((t -= o), (e += o)), l(t, e, i)
        );
      }
      function f(t, e, i, o) {
        return (
          t >= 0 && 0 > i
            ? ((o -= i), (i = 0))
            : 0 >= e && o > 0 && ((i -= o), (o = 0)),
          [i, o]
        );
      }
      function m(t) {
        return (
          (t = (+t).toFixed(15).split('.')), t.pop().replace(/0+$/, '').length
        );
      }
      function _(t, e, i, o) {
        if (S) {
          var n = s(t, 4, 1);
          i.e - n.e > 6 && (n = { c: 0, e: i.e }),
            a(i, n),
            a(o, n),
            (o.c += n.c - i.c),
            (i.c = n.c);
        } else if (T) {
          var r = s(e, 4);
          o.e - r.e > 6 && (r = { c: 0, e: o.e }),
            a(i, r),
            a(o, r),
            (i.c += r.c - o.c),
            (o.c = r.c);
        }
      }
      function y(t, e, i) {
        var o = i ? [i] : b,
          a = e - t;
        if (0 === a)
          return (
            (e = s(e, 3)),
            (i = o[0]),
            (e.c = w(e.c + i / 2)),
            n(e.c - i, e.c, i, e.e)
          );
        A(e / a) < 1e-6 && (e = 0), A(t / a) < 1e-6 && (t = 0);
        var h,
          l,
          d,
          c = [
            [5, 10],
            [10, 2],
            [50, 10],
            [100, 2],
          ],
          p = [],
          u = [],
          g = s(e - t, 3),
          f = s(t, -1, 1),
          m = s(e, -1);
        r(f, g, 1), r(m, g), (a = m.c - f.c), (g.c = a);
        for (var _ = o.length; _--; ) {
          (i = o[_]),
            (h = M(a / i)),
            (l = h * i - a),
            (d = 3 * (l + 3)),
            (d += 2 * (i - o[0] + 2)),
            i % 5 === 0 && (d -= 10);
          for (var y = c.length; y--; ) h % c[y][0] === 0 && (d /= c[y][1]);
          (u[_] = [i, h, l, d].join()),
            (p[_] = { secs: i, step: h, delta: l, score: d });
        }
        return (
          p.sort(function (t, e) {
            return t.score - e.score;
          }),
          (p = p[0]),
          (f.c = w(f.c - p.delta / 2)),
          (m.c = w(m.c + p.delta / 2)),
          n(f.c, m.c, p.secs, g.e)
        );
      }
      var x,
        v,
        b,
        S,
        T,
        z = [10, 20, 25, 50],
        C = [4, 5, 6],
        L = Math,
        w = L.round,
        E = L.floor,
        M = L.ceil,
        A = L.abs;
      return o;
    }),
    i('echarts/util/smartLogSteps', ['require', './number'], function (t) {
      function e(t) {
        return i(), (m = t || {}), o(), n(), [s(), i()][0];
      }
      function i() {
        p = m = y = f = x = v = _ = b = u = g = null;
      }
      function o() {
        (u = m.logLabelBase),
          null == u
            ? ((g = 'plain'), (u = 10), (f = A))
            : ((u = +u), 1 > u && (u = 10), (g = 'exponent'), (f = z(u))),
          (_ = m.splitNumber),
          null == _ && (_ = P);
        var t = parseFloat(m.dataMin),
          e = parseFloat(m.dataMax);
        isFinite(t) || isFinite(e)
          ? isFinite(t)
            ? isFinite(e)
              ? t > e && (e = [t, (t = e)][0])
              : (e = t)
            : (t = e)
          : (t = e = 1),
          (p = m.logPositive),
          null == p && (p = e > 0 || 0 === t),
          (x = p ? t : -e),
          (v = p ? e : -t),
          I > x && (x = I),
          I > v && (v = I);
      }
      function n() {
        function t() {
          _ > d && (_ = d);
          var t = E(h(d / _)),
            e = w(h(d / t)),
            i = t * e,
            o = (i - p) / 2,
            n = E(h(r - o));
          c(n - r) && (n -= 1), (y = -n * f);
          for (var a = n; s >= a - t; a += t) b.push(C(u, a));
        }
        function e() {
          for (
            var t = i(l, 0), e = t + 2;
            e > t && n(t + 1) + o(t + 1) * O < r;

          )
            t++;
          for (
            var h = i(a, 0), e = h - 2;
            h > e && n(h - 1) + o(h - 1) * O > s;

          )
            h--;
          y = -(n(t) * A + o(t) * k);
          for (var d = t; h >= d; d++) {
            var c = n(d),
              p = o(d);
            b.push(C(10, c) * C(2, p));
          }
        }
        function i(t, e) {
          return 3 * t + e;
        }
        function o(t) {
          return t - 3 * n(t);
        }
        function n(t) {
          return E(h(t / 3));
        }
        b = [];
        var s = h(z(v) / f),
          r = h(z(x) / f),
          a = w(s),
          l = E(r),
          d = a - l,
          p = s - r;
        'exponent' === g ? t() : R >= d && _ > R ? e() : t();
      }
      function s() {
        for (var t = [], e = 0, i = b.length; i > e; e++)
          t[e] = (p ? 1 : -1) * b[e];
        !p && t.reverse();
        var o = a(),
          n = o.value2Coord,
          s = n(t[0]),
          h = n(t[t.length - 1]);
        return (
          s === h && ((s -= 1), (h += 1)),
          {
            dataMin: s,
            dataMax: h,
            tickList: t,
            logPositive: p,
            labelFormatter: r(),
            dataMappingMethods: o,
          }
        );
      }
      function r() {
        if ('exponent' === g) {
          var t = u,
            e = f;
          return function (i) {
            if (!isFinite(parseFloat(i))) return '';
            var o = '';
            return 0 > i && ((i = -i), (o = '-')), o + t + d(z(i) / e);
          };
        }
        return function (t) {
          return isFinite(parseFloat(t)) ? S.addCommas(l(t)) : '';
        };
      }
      function a() {
        var t = p,
          e = y;
        return {
          value2Coord: function (i) {
            return null == i || isNaN(i) || !isFinite(i)
              ? i
              : ((i = parseFloat(i)),
                isFinite(i)
                  ? t && I > i
                    ? (i = I)
                    : !t && i > -I && (i = -I)
                  : (i = I),
                (i = L(i)),
                (t ? 1 : -1) * (z(i) + e));
          },
          coord2Value: function (i) {
            return null == i || isNaN(i) || !isFinite(i)
              ? i
              : ((i = parseFloat(i)),
                isFinite(i) || (i = I),
                t ? C(M, i - e) : -C(M, -i + e));
          },
        };
      }
      function h(t) {
        return +Number(+t).toFixed(14);
      }
      function l(t) {
        return Number(t)
          .toFixed(15)
          .replace(/\.?0*$/, '');
      }
      function d(t) {
        t = l(Math.round(t));
        for (var e = [], i = 0, o = t.length; o > i; i++) {
          var n = t.charAt(i);
          e.push(D[n] || '');
        }
        return e.join('');
      }
      function c(t) {
        return t > -I && I > t;
      }
      var p,
        u,
        g,
        f,
        m,
        _,
        y,
        x,
        v,
        b,
        S = t('./number'),
        T = Math,
        z = T.log,
        C = T.pow,
        L = T.abs,
        w = T.ceil,
        E = T.floor,
        M = T.E,
        A = T.LN10,
        k = T.LN2,
        O = k / A,
        I = 1e-9,
        P = 5,
        R = 2,
        D = {
          0: '⁰',
          1: '¹',
          2: '²',
          3: '³',
          4: '⁴',
          5: '⁵',
          6: '⁶',
          7: '⁷',
          8: '⁸',
          9: '⁹',
          '-': '⁻',
        };
      return e;
    }),
    i(
      'echarts/util/shape/Candle',
      ['require', 'zrender/shape/Base', 'zrender/tool/util', './normalIsCover'],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: 'candle',
            _numberOrder: function (t, e) {
              return e - t;
            },
            buildPath: function (t, e) {
              var i = o.clone(e.y).sort(this._numberOrder);
              t.moveTo(e.x, i[3]),
                t.lineTo(e.x, i[2]),
                t.moveTo(e.x - e.width / 2, i[2]),
                t.rect(e.x - e.width / 2, i[2], e.width, i[1] - i[2]),
                t.moveTo(e.x, i[1]),
                t.lineTo(e.x, i[0]);
            },
            getRect: function (t) {
              if (!t.__rect) {
                var e = 0;
                ('stroke' == t.brushType || 'fill' == t.brushType) &&
                  (e = t.lineWidth || 1);
                var i = o.clone(t.y).sort(this._numberOrder);
                t.__rect = {
                  x: Math.round(t.x - t.width / 2 - e / 2),
                  y: Math.round(i[3] - e / 2),
                  width: t.width + e,
                  height: i[0] - i[3] + e,
                };
              }
              return t.__rect;
            },
            isCover: t('./normalIsCover'),
          }),
          o.inherits(e, i),
          e
        );
      },
    ),
    i(
      'echarts/util/shape/HandlePolygon',
      [
        'require',
        'zrender/shape/Base',
        'zrender/shape/Polygon',
        'zrender/tool/util',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('zrender/shape/Polygon'),
          n = t('zrender/tool/util');
        return (
          (e.prototype = {
            type: 'handle-polygon',
            buildPath: function (t, e) {
              o.prototype.buildPath(t, e);
            },
            isCover: function (t, e) {
              var i = this.transformCoordToLocal(t, e);
              (t = i[0]), (e = i[1]);
              var o = this.style.rect;
              return t >= o.x &&
                t <= o.x + o.width &&
                e >= o.y &&
                e <= o.y + o.height
                ? !0
                : !1;
            },
          }),
          n.inherits(e, i),
          e
        );
      },
    ),
    i(
      'echarts/util/shape/Chain',
      [
        'require',
        'zrender/shape/Base',
        './Icon',
        'zrender/shape/util/dashedLineTo',
        'zrender/tool/util',
        'zrender/tool/matrix',
      ],
      function (t) {
        function e(t) {
          i.call(this, t);
        }
        var i = t('zrender/shape/Base'),
          o = t('./Icon'),
          n = t('zrender/shape/util/dashedLineTo'),
          s = t('zrender/tool/util'),
          r = t('zrender/tool/matrix');
        return (
          (e.prototype = {
            type: 'chain',
            brush: function (t, e) {
              var i = this.style;
              e && (i = this.getHighlightStyle(i, this.highlightStyle || {})),
                t.save(),
                this.setContext(t, i),
                this.setTransform(t),
                t.save(),
                t.beginPath(),
                this.buildLinePath(t, i),
                t.stroke(),
                t.restore(),
                this.brushSymbol(t, i),
                t.restore();
            },
            buildLinePath: function (t, e) {
              var i = e.x,
                o = e.y + 5,
                s = e.width,
                r = e.height / 2 - 10;
              if (
                (t.moveTo(i, o),
                t.lineTo(i, o + r),
                t.moveTo(i + s, o),
                t.lineTo(i + s, o + r),
                t.moveTo(i, o + r / 2),
                e.lineType && 'solid' != e.lineType)
              ) {
                if ('dashed' == e.lineType || 'dotted' == e.lineType) {
                  var a = (e.lineWidth || 1) * ('dashed' == e.lineType ? 5 : 1);
                  n(t, i, o + r / 2, i + s, o + r / 2, a);
                }
              } else t.lineTo(i + s, o + r / 2);
            },
            brushSymbol: function (t, e) {
              var i = e.y + e.height / 4;
              t.save();
              for (var n, s = e.chainPoint, r = 0, a = s.length; a > r; r++) {
                if (((n = s[r]), 'none' != n.symbol)) {
                  t.beginPath();
                  var h = n.symbolSize;
                  o.prototype.buildPath(t, {
                    iconType: n.symbol,
                    x: n.x - h,
                    y: i - h,
                    width: 2 * h,
                    height: 2 * h,
                    n: n.n,
                  }),
                    (t.fillStyle = n.isEmpty ? '#fff' : e.strokeColor),
                    t.closePath(),
                    t.fill(),
                    t.stroke();
                }
                n.showLabel &&
                  ((t.font = n.textFont),
                  (t.fillStyle = n.textColor),
                  (t.textAlign = n.textAlign),
                  (t.textBaseline = n.textBaseline),
                  n.rotation
                    ? (t.save(),
                      this._updateTextTransform(t, n.rotation),
                      t.fillText(n.name, n.textX, n.textY),
                      t.restore())
                    : t.fillText(n.name, n.textX, n.textY));
              }
              t.restore();
            },
            _updateTextTransform: function (t, e) {
              var i = r.create();
              if ((r.identity(i), 0 !== e[0])) {
                var o = e[1] || 0,
                  n = e[2] || 0;
                (o || n) && r.translate(i, i, [-o, -n]),
                  r.rotate(i, i, e[0]),
                  (o || n) && r.translate(i, i, [o, n]);
              }
              t.transform.apply(t, i);
            },
            isCover: function (t, e) {
              var i = this.style;
              return t >= i.x &&
                t <= i.x + i.width &&
                e >= i.y &&
                e <= i.y + i.height
                ? !0
                : !1;
            },
          }),
          s.inherits(e, i),
          e
        );
      },
    ),
    i('zrender', ['zrender/zrender'], function (t) {
      return t;
    }),
    i('echarts', ['echarts/echarts'], function (t) {
      return t;
    });
  var o = e('zrender');
  (o.tool = {
    color: e('zrender/tool/color'),
    math: e('zrender/tool/math'),
    util: e('zrender/tool/util'),
    vector: e('zrender/tool/vector'),
    area: e('zrender/tool/area'),
    event: e('zrender/tool/event'),
  }),
    (o.animation = {
      Animation: e('zrender/animation/Animation'),
      Cip: e('zrender/animation/Clip'),
      easing: e('zrender/animation/easing'),
    });
  var n = e('echarts');
  return (
    (n.config = e('echarts/config')),
    e('echarts/chart/bar'),
    e('echarts/chart/line'),
    e('echarts/chart/pie'),
    e('echarts/chart/scatter'),
    e('echarts/chart/gauge'),
    e('echarts/chart/funnel'),
    (t.echarts = n),
    (t.zrender = o),
    n
  );
})(window);
