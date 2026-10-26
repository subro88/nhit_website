'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  FileJson,
  FormInput,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  Palette,
} from 'lucide-react';
import { SpecFields, SectionDef } from './editorKit';

/* ────────────────────────────────────────────────────────────────────────
 * Site color palettes — applied site-wide via data-theme on <html>.
 * Values here mirror the [data-theme] blocks in src/app/globals.css.
 *──────────────────────────────────────────────────────────────────────── */
const PALETTES = [
  { key: 'nhit-red', name: 'NHIT Red', hint: 'Current brand — bold & energetic', primary: '#ff3115', dark: '#e41f05', tint: 'rgba(255, 49, 21, 0.08)' },
  { key: 'crimson', name: 'Classic Crimson', hint: 'Deep academic red', primary: '#dc2626', dark: '#b91c1c', tint: 'rgba(220, 38, 38, 0.08)' },
  { key: 'royal-blue', name: 'Royal Blue', hint: 'Trust & professionalism', primary: '#1d4ed8', dark: '#1e3a8a', tint: 'rgba(29, 78, 216, 0.08)' },
  { key: 'emerald', name: 'Emerald Green', hint: 'Growth & freshness', primary: '#059669', dark: '#047857', tint: 'rgba(5, 150, 105, 0.08)' },
  { key: 'teal', name: 'Ocean Teal', hint: 'Calm & technical', primary: '#0d9488', dark: '#0f766e', tint: 'rgba(13, 148, 136, 0.08)' },
  { key: 'royal-purple', name: 'Royal Purple', hint: 'Premium & creative', primary: '#7c3aed', dark: '#6d28d9', tint: 'rgba(124, 58, 237, 0.08)' },
  { key: 'saffron', name: 'Saffron Orange', hint: 'Warm & festive', primary: '#ea580c', dark: '#c2410c', tint: 'rgba(234, 88, 12, 0.08)' },
  { key: 'sun-gold', name: 'Sun Gold', hint: 'Bright & optimistic', primary: '#d97706', dark: '#b45309', tint: 'rgba(217, 119, 6, 0.08)' },
] as const;

/* ────────────────────────────────────────────────────────────────────────
 * Section definitions — one tab per home page section.
 *──────────────────────────────────────────────────────────────────────── */
