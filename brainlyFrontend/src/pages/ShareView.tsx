import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Card } from "../components/Card";

interface ContentType {
  _id: string;
  title: string;
  link: string;
  type: "youtube" | "twitter";
}

export const ShareView = () => {
  const { shareLink } = useParams();
  const [username, setUsername] = useState("");
  const [contents, setContents] = useState<ContentType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`);
        setUsername(response.data.username);
        setContents(response.data.content);
      } catch (error) {
        console.error("Error fetching shared content", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [shareLink]);

  if (loading) return <div className="p-6 text-lg font-semibold">Loading...</div>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-purple-700">
        {username}'s Shared Brain
      </h1>

      <div className="flex flex-wrap gap-4">
        {contents.map(({ _id, type, link, title }) => (
          <Card
            key={_id}
            id={_id}
            type={type}
            link={link}
            title={title}
            onDelete={() => {}}
          />
        ))}
      </div>
    </div>
  );
};
