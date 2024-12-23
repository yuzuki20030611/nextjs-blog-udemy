import fs from 'fs';
import path from 'path';
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html"


const postsDirectory = path.join(process.cwd(), "posts1");


export function getPostsData () {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");


        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");

        const matterResult = matter(fileContents);

        return {
            id,
            ...matterResult.data,
        }
    });
    return allPostData;
}

// getStaticPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
  
    return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''), // .md拡張子を削除
        },
      };
    });
  }
  
// idに基づいてブログ投稿データを返す
export async  function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark()
    .use(html)
    .process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    }
}