const SECTIONS: SectionDef[] = [
  {
    key: 'theme',
    label: '0 · Theme Colors',
    desc: 'Pick the main accent color used across the whole website — buttons, links, highlights, section accents.',
    fields: [],
  },
  {
    key: 'brand',
    label: '0b · Header Brand',
    desc: 'The institute emblem + name shown in the top header bar, footer and browser favicon.',
    fields: [
      { t: 'img', k: 'logo', label: 'Institute Logo / Emblem' },
      { t: 'text', k: 'name', label: 'Full Name (e.g. NHIT Durgapur)' },
      { t: 'text', k: 'nameEm', label: 'Red Part of the Name (must match the ending of Full Name)' },
      { t: 'text', k: 'sub', label: 'Small Line Under the Name' },
    ],
  },
  {
    key: 'hero',
    label: '1 · Hero Slider',
    desc: 'The big rotating banner at the top of the site.',
    fields: [
      {
        t: 'list',
        k: 'slides',
        label: 'Slides',
        titleField: 'kicker',
        def: {
          bg: '', kicker: '', title: '', titleEm: '', titleAfter: '', text: '',
          btnPrimaryText: 'Apply Now →', btnPrimaryHref: '/admissions',
          btnGhostText: 'Explore Departments', btnGhostHref: '/departments',
        },
        fields: [
          { t: 'img', k: 'bg', label: 'Background Photo' },
          { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
          { t: 'text', k: 'title', label: 'Title (before red word)' },
          { t: 'text', k: 'titleEm', label: 'Title — Red Word' },
          { t: 'text', k: 'titleAfter', label: 'Title (after red word)' },
          { t: 'area', k: 'text', label: 'Description' },
          { t: 'text', k: 'btnPrimaryText', label: 'Primary Button Text' },
          { t: 'text', k: 'btnPrimaryHref', label: 'Primary Button Link' },
          { t: 'text', k: 'btnGhostText', label: 'Second Button Text' },
          { t: 'text', k: 'btnGhostHref', label: 'Second Button Link' },
        ],
      },
      {
        t: 'list',
        k: 'chips',
        label: 'Floating Chips',
        titleField: 'label',
        def: { label: '', value: '', tone: '' },
        fields: [
          { t: 'text', k: 'label', label: 'Chip Label' },
          { t: 'text', k: 'value', label: 'Chip Value' },
          { t: 'text', k: 'tone', label: 'Style', hint: "Type 'red' for the red value, or leave empty" },
        ],
      },
      { t: 'bool', k: 'estdBadge.visible', label: 'Show "Estd" Semicircle Badge' },
      { t: 'text', k: 'estdBadge.text', label: 'Badge Text', hint: 'e.g. Estd: 2007' },
      {
        t: 'list',
        k: 'estdBadge.features',
        label: 'Badge Hover Features',
        titleField: 'label',
        def: { icon: 'fa-check', label: '', value: '' },
        fields: [
          { t: 'text', k: 'icon', label: 'Icon Class', hint: 'Font Awesome, e.g. fa-trophy, fa-handshake-o, fa-flask' },
          { t: 'text', k: 'label', label: 'Feature Name' },
          { t: 'text', k: 'value', label: 'Feature Value' },
        ],
      },
      { t: 'text', k: 'tourLabel', label: 'Campus Tour Button Text', hint: 'e.g. Watch Campus Tour' },
      { t: 'text', k: 'tourVideo', label: 'Campus Tour YouTube Video ID', hint: 'Only the ID, e.g. xcXh2vLC7VU — leave empty to hide the button' },
    ],
  },
  {
    key: 'features',
    label: '2 · Features Grid',
    desc: 'The four highlight cards under the hero (Est. 2007, Affiliation…).',
    fields: [
      {
        t: 'list',
        k: 'items',
        label: 'Feature Cards',
        titleField: 'title',
        def: { icon: 'fa-star', title: '', desc: '' },
        fields: [
          { t: 'text', k: 'icon', label: 'Icon Class', hint: 'Font Awesome class, e.g. fa-graduation-cap, fa-flask' },
          { t: 'text', k: 'title', label: 'Title' },
          { t: 'area', k: 'desc', label: 'Description' },
        ],
      },
    ],
  },
  {
    key: 'about',
    label: '3 · About Block',
    desc: 'About NHIT text, checklist and buttons in the third section.',
    fields: [
      { t: 'img', k: 'image', label: 'Photo' },
      { t: 'text', k: 'imageAlt', label: 'Photo Alt Text' },
      { t: 'text', k: 'badgeYear', label: 'Badge Year' },
      { t: 'text', k: 'badgeLabel', label: 'Badge Label' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'area', k: 'text', label: 'Paragraph' },
      { t: 'text', k: 'textBold', label: 'Bold Ending Of Paragraph' },
      { t: 'strlist', k: 'checklist', label: 'Checklist Lines' },
      { t: 'text', k: 'btnPrimaryText', label: 'Primary Button Text' },
      { t: 'text', k: 'btnPrimaryHref', label: 'Primary Button Link' },
      { t: 'text', k: 'btnOutlineText', label: 'Outline Button Text' },
      { t: 'text', k: 'btnOutlineHref', label: 'Outline Button Link' },
    ],
  },
  {
    key: 'ticker',
    label: '4 · News Ticker',
    desc: 'The scrolling “Latest News” strip next to the About block.',
    fields: [
      { t: 'text', k: 'heading', label: 'Heading' },
      { t: 'text', k: 'footText', label: 'Bottom Link Text' },
      { t: 'text', k: 'footHref', label: 'Bottom Link URL' },
      {
        t: 'list',
        k: 'items',
        label: 'Ticker Items',
        titleField: 'title',
        def: { day: '01', mon: 'JAN', title: '', link: '/circulars', isNew: false },
        fields: [
          { t: 'text', k: 'day', label: 'Day', hint: 'Two digits, e.g. 07' },
          { t: 'text', k: 'mon', label: 'Month', hint: 'Three letters, e.g. SEP' },
          { t: 'text', k: 'title', label: 'Notice Title' },
          { t: 'text', k: 'link', label: 'Link' },
          { t: 'bool', k: 'isNew', label: 'Show NEW badge' },
        ],
      },
    ],
  },
  {
    key: 'counters',
    label: '5 · Counter Numbers',
    desc: 'The animated numbers strip (Years, Placements, Recruiters…).',
    fields: [
      {
        t: 'list',
        k: 'items',
        label: 'Counters',
        titleField: 'label',
        def: { target: 100, prefix: '', suffix: '+', label: '' },
        fields: [
          { t: 'num', k: 'target', label: 'Number' },
          { t: 'text', k: 'prefix', label: 'Before Number' },
          { t: 'text', k: 'suffix', label: 'After Number', hint: 'e.g. +' },
          { t: 'text', k: 'label', label: 'Label Under Number' },
        ],
      },
    ],
  },
  {
    key: 'courses',
    label: '6 · Course Cards',
    desc: 'The six diploma course cards and the ITI banner below them.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'text', k: 'sub', label: 'Sub Heading' },
      {
        t: 'list',
        k: 'items',
        label: 'Course Cards',
        titleField: 'title',
        def: { slug: '', code: '', title: '', tagline: '', image: '', labs: '07 LABS', intake: '60 SEATS' },
        fields: [
          { t: 'text', k: 'slug', label: 'Department Link Slug', hint: 'e.g. computer-science-technology' },
          { t: 'text', k: 'code', label: 'Short Code', hint: 'e.g. CST' },
          { t: 'text', k: 'title', label: 'Course Title' },
          { t: 'area', k: 'tagline', label: 'Card Text' },
          { t: 'img', k: 'image', label: 'Card Photo' },
          { t: 'text', k: 'labs', label: 'Labs Text' },
          { t: 'text', k: 'intake', label: 'Seats Text' },
        ],
      },
      { t: 'text', k: 'itiHub.badge', label: 'ITI Banner — Small Badge' },
      { t: 'text', k: 'itiHub.title', label: 'ITI Banner — Title' },
      { t: 'area', k: 'itiHub.text', label: 'ITI Banner — Text' },
      { t: 'text', k: 'itiHub.btn1Text', label: 'ITI Button 1 Text' },
      { t: 'text', k: 'itiHub.btn1Href', label: 'ITI Button 1 Link' },
      { t: 'text', k: 'itiHub.btn2Text', label: 'ITI Button 2 Text' },
      { t: 'text', k: 'itiHub.btn2Href', label: 'ITI Button 2 Link' },
      { t: 'text', k: 'itiHub.btn3Text', label: 'ITI Button 3 Text' },
      { t: 'text', k: 'itiHub.btn3Href', label: 'ITI Button 3 Link' },
    ],
  },
  {
    key: 'outcomes',
    label: '7 · Outcomes',
    desc: 'Dark section with the interactive placement bar chart and outcome highlights. Hover a bar on the live site to show that session\u2019s numbers. The campus-tour video plays softly in the background with a dark overlay.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'bool', k: 'videoOn', label: 'Play Campus Tour Video in Background' },
      { t: 'text', k: 'videoId', label: 'Background Video — YouTube ID', hint: 'Only the ID, e.g. xcXh2vLC7VU. Leave empty to hide the background video.' },
      {
        t: 'list',
        k: 'bars',
        label: 'Chart Bars',
        titleField: 'label',
        def: { value: '', label: '', heightPct: '60%', color: '', colorDark: '', total: '', opted: '', placed: '', higher: '', ongoing: false },
        fields: [
          { t: 'text', k: 'value', label: 'Value Shown (e.g. 91.7%)' },
          { t: 'text', k: 'label', label: 'Label Under Bar (e.g. 2022–25*)' },
          { t: 'text', k: 'heightPct', label: 'Bar Height', hint: 'Percentage, e.g. 80%' },
          { t: 'text', k: 'color', label: 'Bar Color', hint: 'Leave empty for the light theme tint (recommended on the video background)' },
          { t: 'text', k: 'colorDark', label: 'Bar Dark Color', hint: 'Leave empty for the light theme tint' },
          { t: 'text', k: 'total', label: 'Total Students (shown on hover)' },
          { t: 'text', k: 'opted', label: 'Opted for Placement (shown on hover)' },
          { t: 'text', k: 'placed', label: 'Placed (shown on hover)' },
          { t: 'text', k: 'higher', label: 'Higher Studies (shown on hover)' },
          { t: 'bool', k: 'ongoing', label: 'Mark as Ongoing Batch' },
        ],
      },
      {
        t: 'list',
        k: 'outcomes',
        label: 'Outcome Highlights',
        titleField: 'title',
        def: { icon: '💼', title: '', text: '' },
        fields: [
          { t: 'text', k: 'icon', label: 'Emoji Icon' },
          { t: 'text', k: 'title', label: 'Title' },
          { t: 'area', k: 'text', label: 'Text' },
        ],
      },
      { t: 'area', k: 'footnote', label: 'Footnote', rows: 2 },
    ],
  },
  {
    key: 'recruiters',
    label: '8 · Recruiters Wall',
    desc: 'Recruiter logos and name plates.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'text', k: 'sub', label: 'Sub Heading' },
      {
        t: 'list',
        k: 'logos',
        label: 'Logo Cells',
        titleField: 'alt',
        def: { src: '', alt: '' },
        fields: [
          { t: 'img', k: 'src', label: 'Logo Image' },
          { t: 'text', k: 'alt', label: 'Company Name (alt)' },
        ],
      },
      {
        t: 'list',
        k: 'marks',
        label: 'Name Plates',
        titleField: 'name',
        def: { name: '', sub: '' },
        fields: [
          { t: 'text', k: 'name', label: 'Company Name' },
          { t: 'text', k: 'sub', label: 'Small Line Under Name' },
        ],
      },
    ],
  },
  {
    key: 'placementRadar',
    label: '9 · Placement Radar',
    desc: 'The dark cockpit console with branch tabs, milestones and job roles.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading (before red part)' },
      { t: 'text', k: 'titleEm', label: 'Heading — Red Part' },
      { t: 'text', k: 'titleAfter', label: 'Heading (after red part)' },
      { t: 'area', k: 'sub', label: 'Sub Heading' },
      { t: 'text', k: 'pipelineTitle', label: 'Pipeline Panel Title' },
      { t: 'text', k: 'pipelineBadge', label: 'Pipeline Panel Badge' },
      { t: 'text', k: 'deckHeading', label: 'Recruiter Deck Heading' },
      { t: 'text', k: 'deckLegend', label: 'Deck Small Note' },
      { t: 'text', k: 'ctaTitle', label: 'Bottom Banner Title' },
      { t: 'area', k: 'ctaText', label: 'Bottom Banner Text', rows: 2 },
      { t: 'text', k: 'ctaBtn1Text', label: 'Banner Button 1 Text' },
      { t: 'text', k: 'ctaBtn1Href', label: 'Banner Button 1 Link' },
      { t: 'text', k: 'ctaBtn2Text', label: 'Banner Button 2 Text' },
      { t: 'text', k: 'ctaBtn2Href', label: 'Banner Button 2 Link' },
      {
        t: 'list',
        k: 'branches',
        label: 'Branch Tabs',
        titleField: 'tabLabel',
        def: {
          id: '', tabLabel: '', tabTag: '', title: '', icon: '🎓', desc: '',
          stats: { highest: 4, avg: 2.5, rate: 90, recruiters: 40 },
          milestones: [], roles: [],
        },
        fields: [
          { t: 'text', k: 'id', label: 'Branch Key', hint: 'Short unique key, e.g. me — used internally' },
          { t: 'text', k: 'tabLabel', label: 'Tab Label' },
          { t: 'text', k: 'tabTag', label: 'Tab Small Tag' },
          { t: 'text', k: 'title', label: 'Console Title' },
          { t: 'text', k: 'icon', label: 'Console Emoji' },
          { t: 'area', k: 'desc', label: 'Console Subtitle', rows: 2 },
          { t: 'num', k: 'stats.highest', label: 'Highest CTC (LPA)' },
          { t: 'num', k: 'stats.avg', label: 'Average CTC (LPA)' },
          { t: 'num', k: 'stats.rate', label: 'Placement Rate (%)' },
          { t: 'num', k: 'stats.recruiters', label: 'Recruiters Count' },
          {
            t: 'list',
            k: 'milestones',
            label: 'Milestones',
            titleField: 'title',
            def: { step: '', title: '', desc: '' },
            fields: [
              { t: 'text', k: 'step', label: 'Phase Label' },
              { t: 'text', k: 'title', label: 'Milestone Title' },
              { t: 'area', k: 'desc', label: 'Milestone Text', rows: 2 },
            ],
          },
          {
            t: 'list',
            k: 'roles',
            label: 'Job Role Cards',
            titleField: 'company',
            def: { company: '', tag: '', tagClass: 'nhit-tag--auto', title: '', scope: '', salary: '' },
            fields: [
              { t: 'text', k: 'company', label: 'Company' },
              { t: 'text', k: 'tag', label: 'Tag Text' },
              { t: 'text', k: 'tagClass', label: 'Tag Style', hint: 'nhit-tag--auto, nhit-tag--infra or nhit-tag--tech' },
              { t: 'text', k: 'title', label: 'Job Title' },
              { t: 'area', k: 'scope', label: 'Job Scope', rows: 2 },
              { t: 'text', k: 'salary', label: 'Package Range' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'careerJourney',
    label: '10 · Career Journey',
    desc: 'The pinned, scroll-driven student transformation track.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading (before red part)' },
      { t: 'text', k: 'titleEm', label: 'Heading — Red Part' },
      { t: 'area', k: 'sub', label: 'Sub Heading' },
      { t: 'text', k: 'ctaTitle', label: 'Bottom Banner Title' },
      { t: 'area', k: 'ctaText', label: 'Bottom Banner Text', rows: 2 },
      { t: 'text', k: 'ctaBtn1Text', label: 'Banner Button 1 Text' },
      { t: 'text', k: 'ctaBtn1Href', label: 'Banner Button 1 Link' },
      { t: 'text', k: 'ctaBtn2Text', label: 'Banner Button 2 Text' },
      { t: 'text', k: 'ctaBtn2Href', label: 'Banner Button 2 Link' },
      {
        t: 'list',
        k: 'stages',
        label: 'Journey Stages',
        titleField: 'title',
        def: {
          id: 0, phase: '', title: '', desc: '', tag: '', pin: '🎒',
          accent: '#d90429', glow: 'rgba(217, 4, 41, 0.28)', image: '',
          pills: [],
          metric1: { label: '', value: '' },
          metric2: { label: '', value: '' },
        },
        fields: [
          { t: 'num', k: 'id', label: 'Stage Number' },
          { t: 'text', k: 'phase', label: 'Phase Label' },
          { t: 'text', k: 'title', label: 'Stage Title' },
          { t: 'area', k: 'desc', label: 'Stage Text', rows: 4 },
          { t: 'text', k: 'tag', label: 'Card Tag Line' },
          { t: 'text', k: 'pin', label: 'Map Pin Emoji' },
          { t: 'text', k: 'accent', label: 'Theme Color (hex)' },
          { t: 'text', k: 'glow', label: 'Glow Color (rgba)' },
          { t: 'img', k: 'image', label: 'Stage Photo' },
          {
            t: 'list',
            k: 'pills',
            label: 'Pills',
            titleField: 'text',
            def: { icon: 'CheckCircle', text: '' },
            fields: [
              { t: 'text', k: 'icon', label: 'Icon Name', hint: 'CheckCircle, Book, Compass, Network, Building, Users, Wifi, IdCard, Cog, Cpu, Car, Code, MessageSquare, UserCheck, FileText, Video, Briefcase, Award, Rocket, GraduationCap' },
              { t: 'text', k: 'text', label: 'Pill Text' },
            ],
          },
          { t: 'text', k: 'metric1.label', label: 'Metric 1 Label' },
          { t: 'text', k: 'metric1.value', label: 'Metric 1 Value' },
          { t: 'text', k: 'metric2.label', label: 'Metric 2 Label' },
          { t: 'text', k: 'metric2.value', label: 'Metric 2 Value' },
        ],
      },
    ],
  },
  {
    key: 'testimonials',
    label: '11 · Testimonials',
    desc: '“What People Say” — alumni and parent cards with photos.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'heading', label: 'Heading' },
      { t: 'area', k: 'sub', label: 'Sub Text', rows: 2 },
      {
        t: 'list',
        k: 'items',
        label: 'Testimonials',
        titleField: 'name',
        def: { name: '', role: '', image: '', quote: '' },
        fields: [
          { t: 'text', k: 'name', label: 'Person Name' },
          { t: 'text', k: 'role', label: 'Role / Batch Line' },
          { t: 'img', k: 'image', label: 'Person Photo' },
          { t: 'area', k: 'quote', label: 'Quote', rows: 4 },
        ],
      },
    ],
  },
  {
    key: 'gallery',
    label: '12 · Campus Gallery',
    desc: 'The photo grid of campus life.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      {
        t: 'list',
        k: 'items',
        label: 'Gallery Photos',
        titleField: 'caption',
        def: { src: '', alt: '', caption: '' },
        fields: [
          { t: 'img', k: 'src', label: 'Photo' },
          { t: 'text', k: 'alt', label: 'Alt Text' },
          { t: 'text', k: 'caption', label: 'Caption' },
        ],
      },
    ],
  },
  {
    key: 'leadForm',
    label: '13 · Inquiry Form',
    desc: 'The admission enquiry form block and its side text.',
    fields: [
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'area', k: 'text', label: 'Paragraph' },
      { t: 'strlist', k: 'perks', label: 'Perk Lines' },
      { t: 'area', k: 'privacyNote', label: 'Privacy Note', rows: 2 },
      { t: 'text', k: 'submitText', label: 'Submit Button Text' },
      { t: 'area', k: 'successNote', label: 'Success Message', rows: 2 },
      { t: 'text', k: 'brochureUrl', label: 'Brochure PDF Link' },
    ],
  },
  {
    key: 'ctaBand',
    label: '14 · Apply CTA Band',
    desc: 'The slim color band just before the footer with the Apply Now button and call link.',
    fields: [
      { t: 'text', k: 'title', label: 'Band Heading' },
      { t: 'area', k: 'note', label: 'Small Note Under Heading', rows: 2 },
      { t: 'text', k: 'btn1Text', label: 'Button 1 Text (white button)' },
      { t: 'text', k: 'btn1Href', label: 'Button 1 Link', hint: 'e.g. /admissions' },
      { t: 'text', k: 'btn2Text', label: 'Button 2 Text (glass button)' },
      { t: 'text', k: 'btn2Href', label: 'Button 2 Link', hint: 'e.g. /contact or tel:+919999999999' },
    ],
  },
  {
    key: 'achievements',
    label: '15 · Achievements Marquee',
    desc: 'The scrolling red strip under the hero with placement news and milestones.',
    fields: [
      { t: 'text', k: 'heading', label: 'Strip Label (left side)' },
      {
        t: 'list',
        k: 'items',
        label: 'Achievement Items',
        titleField: 'text',
        def: { icon: 'fa-trophy', text: '' },
        fields: [
          { t: 'text', k: 'icon', label: 'Icon Class', hint: 'Font Awesome, e.g. fa-trophy, fa-bolt' },
          { t: 'area', k: 'text', label: 'Achievement Text', rows: 2 },
        ],
      },
    ],
  },
  {
    key: 'placementBars',
    label: '16 · Placement Bars & Trust',
    desc: 'Branch-wise placement percentage bars (real T&P records) and the Approvals/MoUs trust card.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'area', k: 'sub', label: 'Sub Heading', rows: 2 },
      {
        t: 'list',
        k: 'bars',
        label: 'Branch Bars',
        titleField: 'label',
        def: { label: '', pct: '80', show: true },
        fields: [
          { t: 'text', k: 'label', label: 'Branch Name' },
          { t: 'text', k: 'pct', label: 'Placement %', hint: 'e.g. 94.7' },
          { t: 'bool', k: 'show', label: 'Show this bar' },
        ],
      },
      { t: 'area', k: 'footnote', label: 'Footnote', rows: 2 },
      {
        t: 'list',
        k: 'trust',
        label: 'Trust Card Items (MoUs & Memberships)',
        titleField: 'text',
        def: { icon: 'fa-check', text: '' },
        fields: [
          { t: 'text', k: 'icon', label: 'Icon Class', hint: 'Font Awesome, e.g. fa-flask, fa-certificate' },
          { t: 'text', k: 'text', label: 'Item Text' },
        ],
      },
    ],
  },
  {
    key: 'videoStrip',
    label: '17 · Life at NHIT Videos',
    desc: 'YouTube video cards (click-to-play, light on speed). Paste only the video ID, e.g. xcXh2vLC7VU.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'area', k: 'sub', label: 'Sub Heading', rows: 2 },
      {
        t: 'list',
        k: 'videos',
        label: 'Video Cards',
        titleField: 'title',
        def: { youtubeId: '', title: '', note: '' },
        fields: [
          { t: 'text', k: 'youtubeId', label: 'YouTube Video ID', hint: 'Only the ID, e.g. Bu83389zeWU' },
          { t: 'text', k: 'title', label: 'Video Title' },
          { t: 'text', k: 'note', label: 'Small Note Under Title' },
        ],
      },
      { t: 'text', k: 'ctaText', label: 'Bottom Button Text' },
      { t: 'text', k: 'ctaHref', label: 'Bottom Button Link', hint: 'e.g. the YouTube channel URL' },
    ],
  },
  {
    key: 'alumniVoices',
    label: '18 · Alumni Voices',
    desc: 'The official alumni podcast episodes with a short quote for each.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'area', k: 'sub', label: 'Sub Heading', rows: 2 },
      {
        t: 'list',
        k: 'voices',
        label: 'Podcast Episodes',
        titleField: 'name',
        def: { youtubeId: '', name: '', role: '', quote: '' },
        fields: [
          { t: 'text', k: 'youtubeId', label: 'YouTube Video ID', hint: 'Only the ID, e.g. uzoxE63xukI' },
          { t: 'text', k: 'name', label: 'Episode Name' },
          { t: 'text', k: 'role', label: 'Guest / Topic Line' },
          { t: 'area', k: 'quote', label: 'Quote', rows: 3 },
        ],
      },
    ],
  },
  {
    key: 'socialWall',
    label: '19 · Social Wall',
    desc: 'The three official NHIT social pages (Facebook, LinkedIn, YouTube) with follower counts.',
    fields: [
      { t: 'text', k: 'kicker', label: 'Small Line Above Title' },
      { t: 'text', k: 'title', label: 'Heading' },
      { t: 'area', k: 'sub', label: 'Sub Heading', rows: 2 },
      {
        t: 'list',
        k: 'cards',
        label: 'Social Cards',
        titleField: 'name',
        def: { icon: 'fa-facebook', name: '', handle: '', stat: '', url: '', note: '' },
        fields: [
          { t: 'text', k: 'icon', label: 'Icon Class', hint: 'fa-facebook, fa-linkedin, fa-youtube-play' },
          { t: 'text', k: 'name', label: 'Platform Name' },
          { t: 'text', k: 'stat', label: 'Follower Count Line' },
          { t: 'text', k: 'handle', label: 'Page Handle / Address' },
          { t: 'text', k: 'url', label: 'Page Link (full URL)' },
          { t: 'text', k: 'note', label: 'Small Note' },
        ],
      },
    ],
  },
];

