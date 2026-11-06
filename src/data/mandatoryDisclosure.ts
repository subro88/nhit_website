/*
 * Mandatory Disclosure — full statutory content, reproduced from the
 * institute's official records published at nhit.in/mandatory-disclosure.
 *
 * Structure is deliberately data-driven so the page component stays thin and
 * every future update (new EoA PDF, new committee order, revised intake) is a
 * one-line edit here. Committee tables keep the constant "Appointment Order
 * Reference" + "Date of Appointment" as a caption instead of a column — every
 * row of those tables repeats the same value, so no information is lost.
 */

export type KV = { label: string; value: string; href?: string };
export type Doc = { label: string; url: string };
export type DiscTable = { columns: string[]; rows: string[][]; note?: string };

/* ------------------------------------------------------------------ */
/* 1. Institution details                                              */
/* ------------------------------------------------------------------ */

export const institution: KV[] = [
  { label: 'Name', value: 'The New Horizons Institute of Technology (NHIT)' },
  { label: 'Address', value: 'Phase-II, City Centre, South G. T. Rd., Near Gandhi More, Durgapur' },
  { label: 'District', value: 'Burdwan (Paschim Bardhaman), West Bengal — 713208' },
  { label: 'STD Code', value: '0343' },
  { label: 'Phone', value: '2542102 / 03 / 04 / 06' },
  { label: 'Fax', value: '0343-2542106' },
  { label: 'E-mail', value: 'dgp_nhit@yahoo.com', href: 'mailto:dgp_nhit@yahoo.com' },
  { label: 'Website', value: 'www.nhit.in', href: 'https://nhit.in' },
  { label: 'Nearest Railway Station', value: 'Durgapur' },
  { label: 'Nearest Airport', value: 'Dum Dum (Kolkata) / Andal Airport' },
];

export const landDetails: KV[] = [
  { label: 'Location', value: 'Urban' },
  { label: 'No. of pieces of land', value: '1' },
  { label: 'Land registered with', value: 'ADDA, Govt. of West Bengal' },
  { label: 'Land ownership details', value: 'Government Lease' },
  { label: 'Land piece area 1', value: '2.5 acres' },
];

/* ------------------------------------------------------------------ */
/* 2. Society / Trust                                                  */
/* ------------------------------------------------------------------ */

export const society: KV[] = [
  { label: 'Name', value: 'Durgapur Ispat Peoples’ Society' },
  { label: 'Address', value: '6/7, Einstein Avenue, B-Zone, Durgapur – 5' },
  { label: 'Pin code', value: '713205' },
  { label: 'STD code', value: '0343' },
  { label: 'Phone', value: '09332038481, 09332038482' },
  { label: 'Fax', value: '0343-2542106' },
  { label: 'E-mail', value: 'dgp_nhit@yahoo.com', href: 'mailto:dgp_nhit@yahoo.com' },
  { label: 'Website', value: 'www.nhit.in', href: 'https://nhit.in' },
  { label: 'Corporate Office', value: 'Phase-II, City Centre, South G. T. Road, Near Gandhi More, Durgapur – 713208' },
];

/* ------------------------------------------------------------------ */
/* 3. Principal                                                        */
/* ------------------------------------------------------------------ */

export const principal: KV[] = [
  { label: 'Name', value: 'Mr. Sandip Hazra' },
  { label: 'Designation', value: 'Principal' },
  { label: 'Qualification', value: 'B. Tech (Electrical Engg.), M. Tech (Electrical Engg.)' },
  { label: 'Highest Degree', value: 'M. Tech' },
  { label: 'Specialization', value: 'Expertise in Power Plant' },
  { label: 'Total Experience', value: '14 yrs. Teaching Experience' },
  { label: 'Phone (O)', value: '0343-2542106' },
  { label: 'Fax', value: '0343-2542106' },
  { label: 'E-mail', value: 'principal@nhit.in', href: 'mailto:principal@nhit.in' },
  { label: 'Mobile', value: '0816090946' },
];

/* ------------------------------------------------------------------ */
/* 4. Affiliating body                                                 */
/* ------------------------------------------------------------------ */

export const affiliation: KV[] = [
  { label: 'Name', value: 'West Bengal State Council of Technical & Vocational Education and Skill Development (WBSCT&VE&SD)' },
  { label: 'Address 1', value: 'Karigori Bhavan, 4th Floor, Plot-B/7, Action Area-III, Newtown, Rajarhat, Kolkata, West Bengal – 700160, India' },
  { label: 'Address 2', value: 'Karigori Bhavan, 2nd Floor, 110 S. N. Banerjee Road, Kolkata – 700013' },
  { label: 'Pin code', value: '700013' },
  { label: 'Period of Affiliation', value: '2024–2025' },
  { label: 'STD code', value: '033' },
  { label: 'Phone', value: '22277592' },
  { label: 'Fax', value: '033-22277591' },
  { label: 'E-mail / Website', value: 'wbscte@yahoo.co.in', href: 'mailto:wbscte@yahoo.co.in' },
];

/* ------------------------------------------------------------------ */
/* 5. Board of Governors / Academic Advisory Body                      */
/* ------------------------------------------------------------------ */

