import { useState, useEffect } from "react";



function App() {



  const [tasks, setTasks] = useState(() => {

    const saved = localStorage.getItem("tasks");

    return saved ? JSON.parse(saved) : [];

  });

 

  // 2. 入力欄の文字列を管理する state

  const [input, setInput] = useState("");



  // 3. tasks が変わるたびに localStorage へ自動保存する

  useEffect(() => {

    localStorage.setItem("tasks", JSON.stringify(tasks));

  }, [tasks]);



  // 4. タスクを追加する（空文字チェック・Enter/ボタン対応・スプレッド構文による不変な更新）

  const addTask = (event) => {

    event.preventDefault(); // フォーム送信によるページ再読み込みを防止

    const text = input.trim();

    if (text === "") return; // 空文字の場合は追加しない



    setTasks([

      ...tasks,

      { id: Date.now(), text, done: false }

    ]);

    setInput(""); // 入力欄をクリア

  };



  // 5. 完了状態を切り替える（map を使って対象だけ done を反転した新しい配列を作る）

  const toggleTask = (id) => {

    setTasks(

      tasks.map((task) =>

        task.id === id ? { ...task, done: !task.done } : task

      )

    );

  };



  // 6. タスクを削除する（filter を使って対象以外の新しい配列を作る）

  const deleteTask = (id) => {

    setTasks(tasks.filter((task) => task.id !== id));

  };



  return (

    <main className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">

      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">

        タスク管理アプリ

      </h1>



      {/* 入力フォーム（ボタンクリック、またはEnterキーで送信可能） */}

      <form onSubmit={addTask} className="flex gap-2 mb-6">

        <input

          type="text"

          className="border border-gray-300 rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"

          value={input}

          onChange={(event) => setInput(event.target.value)}

          placeholder="新しいタスクを入力..."

        />

        <button

          type="submit"

          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"

        >

          追加

        </button>

      </form>



      {/* タスク一覧 */}

      <ul className="space-y-3">

        {tasks.map((task) => (

          <li

            key={task.id}

            className="flex items-center justify-between gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-xs"

          >

            {/* タスクテキスト（クリックで完了・未完了を切り替え、完了時は打ち消し線とグレー文字に） */}

            <span

              className={`flex-1 cursor-pointer select-none transition-colors ${

                task.done ? "line-through text-gray-400" : "text-gray-700"

              }`}

              onClick={() => toggleTask(task.id)}

            >

              {task.text}

            </span>



            {/* 削除ボタン */}

            <button

              className="text-red-400 hover:text-red-600 font-medium text-sm px-2 py-1 rounded transition-colors cursor-pointer"

              onClick={() => deleteTask(task.id)}

            >

              削除

            </button>

          </li>

        ))}

      </ul>



      {/* タスクが0件のときの表示 */}

      {tasks.length === 0 && (

        <p className="text-center text-gray-400 mt-8">

          現在タスクはありません。上のフォームから追加してみましょう！

        </p>

      )}

    </main>

  );

}



export default App; 
