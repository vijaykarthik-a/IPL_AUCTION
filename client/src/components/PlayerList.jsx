import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const ALL_PLAYERS = [
    // CHENNAI
    { id: 1, name: "Akeal Hosein", initials: "AH", role: "Bowler", team: "Chennai", marquee: true },
    { id: 2, name: "Anshul Kamboj", initials: "AK", role: "All-Rounder", team: "Chennai", marquee: true },
    { id: 3, name: "Ayush Mhatre", initials: "AM", role: "Batsman", team: "Chennai", marquee: true },
    { id: 4, name: "Dewald Brevis", initials: "DB", role: "Batsman", team: "Chennai", marquee: true },
    { id: 5, name: "Gurjapneet Singh", initials: "GS", role: "Bowler", team: "Chennai", marquee: true },
    { id: 6, name: "Jamie Overton", initials: "JO", role: "All-Rounder", team: "Chennai", marquee: true },
    { id: 7, name: "Kartik Sharma", initials: "KS", role: "Wicketkeeper", team: "Chennai", marquee: true },
    { id: 8, name: "Khaleel Ahmed", initials: "KA", role: "Bowler", team: "Chennai", marquee: true },
    { id: 9, name: "Matt Henry", initials: "MH", role: "Bowler", team: "Chennai", marquee: true },
    { id: 10, name: "Matthew Short", initials: "MS", role: "Batsman", team: "Chennai", marquee: true },
    { id: 11, name: "MS Dhoni", initials: "MD", role: "Wicketkeeper", team: "Chennai", marquee: true },
    { id: 12, name: "Mukesh Choudhary", initials: "MC", role: "Bowler", team: "Chennai", marquee: false },
    { id: 13, name: "Nathan Ellis", initials: "NE", role: "Bowler", team: "Chennai", marquee: false },
    { id: 14, name: "Noor Ahmad", initials: "NA", role: "Bowler", team: "Chennai", marquee: true },
    { id: 15, name: "Prashant Veer", initials: "PV", role: "Bowler", team: "Chennai", marquee: true },
    { id: 16, name: "Rahul Chahar", initials: "RC", role: "Bowler", team: "Chennai", marquee: true },
    { id: 17, name: "Ramakrishna Ghosh", initials: "RG", role: "All-Rounder", team: "Chennai", marquee: true },
    { id: 18, name: "Ruturaj Gaikwad", initials: "RG", role: "Batsman", team: "Chennai", marquee: true },
    { id: 19, name: "Sanju Samson", initials: "SS", role: "Wicketkeeper", team: "Chennai", marquee: true },
    { id: 20, name: "Sarfaraz Khan", initials: "SK", role: "Batsman", team: "Chennai", marquee: true },
    { id: 21, name: "Shivam Dube", initials: "SD", role: "All-Rounder", team: "Chennai", marquee: true },
    { id: 22, name: "Shreyas Gopal", initials: "SG", role: "Bowler", team: "Chennai", marquee: false },
    { id: 23, name: "Spencer Johnson", initials: "SJ", role: "Bowler", team: "Chennai", marquee: true },
    { id: 24, name: "Urvil Patel", initials: "UP", role: "Wicketkeeper", team: "Chennai", marquee: true },
    { id: 25, name: "Zakary Foulkes", initials: "ZF", role: "All-Rounder", team: "Chennai", marquee: false },
    // DELHI
    { id: 26, name: "Abishek Porel", initials: "AP", role: "Wicketkeeper", team: "Delhi", marquee: true },
    { id: 27, name: "Ajay Jadav Mandal", initials: "AJ", role: "All-Rounder", team: "Delhi", marquee: false },
    { id: 28, name: "Ashutosh Sharma", initials: "AS", role: "All-Rounder", team: "Delhi", marquee: true },
    { id: 29, name: "Auqib Nabi Dar", initials: "AN", role: "All-Rounder", team: "Delhi", marquee: true },
    { id: 30, name: "Axar Patel", initials: "AP", role: "All-Rounder", team: "Delhi", marquee: true },
    { id: 31, name: "Ben Duckett", initials: "BD", role: "Batsman", team: "Delhi", marquee: false },
    { id: 32, name: "David Miller", initials: "DM", role: "Batsman", team: "Delhi", marquee: true },
    { id: 33, name: "Dushmantha Chameera", initials: "DC", role: "Bowler", team: "Delhi", marquee: true },
    { id: 34, name: "Karun Nair", initials: "KN", role: "Batsman", team: "Delhi", marquee: true },
    { id: 35, name: "KL Rahul", initials: "KR", role: "Wicketkeeper", team: "Delhi", marquee: true },
    { id: 36, name: "Kuldeep Yadav", initials: "KY", role: "Bowler", team: "Delhi", marquee: true },
    { id: 37, name: "Kyle Jamieson", initials: "KJ", role: "Bowler", team: "Delhi", marquee: false },
    { id: 38, name: "Lungi Ngidi", initials: "LN", role: "Bowler", team: "Delhi", marquee: true },
    { id: 39, name: "Madhav Tiwari", initials: "MT", role: "All-Rounder", team: "Delhi", marquee: false },
    { id: 40, name: "Mitchell Starc", initials: "MS", role: "Bowler", team: "Delhi", marquee: true },
    { id: 41, name: "Mukesh Kumar", initials: "MK", role: "Bowler", team: "Delhi", marquee: true },
    { id: 42, name: "Nitish Rana", initials: "NR", role: "Batsman", team: "Delhi", marquee: true },
    { id: 43, name: "Pathum Nissanka", initials: "PN", role: "Batsman", team: "Delhi", marquee: true },
    { id: 44, name: "Sahil Parakh", initials: "SP", role: "Batsman", team: "Delhi", marquee: false },
    { id: 45, name: "Sameer Rizvi", initials: "SR", role: "Batsman", team: "Delhi", marquee: true },
    { id: 46, name: "T Natarajan", initials: "TN", role: "Bowler", team: "Delhi", marquee: true },
    { id: 47, name: "Tripurana Vijay", initials: "TV", role: "All-Rounder", team: "Delhi", marquee: false },
    { id: 48, name: "Tristan Stubbs", initials: "TS", role: "Wicketkeeper", team: "Delhi", marquee: true },
    { id: 49, name: "Vipraj Nigam", initials: "VN", role: "Bowler", team: "Delhi", marquee: true },
    // GUJARAT
    { id: 50, name: "Anuj Rawat", initials: "AR", role: "Wicketkeeper", team: "Gujarat", marquee: false },
    { id: 51, name: "Arshad Khan", initials: "AK", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 52, name: "Ashok Sharma", initials: "AS", role: "Bowler", team: "Gujarat", marquee: true },
    { id: 53, name: "Glenn Phillips", initials: "GP", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 54, name: "Gurnoor Brar", initials: "GB", role: "Bowler", team: "Gujarat", marquee: false },
    { id: 55, name: "Ishant Sharma", initials: "IS", role: "Bowler", team: "Gujarat", marquee: true },
    { id: 56, name: "Jason Holder", initials: "JH", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 57, name: "Jayant Yadav", initials: "JY", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 58, name: "Jos Buttler", initials: "JB", role: "Wicketkeeper", team: "Gujarat", marquee: true },
    { id: 59, name: "Kagiso Rabada", initials: "KR", role: "Bowler", team: "Gujarat", marquee: true },
    { id: 60, name: "Kulwant Khejroliya", initials: "KK", role: "Bowler", team: "Gujarat", marquee: false },
    { id: 61, name: "Kumar Kushagra", initials: "KK", role: "Wicketkeeper", team: "Gujarat", marquee: true },
    { id: 62, name: "Luke Wood", initials: "LW", role: "Bowler", team: "Gujarat", marquee: true },
    { id: 63, name: "Manav Suthar", initials: "MS", role: "Bowler", team: "Gujarat", marquee: false },
    { id: 64, name: "Mohammed Siraj", initials: "MS", role: "Bowler", team: "Gujarat", marquee: true },
    { id: 65, name: "Nishant Sindhu", initials: "NS", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 66, name: "Prasidh Krishna", initials: "PK", role: "Bowler", team: "Gujarat", marquee: true },
    { id: 67, name: "Prithvi Raj Yarra", initials: "PR", role: "Bowler", team: "Gujarat", marquee: false },
    { id: 68, name: "Rahul Tewatia", initials: "RT", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 69, name: "Rashid Khan", initials: "RK", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 70, name: "Ravisrinivasan Sai Kishore", initials: "RS", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 71, name: "Sai Sudharsan", initials: "SS", role: "Batsman", team: "Gujarat", marquee: true },
    { id: 72, name: "Shahrukh Khan", initials: "SK", role: "All-Rounder", team: "Gujarat", marquee: true },
    { id: 73, name: "Shubman Gill", initials: "SG", role: "Batsman", team: "Gujarat", marquee: true },
    { id: 74, name: "Tom Banton", initials: "TB", role: "Wicketkeeper", team: "Gujarat", marquee: true },
    { id: 75, name: "Washington Sundar", initials: "WS", role: "All-Rounder", team: "Gujarat", marquee: true },
    // KOLKATA
    { id: 76, name: "Ajinkya Rahane", initials: "AR", role: "Batsman", team: "Kolkata", marquee: true },
    { id: 77, name: "Akash Deep", initials: "AD", role: "Bowler", team: "Kolkata", marquee: false },
    { id: 78, name: "Angkrish Raghuvanshi", initials: "AR", role: "Batsman", team: "Kolkata", marquee: true },
    { id: 79, name: "Anukul Roy", initials: "AR", role: "All-Rounder", team: "Kolkata", marquee: true },
    { id: 80, name: "Blessing Muzarabani", initials: "BM", role: "Bowler", team: "Kolkata", marquee: true },
    { id: 81, name: "Cameron Green", initials: "CG", role: "All-Rounder", team: "Kolkata", marquee: true },
    { id: 82, name: "Daksh Kamra", initials: "DK", role: "Batsman", team: "Kolkata", marquee: false },
    { id: 83, name: "Finn Allen", initials: "FA", role: "Batsman", team: "Kolkata", marquee: true },
    { id: 84, name: "Harshit Rana", initials: "HR", role: "Bowler", team: "Kolkata", marquee: false },
    { id: 85, name: "Kartik Tyagi", initials: "KT", role: "Bowler", team: "Kolkata", marquee: true },
    { id: 86, name: "Manish Pandey", initials: "MP", role: "Batsman", team: "Kolkata", marquee: true },
    { id: 87, name: "Matheesha Pathirana", initials: "MP", role: "Bowler", team: "Kolkata", marquee: true },
    { id: 88, name: "Navdeep Saini", initials: "NS", role: "Bowler", team: "Kolkata", marquee: false },
    { id: 89, name: "Prashant Solanki", initials: "PS", role: "Bowler", team: "Kolkata", marquee: false },
    { id: 90, name: "Rachin Ravindra", initials: "RR", role: "All-Rounder", team: "Kolkata", marquee: false },
    { id: 91, name: "Rahul Tripathi", initials: "RT", role: "Batsman", team: "Kolkata", marquee: true },
    { id: 92, name: "Ramandeep Singh", initials: "RS", role: "All-Rounder", team: "Kolkata", marquee: true },
    { id: 93, name: "Rinku Singh", initials: "RS", role: "Batsman", team: "Kolkata", marquee: true },
    { id: 94, name: "Rovman Powell", initials: "RP", role: "Batsman", team: "Kolkata", marquee: false },
    { id: 95, name: "Sarthak Ranjan", initials: "SR", role: "Batsman", team: "Kolkata", marquee: false },
    { id: 96, name: "Saurabh Dubey", initials: "SD", role: "Bowler", team: "Kolkata", marquee: false },
    { id: 97, name: "Sunil Narine", initials: "SN", role: "All-Rounder", team: "Kolkata", marquee: true },
    { id: 98, name: "Tejasvi Dahiya", initials: "TD", role: "Wicketkeeper", team: "Kolkata", marquee: true },
    { id: 99, name: "Tim Seifert", initials: "TS", role: "Wicketkeeper", team: "Kolkata", marquee: true },
    { id: 100, name: "Umran Malik", initials: "UM", role: "Bowler", team: "Kolkata", marquee: true },
    { id: 101, name: "Vaibhav Arora", initials: "VA", role: "Bowler", team: "Kolkata", marquee: true },
    { id: 102, name: "Varun Chakaravarthy", initials: "VC", role: "Bowler", team: "Kolkata", marquee: true },
    // LUCKNOW
    { id: 103, name: "Abdul Samad", initials: "AS", role: "All-Rounder", team: "Lucknow", marquee: true },
    { id: 104, name: "Aiden Markram", initials: "AM", role: "Batsman", team: "Lucknow", marquee: true },
    { id: 105, name: "Akash Maharaj Singh", initials: "AM", role: "Bowler", team: "Lucknow", marquee: false },
    { id: 106, name: "Akshat Raghuwanshi", initials: "AR", role: "Batsman", team: "Lucknow", marquee: true },
    { id: 107, name: "Anrich Nortje", initials: "AN", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 108, name: "Arjun Tendulkar", initials: "AT", role: "All-Rounder", team: "Lucknow", marquee: true },
    { id: 109, name: "Arshin Kulkarni", initials: "AK", role: "All-Rounder", team: "Lucknow", marquee: false },
    { id: 110, name: "Avesh Khan", initials: "AK", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 111, name: "Ayush Badoni", initials: "AB", role: "All-Rounder", team: "Lucknow", marquee: true },
    { id: 112, name: "Digvesh Singh Rathi", initials: "DS", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 113, name: "Himmat Singh", initials: "HS", role: "Batsman", team: "Lucknow", marquee: false },
    { id: 114, name: "Josh Inglis", initials: "JI", role: "Wicketkeeper", team: "Lucknow", marquee: true },
    { id: 115, name: "Manimaran Siddharth", initials: "MS", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 116, name: "Matthew Breetzke", initials: "MB", role: "Wicketkeeper", team: "Lucknow", marquee: false },
    { id: 117, name: "Mayank Yadav", initials: "MY", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 118, name: "Mitchell Marsh", initials: "MM", role: "All-Rounder", team: "Lucknow", marquee: true },
    { id: 119, name: "Mohammed Shami", initials: "MS", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 120, name: "Mohsin Khan", initials: "MK", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 121, name: "Mukul Choudhary", initials: "MC", role: "Wicketkeeper", team: "Lucknow", marquee: true },
    { id: 122, name: "Naman Tiwari", initials: "NT", role: "Bowler", team: "Lucknow", marquee: false },
    { id: 123, name: "Nicholas Pooran", initials: "NP", role: "Wicketkeeper", team: "Lucknow", marquee: true },
    { id: 124, name: "Prince Yadav", initials: "PY", role: "Bowler", team: "Lucknow", marquee: true },
    { id: 125, name: "Rishabh Pant", initials: "RP", role: "Wicketkeeper", team: "Lucknow", marquee: true },
    { id: 126, name: "Shahbaz Ahmed", initials: "SA", role: "All-Rounder", team: "Lucknow", marquee: true },
    { id: 127, name: "Wanindu Hasaranga", initials: "WH", role: "All-Rounder", team: "Lucknow", marquee: true },
    // MUMBAI
    { id: 128, name: "AM Ghazanfar", initials: "AG", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 129, name: "Ashwani Kumar", initials: "AK", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 130, name: "Atharva Ankolekar", initials: "AA", role: "All-Rounder", team: "Mumbai", marquee: false },
    { id: 131, name: "Corbin Bosch", initials: "CB", role: "All-Rounder", team: "Mumbai", marquee: true },
    { id: 132, name: "Danish Malewar", initials: "DM", role: "All-Rounder", team: "Mumbai", marquee: false },
    { id: 133, name: "Deepak Chahar", initials: "DC", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 134, name: "Hardik Pandya", initials: "HP", role: "All-Rounder", team: "Mumbai", marquee: true },
    { id: 135, name: "Jasprit Bumrah", initials: "JB", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 136, name: "Mayank Markande", initials: "MM", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 137, name: "Mayank Rawat", initials: "MR", role: "All-Rounder", team: "Mumbai", marquee: false },
    { id: 138, name: "Mitchell Santner", initials: "MS", role: "All-Rounder", team: "Mumbai", marquee: true },
    { id: 139, name: "Mohammed Salahuddin Izhar", initials: "MS", role: "Batsman", team: "Mumbai", marquee: false },
    { id: 140, name: "Naman Dhir", initials: "ND", role: "Batsman", team: "Mumbai", marquee: true },
    { id: 141, name: "Quinton de Kock", initials: "QD", role: "Wicketkeeper", team: "Mumbai", marquee: true },
    { id: 142, name: "Raghu Sharma", initials: "RS", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 143, name: "Raj Bawa", initials: "RB", role: "All-Rounder", team: "Mumbai", marquee: false },
    { id: 144, name: "Robin Minz", initials: "RM", role: "Wicketkeeper", team: "Mumbai", marquee: false },
    { id: 145, name: "Rohit Sharma", initials: "RS", role: "Batsman", team: "Mumbai", marquee: true },
    { id: 146, name: "Ryan Rickelton", initials: "RR", role: "Wicketkeeper", team: "Mumbai", marquee: true },
    { id: 147, name: "Shardul Thakur", initials: "ST", role: "All-Rounder", team: "Mumbai", marquee: true },
    { id: 148, name: "Sherfane Rutherford", initials: "SR", role: "All-Rounder", team: "Mumbai", marquee: true },
    { id: 149, name: "Suryakumar Yadav", initials: "SY", role: "Batsman", team: "Mumbai", marquee: true },
    { id: 150, name: "Tilak Varma", initials: "TV", role: "Batsman", team: "Mumbai", marquee: true },
    { id: 151, name: "Trent Boult", initials: "TB", role: "Bowler", team: "Mumbai", marquee: true },
    { id: 152, name: "Will Jacks", initials: "WJ", role: "All-Rounder", team: "Mumbai", marquee: true },
    // PUNJAB
    { id: 153, name: "Arshdeep Singh", initials: "AS", role: "Bowler", team: "Punjab", marquee: true },
    { id: 154, name: "Azmatullah Omarzai", initials: "AO", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 155, name: "Ben Dwarshuis", initials: "BD", role: "Bowler", team: "Punjab", marquee: true },
    { id: 156, name: "Cooper Connolly", initials: "CC", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 157, name: "Harnoor Singh", initials: "HS", role: "Batsman", team: "Punjab", marquee: false },
    { id: 158, name: "Harpreet Brar", initials: "HB", role: "Bowler", team: "Punjab", marquee: true },
    { id: 159, name: "Lockie Ferguson", initials: "LF", role: "Bowler", team: "Punjab", marquee: true },
    { id: 160, name: "Marco Jansen", initials: "MJ", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 161, name: "Marcus Stoinis", initials: "MS", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 162, name: "Mitchell Owen", initials: "MO", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 163, name: "Musheer Khan", initials: "MK", role: "All-Rounder", team: "Punjab", marquee: false },
    { id: 164, name: "Nehal Wadhera", initials: "NW", role: "Batsman", team: "Punjab", marquee: true },
    { id: 165, name: "Prabhsimran Singh", initials: "PS", role: "Wicketkeeper", team: "Punjab", marquee: true },
    { id: 166, name: "Praveen Dubey", initials: "PD", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 167, name: "Priyansh Arya", initials: "PA", role: "Batsman", team: "Punjab", marquee: true },
    { id: 168, name: "Pyla Avinash", initials: "PA", role: "Batsman", team: "Punjab", marquee: false },
    { id: 169, name: "Shashank Singh", initials: "SS", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 170, name: "Shreyas Iyer", initials: "SI", role: "Batsman", team: "Punjab", marquee: true },
    { id: 171, name: "Suryansh Shedge", initials: "SS", role: "All-Rounder", team: "Punjab", marquee: true },
    { id: 172, name: "Vijaykumar Vyshak", initials: "VV", role: "Bowler", team: "Punjab", marquee: true },
    { id: 173, name: "Vishal Nishad", initials: "VN", role: "All-Rounder", team: "Punjab", marquee: false },
    { id: 174, name: "Vishnu Vinod", initials: "VV", role: "Wicketkeeper", team: "Punjab", marquee: true },
    { id: 175, name: "Xavier Bartlett", initials: "XB", role: "Bowler", team: "Punjab", marquee: true },
    { id: 176, name: "Yash Thakur", initials: "YT", role: "Bowler", team: "Punjab", marquee: true },
    { id: 177, name: "Yuzvendra Chahal", initials: "YC", role: "Bowler", team: "Punjab", marquee: true },
    // BENGALURU
    { id: 178, name: "Abhinandan Singh", initials: "AS", role: "Bowler", team: "Bengaluru", marquee: false },
    { id: 179, name: "Bhuvneshwar Kumar", initials: "BK", role: "Bowler", team: "Bengaluru", marquee: true },
    { id: 180, name: "Devdutt Padikkal", initials: "DP", role: "Batsman", team: "Bengaluru", marquee: true },
    { id: 181, name: "Jacob Bethell", initials: "JB", role: "All-Rounder", team: "Bengaluru", marquee: true },
    { id: 182, name: "Jacob Duffy", initials: "JD", role: "Bowler", team: "Bengaluru", marquee: true },
    { id: 183, name: "Jitesh Sharma", initials: "JS", role: "Wicketkeeper", team: "Bengaluru", marquee: true },
    { id: 184, name: "Jordan Cox", initials: "JC", role: "Wicketkeeper", team: "Bengaluru", marquee: true },
    { id: 185, name: "Josh Hazlewood", initials: "JH", role: "Bowler", team: "Bengaluru", marquee: true },
    { id: 186, name: "Kanishk Chouhan", initials: "KC", role: "Batsman", team: "Bengaluru", marquee: false },
    { id: 187, name: "Krunal Pandya", initials: "KP", role: "All-Rounder", team: "Bengaluru", marquee: true },
    { id: 188, name: "Mangesh Yadav", initials: "MY", role: "All-Rounder", team: "Bengaluru", marquee: true },
    { id: 189, name: "Nuwan Thushara", initials: "NT", role: "Bowler", team: "Bengaluru", marquee: true },
    { id: 190, name: "Philip Salt", initials: "PS", role: "Wicketkeeper", team: "Bengaluru", marquee: true },
    { id: 191, name: "Rajat Patidar", initials: "RP", role: "Batsman", team: "Bengaluru", marquee: true },
    { id: 192, name: "Rasikh Salam Dar", initials: "RS", role: "Bowler", team: "Bengaluru", marquee: true },
    { id: 193, name: "Romario Shepherd", initials: "RS", role: "All-Rounder", team: "Bengaluru", marquee: true },
    { id: 194, name: "Satvik Deswal", initials: "SD", role: "All-Rounder", team: "Bengaluru", marquee: false },
    { id: 195, name: "Suyash Sharma", initials: "SS", role: "Bowler", team: "Bengaluru", marquee: true },
    { id: 196, name: "Swapnil Singh", initials: "SS", role: "All-Rounder", team: "Bengaluru", marquee: false },
    { id: 197, name: "Tim David", initials: "TD", role: "Batsman", team: "Bengaluru", marquee: true },
    { id: 198, name: "Venkatesh Iyer", initials: "VI", role: "All-Rounder", team: "Bengaluru", marquee: true },
    { id: 199, name: "Vicky Ostwal", initials: "VO", role: "Bowler", team: "Bengaluru", marquee: false },
    { id: 200, name: "Vihaan Malhotra", initials: "VM", role: "Batsman", team: "Bengaluru", marquee: false },
    { id: 201, name: "Virat Kohli", initials: "VK", role: "Batsman", team: "Bengaluru", marquee: true },
    { id: 202, name: "Yash Dayal", initials: "YD", role: "Bowler", team: "Bengaluru", marquee: false },
    // RAJASTHAN
    { id: 203, name: "Adam Milne", initials: "AM", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 204, name: "Aman Rao Perala", initials: "AR", role: "Batsman", team: "Rajasthan", marquee: true },
    { id: 205, name: "Brijesh Sharma", initials: "BS", role: "Batsman", team: "Rajasthan", marquee: false },
    { id: 206, name: "Dasun Shanaka", initials: "DS", role: "All-Rounder", team: "Rajasthan", marquee: true },
    { id: 207, name: "Dhruv Jurel", initials: "DJ", role: "Wicketkeeper", team: "Rajasthan", marquee: true },
    { id: 208, name: "Donovan Ferreira", initials: "DF", role: "Wicketkeeper", team: "Rajasthan", marquee: true },
    { id: 209, name: "Jofra Archer", initials: "JA", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 210, name: "Kuldeep Sen", initials: "KS", role: "Bowler", team: "Rajasthan", marquee: false },
    { id: 211, name: "Kwena Maphaka", initials: "KM", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 212, name: "Lhuan-dre Pretorius", initials: "LP", role: "Wicketkeeper", team: "Rajasthan", marquee: true },
    { id: 213, name: "Nandre Burger", initials: "NB", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 214, name: "Ravi Bishnoi", initials: "RB", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 215, name: "Ravi Singh", initials: "RS", role: "Wicketkeeper", team: "Rajasthan", marquee: false },
    { id: 216, name: "Ravindra Jadeja", initials: "RJ", role: "All-Rounder", team: "Rajasthan", marquee: true },
    { id: 217, name: "Riyan Parag", initials: "RP", role: "All-Rounder", team: "Rajasthan", marquee: true },
    { id: 218, name: "Sam Curran", initials: "SC", role: "All-Rounder", team: "Rajasthan", marquee: false },
    { id: 219, name: "Sandeep Sharma", initials: "SS", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 220, name: "Shimron Hetmyer", initials: "SH", role: "Batsman", team: "Rajasthan", marquee: true },
    { id: 221, name: "Shubham Dubey", initials: "SD", role: "Batsman", team: "Rajasthan", marquee: true },
    { id: 222, name: "Sushant Mishra", initials: "SM", role: "Bowler", team: "Rajasthan", marquee: false },
    { id: 223, name: "Tushar Deshpande", initials: "TD", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 224, name: "Vaibhav Sooryavanshi", initials: "VS", role: "Batsman", team: "Rajasthan", marquee: true },
    { id: 225, name: "Vignesh Puthur", initials: "VP", role: "Bowler", team: "Rajasthan", marquee: true },
    { id: 226, name: "Yash Raj Punja", initials: "YR", role: "Batsman", team: "Rajasthan", marquee: false },
    { id: 227, name: "Yashasvi Jaiswal", initials: "YJ", role: "Batsman", team: "Rajasthan", marquee: true },
    { id: 228, name: "Yudhvir Singh Charak", initials: "YS", role: "Bowler", team: "Rajasthan", marquee: true },
    // HYDERABAD
    { id: 229, name: "Abhishek Sharma", initials: "AS", role: "All-Rounder", team: "Hyderabad", marquee: true },
    { id: 230, name: "Amit Kumar", initials: "AK", role: "Batsman", team: "Hyderabad", marquee: false },
    { id: 231, name: "Aniket Verma", initials: "AV", role: "Batsman", team: "Hyderabad", marquee: true },
    { id: 232, name: "Brydon Carse", initials: "BC", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 233, name: "David Payne", initials: "DP", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 234, name: "Eshan Malinga", initials: "EM", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 235, name: "Harsh Dubey", initials: "HD", role: "All-Rounder", team: "Hyderabad", marquee: true },
    { id: 236, name: "Harshal Patel", initials: "HP", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 237, name: "Heinrich Klaasen", initials: "HK", role: "Wicketkeeper", team: "Hyderabad", marquee: true },
    { id: 238, name: "Ishan Kishan", initials: "IK", role: "Wicketkeeper", team: "Hyderabad", marquee: true },
    { id: 239, name: "Jack Edwards", initials: "JE", role: "Batsman", team: "Hyderabad", marquee: false },
    { id: 240, name: "Jaydev Unadkat", initials: "JU", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 241, name: "Kamindu Mendis", initials: "KM", role: "All-Rounder", team: "Hyderabad", marquee: true },
    { id: 242, name: "Krains Fuletra", initials: "KF", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 243, name: "Liam Livingstone", initials: "LL", role: "All-Rounder", team: "Hyderabad", marquee: true },
    { id: 244, name: "Nitish Kumar Reddy", initials: "NK", role: "All-Rounder", team: "Hyderabad", marquee: true },
    { id: 245, name: "Onkar Tukaram Tarmale", initials: "OT", role: "Bowler", team: "Hyderabad", marquee: false },
    { id: 246, name: "Pat Cummins", initials: "PC", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 247, name: "Praful Hinge", initials: "PH", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 248, name: "Sakib Hussain", initials: "SH", role: "Bowler", team: "Hyderabad", marquee: false },
    { id: 249, name: "Salil Arora", initials: "SA", role: "Wicketkeeper", team: "Hyderabad", marquee: true },
    { id: 250, name: "Shivam Mavi", initials: "SM", role: "Bowler", team: "Hyderabad", marquee: true },
    { id: 251, name: "Shivang Kumar", initials: "SK", role: "All-Rounder", team: "Hyderabad", marquee: true },
    { id: 252, name: "Smaran Ravichandran", initials: "SR", role: "Batsman", team: "Hyderabad", marquee: true },
    { id: 253, name: "Travis Head", initials: "TH", role: "Batsman", team: "Hyderabad", marquee: true },
    { id: 254, name: "Zeeshan Ansari", initials: "ZA", role: "Bowler", team: "Hyderabad", marquee: true },
];

