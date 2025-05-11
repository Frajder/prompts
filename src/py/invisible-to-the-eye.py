import pyperclip

"""
get_multiline_input: Get multiline input from the user. End input on EOF (Ctrl+D / Ctrl+Z).
"""
def get_multiline_input(prompt="Enter text to convert. End input on EOF (Ctrl+D / Ctrl+Z):"):
    print(prompt)
    lines = []
    while True:
        try:
            line = input()
        except EOFError:
            break
        lines.append(line)
    return "\n".join(lines)

"""
convert_to_invisible: Convert each character in usr_prompt to its corresponding tag character in the Unicode Tag range (U+E0000 onward).
"""
def convert_to_invisible(usr_prompt):
    return ''.join(chr(0xE0000 + ord(ch)) for ch in usr_prompt)

if __name__ == "__main__":
    user_prompt = get_multiline_input("Enter text to convert. End input on EOF (Ctrl+D / Ctrl+Z):")
    tagged_output = convert_to_invisible(user_prompt)
    print("\nTagged output:")
    print(tagged_output)
    try:
        pyperclip.copy(tagged_output)
        print("\nOK: Tagged output copied to clipboard.")
    except pyperclip.PyperclipException:
        print("\nERROR: pyperclip is not installed copy output so output is not automatically copied to clipboard, please copy manually from the line above this one and below 'Tagged output:'.")