export const bog: DiscTable = {
  columns: ['Sl. No.', 'Name', 'Designation', 'Affiliation'],
  rows: [
    ['1', 'Mr. Tapas Banerjee', 'Chairman', 'Durgapur Ispat Peoples’ Society'],
    ['2', 'Mr. Sandip Hazra', 'Member, Secretary', 'Principal, NHIT'],
    ['3', 'Nominee, AICTE', 'Member', 'AICTE (Ex-Officio)'],
    ['4', 'Nominee, WBSCT&VE&SD', 'Member', 'WBSCT&VE&SD'],
    ['5', 'Nominee, DTE&T', 'Member', 'DTE&T'],
    ['6', 'Prof. Biswajit Halder (Professor, NIT)', 'Member, Educationist', 'National Institute of Technology, Durgapur'],
    ['7', 'Prof. Purnendu Roy (Professor, NIT)', 'Member, Educationist', 'National Institute of Technology, Durgapur'],
    ['8', 'Mr. Sudip Dutta', 'Member, Industrialist', 'Ex-Chairman, Builders Association of India; Director, Civcon Construction (P) Ltd.'],
    ['9', 'Mr. Indranil Chanda', 'Member, Industrialist', 'Director, House & Bridge (India) Pvt. Ltd.'],
    ['10', 'Mr. Partha Mondal', 'Member', 'Durgapur Ispat Peoples’ Society'],
    ['11', 'Mr. Sanjib Mukherjee', 'Member', 'Durgapur Ispat Peoples’ Society'],
    ['12', 'Ms. Sumana Mukherjee', 'Member', 'Durgapur Ispat Peoples’ Society'],
    ['13', 'Mr. Pallab Naskar', 'Member', 'HOD ME, NHIT'],
    ['14', 'Mr. Sanjay Kumar Rakshit', 'Member', 'Vice Principal, NHIT'],
    ['15', 'Mr. Subroto Mondal', 'Member', 'In-charge HR&CR, NHIT'],
    ['16', 'Mr. Sudeshna Mukherjee', 'Member', 'Secretary, Academic Council, NHIT'],
    ['17', 'Arnab Mukherjee', 'Member', 'HOD, ETCE — NHIT'],
  ],
};

/* ------------------------------------------------------------------ */
/* 6. Committees — Anti-ragging / ICC / SC-ST / IQAC                   */
/* ------------------------------------------------------------------ */

export type CommitteeRow = {
  name: string;
  role: string;
  dept: string;
  mobile: string;
  email: string;
  extra?: string; // designation/gender/caste detail
  gender?: string;
};

export const antiRaggingCommittee: CommitteeRow[] = [
  { name: 'Sandip Hazra', role: 'Principal', dept: 'Electrical Engg. Dept.', mobile: '8016090946', email: 'principal@nhit.in' },
  { name: 'Sanjay Kumar Rakshit', role: 'Vice-Principal', dept: 'Mechanical Engg. Dept.', mobile: '8016090947', email: 'viceprincipal@nhit.in' },
  { name: 'Shyam Sundar Dutta', role: 'HOD-AE', dept: 'Automobile Engg. Dept.', mobile: '9563359981', email: 'automobile@nhit.in' },
  { name: 'Partha De', role: 'HOD-CE', dept: 'Civil Engg. Dept.', mobile: '8972203814', email: 'civil@nhit.in' },
  { name: 'Sudeshna Mukherjee', role: 'HOD-EE', dept: 'Electrical Engg. Dept.', mobile: '9933063027', email: 'electrical@nhit.in' },
  { name: 'Arnab Mukhopadhyay', role: 'HOD-ETCE', dept: 'ETCE Dept.', mobile: '7384736295', email: 'electronics@nhit.in' },
  { name: 'Pallab Naskar', role: 'HOD-ME', dept: 'Mechanical Engg. Dept.', mobile: '7980661174', email: 'mechanical@nhit.in' },
];

export const antiRaggingSquad: CommitteeRow[] = [
  { name: 'Sourav Chakraborty', role: 'Lecturer-AE', dept: 'Automobile Engg.', mobile: '7584824162', email: 'automobile@nhit.in' },
  { name: 'Sanchita Bhattacharjee', role: 'Lecturer-CE', dept: 'Civil Engg. Dept.', mobile: '9475942972', email: 'civil@nhit.in' },
  { name: 'Shyama Choran Mukherjee', role: 'Lecturer-CE', dept: 'Civil Engg. Dept.', mobile: '9547053288', email: 'civil@nhit.in' },
  { name: 'Prabhat Kumar Ghosh', role: 'Lecturer-EE', dept: 'Electrical Engg. Dept.', mobile: '9476454093', email: 'electrical@nhit.in' },
  { name: 'Rajib Sukul', role: 'Lecturer-EE', dept: 'Electrical Engg. Dept.', mobile: '9002762250', email: 'electrical@nhit.in' },
  { name: 'Aditi Bardhan', role: 'Lecturer-ETCE', dept: 'ETCE Dept.', mobile: '9563918929', email: 'electronics@nhit.in' },
  { name: 'Sudipto Bhattacharya', role: 'Lecturer-ME', dept: 'Mechanical Engg. Dept.', mobile: '7980709994', email: 'mechanical@nhit.in' },
  { name: 'Milan Bandyopadhyay', role: 'In-Charge Library', dept: 'Library', mobile: '9126019766', email: 'milanbanerjeelibrary@gmail.com' },
  { name: 'Subroto Mondal', role: 'Chief Co-ordinator', dept: 'HR&CR Dept.', mobile: '7407294943', email: 'hrcr@nhit.in' },
];

