import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext(null)

const translations = {
  en: {
    // Navbar
    'nav.home':      'Home',
    'nav.goals':     'Goals',
    'nav.schedule':  'Schedule',
    'nav.dashboard': 'Dashboard',
    'nav.feedback':  'Feedback',
    'nav.logout':    'Log out',

    // Welcome page
    'welcome.greeting': 'Welcome back 👋',
    'welcome.sub':      'Ready to crush your fitness goals today?',
    'welcome.setGoal':  'Set my goal',
    'welcome.dashboard':'My dashboard',
    'welcome.schedule': 'My schedule',
    'welcome.feedback': 'Give feedback',

    // Goals page
    'goals.title':    'What is your goal?',
    'goals.sub':      "Choose your primary fitness goal. We'll build your program around it.",
    'goals.level':    'What is your level?',
    'goals.continue': 'Continue to schedule →',

    // Goal labels
    'goal.weight-loss': 'Weight loss',
    'goal.muscle':      'Muscle gain',
    'goal.wellness':    'Wellness',
    'goal.endurance':   'Endurance',

    // Level labels
    'level.beginner':     'Beginner',
    'level.intermediate': 'Intermediate',
    'level.advanced':     'Advanced',

    // Schedule page
    'schedule.title':       'Your weekly schedule',
    'schedule.sub':         'Describe your daily routine. The more detail you give, the better your recommendations.',
    'schedule.placeholder': 'E.g. Classes from 8am to 2pm, bus commute, free in the afternoon...',
    'schedule.ready':       '✅ Ready to generate your program!',
    'schedule.fill':        'Fill in at least 3 days',
    'schedule.btn':         'Generate my program →',
    'schedule.loading':     'Loading...',
    'schedule.generating':  '⏳ Generating your program...',

    // Days
    'day.Lundi':    'Monday',
    'day.Mardi':    'Tuesday',
    'day.Mercredi': 'Wednesday',
    'day.Jeudi':    'Thursday',
    'day.Vendredi': 'Friday',
    'day.Samedi':   'Saturday',
    'day.Dimanche': 'Sunday',

    // Dashboard
    'dashboard.title':       'My Dashboard',
    'dashboard.sub':         'Your personalized weekly workout program.',
    'dashboard.editGoals':   '✏️ Edit goals',
    'dashboard.schedule':    '📅 Update schedule',
    'dashboard.goal':        'Goal',
    'dashboard.level':       'Level',
    'dashboard.program':     'Your weekly program',
    'dashboard.noProgram':   'No program generated yet.',
    'dashboard.generateBtn': 'Enter your schedule to generate a program →',
    'dashboard.feedback':    'Happy with your program?',
    'dashboard.feedbackBtn': 'Give feedback →',

    // Feedback page
    'feedback.title':    'Your Feedback',
    'feedback.sub':      'Help us improve your fitness experience.',
    'feedback.q1':       'How would you rate your overall experience?',
    'feedback.q2':       'How well did the program match your goals?',
    'feedback.q3':       'How was the difficulty level?',
    'feedback.q4':       'Any additional comments or suggestions?',
    'feedback.tooEasy':  'Too easy',
    'feedback.justRight':'Just right',
    'feedback.tooHard':  'Too hard',
    'feedback.submit':   'Submit feedback',
    'feedback.placeholder': 'Write your thoughts here...',
    'feedback.successTitle': 'Thank you for your feedback!',
    'feedback.successSub':   'Your feedback helps us improve BougeVersForme for everyone.',
    'feedback.backBtn':      'Back to home',

    // Home page
    'hero.badge':       'Your intelligent fitness coach',
    'hero.title':       'Move towards',
    'hero.titleAccent': 'your best shape',
    'hero.sub':         'Personalized activity programs built around your goals, schedule, and progress.',
    'hero.cta':         'Create my program',
    'hero.demo':        'See the demo →',
    'features.title':   'Why BougeVersForme?',
    'goals.title2':     'Choose your goal',
    'goals.sub2':       'Every program is calibrated to what you are aiming for.',
    'feature.1.title':  'Personalized',
    'feature.1.desc':   'Recommendations tailored to your level, goals, and schedule.',
    'feature.2.title':  'Flexible',
    'feature.2.desc':   'Programs that adapt to your week, not the other way around.',
    'feature.3.title':  'Progressive',
    'feature.3.desc':   'Your workload automatically evolves with your performance.',

    // Footer
    'footer.copy':    '© 2026 BougeVersForme',
    'footer.tagline': 'Move. Progress. Transform.',

    // Login
    'login.welcomeBack':   'Welcome back',
    'login.createAccount': 'Create account',
    'login.signinSub':     'Sign in to continue your fitness journey.',
    'login.signupSub':     'Join BougeVersForme today.',
    'login.fullName':      'Full name',
    'login.email':         'Email address',
    'login.password':      'Password',
    'login.signin':        'Sign in',
    'login.signup':        'Create account',
    'login.noAccount':     "Don't have an account?",
    'login.hasAccount':    'Already have an account?',
    'login.signupLink':    'Sign up',
    'login.signinLink':    'Sign in',
    'login.errorEmail':    'Please enter your email.',
    'login.errorName':     'Please enter your name.',
  },

  fr: {
    // Navbar
    'nav.home':      'Accueil',
    'nav.goals':     'Objectifs',
    'nav.schedule':  'Planning',
    'nav.dashboard': 'Tableau de bord',
    'nav.feedback':  'Avis',
    'nav.logout':    'Déconnexion',

    // Welcome page
    'welcome.greeting': 'Bienvenue 👋',
    'welcome.sub':      'Prêt à atteindre vos objectifs fitness aujourd\'hui ?',
    'welcome.setGoal':  'Définir mon objectif',
    'welcome.dashboard':'Mon tableau de bord',
    'welcome.schedule': 'Mon planning',
    'welcome.feedback': 'Donner mon avis',

    // Goals page
    'goals.title':    'Quel est votre objectif ?',
    'goals.sub':      'Choisissez votre objectif principal. Nous construirons votre programme autour.',
    'goals.level':    'Quel est votre niveau ?',
    'goals.continue': 'Continuer vers le planning →',

    // Goal labels
    'goal.weight-loss': 'Perte de poids',
    'goal.muscle':      'Prise de masse',
    'goal.wellness':    'Bien-être',
    'goal.endurance':   'Endurance',

    // Level labels
    'level.beginner':     'Débutant',
    'level.intermediate': 'Intermédiaire',
    'level.advanced':     'Avancé',

    // Schedule page
    'schedule.title':       'Votre emploi du temps',
    'schedule.sub':         'Décrivez votre routine quotidienne. Plus vous êtes précis, meilleures seront vos recommandations.',
    'schedule.placeholder': 'Ex: Cours de 8h à 14h, trajet en bus, libre l\'après-midi...',
    'schedule.ready':       '✅ Prêt à générer votre programme !',
    'schedule.fill':        'Remplissez au moins 3 jours',
    'schedule.btn':         'Générer mon programme →',
    'schedule.loading':     'Chargement...',
    'schedule.generating':  '⏳ Génération de votre programme...',

    // Days
    'day.Lundi':    'Lundi',
    'day.Mardi':    'Mardi',
    'day.Mercredi': 'Mercredi',
    'day.Jeudi':    'Jeudi',
    'day.Vendredi': 'Vendredi',
    'day.Samedi':   'Samedi',
    'day.Dimanche': 'Dimanche',

    // Dashboard
    'dashboard.title':       'Mon Tableau de Bord',
    'dashboard.sub':         'Votre programme d\'entraînement personnalisé.',
    'dashboard.editGoals':   '✏️ Modifier les objectifs',
    'dashboard.schedule':    '📅 Mettre à jour le planning',
    'dashboard.goal':        'Objectif',
    'dashboard.level':       'Niveau',
    'dashboard.program':     'Votre programme de la semaine',
    'dashboard.noProgram':   'Aucun programme généré pour l\'instant.',
    'dashboard.generateBtn': 'Renseignez votre planning pour générer un programme →',
    'dashboard.feedback':    'Satisfait de votre programme ?',
    'dashboard.feedbackBtn': 'Donner mon avis →',

    // Feedback page
    'feedback.title':    'Votre Avis',
    'feedback.sub':      'Aidez-nous à améliorer votre expérience fitness.',
    'feedback.q1':       'Comment évaluez-vous votre expérience globale ?',
    'feedback.q2':       'Le programme correspondait-il bien à vos objectifs ?',
    'feedback.q3':       'Comment était le niveau de difficulté ?',
    'feedback.q4':       'Des commentaires ou suggestions supplémentaires ?',
    'feedback.tooEasy':  'Trop facile',
    'feedback.justRight':'Parfait',
    'feedback.tooHard':  'Trop difficile',
    'feedback.submit':   'Envoyer mon avis',
    'feedback.placeholder': 'Écrivez vos pensées ici...',
    'feedback.successTitle': 'Merci pour votre avis !',
    'feedback.successSub':   'Votre avis nous aide à améliorer BougeVersForme pour tous.',
    'feedback.backBtn':      'Retour à l\'accueil',

    // Home page
    'hero.badge':       'Votre coach fitness intelligent',
    'hero.title':       'Bougez vers',
    'hero.titleAccent': 'votre meilleure forme',
    'hero.sub':         'Des programmes d\'activité sur-mesure, construits autour de vos objectifs, votre emploi du temps et votre progression.',
    'hero.cta':         'Créer mon programme',
    'hero.demo':        'Voir la démo →',
    'features.title':   'Pourquoi BougeVersForme ?',
    'goals.title2':     'Choisissez votre objectif',
    'goals.sub2':       'Chaque programme est calibré selon ce que vous visez.',
    'feature.1.title':  'Personnalisé',
    'feature.1.desc':   'Recommandations adaptées à votre niveau, vos objectifs et votre agenda.',
    'feature.2.title':  'Flexible',
    'feature.2.desc':   'Des programmes qui s\'ajustent à votre semaine, pas l\'inverse.',
    'feature.3.title':  'Progressif',
    'feature.3.desc':   'Votre charge évolue automatiquement avec vos performances.',

    // Footer
    'footer.copy':    '© 2026 BougeVersForme',
    'footer.tagline': 'Bougez. Progressez. Transformez.',

    // Login
    'login.welcomeBack':   'Bon retour',
    'login.createAccount': 'Créer un compte',
    'login.signinSub':     'Connectez-vous pour continuer votre parcours fitness.',
    'login.signupSub':     'Rejoignez BougeVersForme aujourd\'hui.',
    'login.fullName':      'Nom complet',
    'login.email':         'Adresse email',
    'login.password':      'Mot de passe',
    'login.signin':        'Se connecter',
    'login.signup':        'Créer un compte',
    'login.noAccount':     'Pas encore de compte ?',
    'login.hasAccount':    'Déjà un compte ?',
    'login.signupLink':    'S\'inscrire',
    'login.signinLink':    'Se connecter',
    'login.errorEmail':    'Veuillez entrer votre email.',
    'login.errorName':     'Veuillez entrer votre nom.',
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  function toggleLanguage() {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en')
  }

  function t(key) {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider')
  }
  return context
}