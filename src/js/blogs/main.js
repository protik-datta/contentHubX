import "../../utils/navProfilePic.js";
import { BlogController } from "./blogController.js";
import { PostService } from "./postService.js";

new BlogController("#blogGrid");
new PostService("#blogGrid");