const TEAMS = ["All", "Chennai", "Mumbai", "Bengaluru", "Kolkata", "Delhi", "Punjab", "Rajasthan", "Hyderabad", "Gujarat", "Lucknow"];
const ROLES = ["All", "Batsman", "Bowler", "All-Rounder", "Wicketkeeper"];

const TEAM_META = {
    Chennai: { color: "#f9ca24", accent: "#e55039", short: "CSK", bg: "rgba(249,202,36,0.08)" },
    Mumbai: { color: "#4a90d9", accent: "#1abc9c", short: "MI", bg: "rgba(74,144,217,0.08)" },
    Bengaluru: { color: "#e74c3c", accent: "#f39c12", short: "RCB", bg: "rgba(231,76,60,0.08)" },
    Kolkata: { color: "#8e44ad", accent: "#f1c40f", short: "KKR", bg: "rgba(142,68,173,0.08)" },
    Delhi: { color: "#2980b9", accent: "#e74c3c", short: "DC", bg: "rgba(41,128,185,0.08)" },
    Punjab: { color: "#e74c3c", accent: "#c0392b", short: "PBKS", bg: "rgba(231,76,60,0.08)" },
    Rajasthan: { color: "#e91e8c", accent: "#2196f3", short: "RR", bg: "rgba(233,30,140,0.08)" },
    Hyderabad: { color: "#ff6600", accent: "#cc0000", short: "SRH", bg: "rgba(255,102,0,0.08)" },
    Gujarat: { color: "#2ecc71", accent: "#1a237e", short: "GT", bg: "rgba(46,204,113,0.08)" },
    Lucknow: { color: "#00bcd4", accent: "#004d40", short: "LSG", bg: "rgba(0,188,212,0.08)" },
};