export const icc: CommitteeRow[] = [
  { name: 'Sanjay Kumar Rakshit', role: 'Chairperson', dept: 'Vice-Principal', mobile: '8016090947', email: 'viceprincipal@nhit.in', extra: 'Vice-Principal', gender: 'Male' },
  { name: 'Shyam Sundar Dutta', role: 'Member', dept: 'Automobile Engg. Dept. (HOD)', mobile: '9563359981', email: 'automobile@nhit.in', extra: 'HOD', gender: 'Male' },
  { name: 'Partha De', role: 'Member', dept: 'Civil Engg. Dept. (HOD)', mobile: '8972203814', email: 'civil@nhit.in', extra: 'HOD', gender: 'Male' },
  { name: 'Sudeshna Mukherjee', role: 'Member', dept: 'HOD-EE', mobile: '9933063027', email: 'electrical@nhit.in', extra: 'HOD', gender: 'Female' },
  { name: 'Arnab Mukhopadhyay', role: 'Member', dept: 'ETCE Dept. (HOD)', mobile: '7384736295', email: 'electronics@nhit.in', extra: 'HOD', gender: 'Male' },
  { name: 'Sanchita Bhattacharjee', role: 'Member', dept: 'Civil Engg. Dept.', mobile: '9434537369', email: 'civil@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Pallab Naskar', role: 'Member', dept: 'Mechanical Engg. Dept.', mobile: '7980661174', email: 'mechanical@nhit.in', extra: 'Teaching Faculty', gender: 'Male' },
  { name: 'Aditi Bardhan', role: 'Member', dept: 'ETCE Dept.', mobile: '9563918929', email: 'electronics@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Shatarupa Mallick Dey', role: 'Member', dept: 'Electrical Engg. Dept.', mobile: '8017623242', email: 'electrical@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Raktima Chakraborty', role: 'Member', dept: 'Civil Engg. Dept.', mobile: '8637064601', email: 'civil@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Tanushree Dey', role: 'Member', dept: 'Mechanical Engg. Dept.', mobile: '6295233458', email: 'mechanical@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Arpita Ghosh', role: 'Member', dept: 'ETCE Dept.', mobile: '9851359147', email: 'electronics@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Pallabi Maji', role: 'Member', dept: 'Mechanical Engg. Dept.', mobile: '6294469570', email: 'mechanical@nhit.in', extra: 'Teaching Faculty', gender: 'Female' },
  { name: 'Subroto Mondal', role: 'Member', dept: 'HR&CR Dept.', mobile: '7407294943', email: 'hrcr@nhit.in', extra: 'Non-Teaching Faculty', gender: 'Male' },
  { name: 'Ruby Karmakar', role: 'Member', dept: 'Administration', mobile: '9800571423', email: 'admission@nhit.in', extra: 'Non-Teaching Faculty', gender: 'Female' },
  { name: 'Pammi Singh', role: 'Student', dept: 'ME Dept.', mobile: '7501483472', email: 'Pammi0961@gmail.com', extra: 'Student', gender: 'Female' },
  { name: 'Bishakha Ruidas', role: 'Student', dept: 'ETCE Dept.', mobile: '8927857228', email: 'bishakhapal1112@gmail.com', extra: 'Student', gender: 'Female' },
  { name: 'Sruti Pal', role: 'Student', dept: 'ETCE Dept.', mobile: '9475919013', email: 'srutipal88@gmail.com', extra: 'Student', gender: 'Female' },
  { name: 'Avijit Ghosh', role: 'Student', dept: 'AE Dept.', mobile: '9339018391', email: 'avibhai933901@gmail.com', extra: 'Student', gender: 'Male' },
  { name: 'Akash Sharma', role: 'Student', dept: 'AE Dept.', mobile: '97047870866', email: 'asking8708@gmail.com', extra: 'Student', gender: 'Male' },
  { name: 'Sakshi Roy', role: 'Student', dept: 'EE Dept.', mobile: '9883202378', email: 'sakshiroy5529@gmail.com', extra: 'Student', gender: 'Female' },
  { name: 'Kusum Bauri', role: 'Student', dept: 'EE Dept.', mobile: '6297676251', email: 'kusumbauri91@gmail.com', extra: 'Student', gender: 'Female' },
  { name: 'Punit Patel', role: 'Student', dept: 'EE Dept.', mobile: '7811917585', email: 'Patel20041310@gmail.com', extra: 'Student', gender: 'Male' },
  { name: 'Sneha Kumari', role: 'Student', dept: 'CE Dept.', mobile: '9749595361', email: 'Kumarisneha102938@gmail.com', extra: 'Student', gender: 'Female' },
];

export const scst: CommitteeRow[] = [
  { name: 'Sandip Hazra', role: 'Principal', dept: 'Electrical Dept.', mobile: '8016090946', email: 'principal@nhit.in', extra: 'Other', gender: 'Male' },
  { name: 'Sanjay Kumar Rakshit', role: 'Chairman', dept: 'Mechanical Dept.', mobile: '8016090947', email: 'mechanical@nhit.in', extra: 'Other', gender: 'Male' },
  { name: 'Pallab Naskar', role: 'Lecturer', dept: 'Mechanical Dept.', mobile: '7980661174', email: 'mechanical@nhit.in', extra: 'SC', gender: 'Male' },
  { name: 'Abhijit Mondal', role: 'Office Staff', dept: 'Exam Cell', mobile: '9932743040', email: 'examcell@nhit.in', extra: 'Other', gender: 'Male' },
  { name: 'Soumitra Chatterjee', role: 'Manager', dept: 'Administration', mobile: '8016090931', email: 'nhitoffice@nhit.in', extra: 'Other', gender: 'Male' },
  { name: 'Shyam Sundar Dutta', role: 'HOD', dept: 'Automobile Dept.', mobile: '9563359981', email: 'automobile@nhit.in', extra: 'Other', gender: 'Male' },
  { name: 'Pallabi Maji', role: 'Lecturer', dept: 'Mechanical Dept.', mobile: '6294469570', email: 'mechanical@nhit.in', extra: 'SC', gender: 'Female' },
  { name: 'Gouranga Bouri', role: 'Driver', dept: 'NHIT', mobile: '9732024172', email: 'mechanical@nhit.in', extra: 'SC', gender: 'Male' },
];

