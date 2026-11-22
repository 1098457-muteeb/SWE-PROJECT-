/* demo users*/
const defaultUsers = [
  { id: 1, name: "Sara Student",  email: "student@demo.com",  pass: "1234",     role: "learner",  level: "Easy", isActive: true, mistakes: 0, phishCorrect: 0 },
  { id: 2, name: "Adam Admin",    email: "admin@demo.com",    pass: "admin",    role: "admin",    level: "Easy", isActive: true, mistakes: 0, phishCorrect: 0 },
  { id: 3, name: "Carla Content", email: "content@demo.com",  pass: "content",  role: "content",  level: "Easy", isActive: true, mistakes: 0, phishCorrect: 0 },
  { id: 4, name: "Sam Security",  email: "security@demo.com", pass: "security", role: "security", level: "Easy", isActive: true, mistakes: 0, phishCorrect: 0 }
];

/* 
   PHISHING SCENARIOS (the emails, English + Arabic)
 */

const defaultScenarios = [
  // ---------- EASY ----------
  { id: 1, level: "Easy", category: "credential", isPhishing: true,
    sender: "security@emirat3snbd-verify.com",
    titleEn: "URGENT: Your bank account will be blocked!",
    titleAr: "عاجل: سيتم إيقاف حسابك البنكي!",
    bodyEn: "Dear customer, we detected unusual activity on your Emirates NBD account. Click http://emirat3snbd-verify.com/login and enter your password and card PIN within 24 hours or your account will be blocked.",
    bodyAr: "عزيزي العميل، لقد اكتشفنا نشاطاً غير معتاد على حسابك في بنك الإمارات دبي الوطني. اضغط على الرابط http://emirat3snbd-verify.com/login وأدخل كلمة المرور والرقم السري لبطاقتك خلال 24 ساعة وإلا سيتم إيقاف حسابك.",
    reasonEn: "The domain is misspelled (emirat3snbd with the number 3), the message pressures you with a deadline, and no UAE bank will ask for your password or card PIN through an email link.",
    reasonAr: "النطاق مكتوب بشكل خاطئ (emirat3snbd برقم 3)، والرسالة تضغط عليك بمهلة زمنية، ولا يطلب أي بنك في الإمارات كلمة المرور أو الرقم السري للبطاقة عبر رابط في رسالة." },

  { id: 2, level: "Easy", category: "prize", isPhishing: true,
    sender: "winner@dubai-gold-draw.net",
    titleEn: "Congratulations! You won 1 kg of gold",
    titleAr: "مبروك! لقد ربحت كيلوغراماً من الذهب",
    bodyEn: "You were selected as our lucky winner in the Dubai shopping draw! Pay a small AED 150 delivery fee at http://gold-winner-uae.biz to claim your prize.",
    bodyAr: "تم اختيارك كفائز محظوظ في سحب التسوق في دبي! ادفع رسوم توصيل بسيطة قدرها 150 درهماً عبر الرابط http://gold-winner-uae.biz لاستلام جائزتك.",
    reasonEn: "You cannot win a draw you never entered, the message asks for money to release a prize, and the domain looks suspicious.",
    reasonAr: "لا يمكنك الفوز بسحب لم تشارك فيه، والرسالة تطلب مالاً مقابل الجائزة، والنطاق مشبوه." },

  { id: 3, level: "Easy", category: "legit", isPhishing: false,
    sender: "hr@company.ae",
    titleEn: "National Day holiday schedule",
    titleAr: "جدول إجازة اليوم الوطني",
    bodyEn: "Hi team, a reminder that the office will be closed on 2 and 3 December for UAE National Day. Normal working hours resume on 4 December. No action is needed. Thanks, HR Team.",
    bodyAr: "مرحباً فريق، تذكير بأن المكتب سيكون مغلقاً يومي 2 و3 ديسمبر بمناسبة اليوم الوطني لدولة الإمارات. يعود الدوام الرسمي يوم 4 ديسمبر. لا حاجة لأي إجراء. شكراً، فريق الموارد البشرية.",
    reasonEn: "The sender is internal, the message is routine, and there are no links or requests for personal information.",
    reasonAr: "المرسل داخلي، والرسالة عادية، ولا توجد روابط أو طلب لمعلومات شخصية." },

  { id: 4, level: "Easy", category: "invoice", isPhishing: true,
    sender: "billing@du-bill-center.xyz",
    titleEn: "Your du bill is overdue – open now",
    titleAr: "فاتورة du متأخرة – افتحها الآن",
    bodyEn: "Your bill #88231 for AED 1,899 is overdue. Open the attached file BILL.exe immediately to avoid disconnection of your services.",
    bodyAr: "فاتورتك رقم 88231 بمبلغ 1,899 درهماً متأخرة السداد. افتح الملف المرفق BILL.exe فوراً لتجنب فصل خدماتك.",
    reasonEn: "An .exe attachment is dangerous, the sender domain is not the official du website, and you were not expecting this bill. Real bills are viewed in the official app or website.",
    reasonAr: "الملف التنفيذي (.exe) خطير، ونطاق المرسل ليس الموقع الرسمي لـ du، والفاتورة غير متوقعة. الفواتير الحقيقية تُعرض في التطبيق أو الموقع الرسمي." },

  { id: 5, level: "Easy", category: "impersonation", isPhishing: true,
    sender: "fines@adpolice-payments.top",
    titleEn: "Police: unpaid traffic fine",
    titleAr: "الشرطة: مخالفة مرورية غير مسددة",
    bodyEn: "You have an unpaid traffic fine of AED 1,000. Pay within 24 hours at http://adpolice-fines.top or your vehicle will be impounded.",
    bodyAr: "لديك مخالفة مرورية غير مسددة بقيمة 1,000 درهم. ادفع خلال 24 ساعة عبر الرابط http://adpolice-fines.top وإلا سيتم حجز مركبتك.",
    reasonEn: "The sender pretends to be the police but uses an unofficial .top domain, threatens you with a deadline, and sends a payment link. Check fines only through the official police website or app that you open yourself.",
    reasonAr: "المرسل يتظاهر بأنه الشرطة لكنه يستخدم نطاق .top غير رسمي، ويهددك بمهلة زمنية، ويرسل رابط دفع. تحقق من المخالفات فقط عبر موقع أو تطبيق الشرطة الرسمي الذي تفتحه بنفسك." },

  { id: 6, level: "Easy", category: "legit", isPhishing: false,
    sender: "no-reply@dewa.gov.ae",
    titleEn: "Your DEWA bill is ready",
    titleAr: "فاتورة هيئة كهرباء ومياه دبي جاهزة",
    bodyEn: "Your latest DEWA bill is ready. You can view and pay it in the official DEWA app or on dewa.gov.ae. If you already use auto-pay, no action is needed.",
    bodyAr: "فاتورتك الأخيرة من هيئة كهرباء ومياه دبي جاهزة. يمكنك عرضها وسدادها عبر تطبيق ديوا الرسمي أو موقع dewa.gov.ae. إذا كنت تستخدم الدفع التلقائي فلا حاجة لأي إجراء.",
    reasonEn: "The sender domain is the real DEWA domain, the message is informational, and it sends you to the official app or website instead of a link.",
    reasonAr: "نطاق المرسل هو نطاق هيئة كهرباء ومياه دبي الحقيقي، والرسالة للإعلام فقط، وتوجهك إلى التطبيق أو الموقع الرسمي بدلاً من رابط." },

  // ---------- MEDIUM ----------
  { id: 7, level: "Medium", category: "impersonation", isPhishing: true,
    sender: "it-helpdesk@company-ae-support.com",
    titleEn: "Password expires today",
    titleAr: "كلمة المرور تنتهي اليوم",
    bodyEn: "Hello, our IT team in the Dubai office is upgrading the system. Please confirm your login at https://company-sso-login.com to keep access to your mailbox.",
    bodyAr: "مرحباً، يقوم فريق تقنية المعلومات في مكتب دبي بترقية النظام. يرجى تأكيد تسجيل دخولك عبر https://company-sso-login.com للحفاظ على وصولك إلى بريدك.",
    reasonEn: "The domain is external and not your company's (company.ae). IT will not ask you to log in through an email link, and the message rushes you.",
    reasonAr: "النطاق خارجي وليس نطاق شركتك (company.ae)، وقسم تقنية المعلومات لا يطلب تسجيل الدخول عبر رابط في رسالة، والرسالة تستعجلك." },

  { id: 8, level: "Medium", category: "legit", isPhishing: false,
    sender: "no-reply@emirates.com",
    titleEn: "Booking confirmed: Dubai to London",
    titleAr: "تأكيد الحجز: دبي إلى لندن",
    bodyEn: "Thank you for choosing Emirates. Your booking from Dubai (DXB) to London (LHR) is confirmed. To view or manage your trip, visit emirates.com and open Manage a booking. We never ask for your password or card details by email.",
    bodyAr: "شكراً لاختيارك طيران الإمارات. تم تأكيد حجزك من دبي (DXB) إلى لندن (LHR). لعرض رحلتك أو إدارتها، زر موقع emirates.com وافتح صفحة إدارة الحجز. نحن لا نطلب كلمة المرور أو بيانات البطاقة عبر البريد الإلكتروني.",
    reasonEn: "The sender domain is real, the message is informational, there is no urgency, and you are told to open the official site yourself.",
    reasonAr: "نطاق المرسل حقيقي، والرسالة للإعلام فقط، ولا يوجد استعجال، وتطلب منك فتح الموقع الرسمي بنفسك." },

  { id: 9, level: "Medium", category: "invoice", isPhishing: true,
    sender: "accounts@gulf-supplier-payments.com",
    titleEn: "Updated bank details for payment",
    titleAr: "تحديث بيانات الحساب البنكي للدفع",
    bodyEn: "Dear finance team, our bank account has changed. Please send all future payments, including 5% VAT, to the new IBAN AE07 0331 2345 6789 0123 456. Regards, Accounts.",
    bodyAr: "عزيزي فريق المالية، تم تغيير حسابنا البنكي. يرجى إرسال جميع الدفعات القادمة، شاملة ضريبة القيمة المضافة 5%، إلى رقم الآيبان الجديد AE07 0331 2345 6789 0123 456. مع التحية، قسم الحسابات.",
    reasonEn: "Changing bank details by email is a classic fraud. Always confirm by calling a phone number you already trust.",
    reasonAr: "طلب تغيير البيانات البنكية عبر البريد أسلوب احتيال شائع. تحقق دائماً عبر الاتصال برقم هاتف تثق به مسبقاً." },

  { id: 10, level: "Medium", category: "prize", isPhishing: true,
    sender: "tracking@aramex-delivery-update.info",
    titleEn: "Your parcel is on hold",
    titleAr: "شحنتك معلّقة",
    bodyEn: "We could not deliver your parcel in Dubai. Pay a customs fee of 12 AED at http://aramex-parcel-fee.info to reschedule delivery.",
    bodyAr: "لم نتمكن من تسليم شحنتك في دبي. ادفع رسوماً جمركية قدرها 12 درهماً عبر الرابط http://aramex-parcel-fee.info لإعادة جدولة التسليم.",
    reasonEn: "The domain is not the official Aramex site, the fee is unexpected, and the message pushes you to a link instead of the official app.",
    reasonAr: "النطاق ليس الموقع الرسمي لـ أرامكس، والرسوم غير متوقعة، والرسالة تدفعك إلى رابط بدلاً من التطبيق الرسمي." },

  { id: 11, level: "Medium", category: "credential", isPhishing: true,
    sender: "support@uaepass-verify.com",
    titleEn: "Verify your UAE PASS account",
    titleAr: "تحقق من حسابك في UAE PASS",
    bodyEn: "Your UAE PASS account will be suspended today. Confirm your Emirates ID number and password at https://uaepass-verify.com to keep access to government services.",
    bodyAr: "سيتم تعليق حسابك في UAE PASS اليوم. أكد رقم هويتك الإماراتية وكلمة المرور عبر https://uaepass-verify.com للحفاظ على وصولك إلى الخدمات الحكومية.",
    reasonEn: "The domain is not the official UAE PASS site, the message threatens suspension to rush you, and it asks for your Emirates ID number and password through a link.",
    reasonAr: "النطاق ليس موقع UAE PASS الرسمي، والرسالة تهدد بتعليق الحساب لتستعجلك، وتطلب رقم هويتك الإماراتية وكلمة المرور عبر رابط." },

  { id: 12, level: "Medium", category: "legit", isPhishing: false,
    sender: "receipts@careem.com",
    titleEn: "Your Careem ride receipt",
    titleAr: "إيصال رحلتك مع كريم",
    bodyEn: "Thanks for riding with Careem. Your trip from Dubai Marina to DIFC cost AED 38.50, paid with the card saved in your app. You can see the full receipt in the Careem app. No action is needed.",
    bodyAr: "شكراً لاستخدامك كريم. بلغت تكلفة رحلتك من مرسى دبي إلى مركز دبي المالي العالمي 38.50 درهماً، وتم الدفع بالبطاقة المحفوظة في تطبيقك. يمكنك الاطلاع على الإيصال الكامل في تطبيق كريم. لا حاجة لأي إجراء.",
    reasonEn: "The sender domain is real, it only confirms something you did, it shows no link, and it asks for no password or payment.",
    reasonAr: "نطاق المرسل حقيقي، والرسالة تؤكد أمراً قمت به فقط، ولا تحتوي على رابط، ولا تطلب كلمة مرور أو دفعاً." },

  // ---------- HARD ----------
  { id: 13, level: "Hard", category: "impersonation", isPhishing: true,
    sender: "ceo@cornpany.ae",
    titleEn: "Quick favour – confidential",
    titleAr: "خدمة سريعة – سري",
    bodyEn: "Hi, I'm in a meeting and can't talk. I need you to buy 5 gift cards of 200 AED for a client and send me the codes today. I'll reimburse you. Please keep this between us.",
    bodyAr: "مرحباً، أنا في اجتماع ولا أستطيع الاتصال. أحتاج منك شراء 5 بطاقات هدايا بقيمة 200 درهم لأحد العملاء وإرسال الرموز لي اليوم. سأعوّض لك المبلغ. أرجو أن يبقى هذا بيننا.",
    reasonEn: "The domain 'cornpany' uses 'rn' instead of 'm'. The request is unusual, asks for secrecy and speed, and gift cards are a common fraud method.",
    reasonAr: "النطاق cornpany يستخدم الحرفين rn بدلاً من m، والطلب غير معتاد، ويطلب السرية والسرعة، وبطاقات الهدايا وسيلة احتيال شائعة." },

  { id: 14, level: "Hard", category: "legit", isPhishing: false,
    sender: "payroll@company.ae",
    titleEn: "Salary slip available",
    titleAr: "كشف الراتب متاح",
    bodyEn: "Your latest salary slip is now available. Your salary was transferred through the Wage Protection System (WPS). Please log in to the HR portal you normally use (bookmarked on the intranet) to download the slip. Contact HR if you have questions.",
    bodyAr: "كشف راتبك الأخير متاح الآن. تم تحويل راتبك عبر نظام حماية الأجور. يرجى تسجيل الدخول إلى بوابة الموارد البشرية التي تستخدمها عادة (المحفوظة في الشبكة الداخلية) لتنزيل الكشف. تواصل مع الموارد البشرية إذا كان لديك أي استفسار.",
    reasonEn: "The sender domain matches your company, there is no link, and it tells you to use the portal you already know.",
    reasonAr: "نطاق المرسل مطابق لنطاق شركتك، ولا توجد روابط، وتطلب منك استخدام البوابة التي تعرفها مسبقاً." },

  { id: 15, level: "Hard", category: "credential", isPhishing: true,
    sender: "sharepoint@microsoft365.secure-docs.net",
    titleEn: "Shared document: 2027 Budget.xlsx",
    titleAr: "مستند مشارك: 2027 Budget.xlsx",
    bodyEn: "Fatima shared a document with you. View it here: https://secure-docs.net/microsoft365/view?id=4421 . Sign in with your work email to open it.",
    bodyAr: "شاركت فاطمة مستنداً معك. اعرضه من هنا: https://secure-docs.net/microsoft365/view?id=4421 . سجّل الدخول ببريدك الوظيفي لفتحه.",
    reasonEn: "The real domain is secure-docs.net. The Microsoft name is only a prefix. The share was unexpected and asks you to sign in through a link.",
    reasonAr: "النطاق الحقيقي هو secure-docs.net واسم مايكروسوفت مجرد جزء في بدايته. والمشاركة غير متوقعة وتطلب منك تسجيل الدخول عبر رابط." },

  { id: 16, level: "Hard", category: "legit", isPhishing: false,
    sender: "no-reply@uaepass.ae",
    titleEn: "Security alert: new sign-in to UAE PASS",
    titleAr: "تنبيه أمني: تسجيل دخول جديد إلى UAE PASS",
    bodyEn: "We noticed a sign-in to your UAE PASS account on a new device. If this was you, no action is needed. If not, open the UAE PASS app yourself and review your account activity.",
    bodyAr: "لاحظنا تسجيل دخول إلى حسابك في UAE PASS من جهاز جديد. إذا كنت أنت، فلا حاجة لأي إجراء. وإن لم تكن أنت، فافتح تطبيق UAE PASS بنفسك وراجع نشاط حسابك.",
    reasonEn: "The sender domain is real, the message is informational, it contains no link and does not ask for your password, and it tells you to open the official app yourself.",
    reasonAr: "نطاق المرسل حقيقي، والرسالة للإعلام فقط ولا تحتوي على رابط ولا تطلب كلمة المرور، وتطلب منك فتح التطبيق الرسمي بنفسك." },

  { id: 17, level: "Hard", category: "invoice", isPhishing: true,
    sender: "accounts@gulfstar-trading.co",
    titleEn: "Tax invoice – payment due in 3 days",
    titleAr: "فاتورة ضريبية – الدفع مستحق خلال 3 أيام",
    bodyEn: "Dear accounts team, please find the attached tax invoice (5% VAT) for last month's order. To view it, open Invoice_4471.xlsm and click Enable Content. Please pay within 3 days to avoid a late fee.",
    bodyAr: "عزيزي فريق الحسابات، تجدون مرفقاً الفاتورة الضريبية (ضريبة القيمة المضافة 5%) لطلب الشهر الماضي. لعرضها افتح الملف Invoice_4471.xlsm واضغط على تمكين المحتوى. يرجى السداد خلال 3 أيام لتجنب غرامة التأخير.",
    reasonEn: "You were not expecting this invoice, the sender is a company you have never dealt with, and the file asks you to Enable Content (macros), which is a common way to run malware. The late-fee deadline adds pressure.",
    reasonAr: "الفاتورة غير متوقعة، والمرسل شركة لم تتعامل معها من قبل، والملف يطلب منك تمكين المحتوى (الماكرو) وهي طريقة شائعة لتشغيل البرمجيات الخبيثة. كما أن مهلة غرامة التأخير تزيد الضغط عليك." },

  { id: 18, level: "Hard", category: "prize", isPhishing: true,
    sender: "claims.office.dubai@gmail.com",
    titleEn: "Raffle confirmation: your winning ticket",
    titleAr: "تأكيد السحب: تذكرتك الفائزة",
    bodyEn: "Thank you for shopping with us during the festival. Your receipt was drawn as a winner of AED 50,000. To release the prize, please transfer a refundable AED 450 verification fee to the bank details in the attached form within 48 hours.",
    bodyAr: "شكراً لتسوقك معنا خلال المهرجان. تم سحب إيصالك كفائز بمبلغ 50,000 درهم. لصرف الجائزة، يرجى تحويل رسوم تحقق قابلة للاسترداد قدرها 450 درهماً إلى البيانات البنكية الموجودة في النموذج المرفق خلال 48 ساعة.",
    reasonEn: "Real prize draws never ask winners to pay a fee first, even a refundable one. The sender uses a free Gmail address instead of an official company domain, and the 48-hour deadline adds pressure.",
    reasonAr: "السحوبات الحقيقية لا تطلب من الفائزين دفع رسوم أولاً، حتى لو كانت قابلة للاسترداد. والمرسل يستخدم عنوان Gmail مجانياً بدلاً من نطاق شركة رسمي، ومهلة 48 ساعة تزيد الضغط." }
];

