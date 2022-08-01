/*
jQWidgets v14.0.0 (2022-May)
Copyright (c) 2011-2022 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function (f) {
  f.jqx.timeSpan = function () {
    var q = {
      ticksPerMillisecond: 10000,
      millisecondsPerTick: 1 / 10000,
      ticksPerSecond: 1000 * 10000,
      secondsPerTick: 1 / (1000 * 10000),
      ticksPerMinute: 1000 * 10000 * 60,
      minutesPerTick: 1 / (1000 * 10000 * 60),
      ticksPerHour: 1000 * 10000 * 3600,
      hoursPerTick: 1 / (1000 * 10000 * 3600),
      ticksPerDay: 1000 * 10000 * 3600 * 24,
      daysPerTick: 1 / (1000 * 10000 * 3600 * 24),
      millisPerSecond: 1000,
      millisPerMinute: 1000 * 60,
      millisPerHour: 1000 * 60 * 60,
      millisPerDay: 1000 * 60 * 60 * 24,
      _ticks: 0,
    };
    f.extend(true, this, q);
    var r = this;
    r.ticks = function () {
      return r._ticks;
    };
    r.days = function () {
      return parseInt(r._ticks / r.ticksPerDay);
    };
    r.timeToMS = function (v, z, x, w) {
      var y = v * 3600 + z * 60 + x + w / 1000;
      return parseInt(y * r.ticksPerSecond);
    };
    r.hours = function () {
      return parseInt(r._ticks / r.ticksPerHour) % 24;
    };
    r.milliseconds = function () {
      return parseInt(r._ticks / r.ticksPerMillisecond) % 1000;
    };
    r.minutes = function () {
      return parseInt(r._ticks / r.ticksPerMinute) % 60;
    };
    r.seconds = function () {
      return parseInt(r._ticks / r.ticksPerSecond) % 60;
    };
    r.totalDays = function () {
      return parseInt(r._ticks * r.daysPerTick);
    };
    r.totalHours = function () {
      return parseInt(r._ticks * r.hoursPerTick);
    };
    r.totalMilliseconds = function () {
      var v = r._ticks * r.millisecondsPerTick;
      return parseInt(v);
    };
    r.totalMinutes = function () {
      return parseInt(r._ticks * r.minutesPerTick);
    };
    r.totalSeconds = function () {
      return parseInt(r._ticks * r.secondsPerTick);
    };
    if (arguments.length === 1) {
      r._ticks = arguments[0];
    } else {
      if (arguments.length === 3) {
        r._ticks = r.timeToMS(arguments[0], arguments[1], arguments[2]);
      } else {
        if (arguments.length === 4) {
          var u = arguments[0];
          var n = arguments[1];
          var p = arguments[2];
          var t = arguments[3];
          var o = 0;
          var s = (u * 3600 * 24 + n * 3600 + p * 60 + t) * 1000 + o;
          r._ticks = s * r.ticksPerMillisecond;
        } else {
          if (arguments.length === 5) {
            var u = arguments[0];
            var n = arguments[1];
            var p = arguments[2];
            var t = arguments[3];
            var o = arguments[4];
            var s = (u * 3600 * 24 + n * 3600 + p * 60 + t) * 1000 + o;
            r._ticks = s * r.ticksPerMillisecond;
          }
        }
      }
    }
    r.add = function (w) {
      var v = r._ticks + w._ticks;
      var x = new f.jqx.timeSpan(v);
      return x;
    };
    r.substract = function (w) {
      var v = r._ticks - w._ticks;
      return new f.jqx.timeSpan(v);
    };
    r.duration = function () {
      if (r._ticks >= 0) {
        return new f.jqx.timeSpan(r._ticks);
      } else {
        return new f.jqx.timeSpan(-r._ticks);
      }
    };
    r.equals = function (v) {
      return r._ticks == v._ticks;
    };
    r.valueOf = function () {
      return r._ticks;
    };
    r.compare = function (w, v) {
      if (w._ticks > v._ticks) {
        return 1;
      }
      if (w._ticks < v._ticks) {
        return -1;
      }
      return 0;
    };
    r.interval = function (x, y) {
      var w = x * y;
      var v = w + (x >= 0 ? 0.5 : -0.5);
      return new f.jqx.timeSpan(v * r.ticksPerMillisecond);
    };
    r.fromDays = function (v) {
      return r.interval(v, r.millisPerDay);
    };
    r.fromHours = function (v) {
      return r.interval(v, r.millisPerHour);
    };
    r.fromMilliseconds = function (v) {
      return r.interval(v, 1);
    };
    r.fromMinutes = function (v) {
      return r.interval(v, r.millisPerMinute);
    };
    r.fromSeconds = function (v) {
      return r.interval(v, r.millisPerSecond);
    };
    r.fromTicks = function (v) {
      return new f.jqx.timeSpan(v);
    };
    return r;
  };
  var g = [
    {
      id: "Local",
      offset: 0,
      offsetHours: 0,
      displayName: "",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Dateline Standard Time",
      offset: -720,
      offsetHours: -12,
      displayName: "(UTC-12:00) International Date Line West",
      supportsDaylightSavingTime: false,
    },
    {
      id: "UTC-11",
      offset: -660,
      offsetHours: -11,
      displayName: "(UTC-11:00) Coordinated Universal Time-11",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Hawaiteratoran Standard Time",
      offset: -600,
      offsetHours: -10,
      displayName: "(UTC-10:00) Hawaiterator",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Alaskan Standard Time",
      offset: -540,
      offsetHours: -9,
      displayName: "(UTC-09:00) Alaska",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Pacific Standard Time (Mexico)",
      offset: -480,
      offsetHours: -8,
      displayName: "(UTC-08:00) Baja California",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Pacific Standard Time",
      offset: -480,
      offsetHours: -8,
      displayName: "(UTC-08:00) Pacific Time (US & Canada)",
      supportsDaylightSavingTime: true,
    },
    {
      id: "US Mountain Standard Time",
      offset: -420,
      offsetHours: -7,
      displayName: "(UTC-07:00) Arizona",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Mountain Standard Time (Mexico)",
      offset: -420,
      offsetHours: -7,
      displayName: "(UTC-07:00) Chihuahua, La Paz, Mazatlan",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Mountain Standard Time",
      offset: -420,
      offsetHours: -7,
      displayName: "(UTC-07:00) Mountain Time (US & Canada)",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Central Standard Time",
      offset: -360,
      offsetHours: -6,
      displayName: "(UTC-06:00) Central Time (US & Canada)",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Central America Standard Time",
      offset: -360,
      offsetHours: -6,
      displayName: "(UTC-06:00) Central America",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Canada Central Standard Time",
      offset: -360,
      offsetHours: -6,
      displayName: "(UTC-06:00) Saskatchewan",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Central Standard Time (Mexico)",
      offset: -360,
      offsetHours: -6,
      displayName: "(UTC-06:00) Guadalajara, Mexico City, Monterrey",
      supportsDaylightSavingTime: true,
    },
    {
      id: "SA Pacific Standard Time",
      offset: -300,
      offsetHours: -5,
      displayName: "(UTC-05:00) Bogota, Lima, Quito, Rio Branco",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Eastern Standard Time",
      offset: -300,
      offsetHours: -5,
      displayName: "(UTC-05:00) Eastern Time (US & Canada)",
      supportsDaylightSavingTime: true,
    },
    {
      id: "US Eastern Standard Time",
      offset: -300,
      offsetHours: -5,
      displayName: "(UTC-05:00) Indiana (East)",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Venezuela Standard Time",
      offset: -270,
      offsetHours: -4.5,
      displayName: "(UTC-04:30) Caracas",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Atlantic Standard Time",
      offset: -240,
      offsetHours: -4,
      displayName: "(UTC-04:00) Atlantic Time (Canada)",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Paraguay Standard Time",
      offset: -240,
      offsetHours: -4,
      displayName: "(UTC-04:00) Asuncion",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Central Brazilian Standard Time",
      offset: -240,
      offsetHours: -4,
      displayName: "(UTC-04:00) Cuiaba",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Pacific SA Standard Time",
      offset: -240,
      offsetHours: -4,
      displayName: "(UTC-04:00) Santiago",
      supportsDaylightSavingTime: true,
    },
    {
      id: "SA Western Standard Time",
      offset: -240,
      offsetHours: -4,
      displayName: "(UTC-04:00) Georgetown, La Paz, Manaus, San Juan",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Newfoundland Standard Time",
      offset: -210,
      offsetHours: -3.5,
      displayName: "(UTC-03:30) Newfoundland",
      supportsDaylightSavingTime: true,
    },
    {
      id: "SA Eastern Standard Time",
      offset: -180,
      offsetHours: -3,
      displayName: "(UTC-03:00) Cayenne, Fortaleza",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Argentina Standard Time",
      offset: -180,
      offsetHours: -3,
      displayName: "(UTC-03:00) Buenos Aires",
      supportsDaylightSavingTime: true,
    },
    {
      id: "E. South America Standard Time",
      offset: -180,
      offsetHours: -3,
      displayName: "(UTC-03:00) Brasilia",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Bahia Standard Time",
      offset: -180,
      offsetHours: -3,
      displayName: "(UTC-03:00) Salvador",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Montevideo Standard Time",
      offset: -180,
      offsetHours: -3,
      displayName: "(UTC-03:00) Montevideo",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Greenland Standard Time",
      offset: -180,
      offsetHours: -3,
      displayName: "(UTC-03:00) Greenland",
      supportsDaylightSavingTime: true,
    },
    {
      id: "UTC-02",
      offset: -120,
      offsetHours: -2,
      displayName: "(UTC-02:00) Coordinated Universal Time-02",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Mid-Atlantic Standard Time",
      offset: -120,
      offsetHours: -2,
      displayName: "(UTC-02:00) Mid-Atlantic - Old",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Azores Standard Time",
      offset: -60,
      offsetHours: -1,
      displayName: "(UTC-01:00) Azores",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Cape Verde Standard Time",
      offset: -60,
      offsetHours: -1,
      displayName: "(UTC-01:00) Cape Verde Is.",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Morocco Standard Time",
      offset: 0,
      offsetHours: 0,
      displayName: "(UTC) Casablanca",
      supportsDaylightSavingTime: true,
    },
    {
      id: "UTC",
      offset: 0,
      offsetHours: 0,
      displayName: "(UTC) Coordinated Universal Time",
      supportsDaylightSavingTime: false,
    },
    {
      id: "GMT Standard Time",
      offset: 0,
      offsetHours: 0,
      displayName: "(UTC) Dublin, Edinburgh, Lisbon, London",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Greenwich Standard Time",
      offset: 0,
      offsetHours: 0,
      displayName: "(UTC) Monrovia, Reykjavik",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Central European Standard Time",
      offset: 60,
      offsetHours: 1,
      displayName: "(UTC+01:00) Sarajevo, Skopje, Warsaw, Zagreb",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Namibia Standard Time",
      offset: 60,
      offsetHours: 1,
      displayName: "(UTC+01:00) Windhoek",
      supportsDaylightSavingTime: true,
    },
    {
      id: "W. Central Africa Standard Time",
      offset: 60,
      offsetHours: 1,
      displayName: "(UTC+01:00) West Central Africa",
      supportsDaylightSavingTime: false,
    },
    {
      id: "W. Europe Standard Time",
      offset: 60,
      offsetHours: 1,
      displayName:
        "(UTC+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Central Europe Standard Time",
      offset: 60,
      offsetHours: 1,
      displayName:
        "(UTC+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Romance Standard Time",
      offset: 60,
      offsetHours: 1,
      displayName: "(UTC+01:00) Brussels, Copenhagen, Madrid, Paris",
      supportsDaylightSavingTime: true,
    },
    {
      id: "FLE Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius",
      supportsDaylightSavingTime: true,
    },
    {
      id: "South Africa Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Harare, Pretoria",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Turkey Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Istanbul",
      supportsDaylightSavingTime: true,
    },
    {
      id: "GTB Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Athens, Bucharest",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Libya Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Tripoli",
      supportsDaylightSavingTime: true,
    },
    {
      id: "E. Europe Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) E. Europe",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Jordan Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Amman",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Middle East Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Beirut",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Egypt Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Cairo",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Syria Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Damascus",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Israel Standard Time",
      offset: 120,
      offsetHours: 2,
      displayName: "(UTC+02:00) Jerusalem",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Arab Standard Time",
      offset: 180,
      offsetHours: 3,
      displayName: "(UTC+03:00) Kuwait, Riyadh",
      supportsDaylightSavingTime: false,
    },
    {
      id: "E. Africa Standard Time",
      offset: 180,
      offsetHours: 3,
      displayName: "(UTC+03:00) Nairobi",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Arabic Standard Time",
      offset: 180,
      offsetHours: 3,
      displayName: "(UTC+03:00) Baghdad",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Kaliningrad Standard Time",
      offset: 180,
      offsetHours: 3,
      displayName: "(UTC+03:00) Kaliningrad, Minsk",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Iran Standard Time",
      offset: 210,
      offsetHours: 3.5,
      displayName: "(UTC+03:30) Tehran",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Mauritius Standard Time",
      offset: 240,
      offsetHours: 4,
      displayName: "(UTC+04:00) Port Louis",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Georgian Standard Time",
      offset: 240,
      offsetHours: 4,
      displayName: "(UTC+04:00) Tbilisi",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Caucasus Standard Time",
      offset: 240,
      offsetHours: 4,
      displayName: "(UTC+04:00) Yerevan",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Arabian Standard Time",
      offset: 240,
      offsetHours: 4,
      displayName: "(UTC+04:00) Abu Dhabi, Muscat",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Azerbaijan Standard Time",
      offset: 240,
      offsetHours: 4,
      displayName: "(UTC+04:00) Baku",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Russian Standard Time",
      offset: 240,
      offsetHours: 4,
      displayName: "(UTC+04:00) Moscow, St. Petersburg, Volgograd",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Afghanistan Standard Time",
      offset: 270,
      offsetHours: 4.5,
      displayName: "(UTC+04:30) Kabul",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Pakistan Standard Time",
      offset: 300,
      offsetHours: 5,
      displayName: "(UTC+05:00) Islamabad, Karachi",
      supportsDaylightSavingTime: true,
    },
    {
      id: "West Asia Standard Time",
      offset: 300,
      offsetHours: 5,
      displayName: "(UTC+05:00) Ashgabat, Tashkent",
      supportsDaylightSavingTime: false,
    },
    {
      id: "India Standard Time",
      offset: 330,
      offsetHours: 5.5,
      displayName: "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Sri Lanka Standard Time",
      offset: 330,
      offsetHours: 5.5,
      displayName: "(UTC+05:30) Sri Jayawardenepura",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Nepal Standard Time",
      offset: 345,
      offsetHours: 5.75,
      displayName: "(UTC+05:45) Kathmandu",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Central Asia Standard Time",
      offset: 360,
      offsetHours: 6,
      displayName: "(UTC+06:00) Astana",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Bangladesh Standard Time",
      offset: 360,
      offsetHours: 6,
      displayName: "(UTC+06:00) Dhaka",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Ekaterinburg Standard Time",
      offset: 360,
      offsetHours: 6,
      displayName: "(UTC+06:00) Ekaterinburg",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Myanmar Standard Time",
      offset: 390,
      offsetHours: 6.5,
      displayName: "(UTC+06:30) Yangon (Rangoon)",
      supportsDaylightSavingTime: false,
    },
    {
      id: "SE Asia Standard Time",
      offset: 420,
      offsetHours: 7,
      displayName: "(UTC+07:00) Bangkok, Hanoi, Jakarta",
      supportsDaylightSavingTime: false,
    },
    {
      id: "N. Central Asia Standard Time",
      offset: 420,
      offsetHours: 7,
      displayName: "(UTC+07:00) Novosibirsk",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Ulaanbaatar Standard Time",
      offset: 480,
      offsetHours: 8,
      displayName: "(UTC+08:00) Ulaanbaatar",
      supportsDaylightSavingTime: false,
    },
    {
      id: "China Standard Time",
      offset: 480,
      offsetHours: 8,
      displayName: "(UTC+08:00) Beijing, Chongqing, Hong Kong, Urumqi",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Singapore Standard Time",
      offset: 480,
      offsetHours: 8,
      displayName: "(UTC+08:00) Kuala Lumpur, Singapore",
      supportsDaylightSavingTime: false,
    },
    {
      id: "North Asia Standard Time",
      offset: 480,
      offsetHours: 8,
      displayName: "(UTC+08:00) Krasnoyarsk",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Taipei Standard Time",
      offset: 480,
      offsetHours: 8,
      displayName: "(UTC+08:00) Taipei",
      supportsDaylightSavingTime: false,
    },
    {
      id: "W. Australia Standard Time",
      offset: 480,
      offsetHours: 8,
      displayName: "(UTC+08:00) Perth",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Korea Standard Time",
      offset: 540,
      offsetHours: 9,
      displayName: "(UTC+09:00) Seoul",
      supportsDaylightSavingTime: false,
    },
    {
      id: "North Asia East Standard Time",
      offset: 540,
      offsetHours: 9,
      displayName: "(UTC+09:00) Irkutsk",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Tokyo Standard Time",
      offset: 540,
      offsetHours: 9,
      displayName: "(UTC+09:00) Osaka, Sapporo, Tokyo",
      supportsDaylightSavingTime: false,
    },
    {
      id: "AUS Central Standard Time",
      offset: 570,
      offsetHours: 9.5,
      displayName: "(UTC+09:30) Darwin",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Cen. Australia Standard Time",
      offset: 570,
      offsetHours: 9.5,
      displayName: "(UTC+09:30) Adelaide",
      supportsDaylightSavingTime: true,
    },
    {
      id: "West Pacific Standard Time",
      offset: 600,
      offsetHours: 10,
      displayName: "(UTC+10:00) Guam, Port Moresby",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Tasmania Standard Time",
      offset: 600,
      offsetHours: 10,
      displayName: "(UTC+10:00) Hobart",
      supportsDaylightSavingTime: true,
    },
    {
      id: "E. Australia Standard Time",
      offset: 600,
      offsetHours: 10,
      displayName: "(UTC+10:00) Brisbane",
      supportsDaylightSavingTime: false,
    },
    {
      id: "AUS Eastern Standard Time",
      offset: 600,
      offsetHours: 10,
      displayName: "(UTC+10:00) Canberra, Melbourne, Sydney",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Yakutsk Standard Time",
      offset: 600,
      offsetHours: 10,
      displayName: "(UTC+10:00) Yakutsk",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Vladivostok Standard Time",
      offset: 660,
      offsetHours: 11,
      displayName: "(UTC+11:00) Vladivostok",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Central Pacific Standard Time",
      offset: 660,
      offsetHours: 11,
      displayName: "(UTC+11:00) Solomon Is., New Caledonia",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Magadan Standard Time",
      offset: 720,
      offsetHours: 12,
      displayName: "(UTC+12:00) Magadan",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Kamchatka Standard Time",
      offset: 720,
      offsetHours: 12,
      displayName: "(UTC+12:00) Petropavlovsk-Kamchatsky - Old",
      supportsDaylightSavingTime: true,
    },
    {
      id: "Fiji Standard Time",
      offset: 720,
      offsetHours: 12,
      displayName: "(UTC+12:00) Fiji",
      supportsDaylightSavingTime: true,
    },
    {
      id: "New Zealand Standard Time",
      offset: 720,
      offsetHours: 12,
      displayName: "(UTC+12:00) Auckland, Wellington",
      supportsDaylightSavingTime: true,
    },
    {
      id: "UTC+12",
      offset: 720,
      offsetHours: 12,
      displayName: "(UTC+12:00) Coordinated Universal Time+12",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Tonga Standard Time",
      offset: 780,
      offsetHours: 13,
      displayName: "(UTC+13:00) Nuku'alofa",
      supportsDaylightSavingTime: false,
    },
    {
      id: "Samoa Standard Time",
      offset: 780,
      offsetHours: 13,
      displayName: "(UTC+13:00) Samoa",
      supportsDaylightSavingTime: true,
    },
  ];
  var a = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334, 365];
  var m = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 366];
  var j = 365 * 4 + 1;
  var c = (365 * 4 + 1) * 25 - 1;
  var h = ((365 * 4 + 1) * 25 - 1) * 4 + 1;
  var d = (((365 * 4 + 1) * 25 - 1) * 4 + 1) * 4;
  var b =
    (((365 * 4 + 1) * 25 - 1) * 4 + 1) * 4 + ((365 * 4 + 1) * 25 - 1) * 3 - 367;
  var l = (((365 * 4 + 1) * 25 - 1) * 4 + 1) * 25 - 366;
  var k = 0;
  var i =
    ((((365 * 4 + 1) * 25 - 1) * 4 + 1) * 25 - 366) *
      (1000 * 10000 * 3600 * 24) -
    1;
  var e =
    ((((365 * 4 + 1) * 25 - 1) * 4 + 1) * 25 - 366) * (1000 * 60 * 60 * 24);
  f.jqx.date = function () {
    var r = this;
    r.ticksPerMillisecond = 10000;
    r.millisecondsPerTick = 1 / 10000;
    r.ticksPerSecond = 1000 * 10000;
    r.secondsPerTick = 1 / (1000 * 10000);
    r.ticksPerMinute = 1000 * 10000 * 60;
    r.minutesPerTick = 1 / (1000 * 10000 * 60);
    r.ticksPerHour = 1000 * 10000 * 3600;
    r.hoursPerTick = 1 / (1000 * 10000 * 3600);
    r.ticksPerDay = 1000 * 10000 * 3600 * 24;
    r.daysPerTick = 1 / (1000 * 10000 * 3600 * 24);
    r.millisPerSecond = 1000;
    r.millisPerMinute = 1000 * 60;
    r.millisPerHour = 1000 * 60 * 60;
    r.millisPerDay = 1000 * 60 * 60 * 24;
    r.daysPerYear = 365;
    r.daysPer4Years = j;
    r.daysPer100Years = c;
    r.daysPer400Years = h;
    r.daysTo1601 = d;
    r.daysTo1899 = b;
    r.daysTo10000 = l;
    r.minTicks = 0;
    r.maxTicks = i;
    r.maxMillis = e;
    r.datePartYear = 0;
    r.datePartDayOfYear = 1;
    r.datePartMonth = 2;
    r.datePartDay = 3;
    r.daysToMonth365 = a;
    r.daysToMonth366 = m;
    r.minValue = new Date(0);
    r.maxValue = new Date(
      ((((365 * 4 + 1) * 25 - 1) * 4 + 1) * 25 - 366) *
        (1000 * 10000 * 3600 * 24) -
        1
    );
    r.ticksMask = 4611686018427388000;
    r.flagsMask = 13835058055282164000;
    r.localMask = 9223372036854776000;
    r.ticksCeiling = 4611686018427388000;
    r.kindUnspecified = 0;
    r.kindUtc = 4611686018427388000;
    r.kindLocal = 9223372036854776000;
    r.kindLocalAmbiguousDst = 13835058055282164000;
    r.kindShift = 62;
    r.regexTrim = /^\s+|\s+$/g;
    r.regexInfinity = /^[+-]?infinity$/i;
    r.regexHex = /^0x[a-f0-9]+$/i;
    r.regexParseFloat = /^[+-]?\d*\.?\d*(e[+-]?\d+)?$/;
    r.calendar = {
      "/": "/",
      ":": ":",
      firstDay: 0,
      days: {
        names: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        namesAbbr: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        namesShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      },
      months: {
        names: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
          "",
        ],
        namesAbbr: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "",
        ],
      },
      AM: ["AM", "am", "AM"],
      PM: ["PM", "pm", "PM"],
      eras: [{ name: "A.D.", start: null, offset: 0 }],
      twoDigitYearMax: 2029,
      patterns: {
        d: "M/d/yyyy",
        D: "dddd, MMMM dd, yyyy",
        t: "h:mm tt",
        T: "h:mm:ss tt",
        f: "dddd, MMMM dd, yyyy h:mm tt",
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        M: "MMMM dd",
        Y: "yyyy MMMM",
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
        ISO: "yyyy-MM-dd hh:mm:ss",
        ISO2: "yyyy-MM-dd HH:mm:ss",
        d1: "dd.MM.yyyy",
        d2: "dd-MM-yyyy",
        zone1: "yyyy-MM-ddTHH:mm:ss-HH:mm",
        zone2: "yyyy-MM-ddTHH:mm:ss+HH:mm",
        custom: "yyyy-MM-ddTHH:mm:ss.fff",
        custom2: "yyyy-MM-dd HH:mm:ss.fff",
      },
      percentsymbol: "%",
      currencysymbol: "$",
      currencysymbolposition: "before",
      decimalseparator: ".",
      thousandsseparator: ",",
    };
    r.dateData = 0;
    r.timeZone = null;
    r.timeZones = g;
    r.internalMS = function () {
      return r.dateData;
    };
    r.getDatePart = function (y) {
      var x = r.internalMS();
      var z = parseInt(x / r.millisPerDay);
      var G = parseInt(z / r.daysPer400Years);
      z -= G * r.daysPer400Years;
      var B = parseInt(z / r.daysPer100Years);
      if (B == 4) {
        B = 3;
      }
      z -= B * r.daysPer100Years;
      var D = parseInt(z / r.daysPer4Years);
      z -= D * r.daysPer4Years;
      var E = parseInt(z / r.daysPerYear);
      if (E == 4) {
        E = 3;
      }
      if (y == r.datePartYear) {
        return parseInt(G * 400 + B * 100 + D * 4 + E + 1);
      }
      z -= E * r.daysPerYear;
      if (y == r.datePartDayOfYear) {
        return parseInt(z + 1);
      }
      var C = E == 3 && (D != 24 || B == 3);
      var F = C ? r.daysToMonth366 : r.daysToMonth365;
      var A = z >> (5 + 1);
      while (z >= F[A]) {
        A++;
      }
      if (y == r.datePartMonth) {
        return parseInt(A);
      }
      return parseInt(z - F[A - 1] + 1);
    };
    (r.dayOfWeek = function () {
      var y = r.dateData;
      var x = parseInt(y / r.millisPerDay + 1) % 7;
      return x;
    }),
      (r.dayOfYear = function () {
        return r.getDatePart(r.datePartDayOfYear);
      });
    r.weekOfYear = function (y) {
      var F = r.toDate();
      var D = y || r.calendar.firstDay;
      var A = new Date(F.getFullYear(), 0, 1);
      var E = A.getDay() - D;
      E = E >= 0 ? E : E + 7;
      var z =
        Math.floor(
          (F.getTime() -
            A.getTime() -
            (F.getTimezoneOffset() - A.getTimezoneOffset()) * 60000) /
            86400000
        ) + 1;
      var B;
      if (E < 4) {
        B = Math.floor((z + E - 1) / 7) + 1;
        if (B > 52) {
          var C = new Date(F.getFullYear() + 1, 0, 1);
          var x = C.getDay() - D;
          x = x >= 0 ? x : x + 7;
          B = x < 4 ? 1 : 53;
        }
      } else {
        B = Math.floor((z + E - 1) / 7);
      }
      return B;
    };
    r.subtract = function (x) {
      return new f.jqx.timeSpan(
        r.dateData * r.ticksPerMillisecond - x.dateData * r.ticksPerMillisecond
      );
    };
    r.dateToMS = function (z, A, x) {
      if (z >= 1 && z <= 9999 && A >= 1 && A <= 12) {
        z = parseInt(z);
        var D = r.isLeapYear(z) ? r.daysToMonth366 : r.daysToMonth365;
        if (x >= 1 && x <= D[A] - D[A - 1]) {
          var C = z - 1;
          var B =
            C * 365 +
            parseInt(C / 4) -
            parseInt(C / 100) +
            parseInt(C / 400) +
            D[A - 1] +
            x -
            1;
          return B * r.millisPerDay;
        }
      }
    };
    r.isLeapYear = function (x) {
      if (x < 1 || x > 9999) {
        throw new Error("Year out of Range");
      }
      return x % 4 == 0 && (x % 100 != 0 || x % 400 == 0);
    };
    r.timeToMS = function (x, B, z, y) {
      if (x >= 0 && x < 24 && B >= 0 && B < 60 && z >= 0 && z < 60) {
        var A = parseInt(x * 3600 + B * 60 + z);
        if (y > 0 && y < 1000) {
          return A * r.millisPerSecond + y;
        }
        return A * r.millisPerSecond;
      }
    };
    r.daysInMonth = function (x, y) {
      if (y < 1 || y > 12) {
        throw new Error("Month out of Range");
      }
      var z = r.isLeapYear(x) ? r.daysToMonth366 : r.daysToMonth365;
      return z[y] - z[y - 1];
    };
    r.arrayIndexOf = function (A, z) {
      if (A.indexOf) {
        return A.indexOf(z);
      }
      for (var x = 0, y = A.length; x < y; x++) {
        if (A[x] === z) {
          return x;
        }
      }
      return -1;
    };
    r.startsWith = function (y, x) {
      return y.indexOf(x) === 0;
    };
    (r.endsWith = function (y, x) {
      return y.substr(y.length - x.length) === x;
    }),
      (r.trim = function (x) {
        return (x + "").replace(r.regexTrim, "");
      });
    r.expandFormat = function (B, A) {
      A = A || "F";
      var z,
        y = B.patterns,
        x = A.length;
      if (x === 1) {
        z = y[A];
        if (!z) {
          throw "Invalid date format string '" + A + "'.";
        }
        A = z;
      } else {
        if (x === 2 && A.charAt(0) === "%") {
          A = A.charAt(1);
        }
      }
      return A;
    };
    r.getEra = function (z, y) {
      if (!y) {
        return 0;
      }
      if (typeof z === "string") {
        return 0;
      }
      var C,
        B = z.getTime();
      for (var A = 0, x = y.length; A < x; A++) {
        C = y[A].start;
        if (C === null || B >= C) {
          return A;
        }
      }
      return 0;
    };
    r.toUpper = function (x) {
      return x.split("\u00A0").join(" ").toUpperCase();
    };
    r.toUpperArray = function (x) {
      var A = [];
      for (var z = 0, y = x.length; z < y; z++) {
        A[z] = r.toUpper(x[z]);
      }
      return A;
    };
    r.getEraYear = function (y, A, x, B) {
      var z = y.getFullYear();
      if (!B && A.eras) {
        z -= A.eras[x].offset;
      }
      return z;
    };
    r.getDayIndex = function (B, A, y) {
      var x,
        C = B.days,
        z = B._upperDays;
      if (!z) {
        B._upperDays = z = [
          r.toUpperArray(C.names),
          r.toUpperArray(C.namesAbbr),
          r.toUpperArray(C.namesShort),
        ];
      }
      A = A.toUpperCase();
      if (y) {
        x = r.arrayIndexOf(z[1], A);
        if (x === -1) {
          x = r.arrayIndexOf(z[2], A);
        }
      } else {
        x = r.arrayIndexOf(z[0], A);
      }
      return x;
    };
    r.getMonthIndex = function (E, D, z) {
      var x = E.months,
        y = E.monthsGenitive || E.months,
        B = E._upperMonths,
        C = E._upperMonthsGen;
      if (!B) {
        E._upperMonths = B = [
          r.toUpperArray(x.names),
          r.toUpperArray(x.namesAbbr),
        ];
        E._upperMonthsGen = C = [
          r.toUpperArray(y.names),
          r.toUpperArray(y.namesAbbr),
        ];
      }
      D = r.toUpper(D);
      var A = r.arrayIndexOf(z ? B[1] : B[0], D);
      if (A < 0) {
        A = r.arrayIndexOf(z ? C[1] : C[0], D);
      }
      return A;
    };
    r.appendPreOrPostMatch = function (A, x) {
      var z = 0,
        C = false;
      for (var B = 0, y = A.length; B < y; B++) {
        var D = A.charAt(B);
        switch (D) {
          case "'":
            if (C) {
              x.push("'");
            } else {
              z++;
            }
            C = false;
            break;
          case "\\":
            if (C) {
              x.push("\\");
            }
            C = !C;
            break;
          default:
            x.push(D);
            C = false;
            break;
        }
      }
      return z;
    };
    r.getTokenRegExp = function () {
      return /\/|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yy|y|hh|h|HH|H|mm|m|ss|s|tt|t|fff|ff|f|zzz|zz|z|gg|g/g;
    };
    r.tryparseDate = function (ad, ae, U) {
      if (ae == undefined || ae == null) {
        ae = r.calendar;
      } else {
        if (ae != null) {
          if (ae && f.type(ae) === "string" && Globalize) {
            var aj = Globalize.cultures[ae];
            if (aj) {
              ae = aj.calendar;
            }
          }
        }
      }
      if (U != undefined) {
        if (f.type(U) === "array") {
          for (var ak = 0; ak < U.length; ak++) {
            var am = r.parseDate(ad, U[ak], ae);
            if (am) {
              return am;
            }
          }
        }
        var am = r.parseDate(ad, U, ae);
        if (am) {
          return am;
        }
      }
      var I = this;
      if (ad == "") {
        return null;
      }
      if (ad != null && !ad.substring) {
        ad = ad.toString();
      }
      if (ad != null && ad.substring(0, 6) == "/Date(") {
        var ao = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;
        var al = new Date(+ad.replace(/\/Date\((\d+)\)\//, "$1"));
        if (al == "Invalid Date") {
          var ag = ad.match(/^\/Date\((\d+)([-+]\d\d)(\d\d)\)\/$/);
          var al = null;
          if (ag) {
            al = new Date(1 * ag[1] + 3600000 * ag[2] + 60000 * ag[3]);
          }
        }
        if (al == null || al == "Invalid Date" || isNaN(al)) {
          var J = ao.exec(ad);
          if (J) {
            var M = new Date(parseInt(J[1]));
            if (J[2]) {
              var S = parseInt(J[3]);
              if (J[2] === "-") {
                S = -S;
              }
              var O = M.getUTCMinutes();
              M.setUTCMinutes(O - S);
            }
            if (!isNaN(M.valueOf())) {
              return M;
            }
          }
        }
        return al;
      }
      var G = {
        jqxdate: "yyyy-MM-dd HH:mm:ss",
        d: "M/d/yyyy",
        D: "dddd, MMMM dd, yyyy",
        t: "h:mm tt",
        T: "h:mm:ss tt",
        f: "dddd, MMMM dd, yyyy h:mm tt",
        F: "dddd, MMMM dd, yyyy h:mm:ss tt",
        M: "MMMM dd",
        Y: "yyyy MMMM",
        S: "yyyy\u0027-\u0027MM\u0027-\u0027dd\u0027T\u0027HH\u0027:\u0027mm\u0027:\u0027ss",
        ISO: "yyyy-MM-dd hh:mm:ss",
        ISO2: "yyyy-MM-dd HH:mm:ss",
        ISO8601: "yyyy-MM-ddTHH:mm:ss.sssZ",
        d1: "dd.MM.yyyy",
        d2: "dd-MM-yyyy",
        d3: "MM-dd-yyyy",
        d4: "MM.dd.yyyy",
        zone1: "yyyy-MM-ddTHH:mm:ss-HH:mm",
        zone2: "yyyy-MM-ddTHH:mm:ss+HH:mm",
        custom: "yyyy-MM-ddTHH:mm:ss.fff",
        custom2: "yyyy-MM-dd HH:mm:ss.fff",
        iso: "yyyy-MM-ddTHH:mm:ssZ",
        iso_date1: "yyyy-MM-dd",
        iso_date2: "yyyy-MM-dd",
        iso_date3: "yyyy-ddd",
        iso_date4: "yyyy-MM-dd HH:mm",
        iso_date5: "yyyy-MM-dd HH:mm Z",
        iso_date6: "yyyy-MMM-dd",
        iso_date7: "yyyy-MM",
        iso_date8: "yyyy-MMM",
        iso_date9: "yyyy-MMMM",
        iso_date10: "yyyy-MMMM-dd",
        iso_time1: "HH:mm:ss.tttt",
        iso_time2: "HH:mm:ss",
        iso_time3: "HH:mm",
        iso_time4: "HH",
        iso_time5: "yyyyyy-MM-dd",
        iso_time6: "yyyyyy-MM-dd",
      };
      for (var L in G) {
        al = r.parseDate(ad, G[L], ae);
        if (al) {
          return al;
        }
      }
      var F = ae.patterns;
      for (L in F) {
        al = r.parseDate(ad, F[L], ae);
        if (al) {
          if (L == "ISO") {
            var W = r.parseDate(ad, F.ISO2, ae);
            if (W) {
              return W;
            }
          }
          return al;
        }
      }
      if (f.type(ad) === "string") {
        ad = r.trim(ad);
        var af = [":", "/", "-", " ", ","];
        var E = function (at, y, ar) {
          return ar.replace(new RegExp(at, "g"), y);
        };
        ad = E(", ", ",", ad);
        var A = "";
        var R = ad;
        if (ad.indexOf(":") >= 0) {
          A = ad.substring(ad.indexOf(":") - 2);
          A = r.trim(A);
          R = ad.substring(0, ad.indexOf(":") - 2);
        } else {
          if (ad.toUpperCase().indexOf("AM") >= 0) {
            A = ad.substring(ad.toUpperCase().indexOf("AM") - 2);
            A = r.trim(A);
            R = ad.substring(0, ad.toUpperCase().indexOf("AM") - 2);
          } else {
            if (ad.toUpperCase().indexOf("PM") >= 0) {
              A = ad.substring(ad.toUpperCase().indexOf("PM") - 2);
              A = r.trim(A);
              R = ad.substring(0, ad.toUpperCase().indexOf("PM") - 2);
            }
          }
        }
        var x = new Date();
        var ac = false;
        if (R) {
          for (var ak = 0; ak < af.length; ak++) {
            if (R.indexOf(af[ak]) >= 0) {
              D = R.split(af[ak]);
              break;
            }
          }
          var z = new Array();
          var P = new Array();
          var Y = new Array();
          var K = null;
          var aq = null;
          for (var ak = 0; ak < D.length; ak++) {
            var H = D[ak];
            var X =
              r.parseDate(H, "d", ae) ||
              r.parseDate(H, "dd", ae) ||
              r.parseDate(H, "ddd", ae) ||
              r.parseDate(H, "dddd", ae);
            if (X) {
              z.push(X.getDate());
              if (H.length > 2) {
                K = ak;
                break;
              }
            }
          }
          for (var ak = 0; ak < D.length; ak++) {
            var H = D[ak];
            var N =
              r.parseDate(H, "M", ae) ||
              r.parseDate(H, "MM", ae) ||
              r.parseDate(H, "MMM", ae) ||
              r.parseDate(H, "MMMM", ae);
            if (N) {
              if (K != undefined && K == ak) {
                continue;
              }
              P.push(N.getMonth());
              if (H.length > 2) {
                aq = ak;
                break;
              }
            }
          }
          for (var ak = 0; ak < D.length; ak++) {
            var H = D[ak];
            var Z = r.parseDate(H, "yyyy", ae);
            if (Z) {
              if (K != undefined && K == ak) {
                continue;
              }
              if (aq != undefined && aq == ak) {
                continue;
              }
              Y.push(Z.getFullYear());
            }
          }
          var ah = new Array();
          for (var an = 0; an < z.length; an++) {
            for (var ag = 0; ag < P.length; ag++) {
              for (var ab = 0; ab < Y.length; ab++) {
                var M = new Date(Y[ab], P[ag], z[an]);
                if (Y[ab] < 1970) {
                  M.setFullYear(Y[ab]);
                }
                if (M.getTime() != NaN) {
                  ah.push(M);
                }
              }
            }
          }
          if (ah.length > 0) {
            x = ah[0];
            ac = true;
          }
        }
        if (A) {
          var aa = A.indexOf(":") >= 0 ? A.split(":") : A;
          var C =
            r.parseDate(A, "h:mm tt", ae) ||
            r.parseDate(A, "HH:mm:ss.fff", ae) ||
            r.parseDate(A, "HH:mm:ss.ff", ae) ||
            r.parseDate(A, "h:mm:ss tt", ae) ||
            r.parseDate(A, "HH:mm:ss.tttt", ae) ||
            r.parseDate(A, "HH:mm:ss", ae) ||
            r.parseDate(A, "HH:mm", ae) ||
            r.parseDate(A, "HH", ae);
          var Q = 0,
            B = 0,
            T = 0,
            V = 0;
          if (C && C.getTime() != NaN) {
            Q = C.getHours();
            B = C.getMinutes();
            T = C.getSeconds();
            V = C.getMilliseconds();
          } else {
            if (aa.length == 1) {
              Q = parseInt(aa[0]);
            }
            if (aa.length == 2) {
              Q = parseInt(aa[0]);
              B = parseInt(aa[1]);
            }
            if (aa.length == 3) {
              Q = parseInt(aa[0]);
              B = parseInt(aa[1]);
              if (aa[2].indexOf(".") >= 0) {
                T = parseInt(aa[2].toString().split(".")[0]);
                V = parseInt(aa[2].toString().split(".")[1]);
              } else {
                T = parseInt(aa[2]);
              }
            }
            if (aa.length == 4) {
              Q = parseInt(aa[0]);
              B = parseInt(aa[1]);
              T = parseInt(aa[2]);
              V = parseInt(aa[3]);
            }
          }
          if (x && !isNaN(Q) && !isNaN(B) && !isNaN(T) && !isNaN(V)) {
            x.setHours(Q, B, T, V);
            ac = true;
          }
        }
        if (ac) {
          return x;
        }
      }
      if (ad != null) {
        var W = null;
        var D = [":", "/", "-"];
        var ai = true;
        for (var H = 0; H < D.length; H++) {
          if (ad.indexOf(D[H]) != -1) {
            ai = false;
          }
        }
        if (ai) {
          var ap = new Number(ad);
          if (!isNaN(ap)) {
            return new Date(ap);
          }
        }
      }
      return null;
    };
    r.getParseRegExp = function (x, I) {
      var K = x._parseRegExp;
      if (!K) {
        x._parseRegExp = K = {};
      } else {
        var B = K[I];
        if (B) {
          return B;
        }
      }
      var H = r
          .expandFormat(x, I)
          .replace(/([\^\$\.\*\+\?\|\[\]\(\)\{\}])/g, "\\\\$1"),
        F = ["^"],
        y = [],
        E = 0,
        A = 0,
        N = r.getTokenRegExp(),
        C;
      while ((C = N.exec(H)) !== null) {
        var M = H.slice(E, C.index);
        E = N.lastIndex;
        A += r.appendPreOrPostMatch(M, F);
        if (A % 2) {
          F.push(C[0]);
          continue;
        }
        var z = C[0],
          D = z.length,
          J;
        switch (z) {
          case "dddd":
          case "ddd":
          case "MMMM":
          case "MMM":
          case "gg":
          case "g":
            J = "(\\D+)";
            break;
          case "tt":
          case "t":
            J = "(\\D*)";
            break;
          case "yyyy":
          case "fff":
          case "ff":
          case "f":
            J = "(\\d{" + D + "})";
            break;
          case "dd":
          case "d":
          case "MM":
          case "M":
          case "yy":
          case "y":
          case "HH":
          case "H":
          case "hh":
          case "h":
          case "mm":
          case "m":
          case "ss":
          case "s":
            J = "(\\d\\d?)";
            break;
          case "zzz":
            J = "([+-]?\\d\\d?:\\d{2})";
            break;
          case "zz":
          case "z":
            J = "([+-]?\\d\\d?)";
            break;
          case "/":
            J = "(\\" + x["/"] + ")";
            break;
          default:
            throw "Invalid date format pattern '" + z + "'.";
            break;
        }
        if (J) {
          F.push(J);
        }
        y.push(C[0]);
      }
      r.appendPreOrPostMatch(H.slice(E), F);
      F.push("$");
      var L = F.join("").replace(/\s+/g, "\\s+"),
        G = { regExp: L, groups: y };
      return (K[I] = G);
    };
    r.outOfRange = function (z, x, y) {
      return z < x || z > y;
    };
    r.expandYear = function (C, A) {
      var y = new Date(),
        x = r.getEra(y);
      if (A < 100) {
        var z = C.twoDigitYearMax;
        z =
          typeof z === "string"
            ? (new Date().getFullYear() % 100) + parseInt(z, 10)
            : z;
        var B = r.getEraYear(y, C, x);
        A += B - (B % 100);
        if (A > z) {
          A -= 100;
        }
      }
      return A;
    };
    (r.parseDate = function (S, Z, N) {
      if (N == undefined || N == null) {
        N = r.calendar;
      }
      S = r.trim(S);
      var K = N,
        ae = r.getParseRegExp(K, Z),
        E = new RegExp(ae.regExp).exec(S);
      if (E === null) {
        return null;
      }
      var aa = ae.groups,
        Q = null,
        I = null,
        ad = null,
        ac = null,
        J = null,
        C = 0,
        V,
        U = 0,
        ab = 0,
        x = 0,
        z = null,
        L = false;
      for (var W = 0, Y = aa.length; W < Y; W++) {
        var y = E[W + 1];
        if (y) {
          var R = aa[W],
            B = R.length,
            D = parseInt(y, 10);
          switch (R) {
            case "dd":
            case "d":
              ac = D;
              if (r.outOfRange(ac, 1, 31)) {
                return null;
              }
              break;
            case "MMM":
            case "MMMM":
            case "MMMMM":
            case "MMMMMM":
            case "MMMMMMM":
            case "MMMMMMMM":
              ad = r.getMonthIndex(K, y, B === 3);
              if (r.outOfRange(ad, 0, 11)) {
                return null;
              }
              break;
            case "M":
            case "MM":
              ad = D - 1;
              if (r.outOfRange(ad, 0, 11)) {
                return null;
              }
              break;
            case "y":
            case "yy":
            case "yyyy":
              I = B < 4 ? r.expandYear(K, D) : D;
              if (r.outOfRange(I, 0, 9999)) {
                return null;
              }
              break;
            case "h":
            case "hh":
              C = D;
              if (C === 12) {
                C = 0;
              }
              if (r.outOfRange(C, 0, 11)) {
                return null;
              }
              break;
            case "H":
            case "HH":
              C = D;
              if (r.outOfRange(C, 0, 23)) {
                return null;
              }
              break;
            case "m":
            case "mm":
              U = D;
              if (r.outOfRange(U, 0, 59)) {
                return null;
              }
              break;
            case "s":
            case "ss":
              ab = D;
              if (r.outOfRange(ab, 0, 59)) {
                return null;
              }
              break;
            case "tt":
            case "t":
              L = K.PM && (y === K.PM[0] || y === K.PM[1] || y === K.PM[2]);
              if (
                !L &&
                (!K.AM || (y !== K.AM[0] && y !== K.AM[1] && y !== K.AM[2]))
              ) {
                return null;
              }
              break;
            case "f":
            case "ff":
            case "fff":
              x = D * Math.pow(10, 3 - B);
              if (r.outOfRange(x, 0, 999)) {
                return null;
              }
              break;
            case "ddd":
            case "dddd":
              J = r.getDayIndex(K, y, B === 3);
              if (r.outOfRange(J, 0, 6)) {
                return null;
              }
              break;
            case "zzz":
              var A = y.split(/:/);
              if (A.length !== 2) {
                return null;
              }
              V = parseInt(A[0], 10);
              if (r.outOfRange(V, -12, 13)) {
                return null;
              }
              var G = parseInt(A[1], 10);
              if (r.outOfRange(G, 0, 59)) {
                return null;
              }
              z = V * 60 + (r.startsWith(y, "-") ? -G : G);
              break;
            case "z":
            case "zz":
              V = D;
              if (r.outOfRange(V, -12, 13)) {
                return null;
              }
              z = V * 60;
              break;
            case "g":
            case "gg":
              var M = y;
              if (!M || !K.eras) {
                return null;
              }
              M = M.trim().toLowerCase();
              for (var X = 0, T = K.eras.length; X < T; X++) {
                if (M === K.eras[X].nathat.toLowerCase()) {
                  Q = X;
                  break;
                }
              }
              if (Q === null) {
                return null;
              }
              break;
          }
        }
      }
      var H = new Date(),
        P,
        F = K.convert;
      P = H.getFullYear();
      if (I === null) {
        I = P;
      } else {
        if (K.eras) {
          I += K.eras[Q || 0].offset;
        }
      }
      if (ad === null) {
        ad = 0;
      }
      if (ac === null) {
        ac = 1;
      }
      if (F) {
        H = F.toGregorian(I, ad, ac);
        if (H === null) {
          return null;
        }
      } else {
        H.setFullYear(I, ad, ac);
        if (H.getDate() !== ac) {
          return null;
        }
        if (J !== null && H.getDay() !== J) {
          return null;
        }
      }
      if (L && C < 12) {
        C += 12;
      }
      H.setHours(C, U, ab, x);
      if (z !== null) {
        var O = H.getMinutes() - (z + H.getTimezoneOffset());
        H.setHours(H.getHours() + parseInt(O / 60, 10), O % 60);
      }
      return H;
    }),
      (r.toString = function (U, L) {
        if (U === undefined) {
          U = "yyyy-MM-dd HH:mm:ss";
        }
        if (f.jqx.date.cache && f.jqx.date.cache[r.dateData + U]) {
          return f.jqx.date.cache[r.dateData + U];
        }
        if (L && f.type(L) === "string" && Globalize) {
          var V = Globalize.cultures[L];
          if (V) {
            L = V.calendar;
          }
        }
        var Q = r.toDate();
        if (L == undefined || L == null) {
          L = r.calendar;
        }
        if (typeof Q === "string") {
          return Q;
        }
        var A = Q.toString() + "_" + U;
        if (!U || !U.length || U === "i") {
          var X;
          X = r.formatDate(Q, L.patterns.F, L);
          return X;
        }
        var R = L.eras,
          y = U === "s";
        U = r.expandFormat(L, U);
        X = [];
        var D,
          S = ["0", "00", "000"],
          H,
          I,
          x = /([^d]|^)(d|dd)([^d]|$)/g,
          W = 0,
          N = r.getTokenRegExp(),
          z;
        function F(Y, ab) {
          var aa,
            Z = Y + "";
          if (ab > 1 && Z.length < ab) {
            aa = S[ab - 2] + Z;
            return aa.substr(aa.length - ab, ab);
          } else {
            aa = Z;
          }
          return aa;
        }
        function T() {
          if (H || I) {
            return H;
          }
          H = x.test(U);
          I = true;
          return H;
        }
        function B(Z, Y) {
          if (z) {
            return z[Y];
          }
          if (Z.getMonth != undefined) {
            switch (Y) {
              case 0:
                return Z.getFullYear();
              case 1:
                return Z.getMonth();
              case 2:
                return Z.getDate();
            }
          }
        }
        for (;;) {
          var E = N.lastIndex,
            M = N.exec(U);
          var J = U.slice(E, M ? M.index : U.length);
          W += r.appendPreOrPostMatch(J, X);
          if (!M) {
            break;
          }
          if (W % 2) {
            X.push(M[0]);
            continue;
          }
          var O = M[0],
            C = O.length;
          switch (O) {
            case "ddd":
            case "dddd":
              var K = C === 3 ? L.days.namesAbbr : L.days.names;
              X.push(K[Q.getDay()]);
              break;
            case "d":
            case "dd":
              H = true;
              X.push(F(B(Q, 2), C));
              break;
            case "MMM":
            case "MMMM":
              var P = B(Q, 1);
              X.push(L.months[C === 3 ? "namesAbbr" : "names"][P]);
              break;
            case "M":
            case "MM":
              X.push(F(B(Q, 1) + 1, C));
              break;
            case "y":
            case "yy":
            case "yyyy":
              P = r.getEraYear(Q, L, r.getEra(Q, R), y);
              if (C < 4) {
                P = P % 100;
              }
              X.push(F(P, C));
              break;
            case "h":
            case "hh":
              D = Q.getHours() % 12;
              if (D === 0) {
                D = 12;
              }
              X.push(F(D, C));
              break;
            case "H":
            case "HH":
              X.push(F(Q.getHours(), C));
              break;
            case "m":
            case "mm":
              X.push(F(Q.getMinutes(), C));
              break;
            case "s":
            case "ss":
              X.push(F(Q.getSeconds(), C));
              break;
            case "t":
            case "tt":
              P =
                Q.getHours() < 12
                  ? L.AM
                    ? L.AM[0]
                    : " "
                  : L.PM
                  ? L.PM[0]
                  : " ";
              X.push(C === 1 ? P.charAt(0) : P);
              break;
            case "f":
            case "ff":
            case "fff":
              X.push(F(Q.getMilliseconds(), 3).substr(0, C));
              break;
            case "z":
            case "zz":
              D = Q.getTimezoneOffset() / 60;
              X.push((D <= 0 ? "+" : "-") + F(Math.floor(Math.abs(D)), C));
              break;
            case "zzz":
              D = Q.getTimezoneOffset() / 60;
              X.push(
                (D <= 0 ? "+" : "-") +
                  F(Math.floor(Math.abs(D)), 2) +
                  ":" +
                  F(Math.abs(Q.getTimezoneOffset() % 60), 2)
              );
              break;
            case "g":
            case "gg":
              if (L.eras) {
                X.push(L.eras[r.getEra(Q, R)].name);
              }
              break;
            case "/":
              X.push(L["/"]);
              break;
            default:
              throw "Invalid date format pattern '" + O + "'.";
              break;
          }
        }
        var G = X.join("");
        if (!f.jqx.date.cache) {
          f.jqx.date.cache = new Array();
        }
        f.jqx.date.cache[r.dateData + U] = G;
        return G;
      });
    r.add = function (B, C, y) {
      var z = r.internalMS();
      if (C === undefined) {
        if (y === false) {
          r.dateData = z + parseInt(B._ticks / r.ticksPerMillisecond);
          return r;
        }
        var x = new f.jqx.date(z + parseInt(B._ticks / r.ticksPerMillisecond));
        x.timeZone = r.timeZone;
        return x;
      }
      var A = B * C;
      if (A <= -r.maxMillis || A >= r.maxMillis) {
        throw new Error("Out of Range");
      }
      if (y === false) {
        r.dateData = z + A;
        return r;
      }
      var x = new f.jqx.date(z + A);
      x.timeZone = r.timeZone;
      return x;
    };
    r.addDays = function (y, x) {
      return r.add(y, r.millisPerDay, x);
    };
    r.clone = function () {
      var x = new f.jqx.date(r.dateData);
      x.timeZone = r.timeZone;
      return x;
    };
    r.clearTime = function () {
      var A = r.month();
      var z = r.year();
      var y = r.day();
      var x = new f.jqx.date(z, A, y, 0, 0, 0, 0);
      x.timeZone = r.timeZone;
      return x;
    };
    r.addHours = function (y, x) {
      return r.add(y, r.millisPerHour, x);
    };
    r.addMilliseconds = function (y, x) {
      return r.add(y, 1, x);
    };
    r.addMinutes = function (y, x) {
      return r.add(y, r.millisPerMinute, x);
    };
    r.addMonths = function (z, B) {
      if (z < -120000 || z > 120000) {
        throw new Error("Invalid Months Value");
      }
      var F = parseInt(r.getDatePart(r.datePartYear));
      var x = parseInt(r.getDatePart(r.datePartMonth));
      var D = parseInt(r.getDatePart(r.datePartDay));
      var C = x - 1 + z;
      if (C >= 0) {
        x = (C % 12) + 1;
        F = F + C / 12;
      } else {
        x = 12 + ((C + 1) % 12);
        F = F + (C - 11) / 12;
      }
      F = parseInt(F);
      if (F < 1 || F > 9999) {
        throw new Error("Year out of range");
      }
      var E = r.daysInMonth(F, x);
      if (D > E) {
        D = E;
      }
      if (B === false) {
        r.dateData = r.dateToMS(F, x, D) + (r.internalMS() % r.millisPerDay);
        return r;
      }
      var A = new f.jqx.date(
        r.dateToMS(F, x, D) + (r.internalMS() % r.millisPerDay)
      );
      A.timeZone = r.timeZone;
      return A;
    };
    r.addSeconds = function (y, x) {
      return r.add(y, r.millisPerSecond, x);
    };
    r.addYears = function (y, x) {
      return r.addMonths(y * 12, x);
    };
    r.getTimeZoneOffset = function () {
      var y = new Date();
      var x = new Date(y.getFullYear(), 0, 1);
      var z = new Date(y.getFullYear(), 6, 1);
      var A =
        y.getTimezoneOffset() <
        Math.max(x.getTimezoneOffset(), z.getTimezoneOffset());
      return { offset: -(y.getTimezoneOffset() / 60), dst: +A };
    };
    r.isInDaylightSavingTime = function () {
      var y = new Date();
      var z = new Date(y.getFullYear(), 0, 1);
      var x = new Date(y.getFullYear(), 6, 1);
      return (
        r.date().getTimezoneOffset() <
        Math.max(z.getTimezoneOffset(), x.getTimezoneOffset())
      );
    };
    r.supportsDaylightSavingTime = function () {
      var y = new Date();
      var z = new Date(y.getFullYear(), 0, 1);
      var x = new Date(y.getFullYear(), 6, 1);
      return z.getTimezoneOffset() != x.getTimezoneOffset();
    };
    r.date = function () {
      var A = r.month();
      var z = r.year();
      var y = r.day();
      var x = new f.jqx.date(z, A, y);
      x.timeZone = r.timeZone;
      return x;
    };
    r.isWeekend = function () {
      return r.dayOfWeek() == 0 || r.dayOfWeek() == 6;
    };
    r.toDate = function (J) {
      var E = r.month();
      var F = r.year();
      var G = r.day();
      var A = r.hour();
      var z = r.minute();
      var x = r.second();
      var L = r.millisecond();
      var K = new Date(F, E - 1, G);
      if (F < 1970) {
        K.setFullYear(F);
      }
      K.setHours(A, z, x, L);
      if (J) {
        var D = r.timeZones.filter(function (M) {
          return M.id == J;
        });
        if (D.length) {
          var B = D[0].offset;
          if (J == "Local") {
            B = -K.getTimezoneOffset();
          }
          var C = K.getTime();
          var I = K.getTimezoneOffset() * 60 * 1000;
          if (r.timeZone) {
            var y = r.timeZones.filter(function (M) {
              return M.id == r.timeZone;
            });
            if (y.length) {
              var I = -y[0].offset * 60 * 1000;
            }
          }
          var H = C + I;
          K = new Date(H + 60 * 1000 * B);
        }
      }
      return K;
    };
    r.toTimeZone = function (y) {
      var A = y;
      if (A == null) {
        A = "Local";
      }
      var x = r.toDate(A);
      var z = new f.jqx.date(x);
      z.timeZone = y;
      return z;
    };
    r.day = function () {
      return r.getDatePart(r.datePartDay);
    };
    r.month = function () {
      return r.getDatePart(r.datePartMonth);
    };
    r.year = function () {
      return r.getDatePart(r.datePartYear);
    };
    r.millisecond = function () {
      return parseInt(r.internalMS() % 1000);
    };
    r.hour = function () {
      return parseInt((r.internalMS() / r.millisPerHour) % 24);
    };
    r.minute = function () {
      return parseInt((r.internalMS() / r.millisPerMinute) % 60);
    };
    r.second = function () {
      return parseInt((r.internalMS() / r.millisPerSecond) % 60);
    };
    r.valueOf = function () {
      return r.dateData;
    };
    r.equals = function (x) {
      return r.dateData === x.dateData;
    };
    if (arguments.length === 0) {
      var o = new Date();
      r.dateData =
        r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
        r.timeToMS(
          o.getHours(),
          o.getMinutes(),
          o.getSeconds(),
          o.getMilliseconds()
        );
    } else {
      if (arguments.length === 1) {
        if (arguments[0] == undefined) {
          arguments[0] = "todayDate";
        }
        var v = typeof arguments[0] === "number" && isFinite(arguments[0]);
        if (!v && f.type(arguments[0]) === "string") {
          if (arguments[0] === "today") {
            var o = new Date();
            r.dateData =
              r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
              r.timeToMS(
                o.getHours(),
                o.getMinutes(),
                o.getSeconds(),
                o.getMilliseconds()
              );
          } else {
            if (arguments[0] === "todayDate") {
              var o = new Date();
              o.setHours(0, 0, 0, 0);
              r.dateData =
                r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                r.timeToMS(
                  o.getHours(),
                  o.getMinutes(),
                  o.getSeconds(),
                  o.getMilliseconds()
                );
            } else {
              var o = r.tryparseDate(arguments[0]);
              r.dateData =
                r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                r.timeToMS(
                  o.getHours(),
                  o.getMinutes(),
                  o.getSeconds(),
                  o.getMilliseconds()
                );
            }
          }
        } else {
          if (typeof arguments[0] === "number") {
            r.dateData = arguments[0];
          } else {
            if (f.type(arguments[0]) == "date") {
              var o = arguments[0];
              r.dateData =
                r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                r.timeToMS(
                  o.getHours(),
                  o.getMinutes(),
                  o.getSeconds(),
                  o.getMilliseconds()
                );
            } else {
              if (arguments[0].dateData !== undefined) {
                r.dateData = arguments[0].dateData;
              } else {
                r.dateData = arguments[0];
              }
            }
          }
        }
      } else {
        if (arguments.length === 2) {
          if (arguments[0] == undefined) {
            arguments[0] = "todayDate";
          }
          var v = typeof arguments[0] === "number" && isFinite(arguments[0]);
          if (!v && f.type(arguments[0]) === "string") {
            if (arguments[0] === "today") {
              var o = new Date();
              r.dateData =
                r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                r.timeToMS(
                  o.getHours(),
                  o.getMinutes(),
                  o.getSeconds(),
                  o.getMilliseconds()
                );
            } else {
              if (arguments[0] === "todayDate") {
                var o = new Date();
                o.setHours(0, 0, 0, 0);
                r.dateData =
                  r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                  r.timeToMS(
                    o.getHours(),
                    o.getMinutes(),
                    o.getSeconds(),
                    o.getMilliseconds()
                  );
              } else {
                var o = r.tryparseDate(arguments[0]);
                r.dateData =
                  r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                  r.timeToMS(
                    o.getHours(),
                    o.getMinutes(),
                    o.getSeconds(),
                    o.getMilliseconds()
                  );
              }
            }
          } else {
            if (typeof arguments[0] === "number") {
              r.dateData = arguments[0];
            } else {
              if (f.type(arguments[0]) == "date") {
                var o = arguments[0];
                r.dateData =
                  r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                  r.timeToMS(
                    o.getHours(),
                    o.getMinutes(),
                    o.getSeconds(),
                    o.getMilliseconds()
                  );
              } else {
                if (arguments[0].dateData !== undefined) {
                  r.dateData = arguments[0].dateData;
                } else {
                  r.dateData = arguments[0];
                }
              }
            }
          }
          r.timeZone = arguments[1];
        } else {
          if (arguments.length > 2) {
            if (f.type(arguments[0]) === "string") {
              var o = r.tryparseDate(arguments[0], arguments[2], arguments[1]);
              r.dateData =
                r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                r.timeToMS(
                  o.getHours(),
                  o.getMinutes(),
                  o.getSeconds(),
                  o.getMilliseconds()
                );
            } else {
              var t = arguments[0];
              var s = arguments[1];
              var u = arguments[2];
              var q = arguments[3];
              var p = arguments[4];
              var n = arguments[5];
              var w = arguments[6];
              if (q === undefined) {
                q = 0;
              }
              if (p === undefined) {
                p = 0;
              }
              if (n === undefined) {
                n = 0;
              }
              if (w === undefined) {
                w = 0;
              }
              s--;
              var o = new Date(t, s, u, q, p, n, w);
              if (t < 1970) {
                o.setFullYear(t);
              }
              r.dateData =
                r.dateToMS(o.getFullYear(), o.getMonth() + 1, o.getDate()) +
                r.timeToMS(
                  o.getHours(),
                  o.getMinutes(),
                  o.getSeconds(),
                  o.getMilliseconds()
                );
            }
          }
        }
      }
    }
    return r;
  };
})(jqxBaseFramework);
if (!Array.prototype.filter) {
  Array.prototype.filter = function (b) {
    if (this === void 0 || this === null) {
      throw new TypeError();
    }
    var f = Object(this);
    var a = f.length >>> 0;
    if (typeof b !== "function") {
      throw new TypeError();
    }
    var e = [];
    var d = arguments[1];
    for (var c = 0; c < a; c++) {
      if (c in f) {
        var g = f[c];
        if (b.call(d, g, c, f)) {
          e.push(g);
        }
      }
    }
    return e;
  };
}
