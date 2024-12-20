import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./app.scss";
import { Header } from "../components/common/Header/Header.jsx";
import { Main } from "../components/common/Main/Main.jsx";
import { BackButton } from "../components/common/BackButton/BackButton.jsx";
import { Heading } from "../components/common/Heading/Heading.jsx";
import { Searchbox } from "../components/common/Searchbox/Searchbox.jsx";
import { DropdownMenu } from "../components/common/DropdownMenu/DropdownMenu.jsx";
import { BookInfoBox } from "../components/memo/BookInfoBox/BookInfoBox.jsx";

export const Search = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // ローディング状態を管理
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("query") || "";

  // クエリパラメータの変化を検知して検索実行
  useEffect(() => {
    const search = async () => {
      console.log(`searchParams: ${searchParams}`);
      console.log(`Searching for: ${searchTerm}`);
      if (!searchTerm) return; // パラメータがない場合は処理しない

      setIsLoading(true); // ローディング開始

      // APIを呼び出し、結果を設定
      try {
        const searchParams = new URLSearchParams({
          query: searchTerm, // 'query' パラメータとして送信
        });

        const response = await fetch(
          `http://localhost:3000/books/search?${searchParams.toString()}`
        );

        if (!response.ok) {
          const errorText = await response.text(); // レスポンスボディも確認
          throw new Error(`API error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        // レスポンスがJSONであることを確認
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text(); // レスポンスがJSONでない場合の確認
          throw new Error("Expected JSON, but got " + text);
        }

        const data = await response.json();
        setResults(data.results || []); // 結果がない場合は空配列
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]); // エラーの場合も空配列を設定
      } finally {
        setIsLoading(false); // ローディング終了
      }
    };

    search();
  }, [searchTerm]);

  return (
    <>
      <Header>
        <Searchbox key="searchbox" />
        <DropdownMenu key="dropdownMenu" />
      </Header>
      <Main width="648">
        <BackButton key="backButton" />
        <Heading key="pageTitle" type="h2" children={`検索結果：${searchTerm}`} />
        <div className="searchResults">
          {isLoading ? (
            <p>検索中...</p>
          ) : results.length === 0 ? (
            searchTerm ? (
              <p>「{searchTerm}」は見つかりませんでした。</p>
            ) : (
              <p>検索キーワードを入力してください。</p>
            )
          ) : (
            <ul className="list">
              {results?.map((result, index) => (
                <li key={index}>
                  <BookInfoBox
                    buttonLinkTo="/single"
                    buttonColor="blue"
                    buttonChildren="本棚に登録"
                    title={result.title}
                    author={result.author}
                    publisher={result.publisher}
                    publishedDate={result.publishedDate}
                    coverImageUrl={result.coverImageUrl}
                    amazonLink={result.amazonLink}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Main>
    </>
  );
};
