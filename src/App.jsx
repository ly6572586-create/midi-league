import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://zvrskcferjktyjkrbtdp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_GzjhjEuoRjoaamIiNUhARA_7qDXYQoJ';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function MidiLeagueApp() {
  const [activeTab, setActiveTab] = useState('matches');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  const leagueLogo = 'https://i.postimg.cc/xC7qTMXK/IMG-20260829-232623.png';

  const [teams, setTeams] = useState([
    {
      name: 'الفرسان',
      logo: 'https://i.postimg.cc/44BQ2WGZ/IMG-20260829-231743.png',
      players: [
        'علي محمد (حارس)', 'سعد جمال', 'صابر خوري', 'محمد هليلي',
        'سلطان جمال', 'عادل علي حسين', 'حسن عرار', 'علول محمد ابراهيم',
        'ابراهيم ماجد', 'رياض خوري', 'محمد حسن جمال', 'حسين علي مهيم',
        'اسامه مصبح', 'حسن موزان', 'محمد عزي', 'طيب احمد',
        'عمار محمد علي', 'اصيل علي', 'صديق محمد', 'احمد طيب متنبك',
        'ناصر جمال', 'خالد نجدي', 'ايوب جعيدي', 'سلطان فتيني'
      ]
    },
    {
      name: 'الزعيم',
      logo: 'https://i.postimg.cc/fRht9cBK/IMG-20260829-231721.jpg',
      players: [
        'حافظ متنبك (حارس)', 'خالد خوري', 'عبدالله جفري', 'يوسف عاتي',
        'يحيى نجدي', 'رامي قحم', 'علي دحباش', 'عبدالله فريد',
        'تيسير', 'سلمان خالد', 'ابراهيم متنبك', 'عسيري',
        'وليد احمد', 'احمد موسى', 'محمد يحيى', 'عبده فتيني',
        'رائد حسن', 'احمد محمد متنبك', 'علي بخاش', 'محمد قشه',
        'محمد علي حبجي', 'ماجد خوري', 'عبدالله موسى عاتي', 'هاني (مدافع)'
      ]
    },
    {
      name: 'المجد',
      logo: 'https://i.postimg.cc/jSWc7PGV/IMG-20260829-231638.png',
      players: [
        'محمد جربحي (حارس)', 'محمد ناشف', 'فواز جفري', 'رعد حرملي',
        'علي طيب قصير', 'أسعد دحباش', 'عبدالله محمد كبير', 'عادل عاتي',
        'عبدالله قبار', 'طلال ابكر', 'عبدالله خوري', 'عبدالله يوسف',
        'احمد شداد', 'إبراهيم أحمد', 'طارق علي', 'ناصر عرار',
        'عبده بلوش', 'عبده الملك', 'فواز علي', 'محمد صديق',
        'علي خوري', 'عبدالله متنبك', 'أحمد عكرش', 'ماهو متنبك'
      ]
    },
    {
      name: 'الصقور',
      logo: 'https://i.postimg.cc/QtZfsC4n/IMG-20260829-232527.png',
      players: [
        'علي عرار', 'عيسى عاتي', 'فؤاد جمال', 'عبده محمد خوري',
        'اياد حسن', 'حسام جفري', 'ناجي مصبح', 'عبدالعزيز ابكر',
        'احمد جلحوف', 'عبده عرار', 'سيف بيكر', 'إبراهيم عبده',
        'حسن ماجد', 'يحيى مارادونا', 'عجار محمد', 'علي بلوش',
        'علي متنبك', 'محمد بخاش', 'رمزي حرملي', 'علي هادي',
        'رياض فايد', 'فؤاد محمد احمد', 'مراد عاتي'
      ]
    }
  ]);

  const [matches, setMatches] = useState([
    { id: '1', date: '28 أغسطس 2026', homeTeam: 'الزعيم', awayTeam: 'الفرسان', homeGoals: 0, awayGoals: 0, played: false },
    { id: '2', date: '30 أغسطس 2026', homeTeam: 'المجد', awayTeam: 'الصقور', homeGoals: 0, awayGoals: 0, played: false },
    { id: '3', date: '1 سبتمبر 2026', homeTeam: 'الفرسان', awayTeam: 'المجد', homeGoals: 0, awayGoals: 0, played: false },
    { id: '4', date: '3 سبتمبر 2026', homeTeam: 'الزعيم', awayTeam: 'الصقور', homeGoals: 0, awayGoals: 0, played: false },
    { id: '5', date: '5 سبتمبر 2026', homeTeam: 'الفرسان', awayTeam: 'الصقور', homeGoals: 0, awayGoals: 0, played: false },
    { id: '6', date: '7 سبتمبر 2026', homeTeam: 'الزعيم', awayTeam: 'المجد', homeGoals: 0, awayGoals: 0, played: false }
  ]);

  const [news, setNews] = useState([
    {
      id: '1',
      title: 'انطلاق دوري ميدي للمحترفين 2026',
      content: 'بحماس كبير انطلقت منافسات الدوري على ملعب بني فايد وسط حضور جماهيري.',
      date: '2026-08-28'
    }
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('league_data')
        .select('*')
        .eq('id', 1)
        .single();

      if (error) console.log('Load error:', error.message);

      if (data) {
        if (Array.isArray(data.teams) && data.teams.length > 0) setTeams(data.teams);
        if (Array.isArray(data.matches) && data.matches.length > 0) setMatches(data.matches);
        if (Array.isArray(data.news) && data.news.length > 0) setNews(data.news);
      }
    } catch (error) {
      console.log('Load error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveData(newMatches = matches) {
    try {
      const { error } = await supabase.from('league_data').upsert({
        id: 1,
        teams: teams,
        matches: newMatches,
        news: news,
        updated_at: new Date().toISOString()
      });

      if (error) {
        alert('خطأ في الحفظ: ' + error.message);
        return;
      }
      alert('تم الحفظ وتحديث النتائج بنجاح!');
    } catch (error) {
      alert('حدث خطأ في الاتصال بقاعدة البيانات');
    }
  }

  function updateMatchScore(index, field, value) {
    const updatedMatches = [...matches];
    updatedMatches[index] = {
      ...updatedMatches[index],
      [field]: Math.max(0, Number(value) || 0)
    };
    setMatches(updatedMatches);
  }

  function markMatchAsPlayed(index) {
    const updatedMatches = [...matches];
    updatedMatches[index] = { ...updatedMatches[index], played: true };
    setMatches(updatedMatches);
    saveData(updatedMatches);
  }

  // دالة جلب الشعار
  const getTeamLogo = (teamName) => {
    const foundTeam = teams.find((t) => t.name === teamName);
    return foundTeam ? foundTeam.logo : '';
  };

  const standings = teams
    .map((team) => {
      const result = {
        name: team.name,
        logo: team.logo,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0
      };

      const teamMatches = matches.filter(
        (match) => match.played && (match.homeTeam === team.name || match.awayTeam === team.name)
      );

      teamMatches.forEach((match) => {
        const homeGoals = Number(match.homeGoals) || 0;
        const awayGoals = Number(match.awayGoals) || 0;
        result.played += 1;

        if (match.homeTeam === team.name) {
          result.goalsFor += homeGoals;
          result.goalsAgainst += awayGoals;
          if (homeGoals > awayGoals) { result.won += 1; result.points += 3; }
          else if (homeGoals === awayGoals) { result.drawn += 1; result.points += 1; }
          else { result.lost += 1; }
        } else {
          result.goalsFor += awayGoals;
          result.goalsAgainst += homeGoals;
          if (awayGoals > homeGoals) { result.won += 1; result.points += 3; }
          else if (awayGoals === homeGoals) { result.drawn += 1; result.points += 1; }
          else { result.lost += 1; }
        }
      });

      result.goalDifference = result.goalsFor - result.goalsAgainst;
      return result;
    })
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return a.name.localeCompare(b.name, 'ar');
    });

  return (
    <div dir="rtl" className={darkMode ? 'bg-gray-900 text-white min-h-screen pb-20' : 'bg-gray-50 text-gray-900 min-h-screen pb-20'}>
      {/* Header */}
      <header className="bg-emerald-700 text-white p-4 shadow flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={leagueLogo} alt="شعار الدوري" className="w-9 h-9 object-contain bg-white rounded-full p-1" />
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

      {/* Admin Panel */}
      {isAdmin && (
        <div className="p-3 bg-gray-800 border-b border-gray-700 m-2 rounded">
          <h2 className="font-bold text-sm mb-2 text-amber-400">لوحة الإدارة</h2>
          <input
            type="password"
            placeholder="أدخل رمز الأمان"
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            className="p-2 rounded bg-gray-900 text-white border border-gray-700 text-xs w-full mb-2"
          />

          {adminPin === 'aymanmidi' && (
            <div className="mt-2 max-h-60 overflow-y-auto">
              <p className="text-xs text-emerald-400 mb-2">تعديل نتائج مباريات الذهاب:</p>
              {matches.map((match, index) => (
                <div key={match.id} className="flex items-center justify-between gap-1 mb-2 bg-gray-900 p-2 rounded text-xs">
                  <span className="w-16 truncate">{match.homeTeam}</span>
                  <input
                    type="number"
                    min="0"
                    value={match.homeGoals}
                    onChange={(e) => updateMatchScore(index, 'homeGoals', e.target.value)}
                    className="w-10 text-center bg-gray-800 text-white rounded p-1"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min="0"
                    value={match.awayGoals}
                    onChange={(e) => updateMatchScore(index, 'awayGoals', e.target.value)}
                    className="w-10 text-center bg-gray-800 text-white rounded p-1"
                  />
                  <span className="w-16 truncate text-left">{match.awayTeam}</span>
                  <button onClick={() => markMatchAsPlayed(index)} className="bg-blue-600 px-2 py-1 rounded text-white text-[10px]">
                    حفظ
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 max-w-md mx-auto">
        {loading ? (
          <div className="text-center py-10 text-gray-400 text-sm">جاري تحميل البيانات...</div>
        ) : (
          <>
            {/* Matches Tab */}
            {activeTab === 'matches' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">📅 جدول المباريات</h2>
                {matches.map((match) => (
                  <div key={match.id} className={`p-3 mb-2 rounded shadow border text-sm ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between items-center text-[10px] text-gray-400 mb-2">
                      <span>المباراة #{match.id}</span>
                      <span>{match.date}</span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                      <div className="flex items-center gap-2 w-1/3 justify-start">
                        <img src={getTeamLogo(match.homeTeam)} alt={match.homeTeam} className="w-7 h-7 object-contain bg-black/20 rounded p-0.5" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                        <span className="truncate text-xs">{match.homeTeam}</span>
                      </div>
                      <span className="bg-emerald-600 text-white px-2 py-0.5 rounded text-xs mx-1">
                        {match.played ? `${match.homeGoals} - ${match.awayGoals}` : 'VS'}
                      </span>
                      <div className="flex items-center gap-2 w-1/3 justify-end">
                        <span className="truncate text-xs">{match.awayTeam}</span>
                        <img src={getTeamLogo(match.awayTeam)} alt={match.awayTeam} className="w-7 h-7 object-contain bg-black/20 rounded p-0.5" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Teams Tab */}
            {activeTab === 'teams' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">🛡️ الفرق واللاعبين</h2>
                {teams.map((team, index) => (
                  <div key={index} className={`p-3 mb-3 rounded shadow border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain bg-black/20 rounded p-0.5" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <h3 className="font-bold text-sm">{team.name}</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[11px]">
                      {Array.isArray(team.players) && team.players.map((player, playerIndex) => (
                        <div key={playerIndex} className={`p-1 rounded ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                          ⚽ {player}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">📰 الأخبار</h2>
                {news.map((item) => (
                  <div key={item.id} className={`p-3 mb-2 rounded shadow border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <h3 className="font-bold text-emerald-400 text-xs mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-300 mb-1">{item.content}</p>
                    <span className="text-[10px] text-gray-500">{item.date}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Standings Tab */}
            {activeTab === 'standings' && (
              <div>
                <h2 className="font-bold text-base mb-3 border-b pb-1">🏆 جدول الترتيب</h2>
                <div className={`rounded shadow border overflow-x-auto ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                  <table className="w-full text-[10px] text-center">
                    <thead className={darkMode ? 'bg-gray-900 text-emerald-400' : 'bg-gray-100 text-emerald-700'}>
                      <tr>
                        <th className="p-2">م</th>
                        <th className="p-2 text-right">الفريق</th>
                        <th className="p-2">ل</th>
                        <th className="p-2">ف</th>
                        <th className="p-2">ت</th>
                        <th className="p-2">خ</th>
                        <th className="p-2">له</th>
                        <th className="p-2">عليه</th>
                        <th className="p-2">+/-</th>
                        <th className="p-2">ن</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.map((team, index) => (
                        <tr key={team.name} className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                          <td className="p-2 font-bold">{index + 1}</td>
                          <td className="p-2 text-right">
                            <div className="flex items-center gap-1 min-w-[90px]">
                              <img src={team.logo} alt={team.name} className="w-6 h-6 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              <span>{team.name}</span>
                            </div>
                          </td>
                          <td className="p-2">{team.played}</td>
                          <td className="p-2 text-emerald-400">{team.won}</td>
                          <td className="p-2">{team.drawn}</td>
                          <td className="p-2">{team.lost}</td>
                          <td className="p-2">{team.goalsFor}</td>
                          <td className="p-2">{team.goalsAgainst}</td>
                          <td className={`p-2 font-bold ${team.goalDifference > 0 ? 'text-emerald-400' : team.goalDifference < 0 ? 'text-red-400' : ''}`}>
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </td>
                          <td className="p-2 font-bold text-amber-400">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t flex justify-around p-2 text-xs font-bold ${darkMode ? 'bg-gray-900 border-gray-800 text-gray-300' : 'bg-white border-gray-200 text-gray-700'}`}>
        <button onClick={() => setActiveTab('matches')} className={activeTab === 'matches' ? 'text-emerald-500' : ''}>📅 المباريات</button>
        <button onClick={() => setActiveTab('standings')} className={activeTab === 'standings' ? 'text-emerald-500' : ''}>🏆 الترتيب</button>
        <button onClick={() => setActiveTab('news')} className={activeTab === 'news' ? 'text-emerald-500' : ''}>📰 الأخبار</button>
        <button onClick={() => setActiveTab('teams')} className={activeTab === 'teams' ? 'text-emerald-500' : ''}>🛡️ الفرق</button>
      </nav>

      {/* Footer */}
      <footer className="text-center text-[10px] text-gray-500 py-10">
        إعداد وتطوير: أيمن | دوري مديرية ميدي للمحترفين 2026
      </footer>
    </div>
  );
}
