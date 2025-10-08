---
title: "Vibe Engineering with Django: Working with AI Coding Agents"
date: "2025-10-08"
featured: true
description: "A deep dive into professional AI-assisted development with Django, exploring how experienced engineers can leverage coding agents while maintaining accountability and code quality."
---

*This post builds on the excellent work by [Simon Willison](https://simonwillison.net/) and his original concept of "Vibe Engineering." You can read his original piece <a href="https://simonwillison.net/2024/Oct/7/vibe-engineering/" class="inline-link" target="_blank" rel="noopener noreferrer">here</a>.*

I've been using AI coding assistants for over two years now—from GitHub Copilot to Cursor—and I've seen the landscape evolve rapidly. What started as simple autocomplete has transformed into sophisticated coding agents that can iterate, test, and modify code until they achieve specified goals.

But here's the thing: there's a massive difference between letting AI write your code and using AI to amplify your engineering capabilities. That difference is what Simon Willison calls **"Vibe Engineering."**

## What is Vibe Engineering?

**Vibe engineering** represents the professional end of the AI-assisted development spectrum—where seasoned engineers accelerate their work with LLMs while staying proudly accountable for the software they produce.

This contrasts with **vibe coding**: the fast, loose, and entirely prompt-driven approach with no attention to how code actually works.

The term itself is intentionally mischievous. The mismatch between "vibes" and "engineering" captures the absurdity of our current AI moment while establishing a clear distinction from the dismissive "vibe coding" label.

## The Rise of Coding Agents

Modern coding agents (Claude Code, OpenAI's Codex CLI, Gemini CLI) can iterate on code, actively testing and modifying it until achieving specified goals. Experienced engineers are now running multiple agents in parallel, tackling several problems simultaneously.

But here's the key insight: **AI tools amplify existing expertise.** The more skills and experience you have as a software engineer, the faster and better your results with LLMs and coding agents.

## Best Practices for Agent-Assisted Development

Let me walk you through the essential practices, using a Django application as our practical example throughout.

### 1. **Automated Testing**

Robust test suites let agents fly. Without tests, agents may claim success without verification. Test-first development is particularly effective with iterative agents.

**Django Example:**
```python
# tests/test_models.py
from django.test import TestCase
from django.contrib.auth.models import User
from .models import BlogPost

class BlogPostModelTest(TestCase):
    def test_blog_post_creation(self):
        user = User.objects.create_user('testuser')
        post = BlogPost.objects.create(
            title='Test Post',
            content='Test content',
            author=user
        )
        self.assertEqual(str(post), 'Test Post')
        self.assertTrue(post.created_at)
```

When working with agents, I start with comprehensive test cases. The agent can then implement features knowing exactly what success looks like.

### 2. **Planning in Advance**

Start with high-level plans. Iterate on the plan first, then hand off to the agent. Clear specifications lead to better results.

**Django Example:**
```markdown
## Feature: User Profile Management

### Requirements:
- Users can view their profile
- Users can edit basic info (name, bio, avatar)
- Profile updates require authentication
- Avatar uploads should be validated and resized

### API Endpoints:
- GET /api/profile/ - View current user profile
- PUT /api/profile/ - Update profile
- POST /api/profile/avatar/ - Upload avatar

### Database Changes:
- Add bio field to User model
- Add avatar field to User model
- Create migration for new fields
```

I write detailed specifications like this before unleashing any agent. The clearer the requirements, the better the implementation.

### 3. **Comprehensive Documentation**

Agents can only keep a subset of the codebase in context. Good docs enable API usage without reading implementation.

**Django Example:**
```python
# api/views.py
class ProfileViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing user profiles.
    
    Provides:
    - list: Get current user's profile
    - update: Update profile information
    - partial_update: Partially update profile
    
    Authentication required for all operations.
    """
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
```

Write documentation first; let agents implement from it. This approach ensures the agent understands the intended behavior before writing code.

### 4. **Good Version Control Habits**

Essential for understanding and undoing agent changes. LLMs excel at Git navigation and tools like `git bisect`.

**Django Example:**
```bash
# Before starting agent work
git checkout -b feature/user-profiles
git add tests/test_models.py
git commit -m "Add tests for user profile functionality"

# After agent completes work
git add .
git commit -m "Implement user profile API endpoints"
git push origin feature/user-profiles
```

I always create feature branches and commit frequently. This makes it easy to review agent changes and rollback if needed.

### 5. **Effective Automation**

CI/CD, automated formatting, linting, preview environments. LLMs make writing automation scripts easier.

**Django Example:**
```yaml
# .github/workflows/django.yml
name: Django CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Set up Python
      uses: actions/setup-python@v2
      with:
        python-version: 3.11
    - name: Install dependencies
      run: |
        pip install -r requirements.txt
    - name: Run tests
      run: |
        python manage.py test
    - name: Run linting
      run: |
        flake8 .
        black --check .
```

Automation helps agents repeat tasks consistently and catch issues early.

### 6. **Code Review Culture**

Fast, productive code review is critical. Treat agent output like any other code submission.

**Django Example:**
```python
# Before agent work - I write this
def get_user_profile(user):
    """Get user profile with related data."""
    return User.objects.select_related('profile').get(id=user.id)

# After agent work - I review this
def get_user_profile(user):
    """Get user profile with related data."""
    try:
        return User.objects.select_related('profile').get(id=user.id)
    except User.DoesNotExist:
        return None
```

I always review agent code critically. In this case, the agent added error handling, which is good, but I need to verify it's the right approach for our use case.

### 7. **Management-Like Skills**

Provide clear instructions and necessary context. Give actionable feedback.

**Django Example:**
```
Agent, please implement the user profile API with these specific requirements:

1. Use Django REST Framework ViewSets
2. Include proper serialization for all user fields
3. Add validation for avatar uploads (max 5MB, image files only)
4. Include proper error handling and status codes
5. Write comprehensive tests for all endpoints
6. Follow our existing code style (PEP 8, type hints)

Context: This is part of a social media application where users need to manage their public profiles.
```

Clear, specific instructions lead to better results than vague prompts.

### 8. **Manual QA Excellence**

Beyond automated tests, strong manual testing skills are essential. Preview environments are crucial for safe review.

**Django Example:**
```python
# settings.py
if DEBUG:
    # Use local file storage for development
    DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
else:
    # Use S3 for production
    DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'
```

I always test agent implementations in preview environments before merging. This catches integration issues that automated tests might miss.

### 9. **Research Skills**

Identify the best approaches before implementation. Prove concepts before unleashing agents.

**Django Example:**
Before implementing user authentication, I research:
- Django's built-in authentication system
- JWT vs session-based authentication
- Third-party packages like django-allauth
- Security best practices for user management

Only after understanding the landscape do I write specifications for the agent.

### 10. **Knowing When to Use AI**

Maintain intuition for when LLMs can be applied. This constantly evolves as tools improve.

**Django Example:**
- **Good for AI**: Boilerplate CRUD operations, API serializers, basic tests
- **Not good for AI**: Complex business logic, security-critical code, performance optimizations
- **Depends**: Database migrations, configuration management

I use AI for the 80% of code that's straightforward, but I write the critical 20% myself.

### 11. **Updated Estimation Skills**

AI changes project timelines unpredictably. Estimations now depend on new, evolving factors.

**Django Example:**
A feature that used to take 2 days might now take 4 hours with AI assistance, but only if:
- I have clear requirements
- Tests are already written
- The agent doesn't get stuck on edge cases
- I can review and integrate quickly

I've learned to factor in AI's unpredictability when estimating projects.

## The Vibe Engineering Mindset

Vibe engineering requires operating at the top of your game: researching approaches, deciding architecture, writing specs, defining success criteria, designing agentic loops, planning QA, and managing your "digital interns."

It's not about letting AI do the work—it's about using AI to amplify your existing expertise while maintaining full accountability for the software you produce.

## Why This Matters Now

The next 12-24 months will be critical as many companies integrate AI agents into their main workflows. The engineers who master vibe engineering will have a significant advantage over those who either avoid AI entirely or rely on it blindly.

Remember: These tools are powerful, but you remain accountable for the software produced. The goal isn't to replace your engineering skills—it's to amplify them.

*What's your experience with AI coding agents? Are you practicing vibe engineering or falling into vibe coding? I'd love to hear your thoughts.*