export const iqac: CommitteeRow[] = [
  { name: 'Sandip Hazra', role: 'Principal', dept: 'Academic', mobile: '8016090946', email: 'principal@nhit.in', gender: 'Male' },
  { name: 'Sanjay Kumar Rakshit', role: 'Vice-Principal', dept: 'Academic', mobile: '8016090947', email: 'viceprincipal@nhit.in', gender: 'Male' },
  { name: 'Shyam Sundar Dutta', role: 'HOD-AE', dept: 'Teaching', mobile: '9563359981', email: 'automobile@nhit.in', gender: 'Male' },
  { name: 'Partha De', role: 'HOD-CE', dept: 'Teaching', mobile: '8972203814', email: 'civil@nhit.in', gender: 'Male' },
  { name: 'Sudeshna Mukherjee', role: 'HOD-EE', dept: 'Academic', mobile: '9933063027', email: 'electrical@nhit.in', gender: 'Female' },
  { name: 'Arnab Mukhopadhyay', role: 'HOD-ETCE', dept: 'Teaching', mobile: '7384736295', email: 'electronics@nhit.in', gender: 'Male' },
  { name: 'Pallab Naskar', role: 'HOD-ME', dept: 'Teaching', mobile: '7980661174', email: 'mechanical@nhit.in', gender: 'Male' },
  { name: 'Subroto Mondal', role: 'Chief Co-ordinator HR&CRD', dept: 'Non-Teaching', mobile: '7407294943', email: 'hrcr@nhit.in', gender: 'Male' },
];

export const committeeOrders = {
  antiRagging: 'NHIT/ARC/2023-II · 20.12.2023',
  icc: 'NHIT/ICC/2023-II · 20.12.2023',
  scst: 'NHIT/SCST Committee/2023-II · 20.12.2023',
  iqac: 'NHIT/IQAC/2023 · 20.12.2023',
};

/* ------------------------------------------------------------------ */
/* 7. Programmes & approved intake                                     */
/* ------------------------------------------------------------------ */

export const programmesDiploma: DiscTable = {
  columns: ['Level', 'Program', 'Course', 'Affiliating Body', 'Intake Approved 2023-24', 'Intake Approved 2024-25', 'NRI Approval Status', 'FN / Gulf Quota / OCI Approval Status'],
  rows: [
    ['Diploma', 'Engineering and Technology', 'Automobile Engineering', 'West Bengal State Council of Technical Education, Kolkata', '60', '30', 'No', 'No'],
    ['Diploma', 'Engineering and Technology', 'Civil Engineering', 'West Bengal State Council of Technical Education, Kolkata', '60', '30', 'No', 'No'],
    ['Diploma', 'Engineering and Technology', 'Computer Science and Technology', 'West Bengal State Council of Technical Education, Kolkata', '60', '120', 'No', 'No'],
    ['Diploma', 'Engineering and Technology', 'Electrical Engineering', 'West Bengal State Council of Technical Education, Kolkata', '120', '120', 'No', 'No'],
    ['Diploma', 'Engineering and Technology', 'Electronics and Telecommunication Engineering', 'West Bengal State Council of Technical Education, Kolkata', '60', '60', 'No', 'No'],
    ['Diploma', 'Engineering and Technology', 'Mechanical Engineering', 'West Bengal State Council of Technical Education, Kolkata', '120', '120', 'No', 'No'],
  ],
};

export const programmesWorking: DiscTable = {
  columns: ['Level', 'Program', 'Course', 'Working Professional Approved Intake 2024-25'],
  rows: [
    ['Diploma', 'Engineering and Technology', 'Electrical Engineering', '30'],
    ['Diploma', 'Engineering and Technology', 'Mechanical Engineering', '30'],
  ],
};

export const programmesUg: DiscTable = {
  columns: ['Level', 'Program', 'Course', 'Affiliating Body', 'Intake Approved 2024-25', 'NRI Approval Status', 'FN / Gulf Quota / OCI Approval Status'],
  rows: [
    ['Under Graduate', 'Management', 'BBA', 'Maulana Abul Kalam Azad University of Technology, West Bengal', '60', 'No', 'No'],
    ['Under Graduate', 'Computer Applications', 'BCA', 'Maulana Abul Kalam Azad University of Technology, West Bengal', '60', 'No', 'No'],
  ],
};

/* ------------------------------------------------------------------ */
/* 8. Placement synopsis                                               */
/* ------------------------------------------------------------------ */

export const placement: DiscTable = {
  columns: ['Session / Batch', 'Total Students', 'Placeable / Opted for Campus Placement', 'Placed', 'Ratio (%)'],
  rows: [
    ['2018–2023', '303', '210', '195', '92.86'],
    ['2018–2022', '421', '127', '96', '75.59'],
    ['2017–2021', '435', '249', '213', '85.54'],
    ['2017–2020', '514', '321', '229', '71.34'],
    ['2016–2019', '523', '340', '330', '97.06'],
    ['2015–2018', '618', '335', '330', '98.51'],
    ['2014–2017', '634', '326', '321', '98.47'],
    ['2013–2016', '580', '310', '305', '98.39'],
    ['2012–2015', '542', '325', '319', '98.15'],
    ['2011–2014', '—', '261', '254', '97.32'],
    ['2010–2013', '—', '173', '159', '91.91'],
    ['2009–2012', '—', '166', '85', '51.20'],
    ['2008–2011', '—', '229', '134', '58.52'],
    ['2007–2010', '—', '115', '94', '81.74'],
  ],
};

/* ------------------------------------------------------------------ */
/* 9. Staff pattern (discipline wise)                                  */
/* ------------------------------------------------------------------ */

export type StaffRow = { id: string; name: string; designation: string; dept: string; doj: string };

