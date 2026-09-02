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

  // حالة إضافة خبر جديد من الإدارة
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsContent, setNewNewsContent] = useState('');

  // حالة اختيار لاعب للتعديل عليه في الإدارة
  const [selectedTeamForPlayer, setSelectedTeamForPlayer] = useState('');
  const [selectedPlayerName, setSelectedPlayerName] = useState('');

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

  // قاعدة بيانات إحصائيات اللاعبين
  const [playersStats, setPlayersStats] = useState([]);

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
      content: 'بحماس كبير انطلقت منافسات الدوري على ملعب بني فايد وسط حضور جماهيري غفير.',
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
        if (Array.isArray(data.playersStats)) setPlayersStats(data.playersStats);
      }
    } catch (error) {
      console.log('Load error:', error);
    } finally {
      setLoading(false);
    }
  }

  async function saveData(updatedMatches = matches, updatedNews = news, updatedStats = playersStats) {
    try {
      const { error } = await supabase.from('league_data').upsert({
        id: 1,
        teams: teams,
        matches: updatedMatches,
        news: updatedNews,
        playersStats: updatedStats,
        updated_at: new Date().toISOString()
      });

      if (error) {
        alert('خطأ في الحفظ: ' + error.message);
        return;
      }
      alert('تم حفظ البيانات وتحديث النتائج بنجاح!');
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
    saveData(updatedMatches, news, playersStats);
  }

  // إضافة خبر جديد من الإدارة
  function handleAddNews() {
    if (!newNewsTitle.trim() || !newNewsContent.trim()) {
      alert('الرجاء كتابة العنوان والمحتوى');
      return;
    }
    const createdNews = {
      id: Date.now().toString(),
      title: newNewsTitle,
      content: newNewsContent,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedNewsList = [createdNews, ...news];
    setNews(updatedNewsList);
    setNewNewsTitle('');
    setNewNewsContent('');
    saveData(matches, updatedNewsList, playersStats);
  }

  // تحديث أو إنشاء إحصائية لاعب
  function handleUpdatePlayerStat(field, delta) {
    if (!selectedTeamForPlayer || !selectedPlayerName) {
      alert('يرجى اختيار الفريق واللاعب أولاً');
      return;
    }

    const updatedStats = [...playersStats];
    let playerIndex = updatedStats.findIndex(
      (p) => p.name === selectedPlayerName && p.team === selectedTeamForPlayer
    );

    if (playerIndex === -1) {
      const newPlayerStat = {
        name: selectedPlayerName,
        team: selectedTeamForPlayer,
        goals: 0,
        yellowCards: 0,
        redCards: 0,
        bannedMatches: 0,
        missedMatches: 0
      };
      newPlayerStat[field] = Math.max(0, delta);
      updatedStats.push(newPlayerStat);
    } else {
      const currentVal = updatedStats[playerIndex][field] || 0;
      updatedStats[playerIndex][field] = Math.max(0, currentVal + delta);
    }

    setPlayersStats(updatedStats);
  }

  const getTeamLogo = (teamName) => {
    const foundTeam = teams.find((t) => t.name === teamName);
    return foundTeam ? foundTeam.logo : '';
  };

  // إيجاد إحصائيات اللاعب المحدد في الإدارة
  const selectedPlayerStat = playersStats.find(
    (p) => p.name === selectedPlayerName && p.team === selectedTeamForPlayer
  ) || { goals: 0, yellowCards: 0, redCards: 0, bannedMatches: 0, missedMatches: 0 };

  // قائمة الهدافين مرتبة
  const topScorers = [...playersStats]
    .filter((p) => p.goals > 0)
    .sort((a, b) => b.goals - a.goals);

  // قائمة اللاعبين الموقوفين
  const suspendedPlayers = [...playersStats].filter(
    (p) => p.bannedMatches > p.missedMatches
  );

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
    <div dir="rtl" className={darkMode ? 'bg-slate-950 text-slate-100 min-h-screen pb-24 font-sans' : 'bg-slate-100 text-slate-900 min-h-screen pb-24 font-sans'}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white p-4 shadow-xl backdrop-blur-md bg-opacity-95 border-b border-emerald-500/20">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={leagueLogo} alt="شعار الدوري" className="w-11 h-11 object-contain bg-slate-900/80 rounded-full p-1 border border-emerald-400/40 shadow-inner" />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
            </div>
            <div>
              <h1 className="font-extrabold text-base tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-200">دوري ميدي للمحترفين</h1>
              <p className="text-[10px] font-medium text-emerald-300/80 flex items-center gap-1">
                <span>📍</span> ملعب بني فايد 2026
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-slate-800/80 hover:bg-slate-700 rounded-xl text-xs border border-slate-700 transition-all">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsAdmin(!isAdmin)} className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-3 py-1.5 rounded-xl font-bold text-xs shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all">
              ⚙️ الإدارة
            </button>
          </div>
        </div>
      </header>

      {/* Admin Panel */}
      {isAdmin && (
        <div className="p-4 bg-slate-900/90 border border-amber-500/30 m-3 rounded-2xl shadow-2xl backdrop-blur-lg max-w-md mx-auto space-y-4">
          <h2 className="font-bold text-sm text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-2">
            <span>🛡️</span> لوحة تحكم الإدارة الشاملة
          </h2>

          <input
            type="password"
            placeholder="أدخل رمز الأمان"
            value={adminPin}
            onChange={(e) => setAdminPin(e.target.value)}
            className="p-2.5 rounded-xl bg-slate-950 text-white border border-slate-700 text-xs w-full focus:outline-none focus:border-amber-500"
          />

          {adminPin === 'aymanmidi' && (
            <div className="space-y-4 text-xs">
              {/* قسم تعديل نتائج المباريات */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <p className="text-emerald-400 font-bold mb-2">⚽ تعديل نتائج المباريات:</p>
                <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                  {matches.map((match, index) => (
                    <div key={match.id} className="flex items-center justify-between gap-1 bg-slate-900 p-2 rounded-lg">
                      <span className="w-16 truncate font-medium">{match.homeTeam}</span>
                      <input
                        type="number"
                        min="0"
                        value={match.homeGoals}
                        onChange={(e) => updateMatchScore(index, 'homeGoals', e.target.value)}
                        className="w-9 text-center bg-slate-800 text-amber-400 font-bold rounded p-1 border border-slate-700"
                      />
                      <span className="text-slate-500">:</span>
                      <input
                        type="number"
                        min="0"
                        value={match.awayGoals}
                        onChange={(e) => updateMatchScore(index, 'awayGoals', e.target.value)}
                        className="w-9 text-center bg-slate-800 text-amber-400 font-bold rounded p-1 border border-slate-700"
                      />
                      <span className="w-16 truncate text-left font-medium">{match.awayTeam}</span>
                      <button onClick={() => markMatchAsPlayed(index)} className="bg-emerald-600 px-2 py-1 rounded text-white font-bold text-[10px]">
                        حفظ
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* قسم إضافة خبر جديد */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <p className="text-emerald-400 font-bold">📰 نشر خبر جديد:</p>
                <input
                  type="text"
                  placeholder="عنوان الخبر"
                  value={newNewsTitle}
                  onChange={(e) => setNewNewsTitle(e.target.value)}
                  className="w-full p-2 bg-slate-900 text-white rounded-lg border border-slate-700"
                />
                <textarea
                  placeholder="محتوى الخبر..."
                  value={newNewsContent}
                  onChange={(e) => setNewNewsContent(e.target.value)}
                  className="w-full p-2 bg-slate-900 text-white rounded-lg border border-slate-700 h-16 resize-none"
                />
                <button onClick={handleAddNews} className="w-full bg-emerald-600 font-bold text-white py-1.5 rounded-lg">
                  نشر الخبر
                </button>
              </div>

              {/* قسم إحصائيات وبطاقات اللاعبين */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                <p className="text-amber-400 font-bold">👤 إحصائيات وإنذارات اللاعبين:</p>
                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={selectedTeamForPlayer}
                    onChange={(e) => {
                      setSelectedTeamForPlayer(e.target.value);
                      setSelectedPlayerName('');
                    }}
                    className="p-2 bg-slate-900 text-white rounded-lg border border-slate-700"
                  >
                    <option value="">اختر الفريق...</option>
                    {teams.map((t) => (
                      <option key={t.name} value={t.name}>{t.name}</option>
                    ))}
                  </select>

                  <select
                    value={selectedPlayerName}
                    onChange={(e) => setSelectedPlayerName(e.target.value)}
                    className="p-2 bg-slate-900 text-white rounded-lg border border-slate-700"
                  >
                    <option value="">اختر اللاعب...</option>
                    {teams
                      .find((t) => t.name === selectedTeamForPlayer)
                      ?.players.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                  </select>
                </div>

                {selectedPlayerName && (
                  <div className="mt-2 p-2 bg-slate-900 rounded-lg space-y-2">
                    <p className="text-slate-300 font-bold text-[11px] border-b border-slate-800 pb-1">
                      اللاعب: {selectedPlayerName} ({selectedTeamForPlayer})
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded">
                        <span>⚽ الأهداف: {selectedPlayerStat.goals}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleUpdatePlayerStat('goals', 1)} className="bg-emerald-600 text-white px-2 rounded font-bold">+</button>
                          <button onClick={() => handleUpdatePlayerStat('goals', -1)} className="bg-rose-600 text-white px-2 rounded font-bold">-</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded">
                        <span>🟨 كروت صفراء: {selectedPlayerStat.yellowCards}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleUpdatePlayerStat('yellowCards', 1)} className="bg-emerald-600 text-white px-2 rounded font-bold">+</button>
                          <button onClick={() => handleUpdatePlayerStat('yellowCards', -1)} className="bg-rose-600 text-white px-2 rounded font-bold">-</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded">
                        <span>🟥 كروت حمراء: {selectedPlayerStat.redCards}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleUpdatePlayerStat('redCards', 1)} className="bg-emerald-600 text-white px-2 rounded font-bold">+</button>
                          <button onClick={() => handleUpdatePlayerStat('redCards', -1)} className="bg-rose-600 text-white px-2 rounded font-bold">-</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded">
                        <span>⛔ مباريات إيقاف: {selectedPlayerStat.bannedMatches}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleUpdatePlayerStat('bannedMatches', 1)} className="bg-emerald-600 text-white px-2 rounded font-bold">+</button>
                          <button onClick={() => handleUpdatePlayerStat('bannedMatches', -1)} className="bg-rose-600 text-white px-2 rounded font-bold">-</button>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-950 p-1.5 rounded col-span-2">
                        <span>📋 مباريات تم إيقافها بالفعل: {selectedPlayerStat.missedMatches}</span>
                        <div className="flex gap-1">
                          <button onClick={() => handleUpdatePlayerStat('missedMatches', 1)} className="bg-emerald-600 text-white px-2 rounded font-bold">+</button>
                          <button onClick={() => handleUpdatePlayerStat('missedMatches', -1)} className="bg-rose-600 text-white px-2 rounded font-bold">-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button onClick={() => saveData(matches, news, playersStats)} className="w-full bg-amber-500 text-slate-950 font-bold py-2 rounded-lg mt-2">
                  💾 حفظ التعديلات في قاعدة البيانات
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="p-4 max-w-md mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-400 text-xs font-medium">جاري تحميل البيانات...</p>
          </div>
        ) : (
          <>
            {/* Matches Tab */}
            {activeTab === 'matches' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="font-extrabold text-sm tracking-wide text-emerald-400">📅 جدول المباريات</h2>
                  <span className="text-[11px] text-slate-400 bg-slate-800/60 px-2 py-0.5 rounded-full border border-slate-700/50">المرحلة الأولى</span>
                </div>

                {matches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 relative overflow-hidden ${
                      darkMode
                        ? 'bg-gradient-to-b from-slate-900 to-slate-900/90 border-slate-800 shadow-lg hover:border-slate-700'
                        : 'bg-white border-slate-200 shadow-md'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[10px] font-semibold text-slate-400 mb-2.5 pb-2 border-b border-slate-800/60">
                      <span className="text-emerald-500">جولة {match.id}</span>
                      <span>📅 {match.date}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2.5 w-5/12 justify-start">
                        <img
                          src={getTeamLogo(match.homeTeam)}
                          alt={match.homeTeam}
                          className="w-8 h-8 object-contain bg-slate-950 rounded-xl p-1 border border-slate-800 shadow-inner"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="font-bold text-xs truncate">{match.homeTeam}</span>
                      </div>

                      <div className="flex flex-col items-center justify-center w-2/12">
                        {match.played ? (
                          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-black px-2.5 py-1 rounded-xl text-xs shadow-md border border-emerald-400/30">
                            {match.homeGoals} - {match.awayGoals}
                          </div>
                        ) : (
                          <div className="bg-slate-800 text-slate-300 font-bold px-2 py-1 rounded-xl text-[10px] border border-slate-700">
                            VS
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 w-5/12 justify-end">
                        <span className="font-bold text-xs truncate">{match.awayTeam}</span>
                        <img
                          src={getTeamLogo(match.awayTeam)}
                          alt={match.awayTeam}
                          className="w-8 h-8 object-contain bg-slate-950 rounded-xl p-1 border border-slate-800 shadow-inner"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Top Scorers & Stats Tab */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div>
                  <h2 className="font-extrabold text-sm tracking-wide text-emerald-400 mb-3">⚽ قائمة الهدافين</h2>
                  {topScorers.length === 0 ? (
                    <p className="text-xs text-slate-400 bg-slate-900 p-4 rounded-xl text-center">لا يوجد أهداف مسجلة حتى الآن.</p>
                  ) : (
                    <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                      {topScorers.map((player, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border-b border-slate-800/50 last:border-0 text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-amber-400 w-5">{index + 1}</span>
                            <img src={getTeamLogo(player.team)} alt={player.team} className="w-6 h-6 object-contain bg-slate-950 rounded p-0.5" />
                            <div>
                              <p className="font-bold text-slate-100">{player.name}</p>
                              <p className="text-[10px] text-slate-400">{player.team}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20 text-emerald-400 font-black">
                            <span>⚽</span>
                            <span>{player.goals}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* قائمة الموقوفين */}
                <div>
                  <h2 className="font-extrabold text-sm tracking-wide text-rose-400 mb-3">⛔ اللاعبين الموقوفين</h2>
                  {suspendedPlayers.length === 0 ? (
                    <p className="text-xs text-slate-400 bg-slate-900 p-4 rounded-xl text-center">لا يوجد لاعبين موقوفين حالياً.</p>
                  ) : (
                    <div className="space-y-2">
                      {suspendedPlayers.map((player, index) => (
                        <div key={index} className="bg-rose-500/10 border border-rose-500/20 p-3 rounded-2xl flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <img src={getTeamLogo(player.team)} alt={player.team} className="w-6 h-6 object-contain bg-slate-950 rounded p-0.5" />
                            <div>
                              <p className="font-bold text-rose-200">{player.name}</p>
                              <p className="text-[10px] text-slate-400">{player.team}</p>
                            </div>
                          </div>
                          <div className="text-right text-[10px] text-rose-300">
                            <p className="font-bold">موقوف: {player.bannedMatches - player.missedMatches} مباراة</p>
                            <p className="text-slate-400">🟨 {player.yellowCards} | 🟥 {player.redCards}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Standings Tab */}
            {activeTab === 'standings' && (
              <div>
                <h2 className="font-extrabold text-sm tracking-wide text-emerald-400 mb-3">🏆 جدول ترتيب الدوري</h2>
                <div className={`rounded-2xl shadow-xl border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <table className="w-full text-xs text-center border-collapse">
                    <thead className={darkMode ? 'bg-slate-950 text-emerald-400 font-bold border-b border-slate-800' : 'bg-slate-100 text-emerald-800 font-bold'}>
                      <tr>
                        <th className="p-2.5">م</th>
                        <th className="p-2.5 text-right">الفريق</th>
                        <th className="p-2.5">ل</th>
                        <th className="p-2.5">ف</th>
                        <th className="p-2.5">ت</th>
                        <th className="p-2.5">خ</th>
                        <th className="p-2.5">+/-</th>
                        <th className="p-2.5 font-black">ن</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {standings.map((team, index) => (
                        <tr key={team.name} className={`transition-colors ${index === 0 ? 'bg-emerald-500/10' : ''}`}>
                          <td className="p-2.5 font-bold">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                          </td>
                          <td className="p-2.5 text-right font-bold">
                            <div className="flex items-center gap-2">
                              <img src={team.logo} alt={team.name} className="w-6 h-6 object-contain rounded-lg p-0.5 bg-slate-950 border border-slate-800" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              <span className="truncate">{team.name}</span>
                            </div>
                          </td>
                          <td className="p-2.5 text-slate-400">{team.played}</td>
                          <td className="p-2.5 text-emerald-400 font-semibold">{team.won}</td>
                          <td className="p-2.5 text-slate-400">{team.drawn}</td>
                          <td className="p-2.5 text-slate-400">{team.lost}</td>
                          <td className={`p-2.5 font-semibold text-[11px] ${team.goalDifference > 0 ? 'text-emerald-400' : team.goalDifference < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </td>
                          <td className="p-2.5 font-black text-amber-400 text-sm">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Teams Tab */}
            {activeTab === 'teams' && (
              <div className="space-y-3">
                <h2 className="font-extrabold text-sm tracking-wide text-emerald-400 mb-3">🛡️ قائمة الفرق واللاعبين</h2>
                {teams.map((team, index) => (
                  <div key={index} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex items-center gap-3 mb-3 pb-2 border-b border-slate-800">
                      <img src={team.logo} alt={team.name} className="w-10 h-10 object-contain bg-slate-950 rounded-xl p-1 border border-slate-800" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                      <h3 className="font-bold text-sm text-slate-100">{team.name}</h3>
                      <span className="text-[10px] text-slate-500 mr-auto">{team.players.length} لاعب</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                      {Array.isArray(team.players) && team.players.map((player, playerIndex) => {
                        const stat = playersStats.find((p) => p.name === player && p.team === team.name);
                        return (
                          <div key={playerIndex} className={`p-2 rounded-xl flex items-center justify-between ${darkMode ? 'bg-slate-950/80 text-slate-300 border border-slate-800/50' : 'bg-slate-100 text-slate-700'}`}>
                            <span className="truncate">⚽ {player}</span>
                            {stat && (
                              <div className="flex gap-1 text-[9px] font-bold">
                                {stat.goals > 0 && <span className="text-emerald-400">⚽{stat.goals}</span>}
                                {stat.yellowCards > 0 && <span className="text-amber-400">🟨{stat.yellowCards}</span>}
                                {stat.redCards > 0 && <span className="text-rose-500">🟥{stat.redCards}</span>}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
              <div className="space-y-3">
                <h2 className="font-extrabold text-sm tracking-wide text-emerald-400 mb-3">📰 أحدث الأخبار والتغطيات</h2>
                {news.map((item) => (
                  <div key={item.id} className={`p-4 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h3 className="font-bold text-emerald-400 text-xs mb-1.5">{item.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{item.content}</p>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <span>🕒</span> {item.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Navigation السفلي */}
      <nav className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl transition-all ${darkMode ? 'bg-slate-950/90 border-slate-800/80 text-slate-400' : 'bg-white/90 border-slate-200 text-slate-600'}`}>
        <div className="max-w-md mx-auto flex justify-around p-2 text-[10px] font-bold">
          {[
            { id: 'matches', label: 'المباريات', icon: '📅' },
            { id: 'standings', label: 'الترتيب', icon: '🏆' },
            { id: 'stats', label: 'الهدافين', icon: '⚽' },
            { id: 'news', label: 'الأخبار', icon: '📰' },
            { id: 'teams', label: 'الفرق', icon: '🛡️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-emerald-400 bg-emerald-500/10 scale-105'
                  : 'hover:text-slate-200'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-500 py-8">
        تطوير وتصميم: <span className="text-emerald-400 font-semibold">أيمن</span> | دوري ميدي للمحترفين 2026
      </footer>
    </div>
  );
}
