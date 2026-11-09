/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Home,
  Search,
  CheckSquare,
  UserCheck,
  Layers,
  BarChart2,
  LogOut,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Briefcase,
  Calendar,
  Send,
  Filter,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  Mail,
  Plus,
  MessageSquare,
  Phone,
  Building2,
  GraduationCap,
  User,
  ExternalLink,
  PlusSquare,
  IdCard,
  X,
  Loader2,
  Pause,
  Play,
} from 'lucide-react';

// Custom SMS Icon with 3 dots inside speech bubble
function SmsIcon({ className = 'w-4 h-4 text-slate-500' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <circle cx="9" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="15" cy="11.5" r="0.8" fill="currentColor" />
    </svg>
  );
}

// Custom WhatsApp Icon
function WhatsAppIcon({ className = 'w-4 h-4 text-slate-500' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      <path
        d="M9.5 8.5c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.2s1 2.5 1.1 2.7c.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5 0 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3s-.2-.2-.5-.3-1.6-.8-1.8-.9c-.2-.1-.4-.2-.6.1-.2.2-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.3-.5-2.5-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7.1-.1.3-.4.4-.6.1-.2.2-.3.3-.5s0-.4 0-.5c-.1-.1-.7-1.8-.9-2.4-.3-.6-.5-.5-.7-.5z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

interface CandidateRequirement {
  id: string;
  title: string;
  matchScore: string;
  appliedDate: string;
  status: string;
  department: string;
}

const CANDIDATE_REQUIREMENTS_MAP: Record<string, CandidateRequirement[]> = {
  'Aditya Roy Test': [
    { id: 'req-1', title: 'Business Analyst And Quality Analyst', matchScore: '100%', appliedDate: '16 Sep 2026', status: 'Active', department: 'Data Analysis' },
    { id: 'req-2', title: 'Senior QA & Data Systems Analyst', matchScore: '92%', appliedDate: '22 Aug 2026', status: 'Screened', department: 'Quality Assurance' },
    { id: 'req-3', title: 'Product Quality Specialist', matchScore: '85%', appliedDate: '05 Jul 2026', status: 'Sourced', department: 'Product Ops' },
  ],
  'Shuvam Jena': [
    { id: 'req-1', title: 'Business Analyst And Quality Analyst', matchScore: '100%', appliedDate: '18 Sep 2026', status: 'Screened', department: 'Data Analysis' },
    { id: 'req-4', title: 'Automated Test Engineer', matchScore: '95%', appliedDate: '01 Sep 2026', status: 'Offered', department: 'Engineering' },
  ],
  'Raj': [
    { id: 'req-1', title: 'Business Analyst And Quality Analyst', matchScore: '93%', appliedDate: '20 Sep 2026', status: 'Offered', department: 'Data Analysis' },
    { id: 'req-5', title: 'Product Analyst & BI Specialist', matchScore: '88%', appliedDate: '10 Aug 2026', status: 'Applied', department: 'Business Intelligence' },
  ],
  'Test Yogesh': [
    { id: 'req-1', title: 'Business Analyst And Quality Analyst', matchScore: '78%', appliedDate: '12 Sep 2026', status: 'Screened', department: 'Data Analysis' },
    { id: 'req-6', title: 'Quality Assurance Lead', matchScore: '82%', appliedDate: '30 Jul 2026', status: 'Sourced', department: 'Quality Assurance' },
  ],
  'Naresh Gali': [
    { id: 'req-1', title: 'Business Analyst And Quality Analyst', matchScore: '88%', appliedDate: '14 Sep 2026', status: 'Applied', department: 'Data Analysis' },
    { id: 'req-7', title: 'Data Verification Analyst', matchScore: '80%', appliedDate: '18 Aug 2026', status: 'Screened', department: 'Data Operations' },
  ],
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'Recommended' | 'Candidates' | 'Job Details'>('Candidates');
  const [showReportCard, setShowReportCard] = useState(false);
  const [reportCandidateName, setReportCandidateName] = useState<string>('');
  const [selectedRequirement, setSelectedRequirement] = useState<CandidateRequirement | null>(null);
  const [reportStep, setReportStep] = useState<'select-requirement' | 'loading-report'>('select-requirement');
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [roleStatus, setRoleStatus] = useState<'idle' | 'active' | 'paused'>('idle');

  const allCandidateNames = ['Raj', 'Test Yogesh', 'Shuvam Jena', 'Naresh Gali', 'Aditya Roy Test'];

  const openReportModal = (candidateName: string) => {
    setReportCandidateName(candidateName);
    setSelectedRequirement(null);
    setReportStep('select-requirement');
    setShowReportCard(true);
  };

  const toggleCandidate = (name: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const toggleSelectAll = () => {
    if (selectedCandidates.length > 0) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(allCandidateNames);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f7f9] flex flex-col font-sans select-none text-[#1e293b]">
      {/* 1. TOP NAVBAR */}
      <header className="h-12 bg-[#00607a] px-4 flex items-center justify-between text-white shrink-0 shadow-sm z-30">
        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          {/* Custom Jobcheck Logo Icon */}
          <div className="w-7 h-7 flex items-center justify-center">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="w-6 h-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 16.5L14 21.5L24 10"
                stroke="currentColor"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 14.5L9 19.5"
                stroke="#38bdf8"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="23" cy="9" r="2.5" fill="#38bdf8" />
            </svg>
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">Jobcheck</span>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Facility Dropdown */}
          <button
            type="button"
            className="flex items-center gap-2 bg-[#00708f]/50 hover:bg-[#00708f]/70 border border-[#0284c8]/60 text-xs px-3 py-1.5 rounded text-white transition-colors cursor-pointer"
          >
            <span>Innov Facilities</span>
            <ChevronDown className="w-3.5 h-3.5 text-cyan-200" />
          </button>

          {/* User Profile Avatar */}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-slate-700 border border-teal-200 overflow-hidden flex items-center justify-center text-xs font-semibold text-white">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="User Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute">A</span>
            </div>
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 border border-[#00607a] rounded-full"></span>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT (Left Nav Rail + Main Work Area) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Icon Rail */}
        <aside className="w-12 bg-white border-r border-slate-200 flex flex-col items-center py-3 justify-between shrink-0 z-20">
          <div className="flex flex-col items-center gap-5 w-full">
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-[#00607a] hover:bg-slate-100 rounded transition-colors"
              title="Home"
            >
              <Home className="w-4 h-4 stroke-[1.8]" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-[#00607a] hover:bg-slate-100 rounded transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4 stroke-[1.8]" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-[#00607a] hover:bg-slate-100 rounded transition-colors"
              title="Tasks / Checklists"
            >
              <CheckSquare className="w-4 h-4 stroke-[1.8]" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-[#00607a] hover:bg-slate-100 rounded transition-colors"
              title="Candidates"
            >
              <UserCheck className="w-4 h-4 stroke-[1.8]" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-[#00607a] hover:bg-slate-100 rounded transition-colors"
              title="Requirements"
            >
              <Layers className="w-4 h-4 stroke-[1.8]" />
            </button>
            <button
              type="button"
              className="p-2 text-slate-500 hover:text-[#00607a] hover:bg-slate-100 rounded transition-colors"
              title="Analytics"
            >
              <BarChart2 className="w-4 h-4 stroke-[1.8]" />
            </button>
          </div>

          {/* Bottom Logout */}
          <div className="w-full flex justify-center pb-2">
            <button
              type="button"
              className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 rotate-180 stroke-[2]" />
            </button>
          </div>
        </aside>

        {/* Scrollable Main Content Viewport */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col bg-[#f8fafc]">
          {/* Header Summary Section */}
          <div className="bg-white border-b border-slate-200 px-6 pt-4 pb-0 shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs mb-2">
              <Home className="w-3.5 h-3.5 text-slate-400 stroke-[1.8]" />
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-[#0284c7] font-medium hover:underline cursor-pointer">Requirements</span>
            </div>

            {/* Title & Pipeline Stats Grid */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-3">
              {/* Left Title & Meta */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    Business Analyst And Quality A...
                  </h1>
                  <span className="bg-[#ecfdf5] text-[#16a34a] border border-[#a7f3d0] text-[11px] font-medium px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                    <span>2 Job Positions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>Due Date:30 October,2026</span>
                  </div>
                </div>

                <div className="text-xs text-slate-600">
                  Data Analysis <span className="text-slate-400 mx-1">·</span> Permanent <span className="text-slate-400 mx-1">·</span> Bangalore <span className="text-slate-400 mx-1">·</span> ₹ 20k - 30k
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <div className="w-5 h-5 rounded-full border border-slate-300 bg-slate-50 flex items-center justify-center text-[10px] font-semibold text-slate-600">
                    I
                  </div>
                  <div className="w-5 h-5 rounded-full border border-dashed border-slate-300 bg-white flex items-center justify-center text-slate-500 hover:border-slate-400 cursor-pointer">
                    <Plus className="w-3 h-3" />
                  </div>
                  <span className="text-slate-500 ml-1">Created on 16 Sep 2026</span>
                </div>
              </div>

              {/* Right: Actions and Pipeline Counters */}
              <div className="flex flex-col items-end gap-3">
                {/* Actions Row */}
                <div className="flex items-center gap-2">
                  {roleStatus === 'idle' ? (
                    <button
                      type="button"
                      onClick={() => setRoleStatus('active')}
                      className="flex items-center gap-1.5 bg-[#006f8c] hover:bg-[#005f77] text-white text-xs font-semibold px-4 py-1.5 rounded shadow-sm cursor-pointer"
                    >
                      <span>Create Role</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setRoleStatus(roleStatus === 'active' ? 'paused' : 'active')}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-1.5 rounded shadow-sm cursor-pointer transition-colors ${
                        roleStatus === 'active'
                          ? 'bg-[#ecfdf5] text-[#10b981] border border-[#a7f3d0] hover:bg-[#d1fae5]'
                          : 'bg-[#fff7ed] text-[#ea580c] border border-[#fed7aa] hover:bg-[#ffedd5]'
                      }`}
                    >
                      {roleStatus === 'active' ? (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></div>
                          <span>Active</span>
                          <Pause className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          <span>Paused</span>
                          <Play className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    disabled={selectedCandidates.length === 0}
                    className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded shadow-sm transition-colors ${
                      selectedCandidates.length > 0
                        ? 'bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 cursor-pointer'
                        : 'bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Auto Sourcing</span>
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-medium px-3 py-1.5 rounded shadow-sm cursor-pointer"
                  >
                    <span>More Actions</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                  </button>

                  <button
                    type="button"
                    className="flex items-center gap-1.5 bg-[#006f8c] hover:bg-[#005f77] text-white text-xs font-medium px-3.5 py-1.5 rounded shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 -rotate-45" />
                    <span>Post as Job</span>
                  </button>
                </div>

                {/* Pipeline Stages Counters */}
                <div className="flex flex-col items-end gap-2 w-full max-w-xl">
                  {/* Top 5 stages */}
                  <div className="grid grid-cols-5 gap-4 w-full text-left">
                    {/* Applied */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-500 font-normal">Applied</span>
                      <span className="text-base font-bold text-[#ea580c] leading-tight">1</span>
                      <div className="w-full h-[1.5px] bg-[#f97316] mt-1"></div>
                    </div>

                    {/* Sourced */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-500 font-normal">Sourced</span>
                      <span className="text-base font-bold text-[#0284c7] leading-tight">0</span>
                      <div className="w-full h-[1.5px] bg-[#38bdf8] mt-1"></div>
                    </div>

                    {/* Screened */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-500 font-normal">Screened</span>
                      <span className="text-base font-bold text-[#0284c7] leading-tight">2</span>
                      <div className="w-full h-[1.5px] bg-[#38bdf8] mt-1"></div>
                    </div>

                    {/* Shortlisted */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-500 font-normal">Shortlisted</span>
                      <span className="text-base font-bold text-[#0284c7] leading-tight">0</span>
                      <div className="w-full h-[1.5px] bg-[#38bdf8] mt-1"></div>
                    </div>

                    {/* Offered */}
                    <div className="flex flex-col">
                      <span className="text-[11px] text-slate-500 font-normal">Offered</span>
                      <span className="text-base font-bold text-[#16a34a] leading-tight">1</span>
                      <div className="w-full h-[1.5px] bg-[#22c55e] mt-1"></div>
                    </div>
                  </div>

                  {/* Rejected row below */}
                  <div className="w-full text-left">
                    <div className="inline-flex flex-col w-[18%]">
                      <span className="text-[11px] text-slate-500 font-normal">Rejected</span>
                      <span className="text-base font-bold text-slate-800 leading-tight">0</span>
                      <div className="w-full h-[1.5px] bg-slate-600 mt-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-8 mt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setActiveTab('Recommended')}
                className={`py-2 text-xs font-semibold cursor-pointer relative transition-colors ${
                  activeTab === 'Recommended'
                    ? 'text-[#006f8c] border-b-2 border-[#006f8c]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Recommended
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Candidates')}
                className={`py-2 text-xs font-semibold cursor-pointer relative transition-colors ${
                  activeTab === 'Candidates'
                    ? 'text-[#006f8c] border-b-2 border-[#006f8c]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Candidates
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('Job Details')}
                className={`py-2 text-xs font-semibold cursor-pointer relative transition-colors ${
                  activeTab === 'Job Details'
                    ? 'text-[#006f8c] border-b-2 border-[#006f8c]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Job Details
              </button>
            </div>
          </div>

          {/* Subheader Toolbar & List Grid */}
          <div className="p-4 flex-1 flex flex-col gap-3">
            {activeTab === 'Candidates' ? (
              /* ================= CANDIDATES TAB VIEW (image_deea5696.png) ================= */
              <div className="flex flex-col gap-3">
                {/* Search & Action Controls Bar */}
                <div className="flex items-center gap-3">
                  {/* Search Input */}
                  <div className="relative w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      placeholder="Search"
                      readOnly
                      className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded bg-white focus:outline-none placeholder:text-slate-400"
                    />
                  </div>

                  {/* Bulk Actions Button */}
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs hover:bg-slate-50 cursor-pointer shadow-sm"
                  >
                    <span>Bulk Actions</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>

                  {/* Status Dropdown Button */}
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-white border border-slate-300 text-slate-700 px-3 py-1.5 rounded text-xs hover:bg-slate-50 cursor-pointer shadow-sm"
                  >
                    <span>Status</span>
                    <ChevronDown className="w-3 h-3 text-slate-500" />
                  </button>
                </div>

                {/* Candidates Table Container */}
                <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden relative">
                  {/* Table with Header & Rows */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      {/* Table Header */}
                      <thead>
                        <tr className="bg-[#f1f5f9] border-b border-slate-200 text-slate-700 font-semibold h-10">
                          {/* Checkbox column */}
                          <th className="w-10 px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={allCandidateNames.slice(0, 4).every((name) => selectedCandidates.includes(name))}
                              onChange={toggleSelectAll}
                              className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                            />
                          </th>
                          {/* Name */}
                          <th className="px-3 py-2 font-semibold text-slate-700 w-40">Name</th>
                          {/* Status */}
                          <th className="px-3 py-2 font-semibold text-slate-700 w-28">Status</th>
                          {/* Matching Criteria */}
                          <th className="px-3 py-2 font-semibold text-slate-700 w-36">Matching Criteria</th>
                          {/* Candidate Details */}
                          <th className="px-3 py-2 font-semibold text-slate-700 w-48">Candidate Details</th>
                          {/* Comments */}
                          <th className="px-3 py-2 font-semibold text-slate-700">Comments</th>
                          {/* Actions */}
                          <th className="w-12 px-2 py-2 text-center font-semibold text-slate-700">Call</th>
                          <th className="w-12 px-2 py-2 text-center font-semibold text-slate-700">SMS</th>
                          <th className="w-12 px-2 py-2 text-center font-semibold text-slate-700">Email</th>
                          <th className="w-14 px-2 py-2 text-center font-semibold text-slate-700">WhatsApp</th>
                          <th className="w-14 px-2 py-2 text-center font-semibold text-slate-700">New Tab</th>
                          <th className="w-14 px-2 py-2 text-center font-semibold text-slate-700">Expand</th>
                        </tr>
                      </thead>

                      {/* Table Body */}
                      <tbody className="divide-y divide-slate-100">
                        {/* Row 1: Raj */}
                        <tr className="hover:bg-slate-50/70 transition-colors h-16">
                          {/* Checkbox */}
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.includes('Raj')}
                              onChange={() => toggleCandidate('Raj')}
                              className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>

                          {/* Name with initial avatar 'R' in amber circle */}
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#fef3c7] text-[#b45309] font-bold text-xs flex items-center justify-center shrink-0">
                                R
                              </div>
                              <span className="text-slate-800 text-xs font-medium">Raj</span>
                            </div>
                          </td>

                          {/* Status: Offered */}
                          <td className="px-3 py-2">
                            <span className="inline-block bg-[#ecfdf5] text-[#10b981] border border-[#a7f3d0] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                              Offered
                            </span>
                          </td>

                          {/* Matching Criteria */}
                          <td className="px-3 py-2">
                            <span className="font-bold text-[#0284c7] text-xs">93%</span>
                          </td>

                          {/* Candidate Details */}
                          <td className="px-3 py-2 leading-relaxed">
                            <div className="text-slate-700 text-xs">amonuc1@gmail.com</div>
                            <div className="text-slate-500 text-xs">+91 7295963369</div>
                          </td>

                          {/* Comments */}
                          <td className="px-3 py-2 text-xs leading-snug">
                            <button
                              type="button"
                              onClick={() => openReportModal('Raj')}
                              className="text-[#0284c7] font-semibold underline decoration-solid hover:text-[#0369a1] cursor-pointer text-left"
                            >
                              Ai Sourcing (Completed)
                            </button>
                          </td>

                          {/* Call */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-[#16a34a] hover:opacity-80 p-1 cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-4 h-4 stroke-[1.8]" />
                            </button>
                          </td>

                          {/* SMS */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="SMS"
                            >
                              <MessageSquare className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Email */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Email"
                            >
                              <Mail className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* WhatsApp */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="WhatsApp"
                            >
                              <WhatsAppIcon className="w-4 h-4 text-slate-400" />
                            </button>
                          </td>

                          {/* New Tab */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Expand */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Expand"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>

                        {/* Row 2: Test Yogesh */}
                        <tr className="hover:bg-slate-50/70 transition-colors h-16">
                          {/* Checkbox */}
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.includes('Test Yogesh')}
                              onChange={() => toggleCandidate('Test Yogesh')}
                              className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>

                          {/* Name with initial avatar 'TY' in mint/teal circle */}
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#ccfbf1] text-[#0f766e] font-bold text-xs flex items-center justify-center shrink-0">
                                TY
                              </div>
                              <span className="text-slate-800 text-xs font-medium">Test Yogesh</span>
                            </div>
                          </td>

                          {/* Status: Screened */}
                          <td className="px-3 py-2">
                            <span className="inline-block bg-[#f3e8ff] text-[#9333ea] border border-[#e9d5ff] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                              Screened
                            </span>
                          </td>

                          {/* Matching Criteria */}
                          <td className="px-3 py-2">
                            <span className="font-bold text-[#0284c7] text-xs">78%</span>
                          </td>

                          {/* Candidate Details */}
                          <td className="px-3 py-2 leading-relaxed">
                            <div className="text-slate-700 text-xs">yogesh.a@example.com</div>
                            <div className="text-slate-500 text-xs">+91 9897334321</div>
                          </td>

                          {/* Comments */}
                          <td className="px-3 py-2 text-xs leading-snug">
                            <button
                              type="button"
                              onClick={() => openReportModal('Test Yogesh')}
                              className="text-[#0284c7] font-semibold underline decoration-solid hover:text-[#0369a1] cursor-pointer text-left"
                            >
                              Ai Sourcing (Completed)
                            </button>
                          </td>

                          {/* Call */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-[#16a34a] hover:opacity-80 p-1 cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-4 h-4 stroke-[1.8]" />
                            </button>
                          </td>

                          {/* SMS */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="SMS"
                            >
                              <MessageSquare className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Email */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Email"
                            >
                              <Mail className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* WhatsApp */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="WhatsApp"
                            >
                              <WhatsAppIcon className="w-4 h-4 text-slate-400" />
                            </button>
                          </td>

                          {/* New Tab */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Expand */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Expand"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>

                        {/* Row 3: Shuvam Jena */}
                        <tr className="hover:bg-slate-50/70 transition-colors h-16">
                          {/* Checkbox */}
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.includes('Shuvam Jena')}
                              onChange={() => toggleCandidate('Shuvam Jena')}
                              className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>

                          {/* Name with initial avatar 'SJ' in dark slate circle */}
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#1e293b] text-white font-bold text-xs flex items-center justify-center shrink-0">
                                SJ
                              </div>
                              <span className="text-slate-800 text-xs font-medium">Shuvam Jena</span>
                            </div>
                          </td>

                          {/* Status: Screened */}
                          <td className="px-3 py-2">
                            <span className="inline-block bg-[#f3e8ff] text-[#9333ea] border border-[#e9d5ff] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                              Screened
                            </span>
                          </td>

                          {/* Matching Criteria */}
                          <td className="px-3 py-2">
                            <span className="font-bold text-[#0284c7] text-xs">100%</span>
                          </td>

                          {/* Candidate Details */}
                          <td className="px-3 py-2 leading-relaxed">
                            <div className="text-slate-700 text-xs">shuvamjena2607@gmail.com</div>
                            <div className="text-slate-500 text-xs">+91 6370863861</div>
                          </td>

                          {/* Comments */}
                          <td className="px-3 py-2 text-xs leading-snug">
                            <button
                              type="button"
                              onClick={() => openReportModal('Shuvam Jena')}
                              className="text-[#0284c7] font-semibold underline decoration-solid hover:text-[#0369a1] cursor-pointer text-left"
                            >
                              Ai Sourcing (Not Started)
                            </button>
                          </td>

                          {/* Call */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-[#16a34a] hover:opacity-80 p-1 cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-4 h-4 stroke-[1.8]" />
                            </button>
                          </td>

                          {/* SMS */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="SMS"
                            >
                              <MessageSquare className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Email */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Email"
                            >
                              <Mail className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* WhatsApp */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="WhatsApp"
                            >
                              <WhatsAppIcon className="w-4 h-4 text-slate-400" />
                            </button>
                          </td>

                          {/* New Tab */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Expand */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Expand"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>

                        {/* Row 4: Naresh Gali */}
                        <tr className="hover:bg-slate-50/70 transition-colors h-16">
                          {/* Checkbox */}
                          <td className="px-3 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={selectedCandidates.includes('Naresh Gali')}
                              onChange={() => toggleCandidate('Naresh Gali')}
                              className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                            />
                          </td>

                          {/* Name with initial avatar 'NG' in dark slate circle */}
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-7 h-7 rounded-full bg-[#1e293b] text-white font-bold text-xs flex items-center justify-center shrink-0">
                                NG
                              </div>
                              <span className="text-slate-800 text-xs font-medium">Naresh Gali</span>
                            </div>
                          </td>

                          {/* Status: Applied */}
                          <td className="px-3 py-2">
                            <span className="inline-block bg-[#ffedd5] text-[#ea580c] border border-[#fed7aa] text-[11px] font-medium px-2.5 py-0.5 rounded-full">
                              Applied
                            </span>
                          </td>

                          {/* Matching Criteria */}
                          <td className="px-3 py-2">
                            <span className="font-bold text-[#0284c7] text-xs">88%</span>
                          </td>

                          {/* Candidate Details */}
                          <td className="px-3 py-2 leading-relaxed">
                            <div className="text-slate-700 text-xs">nareshsnow95@gmail.com</div>
                            <div className="text-slate-500 text-xs">+91 9876543210</div>
                          </td>

                          {/* Comments */}
                          <td className="px-3 py-2 text-xs leading-snug">
                            <button
                              type="button"
                              onClick={() => openReportModal('Naresh Gali')}
                              className="text-[#0284c7] font-semibold underline decoration-solid hover:text-[#0369a1] cursor-pointer text-left"
                            >
                              Ai Sourcing (Scheduled)
                            </button>
                          </td>

                          {/* Call */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-[#16a34a] hover:opacity-80 p-1 cursor-pointer"
                              title="Call"
                            >
                              <Phone className="w-4 h-4 stroke-[1.8]" />
                            </button>
                          </td>

                          {/* SMS */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="SMS"
                            >
                              <MessageSquare className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Email */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Email"
                            >
                              <Mail className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* WhatsApp */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="WhatsApp"
                            >
                              <WhatsAppIcon className="w-4 h-4 text-slate-400" />
                            </button>
                          </td>

                          {/* New Tab */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Open in new tab"
                            >
                              <ExternalLink className="w-4 h-4 stroke-[1.6]" />
                            </button>
                          </td>

                          {/* Expand */}
                          <td className="px-2 py-2 text-center">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center text-slate-400 hover:text-slate-600 p-1"
                              title="Expand"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Table Footer with Pagination & Scrollbar Arrow */}
                  <div className="flex items-center justify-end gap-6 px-4 py-2.5 border-t border-slate-100 text-xs text-slate-600 bg-white">
                    <div className="flex items-center gap-2">
                      <span>Items per page:</span>
                      <div className="flex items-center gap-1.5 border border-slate-300 bg-white px-2 py-0.5 rounded cursor-pointer">
                        <span className="font-semibold text-slate-800">20</span>
                        <ChevronDown className="w-3 h-3 text-slate-500" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 font-medium">1 - 7 of 7</span>
                      <ChevronLeft className="w-4 h-4 text-slate-400 cursor-not-allowed" />
                      <ChevronRight className="w-4 h-4 text-slate-400 cursor-not-allowed" />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ================= RECOMMENDED TAB VIEW (image_31f405d5.png) ================= */
              <div className="flex items-start gap-4">
                {/* Left Filter Card */}
                <div className="w-64 shrink-0 bg-white border border-slate-200 rounded-md shadow-sm p-4 flex flex-col gap-4">
                  {/* Filter Header */}
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-slate-700 fill-slate-700" />
                      <span className="text-xs font-bold text-slate-800">Filter</span>
                    </div>
                    <ChevronUp className="w-4 h-4 text-slate-500 cursor-pointer" />
                  </div>

                  {/* Sub status */}
                  <div className="flex items-center justify-between text-[11px] -mt-2">
                    <span className="text-slate-500 font-medium">0 Filters Applied</span>
                    <button type="button" className="text-[#0284c7] hover:underline font-medium cursor-pointer">
                      Reset
                    </button>
                  </div>

                  {/* Filter Field: Experience */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Experience</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Minimum"
                        readOnly
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white"
                      />
                      <span className="text-xs text-slate-400">to</span>
                      <input
                        type="text"
                        placeholder="Maximum"
                        readOnly
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white"
                      />
                    </div>
                  </div>

                  {/* Filter Field: Annual CTC */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Annual CTC</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Minimum"
                        readOnly
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white"
                      />
                      <span className="text-xs text-slate-400">to</span>
                      <input
                        type="text"
                        placeholder="Maximum"
                        readOnly
                        className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white"
                      />
                    </div>
                  </div>

                  {/* Filter Field: Preferred Locations */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Preferred Locations <span className="text-[10px] text-slate-400 font-normal">(Max 4)</span>
                    </label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Add Preferred Location"
                        readOnly
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white cursor-pointer"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Filter Field: Year of Passing */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Year of Passing</label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Select Year of Pass out"
                        readOnly
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white cursor-pointer"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Filter Field: Educational Qualification */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Educational Qualification</label>
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                      <input
                        type="text"
                        placeholder="Select Educational Qualification"
                        readOnly
                        className="w-full text-xs pl-8 pr-7 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white cursor-pointer"
                      />
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-2.5 pointer-events-none" />
                    </div>
                  </div>

                  {/* Filter Field: Search by Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Search by Name</label>
                    <input
                      type="text"
                      placeholder="Enter name to search"
                      readOnly
                      className="w-full text-xs px-2.5 py-1.5 border border-slate-300 rounded focus:outline-none placeholder:text-slate-400 bg-white"
                    />
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    className="w-full bg-[#007090] hover:bg-[#005f7a] text-white text-xs font-semibold py-2 rounded transition-colors cursor-pointer mt-1"
                  >
                    Apply
                  </button>
                </div>

                {/* Right Content Area: Candidates List */}
                <div className="flex-1 flex flex-col gap-3 min-w-0">
                  {/* List Control Bar */}
                  <div className="flex items-center justify-between text-xs py-1 px-1">
                    {/* Left: Bulk Actions & Selection Count */}
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="flex items-center gap-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded shadow-sm cursor-pointer"
                      >
                        <span>Bulk Actions</span>
                        <ChevronDown className="w-3 h-3 text-slate-500" />
                      </button>

                      <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium">
                        <input
                          type="checkbox"
                          checked={selectedCandidates.length > 0}
                          onChange={toggleSelectAll}
                          className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                        />
                        <span>{selectedCandidates.length} Out of 186147 Candidates Selected</span>
                      </label>
                    </div>

                    {/* Right: Items per Page & Pagination */}
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span>Item per Page:</span>
                        <div className="flex items-center gap-1 border border-slate-300 bg-white px-2 py-0.5 rounded cursor-pointer">
                          <span className="font-semibold text-slate-800">20</span>
                          <ChevronDown className="w-3 h-3 text-slate-500" />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-slate-500">
                        <ChevronsLeft className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                        <ChevronLeft className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                        <span className="text-slate-700 font-medium">1 - 9308 of 9308</span>
                        <ChevronRight className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                        <ChevronsRight className="w-3.5 h-3.5 cursor-pointer hover:text-slate-800" />
                      </div>
                    </div>
                  </div>

                  {/* Candidate Card 1: Aditya Roy Test */}
                  <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4 hover:shadow-md transition-shadow relative">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Left: Avatar & Match % */}
                      <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-start pt-1 text-center">
                        {/* Dark Silhouette Avatar */}
                        <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-700 mb-1.5 shadow-sm">
                          <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            className="w-full h-full text-slate-400"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="32" cy="24" r="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                            <path
                              d="M12 56C12 44.9543 20.9543 36 32 36C43.0457 36 52 44.9543 52 56"
                              fill="#0f172a"
                              stroke="#334155"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-[#0284c7] leading-none">100%</span>
                        <span className="text-[11px] text-slate-700 font-medium">Match</span>
                      </div>

                      {/* Middle: Candidate Info & Icon Metadata */}
                      <div className="col-span-6 sm:col-span-6 space-y-2 border-r border-slate-100 pr-4">
                        <div>
                          <h2 className="text-sm font-bold text-slate-900 leading-tight">Aditya Roy Test</h2>
                          <div className="flex items-center gap-1.5 text-xs text-[#0284c7] mt-1">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="hover:underline cursor-pointer">aditya.roy@test.com</span>
                          </div>
                        </div>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-4 text-xs pt-0.5">
                          <button
                            type="button"
                            className="flex items-center gap-1 text-[#0284c7] hover:underline font-medium cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Comment</span>
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            <span>View Comments</span>
                          </button>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>+91 9812212121</span>
                        </div>

                        {/* Metadata Icon Rows */}
                        <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                          <div className="flex items-center gap-2">
                            <IdCard className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>N/A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>N/A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>Not Available</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>N/A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>27/10/2026</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Skills & Job Metadata */}
                      <div className="col-span-4 sm:col-span-5 pl-2 relative flex flex-col justify-between h-full">
                        {/* Top right card actions */}
                        <div className="flex items-center justify-end gap-3 pb-1">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.includes('Aditya Roy Test')}
                            onChange={() => toggleCandidate('Aditya Roy Test')}
                            className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => openReportModal('Aditya Roy Test')}
                            className="text-[#0284c7] font-semibold text-xs hover:underline cursor-pointer"
                          >
                            View Report
                          </button>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                          <PlusSquare className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                        </div>

                        {/* Attribute rows */}
                        <div className="space-y-2 text-xs">
                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Key Skills</div>
                            <div className="text-slate-800 font-medium">Documentation, Jira</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Designation</div>
                            <div className="text-slate-800 font-medium">Business Administration</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Preferred Locations</div>
                            <div className="text-slate-800 font-medium">Bangalore</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Source</div>
                            <div className="text-slate-800 font-medium">WHATSAPP</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Notice Period</div>
                            <div className="text-slate-800 font-medium">N/A</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Candidate Card 2: Shuvam Jena */}
                  <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4 hover:shadow-md transition-shadow relative">
                    <div className="grid grid-cols-12 gap-4 items-start">
                      {/* Left: Avatar & Match % */}
                      <div className="col-span-2 sm:col-span-1 flex flex-col items-center justify-start pt-1 text-center">
                        {/* Dark Silhouette Avatar */}
                        <div className="w-14 h-14 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-700 mb-1.5 shadow-sm">
                          <svg
                            viewBox="0 0 64 64"
                            fill="none"
                            className="w-full h-full text-slate-400"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle cx="32" cy="24" r="14" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                            <path
                              d="M12 56C12 44.9543 20.9543 36 32 36C43.0457 36 52 44.9543 52 56"
                              fill="#0f172a"
                              stroke="#334155"
                              strokeWidth="2"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-bold text-[#0284c7] leading-none">100%</span>
                        <span className="text-[11px] text-slate-700 font-medium">Match</span>
                      </div>

                      {/* Middle: Candidate Info & Icon Metadata */}
                      <div className="col-span-6 sm:col-span-6 space-y-2 border-r border-slate-100 pr-4">
                        <div>
                          <h2 className="text-sm font-bold text-slate-900 leading-tight">Shuvam Jena</h2>
                          <div className="flex items-center gap-1.5 text-xs text-[#0284c7] mt-1">
                            <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="hover:underline cursor-pointer">shuvamjena2607@gmail.com</span>
                          </div>
                        </div>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-4 text-xs pt-0.5">
                          <button
                            type="button"
                            className="flex items-center gap-1 text-[#0284c7] hover:underline font-medium cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Comment</span>
                          </button>
                          <button
                            type="button"
                            className="flex items-center gap-1 text-slate-500 hover:text-slate-700 cursor-pointer"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                            <span>View Comments</span>
                          </button>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-2 text-xs text-slate-700">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>+91 6370863861</span>
                        </div>

                        {/* Metadata Icon Rows */}
                        <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>3 Years Experience</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>N/A</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>Not Available</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Skills & Job Metadata */}
                      <div className="col-span-4 sm:col-span-5 pl-2 relative flex flex-col justify-between h-full">
                        {/* Top right card actions */}
                        <div className="flex items-center justify-end gap-3 pb-1">
                          <input
                            type="checkbox"
                            checked={selectedCandidates.includes('Shuvam Jena')}
                            onChange={() => toggleCandidate('Shuvam Jena')}
                            className="rounded border-slate-300 text-[#007090] focus:ring-0 w-3.5 h-3.5 cursor-pointer"
                          />
                          <button
                            type="button"
                            onClick={() => openReportModal('Shuvam Jena')}
                            className="text-[#0284c7] font-semibold text-xs hover:underline cursor-pointer"
                          >
                            View Report
                          </button>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                          <PlusSquare className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600 cursor-pointer" />
                        </div>

                        {/* Attribute rows */}
                        <div className="space-y-2 text-xs">
                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Key Skills</div>
                            <div className="text-slate-800 font-medium leading-snug">
                              Docker, Data-driven Testing, Rest Api Testing, Regression Testing ...{' '}
                              <span className="text-[#0284c7] font-semibold hover:underline cursor-pointer">
                                View More
                              </span>
                            </div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Designation</div>
                            <div className="text-slate-800 font-medium">Software Test Engineer</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Preferred Locations</div>
                            <div className="text-slate-800 font-medium">Bengaluru</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Source</div>
                            <div className="text-slate-800 font-medium">NLP</div>
                          </div>

                          <div>
                            <div className="text-[11px] text-slate-400 font-medium">Notice Period</div>
                            <div className="text-slate-800 font-medium">Immediate</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Requirement Selection / SkillBrew Report Modal */}
      {showReportCard && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px] p-4"
          onClick={() => setShowReportCard(false)}
        >
          <div
            className="bg-white rounded-lg shadow-2xl border border-slate-200 p-5 max-w-md w-full flex flex-col gap-4 relative animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {reportStep === 'select-requirement' ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-[#00607a]" />
                      <h3 className="text-sm font-bold text-slate-900">Select Requirement</h3>
                    </div>
                    <p className="text-xs text-slate-500">
                      Choose a requirement for <span className="font-semibold text-slate-800">{reportCandidateName}</span> to view the SkillBrew report.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReportCard(false)}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Requirement List */}
                <div className="flex flex-col gap-2.5 max-h-[320px] overflow-y-auto pr-0.5">
                  {(CANDIDATE_REQUIREMENTS_MAP[reportCandidateName] || CANDIDATE_REQUIREMENTS_MAP['Aditya Roy Test']).map((req) => (
                    <button
                      key={req.id}
                      type="button"
                      onClick={() => {
                        setSelectedRequirement(req);
                        setReportStep('loading-report');
                      }}
                      className="group p-3 border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/50 rounded-lg text-left transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-800 group-hover:text-[#006f8c] transition-colors truncate">
                            {req.title}
                          </span>
                          <span className="bg-[#e0f2fe] text-[#0284c7] text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0">
                            {req.matchScore} Match
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span>{req.department}</span>
                          <span className="text-slate-300">·</span>
                          <span>Applied {req.appliedDate}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-slate-700 font-medium">{req.status}</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0284c7] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-100 text-xs text-slate-500">
                  <span>Multiple requirements found</span>
                  <button
                    type="button"
                    onClick={() => setShowReportCard(false)}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse shrink-0"></span>
                    <span className="text-xs font-bold text-slate-800 truncate">
                      {reportCandidateName} - {selectedRequirement?.title}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowReportCard(false)}
                    className="text-slate-400 hover:text-slate-700 p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Body */}
                <div className="flex flex-col items-center justify-center py-6 text-center gap-3">
                  <Loader2 className="w-8 h-8 text-[#0284c7] animate-spin" />
                  <p className="text-sm font-semibold text-slate-800 tracking-tight">
                    SkillBrew Report Here Loading...
                  </p>
                  <span className="text-xs text-slate-500 max-w-xs">
                    Please wait while we gather verification metrics for{' '}
                    <span className="font-medium text-slate-700">{selectedRequirement?.title}</span>.
                  </span>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setReportStep('select-requirement')}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#0284c7] hover:text-[#0369a1] hover:bg-sky-50 rounded transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back to Requirements</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowReportCard(false)}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