const ROLE_STYLE = {
    Batsman: { bg: "rgba(59,130,246,0.15)", text: "#60a5fa", border: "rgba(59,130,246,0.3)" },
    Bowler: { bg: "rgba(249,115,22,0.15)", text: "#fb923c", border: "rgba(249,115,22,0.3)" },
    "All-Rounder": { bg: "rgba(34,197,94,0.15)", text: "#4ade80", border: "rgba(34,197,94,0.3)" },
    Wicketkeeper: { bg: "rgba(168,85,247,0.15)", text: "#c084fc", border: "rgba(168,85,247,0.3)" },
};

export default function IPLAuctionPlayerList() {
    const [search, setSearch] = useState("");
    const [teamFilter, setTeamFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");

    const filtered = useMemo(() => {
        return ALL_PLAYERS.filter(p => {
            const s = search.toLowerCase();
            const matchSearch = !s || p.name.toLowerCase().includes(s) || p.team.toLowerCase().includes(s);
            const matchTeam = teamFilter === "All" || p.team === teamFilter;
            const matchRole = roleFilter === "All" || p.role === roleFilter;
            return matchSearch && matchTeam && matchRole;
        });
    }, [search, teamFilter, roleFilter]);

    const marqueeCount = ALL_PLAYERS.filter(p => p.marquee).length;

    return (
        <div className="min-h-screen bg-background text-on-surface font-body">
            {/* Sidebar */}
            <aside className="hidden md:flex flex-col h-screen p-4 bg-[#131313] w-64 left-0 fixed shadow-2xl font-headline text-sm z-40">
                <div className="mb-10 px-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>bolt</span>
                        </div>
                        <div>
                            <h1 className="text-primary font-black uppercase tracking-widest text-lg">Auction Room</h1>
                            <p className="text-on-surface-variant text-[10px] uppercase tracking-tighter">High-Performance Trading</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 space-y-1">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all">
                        <span className="material-symbols-outlined">home</span>
                        <span className="font-bold">Home</span>
                    </Link>
                    <Link to="/lobby" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-[#262626] hover:text-white rounded-lg transition-all">
                        <span className="material-symbols-outlined">gavel</span>
                        <span>Live Auctions</span>
                    </Link>
                    <Link to="/players" className="flex items-center gap-3 px-4 py-3 text-primary bg-[#262626] rounded-lg transition-all">
                        <span className="material-symbols-outlined">groups</span>
                        <span>Player Pool</span>
                    </Link>
                </nav>
            </aside>

            {/* Header */}
            <header className="md:ml-64 sticky top-0 z-30 bg-[#131313] border-b border-surface-container-highest">
                <div className="flex justify-between items-center px-6 h-16">
                    <h1 className="text-xl font-headline font-black text-primary">Player Pool</h1>
                    <Link to="/lobby" className="flex items-center gap-2 px-4 py-2 bg-surface-container-low hover:bg-surface-container-highest rounded-xl border border-outline-variant/10 text-on-surface-variant hover:text-white transition-all text-xs font-bold uppercase tracking-widest">
                        <span className="material-symbols-outlined text-sm">arrow_back</span>
                        Back to Lobby
                    </Link>
                </div>
            </header>

            <main className="md:ml-64 pb-16">
                {/* Hero */}
                <div className="bg-surface-container-low border-b border-outline-variant/5 px-6 py-10 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-20%,rgba(255,159,74,0.1),transparent_70%)] pointer-events-none"></div>
                    <span className="inline-block bg-primary/10 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[3px] px-4 py-1.5 rounded-full mb-4">
                        🏏 IPL 2026 Mega Auction
                    </span>
                    <h2 className="text-6xl font-headline font-black text-on-surface mb-2">Player Pool</h2>
                    <p className="text-on-surface-variant text-xs uppercase tracking-[4px] font-medium">All {ALL_PLAYERS.length} registered players</p>
                    <div className="flex justify-center gap-8 mt-8 flex-wrap">
                        {[
                            { num: ALL_PLAYERS.length, label: "Total Players" },
                            { num: marqueeCount, label: "Marquee" },
                            { num: 10, label: "Teams" },
                            { num: "₹25L", label: "Base Price" },
                        ].map(s => (
                            <div key={s.label} className="text-center">
                                <div className="text-3xl font-headline font-black text-primary">{s.num}</div>
                                <div className="text-[10px] text-on-surface-variant uppercase tracking-[2px] mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div className="max-w-7xl mx-auto px-6 mt-8 space-y-3">
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant text-lg">search</span>
                        <input
                            className="w-full bg-surface-container-low border border-outline-variant/20 focus:border-primary/50 text-on-surface pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all placeholder:text-on-surface-variant/50 font-body"
                            placeholder="Search player or team..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {ROLES.map(r => (
                            <button
                                key={r}
                                onClick={() => setRoleFilter(r)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wide transition-all ${roleFilter === r ? 'bg-primary border-primary text-on-primary' : 'bg-surface-container-low border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-primary/30'}`}
                            >
                                {r}
                            </button>
                        ))}
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {TEAMS.map(t => {
                            const meta = TEAM_META[t];
                            const isActive = teamFilter === t;
                            return (
                                <button
                                    key={t}
                                    onClick={() => setTeamFilter(t)}
                                    className="flex-shrink-0 px-4 py-2 rounded-full border text-xs font-bold uppercase tracking-wide transition-all"
                                    style={isActive && meta
                                        ? { background: meta.color, borderColor: meta.color, color: '#fff' }
                                        : { background: 'var(--color-surface-container-low)', borderColor: 'rgba(255,255,255,0.08)', color: 'var(--color-on-surface-variant)' }
                                    }
                                >
                                    {t === "All" ? "All Teams" : (meta?.short || t)}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 mt-4 text-[11px] text-on-surface-variant uppercase tracking-widest font-medium">
                    {filtered.length} of {ALL_PLAYERS.length} players
                </div>

                {/* Grid */}
                <div className="max-w-7xl mx-auto px-6 mt-4">
                    {filtered.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                            {filtered.map(player => {
                                const tm = TEAM_META[player.team] || {};
                                const rs = ROLE_STYLE[player.role] || {};
                                return (
                                    <div
                                        key={player.id}
                                        className="bg-surface-container-low rounded-2xl p-4 border border-outline-variant/5 hover:-translate-y-0.5 transition-all cursor-default group"
                                        style={{ '--team-color': tm.color || '#ff9f4a' }}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.borderColor = tm.color ? `${tm.color}55` : 'rgba(255,159,74,0.3)';
                                            e.currentTarget.style.boxShadow = `0 8px 24px ${tm.color ? `${tm.color}18` : 'rgba(255,159,74,0.1)'}`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.borderColor = '';
                                            e.currentTarget.style.boxShadow = '';
                                        }}
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <div
                                                className="w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black"
                                                style={{ background: tm.bg || 'rgba(255,159,74,0.1)', color: tm.color || '#ff9f4a' }}
                                            >
                                                {player.initials}
                                            </div>
                                            {player.marquee && (
                                                <span className="text-[9px] font-black uppercase tracking-wide bg-primary/10 border border-primary/25 text-primary px-2 py-0.5 rounded-full">★</span>
                                            )}
                                        </div>
                                        <p className="font-bold text-sm text-on-surface leading-tight mb-3 group-hover:text-primary transition-colors">{player.name}</p>
                                        <div className="flex items-center justify-between">
                                            <span
                                                className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border"
                                                style={{ background: rs.bg, color: rs.text, borderColor: rs.border }}
                                            >
                                                {player.role}
                                            </span>
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-2 h-2 rounded-full" style={{ background: tm.color || '#ff9f4a' }} />
                                                <span className="text-[10px] text-on-surface-variant font-semibold">{tm.short || player.team}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant">
                            <span className="text-5xl mb-4">🏏</span>
                            <h3 className="text-2xl font-headline font-black mb-2">No Players Found</h3>
                            <p className="text-sm">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}