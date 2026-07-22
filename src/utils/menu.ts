import { menuLinks } from "@/site-config";

import { getAllPosts } from "./post";

/** Menu links, minus the blog link when there are no published posts. */
export async function getVisibleMenuLinks() {
	const posts = await getAllPosts();
	if (posts.length > 0) return menuLinks;
	return menuLinks.filter((link) => link.path !== "/posts/");
}