/* ────────────────────────────────────────────────────────────────────────
 * The editor itself.
 *──────────────────────────────────────────────────────────────────────── */
export default function HomeEditor() {
  const [data, setData] = useState<any>(null);
  const [activeKey, setActiveKey] = useState<string>('hero');
  const [mode, setMode] = useState<'form' | 'json'>('form');
  const [sectionJson, setSectionJson] = useState('');
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/homepage');
      const json = await res.json();
      if (res.ok) {
        setData(json.homepage);
      } else {
        setMsg({ ok: false, text: json.error || 'Could not load home page content' });
      }
      setLoading(false);
    })();
  }, []);

  const activeIdx = useMemo(
    () => SECTIONS.findIndex((s) => s.key === activeKey),
    [activeKey]
  );
  const activeSection = SECTIONS[activeIdx];

  useEffect(() => {
    if (data) setSectionJson(JSON.stringify(data[activeSection.key], null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, data === null]);

  function setSectionValue(next: any) {
    setData((prev: any) => ({ ...prev, [activeSection.key]: next }));
  }

  function toggleVisible() {
    setData((prev: any) => ({
      ...prev,
      [activeSection.key]: { ...prev[activeSection.key], visible: prev[activeSection.key]?.visible === false },
    }));
  }

  function setPalette(key: string) {
    setData((prev: any) => ({
      ...prev,
      theme: { ...(prev.theme ?? {}), palette: key },
    }));
  }

  async function save() {
    setMsg(null);
    let payload = data;

    if (mode === 'json') {
      try {
        const parsed = JSON.parse(sectionJson);
        payload = { ...data, [activeSection.key]: parsed };
        setData(payload);
      } catch (e: any) {
        setMsg({ ok: false, text: `JSON error: ${e.message}` });
        return;
      }
    }

    setBusy(true);
    const res = await fetch('/api/admin/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ homepage: payload }),
    });
    const json = await res.json();
    setBusy(false);

    if (res.ok) {
      setMsg({ ok: true, text: 'Saved! The live home page is updated.' });
    } else {
      setMsg({ ok: false, text: json.error || 'Could not save' });
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-sm text-slate-500">
        Loading home page content…
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-10 text-center text-sm text-red-700">
        {msg?.text || 'Could not load home page content.'}
      </div>
    );
  }

  const sectionData = data[activeSection.key] ?? {};
  const isVisible = sectionData?.visible !== false;

  return (
    <div className="space-y-5">
      {/* Section switcher */}
      <div className="flex flex-wrap gap-2">
        {SECTIONS.map((s) => {
          const off = data[s.key]?.visible === false;
          return (
            <button
              key={s.key}
              onClick={() => setActiveKey(s.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition border ${
                s.key === activeKey
                  ? 'bg-[#9E0B0F] text-white border-[#9E0B0F] shadow'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
              }`}
            >
              {s.label}
              {off && <span className="ml-1.5 opacity-70">•</span>}
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
            <button
              onClick={() => {
                setMode('form');
                setSectionJson(JSON.stringify(sectionData, null, 2));
              }}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                mode === 'form' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FormInput className="w-3.5 h-3.5" /> Content Form
            </button>
            <button
              onClick={() => setMode('json')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition ${
                mode === 'json' ? 'bg-slate-900 text-white' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileJson className="w-3.5 h-3.5" /> Advanced JSON
            </button>
          </div>

          {activeSection.key !== 'theme' && (
            <button
              onClick={toggleVisible}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isVisible
                  ? 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                  : 'bg-amber-50 text-amber-700 border-amber-300'
              }`}
            >
              {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              {isVisible ? 'Section Visible' : 'Section Hidden'}
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Page
          </a>
          <button
            onClick={save}
            disabled={busy}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#9E0B0F] hover:bg-[#7B080B] text-white text-xs font-bold shadow disabled:opacity-60"
          >
            <Save className="w-3.5 h-3.5" />
            {busy ? 'Saving…' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Message */}
      {msg && (
        <div
          className={`flex items-center gap-2 text-sm rounded-xl px-4 py-3 ${
            msg.ok
              ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
              : 'text-red-700 bg-red-50 border border-red-200'
          }`}
        >
          {msg.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {msg.text}
        </div>
      )}

      <p className="text-xs text-slate-500">{activeSection.desc}</p>

      {mode === 'form' ? (
        activeKey === 'theme' ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4" /> Website Color Palette
            </h3>
            <p className="text-xs text-slate-500">
              Click a palette, then press <b>Save Changes</b> to apply it to the whole website — header, footer,
              buttons, links and every page section.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {PALETTES.map((p) => {
                const selected = (data.theme?.palette || 'nhit-red') === p.key;
                return (
                  <button
                    key={p.key}
                    onClick={() => setPalette(p.key)}
                    className={`text-left rounded-xl border-2 p-4 transition shadow-sm hover:shadow-md ${
                      selected ? 'border-slate-900 bg-slate-50' : 'border-slate-200 bg-white hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="w-7 h-7 rounded-full border border-black/5" style={{ backgroundColor: p.primary }} />
                      <span className="w-5 h-5 rounded-full border border-black/5" style={{ backgroundColor: p.dark }} />
                      <span className="w-3.5 h-3.5 rounded-full border border-black/5" style={{ backgroundColor: p.tint }} />
                      {selected && (
                        <span className="ml-auto inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-slate-900">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Active
                        </span>
                      )}
                    </div>
                    <div className="text-sm font-extrabold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{p.hint}</div>
                    <div
                      className="mt-3 text-center text-[11px] font-bold text-white rounded-lg py-1.5"
                      style={{ backgroundColor: p.primary }}
                    >
                      Button Preview
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-5">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              {activeSection.label}
            </h3>
            <SpecFields spec={activeSection.fields} value={sectionData} onChange={setSectionValue} />
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Section data (JSON) — {activeSection.label}
            </span>
            <button
              onClick={() => setSectionJson(JSON.stringify(sectionData, null, 2))}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          </div>
          <textarea
            value={sectionJson}
            onChange={(e) => setSectionJson(e.target.value)}
            spellCheck={false}
            className="w-full h-[560px] p-5 font-mono text-xs leading-relaxed text-slate-800 focus:outline-none resize-y bg-white"
          />
        </div>
      )}
    </div>
  );
}