export const staff: StaffRow[] = [
  { id: '1-2509068733', name: 'Mr. Subir Mukhopadhyay', designation: 'Lecturer', dept: 'Automobile Engineering', doj: '03-03-2014' },
  { id: '1-3576276962', name: 'Mr. Krishanu Sarkar', designation: 'Lecturer', dept: 'Automobile Engineering', doj: '25-11-2017' },
  { id: '1-4669205705', name: 'Mr. Sourav Chakraborty', designation: 'Lecturer', dept: 'Automobile Engineering', doj: '24-01-2019' },
  { id: '1-43492012148', name: 'Mr. Sushobhan Sarkar', designation: 'Lecturer', dept: 'Automobile Engineering', doj: '12-12-2022' },
  { id: '1-43789434563', name: 'Mr. Becon Karmakar', designation: 'Lecturer', dept: 'Automobile Engineering', doj: '01-12-2023' },
  { id: '1-43986060455', name: 'Mrs. Sayani Ghosh', designation: 'Asst. Professor', dept: 'Business Administration (Management)', doj: '25-01-2024' },
  { id: '1-44023932515', name: 'Miss Ankita Mondal', designation: 'Asst. Professor', dept: 'Business Administration (Management)', doj: '25-01-2024' },
  { id: '1-44023932729', name: 'Mrs. Baisakhi Moitra Dutta', designation: 'Asst. Professor', dept: 'Business Administration (Management)', doj: '25-01-2024' },
  { id: '1-2499979833', name: 'Mr. Shyama Choran Mukherjee', designation: 'Lecturer', dept: 'Civil Engineering', doj: '24-07-2014' },
  { id: '1-4669205591', name: 'Mr. Suchintya Halder', designation: 'Lecturer', dept: 'Civil Engineering', doj: '24-01-2019' },
  { id: '1-4669205598', name: 'Mr. Achintya Halder', designation: 'Lecturer', dept: 'Civil Engineering', doj: '24-01-2019' },
  { id: '1-43492012160', name: 'Mr. Amit Mondal', designation: 'Lecturer', dept: 'Civil Engineering', doj: '01-09-2022' },
  { id: '1-43492042151', name: 'Mr. Arkadeb Hazra', designation: 'Lecturer', dept: 'Civil Engineering', doj: '02-05-2023' },
  { id: '1-1525609913', name: 'Mr. Partha De', designation: 'Lecturer', dept: 'Civil Engineering', doj: '15-06-2012' },
  { id: '1-43986998856', name: 'Miss Smriti Sengupta', designation: 'Asst. Professor', dept: 'Computer Applications', doj: '25-01-2024' },
  { id: '1-44020833682', name: 'Miss Sipra Bej', designation: 'Asst. Professor', dept: 'Computer Applications', doj: '25-01-2024' },
  { id: '1-43989927921', name: 'Miss Ankita Roy', designation: 'Lecturer', dept: 'Computer Science & Technology', doj: '25-01-2024' },
  { id: '1-44020833891', name: 'Miss Jayashri Barik', designation: 'Lecturer', dept: 'Computer Science & Technology', doj: '25-01-2024' },
  { id: '1-44023932675', name: 'Miss Mamta Sharma', designation: 'Lecturer', dept: 'Computer Science & Technology', doj: '25-01-2024' },
  { id: '1-2503055753', name: 'Mr. Arindam Dutta', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '01-01-2015' },
  { id: '1-2514027725', name: 'Mrs. Sudeshna Mukherjee', designation: 'Asst. Professor', dept: 'Electrical Engineering', doj: '16-02-2015' },
  { id: '1-3576276628', name: 'Mr. Rahul Ghosh', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '07-02-2017' },
  { id: '1-3576276646', name: 'Mr. Rajib Sukul', designation: 'Asst. Professor', dept: 'Electrical Engineering', doj: '18-03-2016' },
  { id: '1-3576276906', name: 'Mr. Sankar Chatterjee', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '02-07-2012' },
  { id: '1-9312316541', name: 'Mr. Bijay Choudhary', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '01-02-2014' },
  { id: '1-478827743', name: 'Mr. Sandip Hazra', designation: 'Principal / Director', dept: 'Electrical Engineering', doj: '01-07-2010' },
  { id: '1-478827803', name: 'Ms. Sanchita Bhattacharjee', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '01-02-2009' },
  { id: '1-43492011914', name: 'Mr. Malancha Ghosh', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '12-12-2022' },
  { id: '1-43492012016', name: 'Mr. Vidyasagar Nair', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '12-12-2022' },
  { id: '1-43492468440', name: 'Miss Raktima Chakraborty', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '02-05-2023' },
  { id: '1-43788506019', name: 'Mr. Souvik Pramanik', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '02-01-2024' },
  { id: '1-43788506137', name: 'Mrs. Shatarupa Mallick Dey', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '14-12-2023' },
  { id: '1-43789051555', name: 'Mr. Sourav Mishra', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '16-08-2023' },
  { id: '1-43789434611', name: 'Mr. Debojyoti Pathak', designation: 'Lecturer', dept: 'Electrical Engineering', doj: '28-11-2023' },
  { id: '1-3576039546', name: 'Mr. Bidyut Paul', designation: 'Asst. Professor', dept: 'Electronics & Tele-Communication Engineering', doj: '28-08-2017' },
  { id: '1-3576276868', name: 'Mr. Sagnik Chatterjee', designation: 'Lecturer', dept: 'Electronics & Tele-Communication Engineering', doj: '30-01-2014' },
  { id: '1-7453130892', name: 'Mrs. Arpita Ghosh', designation: 'Lecturer', dept: 'Electronics & Tele-Communication Engineering', doj: '02-12-2019' },
  { id: '1-11303218607', name: 'Mr. Sunetro Chattaraj', designation: 'Lecturer', dept: 'Electronics & Tele-Communication Engineering', doj: '01-11-2021' },
  { id: '1-478827755', name: 'Mr. Uttam Kumar Nandi', designation: 'Asst. Professor', dept: 'Electronics & Tele-Communication Engineering', doj: '08-09-2010' },
  { id: '1-478827771', name: 'Miss Aditi Bardhan', designation: 'Asst. Professor', dept: 'Electronics & Tele-Communication Engineering', doj: '10-01-2011' },
  { id: '1-489227290', name: 'Mr. Arnab Mukhopadhyay', designation: 'Asst. Professor', dept: 'Electronics & Tele-Communication Engineering', doj: '28-02-2011' },
  { id: '1-44049070884', name: 'Mr. Amitabh Kumar Gupta', designation: 'Lecturer', dept: 'Electronics & Tele-Communication Engineering', doj: '25-01-2024' },
  { id: '1-44049433960', name: 'Mr. Indranil Roy', designation: 'Lecturer', dept: 'Electronics & Tele-Communication Engineering', doj: '25-01-2024' },
  { id: '1-2499980115', name: 'Mr. Sudipto Bhattacharya', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '12-08-2014' },
  { id: '1-2500420230', name: 'Mr. Arnab Kumar Dey', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '19-03-2014' },
  { id: '1-2513457573', name: 'Mr. Mrinmoy Ghosh', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '03-03-2014' },
  { id: '1-4668460327', name: 'Mr. Tanushree Dey', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '24-01-2019' },
  { id: '1-7367039662', name: 'Mr. Chiranjit Karmakar', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '10-07-2019' },
  { id: '1-478827711', name: 'Mr. Tanmoy Roy', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '01-12-2010' },
  { id: '1-43492011821', name: 'Mr. Abhinandan Mitra', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '12-12-2022' },
  { id: '1-43492738412', name: 'Mrs. Pallabi Maji', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '19-12-2022' },
  { id: '1-43789051813', name: 'Mr. Shovan Bhattacharjee', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '01-09-2023' },
  { id: '1-43789434669', name: 'Mr. Chiranjib Roy', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '10-07-2023' },
  { id: '1-43789434727', name: 'Mr. Chandan Kumar Gaurav', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '10-07-2023' },
  { id: '1-44049070795', name: 'Mr. Ayan Dey', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '25-01-2024' },
  { id: '1-1499539021', name: 'Mr. Prabhat Kumar Ghosh', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '15-06-2012' },
  { id: '1-2065255638', name: 'Mr. Pallab Naskar', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '02-09-2013' },
  { id: '1-2065255643', name: 'Mr. Sanjay Kumar Rakshit', designation: 'Lecturer', dept: 'Mechanical Engineering', doj: '10-06-2013' },
];