/* 
   LISTS AND LOOKUPS
 */

const levelOrder = ["Easy", "Medium", "Hard"];
const roleKeys = { learner: "roleLearner", admin: "roleAdmin", content: "roleContent", security: "roleSecurity" };
const homePage = { learner: "inbox.html", admin: "admin.html", content: "admin.html", security: "dashboard.html" };
const pageRoles = { inbox: ["learner"], admin: ["admin", "content"], dashboard: ["security", "admin"] };

const levelNames = {
  Easy:   { en: "Easy",   ar: "سهل" },
  Medium: { en: "Medium", ar: "متوسط" },
  Hard:   { en: "Hard",   ar: "صعب" }
};

const catNames = {
  credential:    { en: "Credential theft",   ar: "سرقة بيانات الدخول" },
  invoice:       { en: "Fake invoice",       ar: "فاتورة مزيفة" },
  prize:         { en: "Prize / fee scam",   ar: "احتيال الجوائز والرسوم" },
  impersonation: { en: "Impersonation",      ar: "انتحال الشخصية" },
  legit:         { en: "Legitimate emails",  ar: "رسائل سليمة" }
};

/* 
   INTERFACE TEXT (English + Arabic)
 */

const T = {
  en: {
    appTitle: "Adaptive Phishing Training System", email: "Email", password: "Password", loginBtn: "Log in",
    loginError: "Wrong email or password.", demoAccounts: "Demo accounts", roleLearner: "Student / Employee",
    roleAdmin: "Admin", roleContent: "Content Manager", roleSecurity: "Security Manager", logout: "Logout",
    level: "Level", score: "Score", flagPhish: "Flag as Phishing", flagLegit: "Flag as Legitimate",
    correct: "Correct!", incorrect: "Not quite.", wasPhish: "This email was phishing.",
    wasLegit: "This email was legitimate.", nextEmail: "Next Email", askSender: "Why look at the sender?",
    askLink: "What about links?", selectEmail: "Select an email to begin",
    allDone: "You finished every email at this level", allDoneBody: "Pick any email from the list to practise again.",
    from: "From", levelUp: "Great work! Your level is now:", levelDown: "Let's slow down. Your level is now:",
    levelProgress: "Phishing emails flagged correctly:",
    tipSenderPhish: "Look closely at the sender address. Here it does not match a trusted organisation (misspelled, unusual or external domain).",
    tipSenderLegit: "The sender address matches the organisation it claims to be from.",
    tipLinkPhish: "Be careful with links, attachments and urgent requests. Check the real address of any link, or open the official site yourself and verify through a channel you already trust.",
    tipLinkLegit: "Nothing risky here: no pressure, no request for a password, and no suspicious link or attachment.",
    manageUsers: "Manage users", name: "Name", role: "Role", addUser: "Add a user", addUserBtn: "Add user",
    userAdded: "User added.", userExists: "Fill in every field with a new email address.", delete: "Delete",
    confirmDelete: "Delete this item?", addScenario: "Add a scenario", addScenarioBtn: "Add scenario",
    category: "Category", type: "Type", typePhish: "Phishing", typeLegit: "Legitimate", sender: "Sender address",
    subject: "Subject", scenarioAdded: "Scenario added.", scenarioError: "Please fill in every field.",
    allScenarios: "All scenarios", dashTitle: "Security dashboard", totalAttempts: "Total attempts",
    correctRate: "Correct rate", weakestTopic: "Weakest topic", accuracyByCategory: "Accuracy by phishing category",
    demoData: "Load demo data", resetData: "Reset all results", noData: "No attempts yet", avgTime: "avg", sec: "s",
    attemptsWord: "attempts", confirmReset: "Delete all saved results?", newUserLink: "New user? Create an account",
    registerTitle: "Create an account", fullName: "Full name", registerBtn: "Register",
    haveAccount: "Already have an account? Log in", regEmpty: "Please fill in every field.",
    regBadEmail: "Please enter a valid email address.", regDuplicate: "This email is already registered.",
    myHistory: "My History", historyEmpty: "No results yet. Flag an email to start.", colWhen: "Date",
    colEmail: "Email", colResult: "Result", colTime: "Time", ok: "Correct", wrong: "Incorrect",
    recTag: "Recommended", recNote: "Focus area based on your results:", avgTimeFull: "Average time",
    status: "Status", active: "Active", deactivated: "Deactivated", edit: "Edit", cancel: "Cancel",
    saveChanges: "Save changes", scenarioUpdated: "Scenario updated.", exportPdf: "Print / Save as PDF",
    exportCsv: "Download CSV", total: "Total"
  },
  ar: {
    appTitle: "نظام التدريب التكيفي على التصيّد", email: "البريد الإلكتروني", password: "كلمة المرور",
    loginBtn: "تسجيل الدخول", loginError: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    demoAccounts: "حسابات تجريبية", roleLearner: "طالب / موظف", roleAdmin: "مدير النظام", roleContent: "مدير المحتوى",
    roleSecurity: "مدير الأمن", logout: "تسجيل الخروج", level: "المستوى", score: "النتيجة", flagPhish: "تصنيف كتصيّد",
    flagLegit: "تصنيف كسليمة", correct: "إجابة صحيحة!", incorrect: "إجابة غير صحيحة.",
    wasPhish: "هذه الرسالة كانت رسالة تصيّد.", wasLegit: "هذه الرسالة كانت سليمة.", nextEmail: "الرسالة التالية",
    askSender: "لماذا ننظر إلى المرسل؟", askLink: "ماذا عن الروابط؟", selectEmail: "اختر رسالة للبدء",
    allDone: "أنهيت جميع رسائل هذا المستوى", allDoneBody: "اختر أي رسالة من القائمة للتدرب مرة أخرى.", from: "من",
    levelUp: "أداء رائع! مستواك الآن:", levelDown: "لنخفف السرعة قليلاً. مستواك الآن:",
    levelProgress: "رسائل التصيّد المصنّفة بشكل صحيح:",
    tipSenderPhish: "تمعّن في عنوان المرسل. هنا لا يطابق جهة موثوقة (إملاء خاطئ أو نطاق غريب أو خارجي).",
    tipSenderLegit: "عنوان المرسل يطابق الجهة التي تدّعي الرسالة أنها منها.",
    tipLinkPhish: "احذر من الروابط والمرفقات والطلبات العاجلة. تحقق من العنوان الحقيقي لأي رابط، أو افتح الموقع الرسمي بنفسك وتحقق عبر قناة تثق بها.",
    tipLinkLegit: "لا شيء خطير هنا: لا استعجال، ولا طلب لكلمة مرور، ولا رابط أو مرفق مشبوه.",
    manageUsers: "إدارة المستخدمين", name: "الاسم", role: "الدور", addUser: "إضافة مستخدم",
    addUserBtn: "إضافة مستخدم", userAdded: "تمت إضافة المستخدم.",
    userExists: "املأ جميع الحقول وأدخل بريداً إلكترونياً جديداً.", delete: "حذف",
    confirmDelete: "هل تريد حذف هذا العنصر؟", addScenario: "إضافة سيناريو", addScenarioBtn: "إضافة سيناريو",
    category: "التصنيف", type: "النوع", typePhish: "تصيّد", typeLegit: "سليمة", sender: "عنوان المرسل",
    subject: "الموضوع", scenarioAdded: "تمت إضافة السيناريو.", scenarioError: "يرجى ملء جميع الحقول.",
    allScenarios: "جميع السيناريوهات", dashTitle: "لوحة مدير الأمن", totalAttempts: "إجمالي المحاولات",
    correctRate: "نسبة الإجابات الصحيحة", weakestTopic: "أضعف موضوع", accuracyByCategory: "الدقة حسب تصنيف التصيّد",
    demoData: "تحميل بيانات تجريبية", resetData: "مسح جميع النتائج", noData: "لا توجد محاولات بعد",
    avgTime: "المتوسط", sec: "ث", attemptsWord: "محاولات", confirmReset: "هل تريد حذف جميع النتائج المحفوظة؟",
    newUserLink: "مستخدم جديد؟ أنشئ حساباً", registerTitle: "إنشاء حساب", fullName: "الاسم الكامل",
    registerBtn: "تسجيل", haveAccount: "لديك حساب بالفعل؟ سجّل الدخول", regEmpty: "يرجى ملء جميع الحقول.",
    regBadEmail: "يرجى إدخال بريد إلكتروني صحيح.", regDuplicate: "هذا البريد الإلكتروني مسجّل بالفعل.",
    myHistory: "سجلي التدريبي", historyEmpty: "لا توجد نتائج بعد. صنّف رسالة للبدء.", colWhen: "التاريخ",
    colEmail: "الرسالة", colResult: "النتيجة", colTime: "الزمن", ok: "صحيحة", wrong: "خاطئة",
    recTag: "موصى بها", recNote: "مجال التركيز بناءً على نتائجك:", avgTimeFull: "متوسط الزمن",
    status: "الحالة", active: "نشط", deactivated: "معطّل", edit: "تعديل", cancel: "إلغاء",
    saveChanges: "حفظ التعديلات", scenarioUpdated: "تم تحديث السيناريو.", exportPdf: "طباعة / حفظ كملف PDF",
    exportCsv: "تنزيل ملف CSV", total: "الإجمالي"
  }
};
