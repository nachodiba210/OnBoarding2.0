SELECT q1.id, q1.username
FROM (
  SELECT users.*, count(users.id)
  FROM users
  INNER JOIN follower ON users.id = follower.id_following
  GROUP BY users.id
  HAVING count(users.id) >= 3
) q1

INNER JOIN wish_list_items ON q1.id = wish_list_items.user_id
WHERE completed IS NULL
GROUP BY q1.id, q1.username;



SELECT q1.id, q1.username
FROM (
  SELECT users.*, count(users.id)
  FROM users
  INNER JOIN follower ON users.id = follower.id_following
  GROUP BY users.id
  HAVING count(users.id) >= 3;
) q1

INNER JOIN

(
  SELECT users.*
  FROM users
  INNER JOIN wish_list_items ON users.id = wish_list_items.user_id
  WHERE completed IS NULL
  GROUP BY users.id
) q2
ON q1.id = q2.id;