/* ------------------------------------------------------------------ */
/* 10. Fee structure (from official Diploma-Fees-2024 sheet)           */
/* ------------------------------------------------------------------ */

export const feesDiploma3y: DiscTable = {
  columns: ['Sl.', 'Course', 'Admission Fees', 'Installment Amount', 'Total Installments', 'Total Fees (3 Years)'],
  rows: [
    ['1', 'Mechanical', '₹ 25,050.00', '₹ 19,000.00', '5', '₹ 1,20,050.00'],
    ['2', 'Electrical', '₹ 25,050.00', '₹ 20,000.00', '5', '₹ 1,25,050.00'],
    ['3', 'Electronics', '₹ 25,050.00', '₹ 15,000.00', '5', '₹ 1,00,050.00'],
    ['4', 'Computer Sc. & Tech.', '₹ 25,050.00', '₹ 22,000.00', '5', '₹ 1,35,050.00'],
    ['5', 'Civil', '₹ 25,050.00', '₹ 14,000.00', '5', '₹ 95,050.00'],
    ['6', 'Automobile', '₹ 25,050.00', '₹ 14,000.00', '5', '₹ 95,050.00'],
  ],
};

export const feesDiploma2yIti: DiscTable = {
  columns: ['Sl.', 'Course', 'Admission Fees', 'Installment Amount', 'Total Installments', 'Total Fees (2 Years)'],
  rows: [
    ['1', 'Mechanical', '₹ 24,050.00', '₹ 17,000.00', '3', '₹ 75,050.00'],
    ['2', 'Electrical', '₹ 24,050.00', '₹ 17,000.00', '3', '₹ 75,050.00'],
    ['3', 'Electronics', '₹ 22,050.00', '₹ 11,000.00', '3', '₹ 55,050.00'],
    ['4', 'Civil', '₹ 22,050.00', '₹ 11,000.00', '3', '₹ 55,050.00'],
    ['5', 'Automobile', '₹ 22,050.00', '₹ 11,000.00', '3', '₹ 55,050.00'],
    ['6', 'ITI (Fitter)', '₹ 27,050.00', '₹ 27,000.00', '1', '₹ 54,050.00'],
    ['7', 'ITI (Electrician)', '₹ 27,050.00', '₹ 27,000.00', '1', '₹ 54,050.00'],
  ],
};

/* ------------------------------------------------------------------ */
/* 11. Admission procedure                                             */
/* ------------------------------------------------------------------ */

export const admissionProcess: DiscTable = {
  columns: ['Route', 'Eligibility', 'Time / Quota'],
  rows: [
    ['JEXPO', 'Passed in Secondary Level Exam and Qualified in JEXPO Exam organized by WBSCTE.', 'After counseling organized by WBSCTE. TFW scheme: 5% of total intake capacity.'],
    ['Direct Admission', 'Passed in Secondary Level Exam and Qualified in JEXPO Exam organized by WBSCTE.', 'No age limit.'],
    ['Lateral Entry', '10+2 vocational course trainees can take admission through VOCLET exam, after counseling, directly in the 2nd year of Diploma Engineering.', 'After counseling organized by WBSCTE.'],
  ],
};

export const admissionDocuments: string[] = [
  'Madhyamik or equivalent exam admit card (2 copies attested xerox)',
  'Madhyamik or equivalent exam marksheet (2 copies attested xerox)',
  'Madhyamik or equivalent exam certificate (2 copies attested xerox)',
  'Madhyamik or equivalent exam school leaving certificate (2 copies attested xerox)',
  'Higher Secondary (10+2) or equivalent exam marksheet (2 copies attested xerox)',
  'JEXPO rank card (2 copies attested xerox)',
  'JEXPO admit card (2 copies attested xerox)',
  'WBSCT&VE&SD allotment letter (original + 1 copy attested xerox)',
  'Recent color passport-size photographs (6 copies)',
  'Medical certificate (original + 1 copy attested xerox)',
  'Migration certificate (original + 1 copy attested xerox) — except West Bengal',
];

