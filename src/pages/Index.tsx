import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });

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
      id: 1,
      name: 'Команда разработки',
      avatar: '💼',
      lastMessage: 'Алексей: Собираемся в 15:00',
      time: '14:50',
      unread: 5,
      members: 8
    },
    {
      id: 2,
      name: 'Друзья геймеры',
      avatar: '🎮',
      lastMessage: 'Денис: Новая игра вышла!',
      time: '13:20',
      unread: 12,
      members: 15
    }
  ];

  // Избранные контакты
  const favorites = realUsers.slice(0, 2);

  // Сообщения для выбранного чата
  const getMessages = (chatId) => {
    const messages = {
      1: [
        { id: 1, text: 'Привет! Как дела с проектом?', sender: 'other', time: '14:20' },
        { id: 2, text: 'Привет! Всё идёт хорошо, почти закончил', sender: 'me', time: '14:23' },
        { id: 3, text: 'Отлично! Жду результатов', sender: 'other', time: '14:23' }
      ],
      2: [
        { id: 1, text: 'Отправила тебе файлы по дизайну', sender: 'other', time: '13:40' },
        { id: 2, text: 'Спасибо! Посмотрю', sender: 'me', time: '13:45' }
      ],
      3: [
        { id: 1, text: 'Го в игру сегодня вечером?', sender: 'other', time: '12:25' },
        { id: 2, text: 'Конечно! Во сколько?', sender: 'me', time: '12:30' }
      ]
    };
    return messages[chatId] || [];
  };

  const handleLogin = () => {
    if (loginData.username && loginData.password) {
      setIsLoggedIn(true);
    }
  };

  const sendMessage = () => {
    if (message.trim() && selectedChat) {
      setMessage('');
    }
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
            />
            <Input
              type="password"
              placeholder="Пароль"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              className="border-2 border-orange-200 focus:border-orange-400 transition-colors"
            />
            <Button 
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
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
              <AvatarFallback className="bg-orange-500">Я</AvatarFallback>
            </Avatar>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
              <Icon name="LogOut" size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Боковая панель */}
        <div className="w-80 bg-slate-800 border-r border-gray-700 flex flex-col">
          {/* Вкладки */}
          <Tabs defaultValue="favorites" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700 border-b border-gray-600">
              <TabsTrigger value="favorites" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500">
                <Icon name="Heart" size={16} />
                <span className="text-xs">Избранные</span>
              </TabsTrigger>
              <TabsTrigger value="chats" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500">
                <Icon name="MessageCircle" size={16} />
                <span className="text-xs">Чаты</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500">
                <Icon name="Users" size={16} />
                <span className="text-xs">Группы</span>
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex flex-col items-center gap-1 data-[state=active]:bg-orange-500">
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
                      onClick={() => setSelectedChat(user.id)}
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
                      onClick={() => setSelectedChat(user.id)}
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
                    <Card key={group.id} className="p-3 cursor-pointer transition-all duration-200 hover:scale-105 bg-slate-700 border-slate-600 hover:bg-slate-600 border-2">
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
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
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
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
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
                  <div className="text-2xl">{realUsers.find(u => u.id === selectedChat)?.avatar}</div>
                  <div>
                    <h3 className="font-medium text-white">
                      {realUsers.find(u => u.id === selectedChat)?.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {realUsers.find(u => u.id === selectedChat)?.lastSeen}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Icon name="Phone" size={16} />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                      <Icon name="Video" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Сообщения */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {getMessages(selectedChat).map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' 
                        : 'bg-slate-700 text-white'
                    } animate-fade-in`}>
                      <p>{msg.text}</p>
                      <span className="text-xs opacity-70">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Поле ввода */}
              <div className="bg-slate-800 p-4 border-t border-gray-700">
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Icon name="Paperclip" size={16} />
                  </Button>
                  <Input
                    placeholder="Написать сообщение..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  />
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Icon name="Mic" size={16} />
                  </Button>
                  <Button 
                    onClick={sendMessage}
                    className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 transition-all duration-300 hover:scale-105"
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