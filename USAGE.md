## Running the Project


Follow these steps to run the Phoenix project and the Next.js project. These commands should be executed in a Bash terminal:

1. Clone the project repository:

   ```bash
   git clone https://github.com/kyanvasu/phoenix.git
   ```

2. Navigate to the project directory:

   ```bash
   cd phoenix
   ```

3. Install the project dependencies:

   ```bash
   yarn install
   ```

4. Build the project:

   ```bash
   yarn build
   ```

5. Now, navigate to the Next.js project directory that is in the same repository:

   ```bash
   cd ./next/
   ```

6. Install the Next.js project dependencies:

   ```bash
   yarn install
   ```

7. Execute the `reload:phoenix` command:

   ```bash
   yarn reload:phoenix
   ```

8. Run the Next.js project:
   ```bash
   yarn dev
   ```

Now you should be able to see your Next.js application running at `localhost:3000` in your browser.

> [!NOTE]  
> Please note that these steps are general and may vary depending on the specific configuration of your project. Be sure to replace `next` with the actual name of your Next.js project directory.
