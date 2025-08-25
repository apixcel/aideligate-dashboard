export interface IReview {
  id: string; // uuid
  client_id: string;
  user_name: string;
  rating: 1 | 2 | 3 | 4 | 5; // smallint with CHECK 1..5
  reply: string | null;
  media: string;
  created_at: string;
  text: string;
}
