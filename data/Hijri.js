const HIJRI_MONTHS = [
  "Muharram"   ,
  "Safar"      ,
  "Rabi Al Awwal",
  "Rabi Al Thani",
  "Jamada Al Awwal",
  "Jamada Al Thani",
  "Rajab"      ,
  "Sha'ban"    ,
  "Ramadan"    ,
  "Shawwal"    ,
  "Dhul Qa'dah",
  "Dhul Hijjah"
];

function intPart(floatNum)
{
	if (floatNum < -0.0000001) {
		return Math.ceil(floatNum - 0.0000001)
	}
	return Math.floor(floatNum + 0.0000001)
}


export function getHijriMonth(month) {
  return HIJRI_MONTHS[month-1]
}

export function getHijriDate() {
  var		months = HIJRI_MONTHS;
  const		days =[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
  ];

  var		curdate = new Date();
  var		curdate1 = new Date();

  curdate1.setTime(curdate.getTime() + (3600 * 4));

  hday = curdate1.getDate();
  var		_zyr = curdate1.getFullYear();
  var		_zm = curdate1.getMonth() + 1;
  _zy = _zyr;
  zday = curdate1.getDay();


  if ((_zy > 1582) || ((_zy == 1582) && (_zm > 10)) || ((_zy == 1582) && (_zm == 10) && (hday > 14))) {

    _zjd = parseInt((1461 * (_zy + 4800 + parseInt((_zm - 14) / 12))) / 4) + parseInt((367 * (_zm - 2 - 12 * (parseInt((_zm - 14) / 12)))) / 12) - parseInt((3 * parseInt(((_zy + 4900 + parseInt((_zm - 14) / 12)) / 100))) / 4) + hday - 32075;
  } else {
    _zjd = 367 * _zy - parseInt((7 * (_zy + 5001 + parseInt((_zm - 9) / 7))) / 4) + parseInt((275 * _zm) / 9) + hday + 1729777;
  }

  _zl = _zjd - 1948440 + 10632;
  _zn = parseInt((_zl - 1) / 10631);
  _zl = _zl - 10631 * _zn + 354;
  _zj = (parseInt((10985 - _zl) / 5316)) * (parseInt((50 * _zl) / 17719)) + (parseInt(_zl / 5670)) * (parseInt((43 * _zl) / 15238));
  _zl = _zl - (parseInt((30 - _zj) / 15)) * (parseInt((17719 * _zj) / 50)) - (parseInt(_zj / 16)) * (parseInt((15238 * _zj) / 43)) + 29;
  _zm = parseInt((24 * _zl) / 709);
  hday = _zl - parseInt((709 * _zm) / 24);
  _zy = 30 * _zn + _zj - 30;


  _bulan = months[_zm - 1];
  _hari = days[zday];

  return {
    day: hday,
    month: _zm,
    year: _zy,
    monthName: _bulan
  };

}

export function getGregorianDate(hijri) {
  var   d = hijri.day;
  var   m = hijri.month;
  var   y = hijri.year;
  var   cdate;

  if (!y) {
    var   hrd = getHijriDate();
    y = hrd.year;
    if ((hrd.month - 1) > hijri.month)
      y++;
  }
  var   jd = intPart((11 * y + 3) / 30) + 354 * y + 30 * m - intPart((m - 1) / 2) + d + 1948440 - 385
  if (jd > 2299160) {
    l = jd + 68569
    n = intPart((4 * l) / 146097)
    l = l - intPart((146097 * n + 3) / 4)
    i = intPart((4000 * (l + 1)) / 1461001)
    l = l - intPart((1461 * i) / 4) + 31
    j = intPart((80 * l) / 2447)
    d = l - intPart((2447 * j) / 80)
    l = intPart(j / 11)
    m = j + 2 - 12 * l
    y = 100 * (n - 49) + i + l
  } else {
    j = jd + 1402
    k = intPart((j - 1) / 1461)
    l = j - 1461 * k
    n = intPart((l - 1) / 365) - intPart(l / 1461)
    i = l - 365 * n + 30
    j = intPart((80 * i) / 2447)
    d = i - intPart((2447 * j) / 80)
    i = intPart(j / 11)
    m = j + 2 - 12 * i
    y = 4 * k + n + i - 4716
  }

  cdate = new Date(y, m, d - 1);
  return cdate;
  //new Date(cdate.getTime() - 3600 * 4);
}
 
export default { 
  getHijriMonth,
  getGregorianDate,
  getHijriDate,
}
