import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Discover from "@/pages/Discover";
import Matches from "@/pages/Matches";
import Chat from "@/pages/Chat";
import ChatDetail from "@/pages/ChatDetail";
import VoiceRooms from "@/pages/VoiceRooms";
import VoiceCall from "@/pages/VoiceCall";
import Profile from "@/pages/Profile";
import ProfileEdit from "@/pages/ProfileEdit";
import Moments from "@/pages/Moments";
import Login from "@/pages/Login";
import Register from "@/pages/Register";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/discover" element={<Discover />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:matchId" element={<ChatDetail />} />
          <Route path="/voice-rooms" element={<VoiceRooms />} />
          <Route path="/voice-call" element={<VoiceCall />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/moments" element={<Moments />} />
        </Route>
        <Route path="/" element={<Navigate to="/discover" replace />} />
        <Route path="*" element={<Navigate to="/discover" replace />} />
      </Routes>
    </Router>
  );
}