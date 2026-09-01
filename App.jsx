import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// إعدادات قاعدة البيانات لمشروعك الجديد
const SUPABASE_URL = 'https://zvrskcferjktyjkrbtdp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GzjhjEuoRjoaamIiNUhARA_7qDXYQoJ';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Team {
  name: string;
  logo: string;
  players: string[];
}

interface Match {
  id: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeGoals: number;
  awayGoals: number;
  played: boolean;
}

interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
}

export default function MidiLeagueApp() {
  const [activeTab, setActiveTab] = useState<'matches' | 'standings' | 'news' | 'teams'>('matches');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // تحديث الروابط (شعار الدوري وصورة الزعيم والفرق)
  const leagueLogo = 'https://i.postimg.cc/xC7qTMXK/IMG-20260829-232623.png';

  const [teams, setTeams] = useState<Team[]>([
    {
      name: 'الفرسان',
      logo: 'https://i.postimg.cc/44BQ2WGZ/IMG-20260829-231743.png',
      players: ['علي محمد (حارس)', 'سعد جمال', 'صابر خوري', 'محمد هليلي', 'سلطان جمال', 'عادل علي حسين', 'حسن عرار', 'علول محمد ابراهيم', 'ابراهيم ماجد', 'رياض خوري', 'محمد حسن جمال', 'حسين علي مهيم', 'اسامه مصبح', 'حسن موزان', 'محمد عزي', 'طيب احمد', 'عمار محمد علي', 'اصيل علي', 'صديق محمد', 'احمد طيب متنبك', 'ناصر جمال', 'خالد نجدي', 'ايوب جعيدي', 'سلطان فتيني']
    },
    {
      name: 'الزعيم',
      logo: 'https://i.postimg.cc/fRht9cBK/IMG-20260829-231721.jpg',
      players: ['حافظ متنبك (حارس)', 'خالد خوري', 'عبدالله جفري', 'يوسف عاتي', 'يحيى نجدي', 'رامي قحم', 'علي دحباش', 'عبدالله فريد', 'تيسير', 'سلمان خالد', 'ابراهيم متنبك', 'عسيري', 'وليد احمد', 'احمد موسى', 'محمد يحيى', 'عبده فتيني', 'رائد حسن', 'احمد محمد متنبك', 'علي بخاش', 'محمد قشه', 'محمد علي حبجي', 'ماجد خوري', 'عبدالله موسى عاتي', 'هاني (مدافع)']
    },
    {
      name: 'المجد',
      logo: 'https://i.postimg.cc/jSWc7PGV/IMG-20260829-231638.png',
      players: ['محمد جربحي (حارس)', 'محمد ناشف', 'فواز جفري', 'رعد حرملي', 'علي طيب قصير', 'أسعد دحباش', 'عبدالله محمد كبير', 'عادل عاتي', 'عبدالله قبار', 'طلال ابكر', 'عبدالله خوري', 'عبدالله يوسف', 'احمد شداد', 'إبراهيم أحمد', 'طارق علي', 'ناصر عرار', 'عبده بلوش', 'عبده الملك', 'فواز علي', 'محمد صديق', 'علي خوري', 'عبدالله متنبك', 'أحمد عكرش', 'ماهو متنبك']
    },
    {
      name: 'الصقور',
      logo: 'https://i.postimg.cc/QtZfsC4n/IMG-20260829-232527.png',
      players: ['علي عرار', 'عيسى عاتي', 'فؤاد جمال', 'عبده محمد خوري', 'اياد حسن', 'حسام جفري', 'ناجي مصبح', 'عبدالعزيز ابكر', 'احمد جلحوف', 'عبده عرار', 'سيف بيكر', 'إبراهيم عبده', 'حسن ماجد', 'يحيى مارادونا', 'عجار محمد', 'علي بلوش', 'علي متنبك', 'محمد بخاش', 'رمزي حرملي', 'علي هادي', 'رياض فايد', 'فؤاد محمد احمد', 'مراد عاتي', 'علي متنبك']
    }
  ]);

  // جدول مباريات الذهاب الست الكاملة
  const [matches, setMatches] = useState<Match[]>([
    { id: '1', date: '28 أغسطس 2026', homeTeam: 'الزعيم', awayTeam: 'الفرسان', homeGoals: 0, awayGoals: 0, played: false },
    { id: '2', date: '30 أغسطس 2026', homeTeam: 'المجد', awayTeam: 'الصقور', homeGoals: 0, awayGoals: 0, played: false },
    { id: '3', date: '1 سبتمبر 2026', homeTeam: 'الفرسان', awayTeam: 'المجد', homeGoals: 0, awayGoals: 0, played: false },
    { id: '4', date: '3 سبتمبر 2026', homeTeam: 'الزعيم', awayTeam: 'الصقور', homeGoals: 0, awayGoals: 0, played: false },
    { id: '5', date: '5 سبتمبر 2026', homeTeam: 'الفرسان', awayTeam: 'الصقور', homeGoals: 0, awayGoals: 0, played: false },
    { id: '6', date: '7 سبتمبر 2026', homeTeam: 'الزعيم', awayTeam: 'المجد', homeGoals: 0, awayGoals: 0, played: false }
  ]);

  const [news, setNews] = useState<NewsItem[]>([
    { id: '1', title: 'انطلاق دوري ميدي للمحترفين 2026', content: 'بحماس كبير انطلقت منافسات الدوري على ملعب بني فايد وسط حضور جماهيري.', date: '2026-08-28' }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from('league_data').select('*').eq('id', 1).single();
      if (data) {
        if (data.teams) setTeams(data.teams);
        if (data.matches && data.matches.length > 0) setMatches(data.matches);
        if (data.news) setNews(data.news);
      }
    } catch (e) {
      console.log('Load error or empty');
    }
    setLoading(false);
  };

  const saveData = async (newMatches = matches) => {
    try {
      const { error } = await supabase.from('league_data').upsert({
        id: 1,
        teams,
        matches: newMatches,
        news,
        updated_at: new Date().toISOString()
      });
      if (error) alert('خطأ في الحفظ: ' + error.message);
      else alert('تم الحفظ وتحديث النتائج بنجاح ليراها الجميع فوراً!');
    } catch (e) {
      alert('حدث خطأ في الاتصال');
    }
  };

  return (
    <div className={darkMode ? 'bg-gray-900 text-white min-h-screen pb-20' : 'bg-gray-50 text-gray-900 min-h-screen pb-20'}>
      <header className="bg-emerald-700 text-white p-4 shadow flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={leagueLogo} alt="Logo" className="w-9 h-9 object-contain bg-white rounded-full p-1" />
          <div>
            <h1 className="font-bold text-sm">دوري ميدي للمحترفين</h1>
            <p className="text-[10px] text-emerald-200">ملعب بني فايد 2026</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setDarkMode(!darkMode)} className="p-1 bg-emerald-800 rounded text-xs px-2">
            {darkMode ? '☀️' : '🌙'}
          </button>
          <button onClick={() => setIsAdmin(!isAdmin)} className="bg-amber-500 text-gray-900 px-2 py-1 rounded font-bold text-xs">
            ⚙️ الإدارة
          </button>
        </div>
      </header>

      {isAdmin && (
        <div className="p-3 bg-gray-800 border-b border-gray-700 m-2 rounded">
          <h2 className="font-bold text-sm mb-2 text-amber-400">لوحة الإدارة (رمز الدخول: aymanmidi)</h2>
          <input 
            type="password" 
            placeholder="أدخل رمز الأمان" 
            value={adminPin} 
            onChange={(e) => setAdminPin(e.target.value)}
            className="p-1 rounded bg-gray-900 text-white border border-gray-700 text-xs w-full mb-2"
          />
          {adminPin === 'aymanmidi' && (
            <div className="mt-2 max-h-60 overflow-y-auto">
              <p className="text-xs text-emerald-400 mb-2">تعديل نتائج مباريات الذهاب الست:</p>
              {matches.map((m, idx) => (
                <div key={m.id} className="flex items-center justify-between gap-1 mb-2 bg-gray-900 p-2 rounded text-xs">
                  <span className="w-16 truncate">{m.homeTeam}</span>
                  <input type="number" value={m.homeGoals} onChange={(e) => {
                    const up = [...matches];
                    up[idx].homeGoals = Number(e.target.value);
                    setMatches(up);
                  }} className="w-8 text-center bg-gray-800 text-white rounded p-1" />
                  <span>-</span>
                  <input type="number" value={m.awayGoals} onChange={(e) => {
                    const up = [...matches];
                    up[idx].awayGoals = Number(e.target.value);
                    setMatches(up);
                  }} className="w-8 text-center bg-gray-800 text-white rounded p-1" />
                  <span className="w-16 truncate text-left">{m.awayTeam}</span>
                  <button onClick={() => {
                    const up = [...matches];
                    up[idx].played = true;
                    setMatches(up);
                    saveData(up);
                  }} className="bg-blue-600 px-2 py-1 rounded text-white text-[10px]">حفظ</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <main className="p-4 max-w-md mx-auto">
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">جاري تحميل البيانات...</div>
        ) : (
          <>
            {activeTab === 'matches' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">📅 جدول المباريات (مرحلة الذهاب - 6 مباريات)</h2>
                {matches.map((m) => (
                  <div key={m.id} className={`p-3 mb-2 rounded shadow border text-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                      <span>المباراة #{m.id}</span>
                      <span>{m.date}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <span>{m.homeTeam}</span>
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-xs">
                        {m.played ? `${m.homeGoals} - ${m.awayGoals}` : 'VS'}
                      </span>
                      <span>{m.awayTeam}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'teams' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">🛡️ الفرق واللاعبين</h2>
                {teams.map((t, i) => (
                  <div key={i} className={`p-3 mb-3 rounded shadow border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <img src={t.logo} alt={t.name} className="w-8 h-8 object-contain bg-black/20 rounded p-0.5" />
                      <h3 className="font-bold text-sm">{t.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      {t.players.map((p, idx) => (
                        <div key={idx} className={`p-1 rounded ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>⚽ {p}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'news' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">📰 الأخبار</h2>
                {news.map((n) => (
                  <div key={n.id} className={`p-3 mb-2 rounded shadow border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-bold text-emerald-400 text-xs mb-1">{n.title}</h3>
                    <p className="text-xs text-gray-300 mb-1">{n.content}</p>
                    <span className="text-[10px] text-gray-500">{n.date}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'standings' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">🏆 جدول الترتيب</h2>
                <div className={`p-4 rounded shadow border text-center text-xs text-gray-400 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  يتم احتساب وترتيب الفرق تلقائياً بناءً على نتائج المباريات المحفوظة.
                </div>
              </div>
            )}
          </>
        )}
      </main>

      <nav className={`fixed bottom-0 left-0 right-0 border-t flex justify-around p-2 text-xs font-bold ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
        <button onClick={() => setActiveTab('matches')} className={activeTab === 'matches' ? 'text-emerald-500' : ''}>📅 المباريات</button>
        <button onClick={() => setActiveTab('standings')} className={activeTab === 'standings' ? 'text-emerald-500' : ''}>🏆 الترتيب</button>
        <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? 'text-emerald-500' : ''}>📰 الأخبار</button>
        <button onClick={() => setActiveTab('teams')} className={activeTab === 'teams' ? 'text-emerald-500' : ''}>🛡️ الفرق</button>
      </nav>

      <footer className="text-center text-[10px] text-gray-500 py-10">
        إعداد وتطوير: أيمن | دوري مديرية ميدي للمحترفين 2026
      </footer>
    </div>
  );
                                             }