/* ------------------------------------------------------------------ */
/* 12. Infrastructure — rooms and resources                            */
/* ------------------------------------------------------------------ */

export const teachingRooms: DiscTable = {
  columns: ['Programme', 'Level', 'Room Type', 'Room ID', 'Area (sqm)', 'Building'],
  rows: [
    ['Engineering and Technology', 'Diploma', 'Laboratory', '101', '120.36', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '102', '103.25', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '103', '73.75', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '104.1', '66.18', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '104.2', '66.10', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Tutorial Room', '108.1', '57.00', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Tutorial Room', '116', '66.00', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '117', '64.80', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '118', '66.15', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '119', '71.01', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Seminar Hall', '120', '140.22', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '121', '116.80', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '122', '95.88', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '123', '95.88', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '125', '92.47', 'NHIT — Ground Floor'],
    ['Engineering and Technology', 'Diploma', 'Additional Workshop', '130', '75.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Additional Workshop', '131', '75.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '133', '100.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Workshop', '134', '100.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Workshop', '135', '100.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '136', '100.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '137', '100.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '141', '93.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '142', '93.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '143', '93.00', 'NHIT Workshop'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '201', '93.00', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '202', '84.06', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '203', '69.03', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '204', '80.63', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '205', '69.03', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '206', '80.63', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'CAD Center', '207', '150.55', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Tutorial Room', '209', '60.32', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Language Laboratory', '210', '89.61', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '211', '63.15', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '212', '65.84', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '213', '77.34', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '214', '70.57', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '216', '69.87', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '217', '76.51', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '218', '66.79', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '219', '66.15', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '220.1', '66.15', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Tutorial Room', '220.2', '33.50', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '221', '74.14', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '222', '74.90', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '223', '80.63', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Classroom', '224', '69.03', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '225', '80.63', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '226', '69.03', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '227.1', '70.57', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Tutorial Room', '227.2', '33.00', 'NHIT — First Floor'],
    ['Engineering and Technology', 'Diploma', 'Laboratory', '236', '76.96', 'NHIT — First Floor'],
    ['Computer Applications', 'Under Graduate', 'Computer Centre', '301', '198.00', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Computer Centre', '302', '150.00', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Language Laboratory', '303', '69.03', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Language Laboratory', '304', '80.55', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Language Laboratory', '306', '60.00', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Classroom', '309', '66.00', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Classroom', '310', '66.00', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Classroom', '311', '77.34', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Classroom', '312', '70.57', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Seminar Hall', '314', '194.48', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Laboratory', '315', '69.00', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Laboratory', '317', '66.79', 'NHIT — Second Floor'],
    ['Management', 'Under Graduate', 'Seminar Hall', '318', '150.00', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Tutorial Room', '321', '86.00', 'NHIT — Second Floor'],
    ['Computer Applications', 'Under Graduate', 'Tutorial Room', '323', '86.63', 'NHIT — Second Floor'],
  ],
};

export const supportReadyRooms: DiscTable = {
  columns: ['Room Type', 'Room ID', 'Area (sqm)', 'Flooring Readiness', 'Building'],
  rows: [
    ['Library & Reading Room', '108.2', '100.00', 'Ready', 'NHIT — Ground Floor'],
    ['Library & Reading Room', '109', '135.00', 'Ready', 'NHIT — Ground Floor'],
    ['Library & Reading Room', '110', '165.52', 'Ready', 'NHIT — Ground Floor'],
    ['Language Laboratory', '210', '89.61', 'Ready', 'NHIT — First Floor'],
    ['Computer Center', '233', '111.25', 'Ready', 'NHIT — First Floor'],
    ['Computer Center', '234', '96.28', 'Ready', 'NHIT — First Floor'],
    ['Library & Reading Room', '305', '201.00', 'Ready', 'NHIT — Second Floor'],
  ],
};

export const officeRooms: DiscTable = {
  columns: ['Room ID', 'Room Type', 'Area (sqm)', 'Building', 'Flooring', 'Walls & Painting'],
  rows: [
    ['105', 'Faculty Room', '21.18', 'NHIT', 'Ready', 'Ready'],
    ['106', 'Cabin for Head of Dept', '13.08', 'NHIT', 'Ready', 'Ready'],
    ['107', 'Faculty Room', '33.00', 'NHIT', 'Ready', 'Ready'],
    ['111', 'Principal / Director’s Office', '48.65', 'NHIT', 'Ready', 'Ready'],
    ['112', 'Pantry for Staff', '10.00', 'NHIT', 'Ready', 'Ready'],
    ['113', 'Exam Control Office', '60.25', 'NHIT', 'Ready', 'Ready'],
    ['115A', 'Security', '11.90', 'NHIT', 'Ready', 'Ready'],
    ['115B', 'Security', '7.50', 'NHIT', 'Ready', 'Ready'],
    ['124', 'Faculty Room', '66.00', 'NHIT', 'Ready', 'Ready'],
    ['126', 'Faculty Room', '33.00', 'NHIT', 'Ready', 'Ready'],
    ['127', 'Cabin for Head of Dept', '18.54', 'NHIT', 'Ready', 'Ready'],
    ['128', 'Cabin for Head of Dept', '13.80', 'NHIT', 'Ready', 'Ready'],
    ['129A', 'Office All Inclusive', '196.71', 'NHIT', 'Ready', 'Ready'],
    ['129B', 'Office All Inclusive', '46.50', 'NHIT', 'Ready', 'Ready'],
    ['129C', 'Central Store', '36.71', 'NHIT', 'Ready', 'Ready'],
    ['129E', 'Housekeeping', '10.00', 'NHIT', 'Ready', 'Ready'],
    ['132', 'Maintenance', '50.00', 'NHIT', 'Ready', 'Ready'],
    ['138A', 'Office All Inclusive', '133.08', 'NHIT', 'Ready', 'Ready'],
    ['138B', 'Reception Area', '27.00', 'NHIT', 'Ready', 'Ready'],
    ['139', 'Central Store', '24.94', 'NHIT', 'Ready', 'Ready'],
    ['208', 'Faculty Room', '23.50', 'NHIT', 'Ready', 'Ready'],
    ['215', 'Cabin for Head of Dept', '48.74', 'NHIT', 'Ready', 'Ready'],
    ['229', 'Cabin for Head of Dept', '16.56', 'NHIT', 'Ready', 'Ready'],
    ['230', 'Faculty Room', '33.10', 'NHIT', 'Ready', 'Ready'],
    ['231', 'Faculty Room', '49.84', 'NHIT', 'Ready', 'Ready'],
    ['232', 'Board Room', '44.75', 'NHIT', 'Ready', 'Ready'],
    ['235', 'Placement Office', '65.72', 'NHIT', 'Ready', 'Ready'],
    ['307', 'Cabin for Head of Dept', '20.00', 'NHIT', 'Ready', 'Ready'],
    ['308.1', 'Cabin for Head of Dept', '45.00', 'NHIT', 'Ready', 'Ready'],
    ['308.2', 'Faculty Room', '45.00', 'NHIT', 'Ready', 'Ready'],
    ['313', 'Principal / Director’s Office', '48.00', 'NHIT', 'Ready', 'Ready'],
  ],
};

/* ------------------------------------------------------------------ */
/* 13. AICTE approvals & audited statements (official PDFs)            */
/* ------------------------------------------------------------------ */

export const loiDocs: Doc[] = [
  { label: 'Letter of Intent — 2007', url: 'https://nhit.in/wp-content/uploads/2024/07/Letter-Of-Intent-2007.pdf' },
];

export const eoaDocs: Doc[] = [
  { label: 'Extension of Approval — 2008-10', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2008-10.pdf' },
  { label: 'Extension of Approval — 2010-11', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2010-11.pdf' },
  { label: 'Extension of Approval — 2011-12', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2011-12.pdf' },
  { label: 'Extension of Approval — 2012-13', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2012-13.pdf' },
  { label: 'Extension of Approval — 2013-14', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2013-14.pdf' },
  { label: 'Extension of Approval — 2014-15', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2014-15.pdf' },
  { label: 'Extension of Approval — 2015-16', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2015-16.pdf' },
  { label: 'Extension of Approval — 2016-17', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2016-17.pdf' },
  { label: 'Extension of Approval — 2017-18', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2017-18.pdf' },
  { label: 'Extension of Approval — 2018-19', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2018-19.pdf' },
  { label: 'Extension of Approval — 2019-20', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2019-20.pdf' },
  { label: 'Extension of Approval — 2020-21', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-for-2020-21.pdf' },
  { label: 'Extension of Approval — 2021-22', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2021-22.pdf' },
  { label: 'Extension of Approval — 2022-23', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2022-23.pdf' },
  { label: 'Extension of Approval — 2023-24', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2023-24.pdf' },
  { label: 'Extension of Approval — 2024-25', url: 'https://nhit.in/wp-content/uploads/2024/07/Approval-For-2024-25.pdf' },
];

export const eoaReportPages: Doc[] = [
  { label: 'EOA Report 2025-26 — Page 1', url: '/disclosure/EOA-Report-2025-2026_page-0001.jpg' },
  { label: 'EOA Report 2025-26 — Page 2', url: '/disclosure/EOA-Report-2025-2026_page-0002.jpg' },
  { label: 'EOA Report 2025-26 — Page 3', url: '/disclosure/EOA-Report-2025-2026_page-0003.jpg' },
  { label: 'EOA Report 2025-26 — Page 4', url: '/disclosure/EOA-Report-2025-2026_page-0004.jpg' },
];

export const auditDocs: Doc[] = [
  { label: 'Audit Report 2019-2020', url: 'https://nhit.in/wp-content/uploads/2024/06/AUDIT-REPORT-2019-2020.pdf' },
  { label: 'Audit Report 2020-2021', url: 'https://nhit.in/wp-content/uploads/2024/06/AUDIT-REPORT-2020-2021.pdf' },
  { label: 'Audit Report 2021-2022', url: 'https://nhit.in/wp-content/uploads/2024/06/AUDIT-REPROT-2021-2022.pdf' },
];

/* ------------------------------------------------------------------ */
/* 14. Page navigation model                                           */
/* ------------------------------------------------------------------ */

export const disclosureSections = [
  { id: 'institution', label: 'Institution' },
  { id: 'society', label: 'Society / Trust' },
  { id: 'principal', label: 'Principal' },
  { id: 'affiliation', label: 'Affiliating Body' },
  { id: 'governance', label: 'Board of Governors' },
  { id: 'approvals', label: 'AICTE Approvals' },
  { id: 'anti-ragging', label: 'Anti-Ragging Cell' },
  { id: 'icc', label: 'Internal Complaint Committee' },
  { id: 'scst', label: 'SC / ST Committee' },
  { id: 'iqac', label: 'IQAC' },
  { id: 'programmes', label: 'Programmes & Intake' },
  { id: 'placement', label: 'Placement' },
  { id: 'faculty', label: 'Faculty & Staff' },
  { id: 'fees', label: 'Fee Structure' },
  { id: 'admission', label: 'Admission' },
  { id: 'infrastructure', label: 'Infrastructure' },
  { id: 'audit', label: 'Audit Reports' },
] as const;
