import secrets

def generate_secret_key():
    """Generate a secure secret key for Flask"""
    return secrets.token_hex(32)

if __name__ == '__main__':
    key = generate_secret_key()
    print(f"\nGenerated Flask Secret Key: {key}\n")
    print("Add this to your config.py:")
    print(f'FLASK_SECRET_KEY = "{key}"\n')
    print("And to your .env file:")
    print(f'FLASK_SECRET_KEY={key}\n')
