import { AuthState } from "./auth.module";
import { NewsState } from "./news.module";

export interface ConnectState{
    auth: AuthState;
    news: NewsState;
}
