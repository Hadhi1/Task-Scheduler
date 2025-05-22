
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Check, ChevronRight, ListChecks, BarChart3, Zap, Star, UserCheck } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-28">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-inter font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
                  Organize, Summarize & Share Your Tasks Effortlessly.
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  Create todos, generate smart summaries, and post them directly to Slack.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <Link to="/signup">
                    <Button className="text-base px-8 py-6 bg-primary hover:bg-primary/90 hover-scale w-full sm:w-auto">
                      Get Started
                      <ChevronRight size={20} />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="text-base px-8 py-6 hover-scale w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 relative overflow-hidden">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="flex items-center">
                        <span className="w-5 h-5 bg-primary flex items-center justify-center rounded text-white mr-3">
                          <Check size={14} />
                        </span>
                        <span className="text-gray-800">Complete project proposal</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <span className="w-5 h-5 border border-gray-300 rounded mr-3"></span>
                        <span className="text-gray-800">Schedule team meeting</span>
                      </div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center">
                        <span className="w-5 h-5 border border-gray-300 rounded mr-3"></span>
                        <span className="text-gray-800">Research new tools</span>
                      </div>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-100 mt-4">
                      <h4 className="font-medium text-gray-800 mb-1">AI Summary</h4>
                      <p className="text-gray-600 text-sm">Your focus today is on completing the project proposal while preparing for upcoming team coordination...</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-100/50 rounded-full"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-indigo-100/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">Powerful Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                TaskWhiz helps you organize your tasks and communicate your progress effectively.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover-scale">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <ListChecks size={24} className="text-primary" />
                </div>
                <h3 className="font-inter text-xl font-semibold mb-3">Smart Task Management</h3>
                <p className="text-gray-600">
                  Create, organize, and track your tasks with customizable priorities and due dates.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover-scale">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-primary" />
                </div>
                <h3 className="font-inter text-xl font-semibold mb-3">AI-Powered Summaries</h3>
                <p className="text-gray-600">
                  Generate intelligent summaries of your tasks to share with your team or manager.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow hover-scale">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-primary" />
                </div>
                <h3 className="font-inter text-xl font-semibold mb-3">One-Click Sharing</h3>
                <p className="text-gray-600">
                  Share your task summaries directly to Slack with a single click, no copy-pasting needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover-scale relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">1</div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" 
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                       className="text-primary">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3">Add Todos</h3>
                <p className="text-gray-600">
                  Create and organize your tasks with titles, descriptions, due dates, and priorities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover-scale relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">2</div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" 
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                       className="text-primary">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 3v18" />
                    <path d="m14 15 2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3">Generate Summary</h3>
                <p className="text-gray-600">
                  Get AI-powered summaries of your tasks to share with your team or manager.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover-scale relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">3</div>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" 
                       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                       className="text-primary">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </div>
                <h3 className="font-inter font-semibold text-xl mb-3">Share on Slack</h3>
                <p className="text-gray-600">
                  Send your task summaries directly to Slack channels with a single click.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-inter font-bold text-center mb-12">What Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "TaskWhiz has transformed how I organize my daily work. The AI summaries are incredibly useful for my weekly reports!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <UserCheck size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Product Manager</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The Slack integration saves me so much time. I can now send my progress updates without leaving the app."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <UserCheck size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Mark Thompson</p>
                    <p className="text-sm text-gray-500">Software Developer</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={18} className={star < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Clean interface and intuitive design. TaskWhiz has become an essential part of my productivity toolkit."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <UserCheck size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Emily Chen</p>
                    <p className="text-sm text-gray-500">Marketing Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-inter font-bold mb-4">Ready to boost your productivity?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who use TaskWhiz to organize tasks and communicate effectively.
            </p>
            <Link to="/signup">
              <Button className="text-base px-8 py-6 bg-white text-primary hover:bg-white/90 hover-scale">
                Get Started for Free
                <ChevronRight size={20} />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <div className="bg-primary rounded-md w-8 h-8 flex items-center justify-center mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 3v18" />
                    <path d="m14 15 2 2 4-4" />
                  </svg>
                </div>
                <span className="font-inter font-bold text-xl text-primary">TaskWhiz</span>
              </div>
              <p className="text-gray-600 mb-4">
                TaskWhiz helps you organize tasks, generate intelligent summaries, and share your progress with your team.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-primary story-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/todos" className="text-gray-600 hover:text-primary story-link">
                    My Todos
                  </Link>
                </li>
                <li>
                  <Link to="/summary" className="text-gray-600 hover:text-primary story-link">
                    Summary
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary story-link">
                    About
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary story-link">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary story-link">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary story-link">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary story-link">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              © 2025 TaskWhiz. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary story-link">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-primary story-link">Terms of Service</a>
              <a href="#" className="text-gray-600 hover:text-primary story-link">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
