import { menuLinks } from "@/site-config";

import { getAllPosts } from "./post";

/**
 * Menu links, minus the blog link when there are no published posts. With no
 * blog to link to, Home just duplicates the site title, so it goes too and the
 * menu renders empty.
 */
export async function getVisibleMenuLinks() {
	const posts = await getAllPosts();
	if (posts.length > 0) return menuLinks;
	return menuLinks.filter((link) => link.path !== "/posts/" && link.path !== "/");
}
