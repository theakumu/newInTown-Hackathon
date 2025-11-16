-- Function to increment post likes
CREATE OR REPLACE FUNCTION increment_post_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_posts
  SET likes = likes + 1
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement post likes
CREATE OR REPLACE FUNCTION decrement_post_likes(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_posts
  SET likes = GREATEST(likes - 1, 0)
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment reply likes
CREATE OR REPLACE FUNCTION increment_reply_likes(reply_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_replies
  SET likes = likes + 1
  WHERE id = reply_id;
END;
$$ LANGUAGE plpgsql;

-- Function to decrement reply likes
CREATE OR REPLACE FUNCTION decrement_reply_likes(reply_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE forum_replies
  SET likes = GREATEST(likes - 1, 0)
  WHERE id = reply_id;
END;
$$ LANGUAGE plpgsql;
