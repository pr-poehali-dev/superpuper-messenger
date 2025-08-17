import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [messages, setMessages] = useState({});
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('favorites');
  const [voiceRecording, setVoiceRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // Реальные данные пользователей
  const realUsers = [
    {
      id: 1,
      name: 'Алексей Петров',
      avatar: '👨‍💻',
      lastMessage: 'Привет! Как дела с проектом?',
      time: '14:23',
      unread: 2,
      online: true,
      lastSeen: 'в сети'
    },
    {
      id: 2,
      name: 'Мария Иванова',
      avatar: '👩‍🎨',
      lastMessage: 'Отправила тебе файлы по дизайну',
      time: '13:45',
      unread: 0,
      online: false,
      lastSeen: 'была 2 часа назад'
    },
    {
      id: 3,
      name: 'Денис Козлов',
      avatar: '🎮',
      lastMessage: 'Го в игру сегодня вечером?',
      time: '12:30',
      unread: 1,
      online: true,
      lastSeen: 'в сети'
    },
    {
      id: 4,
      name: 'Анна Смирнова',
      avatar: '📚',
      lastMessage: 'Спасибо за помощь с учебой!',
      time: 'вчера',
      unread: 0,
      online: false,
      lastSeen: 'была вчера'
    }
  ];

  // Группы
  const groups = [
    {
      id: 101,
      name: 'Команда разработки',
      avatar: '💼',
      lastMessage: 'Алексей: Собираемся в 15:00',
      time: '14:50',
      unread: 5,
      members: 8,
      isGroup: true
    },
    {
      id: 102,
      name: 'Друзья геймеры',
      avatar: '🎮',
      lastMessage: 'Денис: Новая игра вышла!',
      time: '13:20',
      unread: 12,
      members: 15,
      isGroup: true
    }
  ];

  // Избранные контакты
  const favorites = realUsers.slice(0, 2);

  // Инициализация сообщений
  useEffect(() => {
    const initialMessages = {
      1: [
        { id: 1, text: 'Привет! Как дела с проектом?', sender: 'other', time: '14:20', status: 'read' },
        { id: 2, text: 'Привет! Всё идёт хорошо, почти закончил', sender: 'me', time: '14:23', status: 'sent' },
        { id: 3, text: 'Отлично! Жду результатов', sender: 'other', time: '14:23', status: 'read' }
      ],
      2: [
        { id: 1, text: 'Отправила тебе файлы по дизайну', sender: 'other', time: '13:40', status: 'read' },
        { id: 2, text: 'Спасибо! Посмотрю', sender: 'me', time: '13:45', status: 'read' }
      ],
      3: [
        { id: 1, text: 'Го в игру сегодня вечером?', sender: 'other', time: '12:25', status: 'read' },
        { id: 2, text: 'Конечно! Во сколько?', sender: 'me', time: '12:30', status: 'delivered' }
      ],
      4: [
        { id: 1, text: 'Спасибо за помощь с учебой!', sender: 'other', time: 'вчера', status: 'read' }
      ],
      101: [
        { id: 1, text: 'Алексей: Всем привет! Собираемся в 15:00', sender: 'other', time: '14:50', status: 'read' },
        { id: 2, text: 'Буду!', sender: 'me', time: '14:51', status: 'sent' }
      ],
      102: [
        { id: 1, text: 'Денис: Новая игра вышла! Кто пойдет?', sender: 'other', time: '13:20', status: 'read' },
        { id: 2, text: 'Я готов!', sender: 'me', time: '13:25', status: 'sent' }
      ]
    };
    setMessages(initialMessages);
  }, []);

  // Прокрутка к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, selectedChat]);

  const handleLogin = () => {
    if (loginData.username.trim() && loginData.password.trim()) {
      setIsLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'sending'
      };
      
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), newMessage]
      }));
      
      setMessage('');
      
      // Имитация отправки и ответа
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [selectedChat]: prev[selectedChat].map(msg => 
            msg.id === newMessage.id ? {...msg, status: 'sent'} : msg
          )
        }));
        
        // Имитация ответа от собеседника
        if (!groups.find(g => g.id === selectedChat)) {
          const user = realUsers.find(u => u.id === selectedChat);
          if (user) {
            setIsTyping(true);
            setTimeout(() => {
              setIsTyping(false);
              const responseMessage = {
                id: Date.now() + 1,
                text: getRandomResponse(),
                sender: 'other',
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                status: 'read'
              };
              setMessages(prev => ({
                ...prev,
                [selectedChat]: [...prev[selectedChat], responseMessage]
              }));
            }, 2000);
          }
        }
      }, 1000);
    }
  };

  const getRandomResponse = () => {
    const responses = [
      'Понял тебя!',
      'Согласен 👍',
      'Отлично!',
      'Хорошая идея',
      'Давай сделаем это',
      'Круто!',
      'Поехали! 🚀',
      'Я за!',
      'Супер!'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  const startVoiceRecording = () => {
    setVoiceRecording(true);
    setTimeout(() => {
      setVoiceRecording(false);
      const voiceMessage = {
        id: Date.now(),
        text: '🎤 Голосовое сообщение (00:05)',
        sender: 'me',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        status: 'sent',
        isVoice: true
      };
      setMessages(prev => ({
        ...prev,
        [selectedChat]: [...(prev[selectedChat] || []), voiceMessage]
      }));
    }, 3000);
  };

  const getCurrentUser = () => {
    const allChats = [...realUsers, ...groups];
    return allChats.find(chat => chat.id === selectedChat);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedChat(1);
    setMessage('');
    setActiveTab('favorites');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-300 to-teal-400 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-white/95 backdrop-blur-sm border-2 border-orange-200 shadow-2xl animate-scale-in">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4 animate-pulse">🚀</div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              СуперПуперДаня
            </h1>
            <p className="text-gray-600 mt-2">Войди в игровой мессенджер!</p>
          </div>
          
          <div className="space-y-4">
            <Input
              placeholder="Логин"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              className="border-2 border-orange-200 focus:border-orange-400 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="border-2 border-orange-200 focus:border-orange-400 transition-colors"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <Button 
              onClick={handleLogin}
              disabled={!loginData.username.trim() || !loginData.password.trim()}
              className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg disabled:opacity-50 disabled:hover:scale-100"
            >
              Войти в СуперПуперДаня! 🎮
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Заголовок */}
      <div className="bg-gradient-to-r from-orange-500 to-purple-600 p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl animate-pulse">🚀</div>
            <h1 className="text-xl font-bold">СуперПуперДаня</h1>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarFallback className="bg-orange-500 text-white">
                {loginData.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              variant="ghost" 
              className="text-white hover:bg-white/20 transition-colors"
              onClick={handleLogout}
            >
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Боковая панель */}
        <div className="w-80 bg-slate-800 border-r border-gray-700 flex flex-col">
          {/* Вкладки */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700 border-b border-gray-600">
              <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500 transition-colors">
                <Icon name="Heart" size={16} />
                <span className="text-xs">Избранные</span>
              </TabsTrigger>
              <TabsTrigger value="chats" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500 transition-colors">
                <Icon name="MessageCircle" size={16} />
                <span className="text-xs">Чаты</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500 transition-colors">
                <Icon name="Users" size={16} />
                <span className="text-xs">Группы</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500 transition-colors">
                <Icon name="Mic" size={16} />
                <span className="text-xs">Голосовые</span>
              </TabsTrigger>
            </TabsList>

            {/* Избранные контакты */}
            <TabsContent value="favorites" className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-orange-400">⭐ Избранные друзья</h3>
                <div className="space-y-2">
                  {favorites.map(user => (
                    <Card 
                      key={user.id}
                      className={`p-3 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                        selectedChat === user.id 
                          ? 'bg-orange-500/20 border-orange-500' 
                          : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                      }`}
                      onClick={() => handleChatSelect(user.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="text-2xl">{user.avatar}</div>
                          {user.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-700 animate-pulse"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white truncate">{user.name}</h4>
                            <span className="text-xs text-gray-400">{user.time}</span>
                          </div>
                          <p className="text-sm text-gray-300 truncate">{user.lastMessage}</p>
                        </div>
                        {user.unread > 0 && (
                          <Badge className="bg-orange-500 text-white animate-pulse">
                            {user.unread}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Все чаты */}
            <TabsContent value="chats" className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-teal-400">💬 Все чаты</h3>
                <div className="space-y-2">
                  {realUsers.map(user => (
                    <Card 
                      key={user.id}
                      className={`p-3 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                        selectedChat === user.id 
                          ? 'bg-teal-500/20 border-teal-500' 
                          : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                      }`}
                      onClick={() => handleChatSelect(user.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="text-2xl">{user.avatar}</div>
                          {user.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-700 animate-pulse"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white truncate">{user.name}</h4>
                            <span className="text-xs text-gray-400">{user.time}</span>
                          </div>
                          <p className="text-sm text-gray-300 truncate">{user.lastMessage}</p>
                          <p className="text-xs text-gray-500">{user.lastSeen}</p>
                        </div>
                        {user.unread > 0 && (
                          <Badge className="bg-orange-500 text-white animate-pulse">
                            {user.unread}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Группы */}
            <TabsContent value="groups" className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-purple-400">👥 Группы</h3>
                <div className="space-y-2">
                  {groups.map(group => (
                    <Card 
                      key={group.id} 
                      className={`p-3 cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                        selectedChat === group.id 
                          ? 'bg-purple-500/20 border-purple-500' 
                          : 'bg-slate-700 border-slate-600 hover:bg-slate-600'
                      }`}
                      onClick={() => handleChatSelect(group.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{group.avatar}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-white truncate">{group.name}</h4>
                            <span className="text-xs text-gray-400">{group.time}</span>
                          </div>
                          <p className="text-sm text-gray-300 truncate">{group.lastMessage}</p>
                          <p className="text-xs text-gray-500">{group.members} участников</p>
                        </div>
                        {group.unread > 0 && (
                          <Badge className="bg-purple-500 text-white animate-pulse">
                            {group.unread}
                          </Badge>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Голосовые сообщения */}
            <TabsContent value="voice" className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4 text-yellow-400">🎤 Голосовые</h3>
                <div className="space-y-3">
                  <Card className="p-4 bg-slate-700 border-slate-600 border-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">👨‍💻</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">Алексей Петров</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 transition-colors"
                            onClick={() => {
                              console.log('Playing voice message');
                            }}
                          >
                            <Icon name="Play" size={12} />
                          </Button>
                          <div className="flex-1 bg-slate-600 h-2 rounded-full">
                            <div className="bg-green-500 h-full rounded-full w-1/3"></div>
                          </div>
                          <span className="text-xs text-gray-400">0:15</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 bg-slate-700 border-slate-600 border-2">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🎮</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">Денис Козлов</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600 transition-colors"
                            onClick={() => {
                              console.log('Playing voice message');
                            }}
                          >
                            <Icon name="Play" size={12} />
                          </Button>
                          <div className="flex-1 bg-slate-600 h-2 rounded-full">
                            <div className="bg-green-500 h-full rounded-full w-2/3"></div>
                          </div>
                          <span className="text-xs text-gray-400">0:23</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Область чата */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              {/* Заголовок чата */}
              <div className="bg-slate-800 p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{getCurrentUser()?.avatar}</div>
                  <div>
                    <h3 className="font-medium text-white">
                      {getCurrentUser()?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {isTyping ? 'печатает...' : getCurrentUser()?.lastSeen || `${getCurrentUser()?.members} участников`}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20 transition-colors"
                      onClick={() => console.log('Звонок')}
                    >
                      <Icon name="Phone" size={16} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-white hover:bg-white/20 transition-colors"
                      onClick={() => console.log('Видеозвонок')}
                    >
                      <Icon name="Video" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {(messages[selectedChat] || []).map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' 
                        : 'bg-slate-700 text-white'
                    }`}>
                      <p>{msg.text}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.sender === 'me' && (
                          <div className="text-xs opacity-70">
                            {msg.status === 'sending' && '⏳'}
                            {msg.status === 'sent' && '✓'}
                            {msg.status === 'delivered' && '✓✓'}
                            {msg.status === 'read' && '✓✓'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="bg-slate-700 text-white px-4 py-2 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Поле ввода */}
              <div className="bg-slate-800 p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-white hover:bg-white/20 transition-colors"
                    onClick={() => console.log('Прикрепить файл')}
                  >
                    <Icon name="Paperclip" size={16} />
                  </Button>
                  <Input
                    placeholder="Написать сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400 focus:border-orange-400 transition-colors"
                  />
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className={`text-white transition-all duration-300 ${
                      voiceRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'hover:bg-white/20'
                    }`}
                    onClick={startVoiceRecording}
                    disabled={voiceRecording}
                  >
                    <Icon name="Mic" size={16} />
                  </Button>
                  <Button 
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Icon name="Send" size={16} />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-slate-800">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">💬</div>
                <h3 className="text-xl font-medium text-white mb-2">Выберите чат</h3>
                <p className="text-gray-400">Начните общение с друзьями!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;