describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");

    const user = {
      username: "hajarnasr",
      password: "haj123456",
    };
    cy.request("POST", `http://localhost:3001/api/users/`, user);
  });

  it("Login form is shown", function () {
    cy.contains("Login");
    cy.get("#login-form").should("have.css", "display", "block");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("hajar");
      cy.get("#password").type("haj123456");
      cy.get("#submit-btn").click();

      cy.contains("blogs");
      cy.contains("Logged in as");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("hajarnasr");
      cy.get("#password").type("fakepassword");
      cy.get("#submit-btn").click();
      cy.contains("Login");
      cy.should("not.contain", "Logged in as");
      cy.contains("Wrong Password");
      cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    });
  });
});

describe("Loggedin user", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");

    const user = {
      username: "hajarnasr",
      password: "haj123456",
    };
    const userTwo = {
      username: "userTwo",
      password: "userTwo123",
    };
    cy.request("POST", `http://localhost:3001/api/users/`, user);
    cy.request("POST", `http://localhost:3001/api/users/`, userTwo);

    cy.get("#username").type("hajarnasr");
    cy.get("#password").type("haj123456");
    cy.get("#submit-btn").click();
  });

  it("A blog can be created", function () {
    cy.contains("Add post").click();
    cy.get(".title").type("Test Title");
    cy.get(".author").type("Test Author");
    cy.get(".url").type("Test url");

    cy.get("#add-blog-submit").click();

    cy.contains("Test Title");
    cy.contains("Test Author");
  });

  it("A user can like a post", function () {
    cy.contains("view").click();
    cy.contains("URL: Test url");
    cy.contains("Like");
    cy.get("#like-btn").click();
  });

  it("Users cannot delete other people's posts", function () {
    cy.contains("logout").click();

    cy.get("#username").type("userTwo");
    cy.get("#password").type("userTwo123");
    cy.get("#submit-btn").click();
    cy.contains("view").click();

    cy.contains("Remove").click();

    cy.contains("You can only delete your posts");
    cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
  });

  it("Users can delete their posts", function () {
    cy.contains("view").click();
    cy.contains("Remove").click();

    cy.contains("successfully deleted");
    cy.get(".success");
  });

  it("Blogs are ordered the number of likes", function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset/blogs").then(
      (res) => {
        const loggedinUser = JSON.parse(localStorage.getItem("loggedinUser"));
        for (let i = 10; i <= 15; i++) {
          let newPost = {
            title: `Test Title ${i}`,
            author: `Test Author ${i}`,
            url: `Test url ${i}`,
            likes: i,
          };
          cy.request({
            method: "POST",
            url: "http://localhost:3001/api/posts",
            headers: { Authorization: `bearer ${loggedinUser.token}` },
            body: newPost,
          });
        }
      }
    );
    cy.visit("http://localhost:3000");

    cy.get(".blog-post")
      .find(".likes")
      .then((res) => {
        const arrayOfLikes = res.map((i, el) => +el.innerText);
        expect(arrayOfLikes).to.equal(arrayOfLikes.sort((a, b) => b - a));
      });
  });
});
