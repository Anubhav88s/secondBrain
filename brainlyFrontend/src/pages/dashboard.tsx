import { useState, useEffect } from "react"
import { Button } from '../components/Button'
import { Card } from "../components/Card"
import { CreateContentModel } from "../components/CreateContentModel"
import { PlusIcon } from '../components/icons/plusIcon'
import { ShareIcon } from "../components/icons/shareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent} from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { Logo } from "../components/icons/logo"

const Dashboard = () => {
  const [modelOpen , setModelOpen] = useState(false);
  const {contents, refresh} = useContent();

   useEffect(() => {
    refresh();
  }, [modelOpen])

    const handleDelete = async (contentId: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });
      refresh(); // Refresh the content list after deletion
    } catch (error) {
      console.error("Error deleting content:", error);
    }
  };
  
return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar - visible on md+ only */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 md:ml-72 px-4 py-6">
        {/* Logo on top - mobile only */}
        <div className="block md:hidden mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-800">
          <div className="text-purple-600">
            <Logo/>
          </div>
          Second-Brain
        </div>

        {/* Modal */}
        <CreateContentModel open={modelOpen} onclose={() => setModelOpen(false)} />

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 sm:gap-4 mb-6">
          <Button
            onClick={() => setModelOpen(true)}
            startIcon={<PlusIcon />}
            varient="primary"
            text="Add Content"
          />

          <Button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                { share: true },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}
            startIcon={<ShareIcon />}
            varient="secondary"
            text="Share brain"
          />
        </div>

        {/* Cards */}
        <div className="flex flex-wrap gap-4">
         {contents.map(({ _id, type, link, title }) => (
            <Card 
              key={_id}
              id={_id}
              type={type}
              link={link}
              title={title}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
