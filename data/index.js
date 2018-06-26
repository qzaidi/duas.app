
const menu = [
  {
    name: 'The Quran',
    key: 'quran',
    arabic: 'القرآن الكريم',
    icon: 'icon-quran.png',
  },
  {
    name: 'Whispered Prayers',
    key: 'munajat',
    icon: 'icon-munajat.png',
    arabic: 'مناجاة',
    screen: 'Detail',
  },
  {
    name: 'Supplications',
    key: 'duas',
    icon: 'icon-dua.png',
    arabic: 'ادعية',
  },
  {
    name: 'Events',
    key: 'events',
    icon: 'icon-events.png',
    arabic: 'أيام خاصة',
  },
  {
    name: 'Ziyarat',
    key: 'ziyarat',
    icon: 'icon-ziyarat.png',
    arabic: 'زیارات',
    screen: 'Collection',
  },
  {
    name: 'Asma-ul-Husna',
    key: 'asmaulhusna',
    icon: 'icon-allah.png',
    arabic: 'اسماء الحسنى',
  },
  {
    name: 'Prayer Times',
    key: 'prayertimes',
    icon: 'icon-praytimes.png',
    arabic: 'اوقات صلاة',
    screen: 'Pray',
  },
  {
    name: 'Prayers',
    key: 'salat',
    icon: 'icon-munajat.png',
    arabic: 'صلاة',
  },
  {
    name: 'Nahjul Balagha',
    key: 'nahjulbalagha',
    icon: 'icon-nahj.png',
    arabic: 'نھج البلاغہ',
  },
  {
    name: 'Treatise of Rights',
    key:  'treatise',
    icon: 'icon-rights.png',
    arabic: 'رسالة حقوق الامام زين العابدين',
  },
  {
    name: 'Ahadith',
    key: 'ahadith',
    icon: 'icon-ahlebait.png',
    arabic: 'احاديث',
  },
  {
    name: 'Pearls of Wisdom',
    key: 'teachings',
    icon: 'icon-tesbih.png',
    arabic: 'قصص اطفال',
  },
  {
    name: 'Gallery',
    key: 'slides',
    icon: 'icon-video.png',
    arabic: 'تصاویر',
  }
];

export default menu.map(m =>  ({
    name: m.name,
    key: m.key,
    icon: 'https://duas.mobi/img/' + m.icon,
    arabic: m.arabic,
    desc: 'Lorem Ipsum Dolor ..',
    screen: m.screen,
}))
